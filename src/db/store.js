// ShopDesk In-Memory & Persistent State Store
// Powered by seed data with full real-time updates and reset capabilities.

const { SEED_BUSINESSES, ALL_SEED_TICKETS, SEED_ORDERS, SEED_COMPLAINTS, SEED_TEAM } = require('../data/seed-data.js');
const { processMessageWithAI } = require('../ai/llm-service.js');

class ShopDeskStore {
  constructor() {
    this.resetData();
  }

  resetData() {
    // Clone deep to prevent mutation of base seed arrays
    this.businesses = JSON.parse(JSON.stringify(SEED_BUSINESSES));
    this.activeBusinessId = "bakery"; // default
    this.tickets = JSON.parse(JSON.stringify(ALL_SEED_TICKETS));
    this.orders = JSON.parse(JSON.stringify(SEED_ORDERS));
    this.complaints = JSON.parse(JSON.stringify(SEED_COMPLAINTS));
    this.team = JSON.parse(JSON.stringify(SEED_TEAM));
    this.nextTicketId = 900;
  }

  getActiveBusiness() {
    return this.businesses.find(b => b.id === this.activeBusinessId) || this.businesses[0];
  }

  setActiveBusiness(id) {
    const found = this.businesses.find(b => b.id === id);
    if (found) {
      this.activeBusinessId = id;
      return found;
    }
    return null;
  }

  getAllBusinesses() {
    return this.businesses;
  }

  updateBusiness(id, updates) {
    const index = this.businesses.findIndex(b => b.id === id);
    if (index !== -1) {
      this.businesses[index] = { ...this.businesses[index], ...updates };
      return this.businesses[index];
    }
    return null;
  }

  // Tickets
  getTickets(businessId = null, filter = {}) {
    const bId = businessId || this.activeBusinessId;
    let list = this.tickets.filter(t => t.businessId === bId);

    if (filter.status && filter.status !== 'all') {
      list = list.filter(t => t.status === filter.status);
    }
    if (filter.category && filter.category !== 'all') {
      list = list.filter(t => t.category === filter.category);
    }
    if (filter.urgency && filter.urgency !== 'all') {
      list = list.filter(t => t.urgency === filter.urgency);
    }
    if (filter.channel && filter.channel !== 'all') {
      list = list.filter(t => t.channel === filter.channel);
    }
    if (filter.needsHuman === true) {
      list = list.filter(t => t.needsHuman === true);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(t => 
        t.rawMessage.toLowerCase().includes(q) ||
        t.customer.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        (t.summary && t.summary.toLowerCase().includes(q))
      );
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
  }

  getTicketById(id) {
    return this.tickets.find(t => t.id === id) || null;
  }

  updateTicket(id, updates) {
    const ticket = this.getTicketById(id);
    if (!ticket) return null;

    Object.assign(ticket, updates);
    if (updates.actionLog) {
      ticket.history.push({
        action: updates.actionLog,
        timestamp: new Date().toISOString(),
        actor: updates.actor || "Staff"
      });
    }
    return ticket;
  }

  async addIncomingMessage({ businessId, channel, rawMessage, customerName, customerHandle, customerAvatar }) {
    const targetBusinessId = businessId || this.activeBusinessId;
    const business = this.businesses.find(b => b.id === targetBusinessId) || this.getActiveBusiness();
    
    this.nextTicketId++;
    const ticketId = `TICK-${targetBusinessId.toUpperCase().slice(0, 2)}-${this.nextTicketId}`;

    const customer = {
      name: customerName || "Jordan Lee",
      handle: customerHandle || "@jordanlee_99",
      email: `${(customerName || "jordan").toLowerCase().replace(/\s+/g, "")}@gmail.com`,
      phone: "+1 (555) 438-2910",
      avatar: customerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 0.00,
      pastOrdersCount: 0
    };

    // Run AI processing
    const aiResult = await processMessageWithAI({
      rawMessage,
      business,
      channel,
      customer
    });

    const newTicket = {
      id: ticketId,
      businessId: targetBusinessId,
      customer,
      channel: channel || "whatsapp",
      status: aiResult.needs_human ? "escalated" : "new",
      category: aiResult.category,
      urgency: aiResult.urgency,
      sentiment: aiResult.sentiment,
      language: aiResult.language,
      receivedAt: new Date().toISOString(),
      rawMessage,
      summary: aiResult.summary,
      entities: aiResult.entities,
      aiConfidence: aiResult.confidence,
      whyClassification: aiResult.why_classification,
      needsHuman: aiResult.needs_human,
      needsHumanReason: aiResult.needs_human_reason,
      suggestedAction: aiResult.suggested_next_action,
      suggestedReply: aiResult.suggested_reply,
      staffNotes: "",
      history: [
        { action: `Received via ${channel || "WhatsApp"}`, timestamp: new Date().toISOString(), actor: "System" },
        { action: `AI Classified as ${aiResult.category.toUpperCase()} (${Math.round(aiResult.confidence * 100)}% confidence)`, timestamp: new Date().toISOString(), actor: "ShopDesk AI" }
      ]
    };

    if (aiResult.needs_human) {
      newTicket.history.push({
        action: `Auto-escalated: ${aiResult.needs_human_reason}`,
        timestamp: new Date().toISOString(),
        actor: "Automation Policy"
      });
    }

    this.tickets.unshift(newTicket);

    // If it's an order or complaint, register into respective sub-systems
    if (aiResult.category === "order") {
      this.orders.unshift({
        id: `ORD-${this.nextTicketId}`,
        businessId: targetBusinessId,
        ticketId: ticketId,
        customerName: customer.name,
        customerPhone: customer.phone,
        items: aiResult.entities.items ? aiResult.entities.items.map(i => ({ name: i, quantity: 1, price: 35.00 })) : [{ name: "Custom order", quantity: 1, price: 40.00 }],
        total: aiResult.entities.estimated_total || 45.00,
        status: "New",
        allergyWarning: aiResult.entities.allergies || null,
        deliveryDate: aiResult.entities.dates || "Scheduled within 48h",
        deliveryType: "Pickup / Delivery",
        channel: channel || "whatsapp",
        specialInstructions: rawMessage,
        createdAt: new Date().toISOString()
      });
    } else if (aiResult.category === "complaint" && aiResult.needs_human) {
      this.complaints.unshift({
        id: `CMP-${this.nextTicketId}`,
        businessId: targetBusinessId,
        ticketId: ticketId,
        customerName: customer.name,
        orderNumber: aiResult.entities.order_number || null,
        severity: aiResult.urgency === "high" ? "Critical" : "High",
        slaMinutesLeft: 60,
        createdAt: new Date().toISOString(),
        reason: aiResult.needs_human_reason || "Customer service escalation",
        claimAmount: 50.00,
        status: "Under Review",
        resolutionSteps: [
          { step: "Review incoming customer message", completed: true },
          { step: "Confirm order / service details", completed: false },
          { step: "Issue response or approval", completed: false }
        ]
      });
    }

    return newTicket;
  }

  // Orders
  getOrders(businessId = null) {
    const bId = businessId || this.activeBusinessId;
    return this.orders.filter(o => o.businessId === bId);
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  }

  // Complaints
  getComplaints(businessId = null) {
    const bId = businessId || this.activeBusinessId;
    return this.complaints.filter(c => c.businessId === bId);
  }

  updateComplaint(complaintId, updates) {
    const comp = this.complaints.find(c => c.id === complaintId);
    if (comp) {
      Object.assign(comp, updates);
      return comp;
    }
    return null;
  }

  // Customers
  getCustomers(businessId = null) {
    const bId = businessId || this.activeBusinessId;
    const tickets = this.tickets.filter(t => t.businessId === bId);
    const map = new Map();

    for (const t of tickets) {
      const email = t.customer.email;
      if (!map.has(email)) {
        map.set(email, {
          ...t.customer,
          ticketsCount: 1,
          lastInteraction: t.receivedAt,
          recentCategory: t.category
        });
      } else {
        const existing = map.get(email);
        existing.ticketsCount++;
        if (new Date(t.receivedAt) > new Date(existing.lastInteraction)) {
          existing.lastInteraction = t.receivedAt;
          existing.recentCategory = t.category;
        }
      }
    }

    return Array.from(map.values());
  }

  // Analytics Metrics
  getAnalytics(businessId = null) {
    const bId = businessId || this.activeBusinessId;
    const tickets = this.tickets.filter(t => t.businessId === bId);
    const total = tickets.length;
    const orders = tickets.filter(t => t.category === "order").length;
    const complaints = tickets.filter(t => t.category === "complaint").length;
    const urgent = tickets.filter(t => t.urgency === "high").length;
    const aiHandled = tickets.filter(t => !t.needsHuman).length;
    const humanHandled = tickets.filter(t => t.needsHuman).length;
    
    // Category distribution
    const catCounts = {};
    for (const t of tickets) {
      catCounts[t.category] = (catCounts[t.category] || 0) + 1;
    }

    // Channels distribution
    const channelCounts = {};
    for (const t of tickets) {
      channelCounts[t.channel] = (channelCounts[t.channel] || 0) + 1;
    }

    return {
      totalTickets: total,
      urgentCount: urgent,
      ordersCount: orders,
      complaintsCount: complaints,
      aiHandledPercent: total ? Math.round((aiHandled / total) * 100) : 0,
      humanHandledPercent: total ? Math.round((humanHandled / total) * 100) : 0,
      hoursSavedThisWeek: Math.max(14.5, Math.round(total * 0.45 * 10) / 10),
      avgResponseTimeMin: "1.8 mins",
      aiDraftAcceptanceRate: "88.4%",
      customerSatisfactionScore: "94.2%",
      categoryBreakdown: catCounts,
      channelBreakdown: channelCounts
    };
  }

  // Team
  getTeam(businessId = null) {
    const bId = businessId || this.activeBusinessId;
    return this.team.filter(m => m.businesses.includes(bId) || m.businesses.length === 3);
  }
}

// Singleton store instance
const store = new ShopDeskStore();

module.exports = { store };
