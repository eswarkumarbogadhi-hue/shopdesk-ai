// ShopDesk AI - Reactive Client Store & State Manager

class AppStateManager {
  constructor() {
    this.state = {
      config: null,
      activeBusiness: null,
      businesses: [],
      tickets: [],
      selectedTicketId: null,
      selectedTicket: null,
      orders: [],
      complaints: [],
      customers: [],
      team: [],
      analytics: null,
      activeFilter: {
        status: 'all',
        category: 'all',
        urgency: 'all',
        channel: 'all',
        needsHuman: false,
        search: ''
      },
      currentRoute: window.location.pathname || '/',
      darkMode: localStorage.getItem('shopdesk_theme') === 'dark',
      commandPaletteOpen: false,
      tourOpen: false,
      isSimulating: false,
      stats: {
        urgentCount: 0,
        ordersCount: 0,
        complaintsCount: 0
      }
    };

    this.listeners = new Set();
    this.applyTheme();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('[Store Listener Error]', err);
      }
    }
  }

  applyTheme() {
    if (this.state.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('shopdesk_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('shopdesk_theme', 'light');
    }
  }

  toggleTheme() {
    this.state.darkMode = !this.state.darkMode;
    this.applyTheme();
    this.notify();
    toast.show({
      title: this.state.darkMode ? "Dark mode activated" : "Light mode activated",
      message: "Theme preference saved locally.",
      type: "info",
      sound: "pop"
    });
  }

  async init() {
    try {
      // 1. Fetch site config
      const configRes = await fetch('/api/config');
      this.state.config = await configRes.json();

      // 2. Fetch businesses
      const bizRes = await fetch('/api/businesses');
      const bizData = await bizRes.json();
      this.state.businesses = bizData.all || [];
      this.state.activeBusiness = bizData.active || bizData.all[0];

      // 3. Load all core datasets for active business
      await this.refreshAllData();

      // Keyboard shortcuts
      this.setupKeyboardShortcuts();

      this.notify();
    } catch (err) {
      console.error('[Store Init Failed]', err);
    }
  }

  async refreshAllData() {
    if (!this.state.activeBusiness) return;
    const bId = this.state.activeBusiness.id;

    try {
      // Tickets
      const ticketsRes = await fetch(`/api/tickets?businessId=${bId}`);
      this.state.tickets = await ticketsRes.json();

      // If no ticket selected or current ticket not in list, select first
      if (!this.state.selectedTicketId && this.state.tickets.length > 0) {
        this.selectTicket(this.state.tickets[0].id, false);
      } else if (this.state.selectedTicketId) {
        this.state.selectedTicket = this.state.tickets.find(t => t.id === this.state.selectedTicketId) || this.state.tickets[0] || null;
      }

      // Orders
      const ordersRes = await fetch(`/api/orders?businessId=${bId}`);
      this.state.orders = await ordersRes.json();

      // Complaints
      const complaintsRes = await fetch(`/api/complaints?businessId=${bId}`);
      this.state.complaints = await complaintsRes.json();

      // Customers
      const custRes = await fetch(`/api/customers?businessId=${bId}`);
      this.state.customers = await custRes.json();

      // Analytics
      const analRes = await fetch(`/api/analytics?businessId=${bId}`);
      this.state.analytics = await analRes.json();

      // Team
      const teamRes = await fetch(`/api/team?businessId=${bId}`);
      this.state.team = await teamRes.json();

      // Compute badge counters
      this.state.stats = {
        urgentCount: this.state.tickets.filter(t => t.urgency === 'high' && t.status !== 'resolved').length,
        ordersCount: this.state.orders.filter(o => o.status === 'New' || o.status === 'Preparing').length,
        complaintsCount: this.state.complaints.filter(c => c.status !== 'Resolved').length
      };

      this.notify();
    } catch (err) {
      console.error('[Data Refresh Failed]', err);
    }
  }

  async switchBusiness(businessId) {
    try {
      const res = await fetch('/api/businesses/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId })
      });
      const data = await res.json();
      if (data.success) {
        this.state.activeBusiness = data.active;
        this.state.selectedTicketId = null;
        this.state.selectedTicket = null;
        await this.refreshAllData();

        toast.show({
          title: `Switched to ${data.active.name}`,
          message: `Workspace, tone settings, and live inbox loaded for ${data.active.type}.`,
          type: 'success',
          sound: 'pop'
        });
      }
    } catch (err) {
      console.error('[Switch Business Failed]', err);
    }
  }

  selectTicket(ticketId, triggerNotify = true) {
    this.state.selectedTicketId = ticketId;
    this.state.selectedTicket = this.state.tickets.find(t => t.id === ticketId) || null;
    if (triggerNotify) this.notify();
  }

  setFilter(filterUpdates) {
    this.state.activeFilter = { ...this.state.activeFilter, ...filterUpdates };
    this.notify();
  }

  getFilteredTickets() {
    const { status, category, urgency, channel, needsHuman, search } = this.state.activeFilter;
    let list = [...this.state.tickets];

    if (status && status !== 'all') {
      list = list.filter(t => t.status === status);
    }
    if (category && category !== 'all') {
      list = list.filter(t => t.category === category);
    }
    if (urgency && urgency !== 'all') {
      list = list.filter(t => t.urgency === urgency);
    }
    if (channel && channel !== 'all') {
      list = list.filter(t => t.channel === channel);
    }
    if (needsHuman === true) {
      list = list.filter(t => t.needsHuman === true);
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.rawMessage.toLowerCase().includes(q) ||
        t.customer.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        (t.summary && t.summary.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // Ticket Actions
  async approveDraft(ticketId) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'resolved',
          actionLog: `Approved and sent AI draft reply via ${ticket.channel.toUpperCase()}`,
          actor: "Sarah (Owner)"
        })
      });
      const updated = await res.json();
      Object.assign(ticket, updated);
      this.notify();

      toast.show({
        title: "Draft Approved & Sent! 🚀",
        message: `Reply delivered to ${ticket.customer.name} via ${ticket.channel}. Ticket marked resolved.`,
        type: "success",
        sound: "pop"
      });
    } catch (err) {
      console.error('[Approve Draft Failed]', err);
    }
  }

  async updateDraft(ticketId, newText) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suggestedReply: newText,
          actionLog: "Owner edited AI draft reply",
          actor: "Sarah (Owner)"
        })
      });
      const updated = await res.json();
      Object.assign(ticket, updated);
      this.notify();

      toast.show({
        title: "Draft Updated",
        message: "Your customized reply has been saved.",
        type: "info",
        sound: "pop"
      });
    } catch (err) {
      console.error('[Update Draft Failed]', err);
    }
  }

  async regenerateDraft(ticketId, variation = 'friendly') {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    try {
      const res = await fetch('/api/draft-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: ticket.rawMessage,
          customer: ticket.customer,
          variation
        })
      });
      const data = await res.json();
      if (data.suggested_reply) {
        await this.updateDraft(ticketId, data.suggested_reply);
        toast.show({
          title: "Reply Regenerated ✨",
          message: `Draft refreshed with ${variation} tone grounded in Knowledge Base.`,
          type: "success",
          sound: "pop"
        });
      }
    } catch (err) {
      console.error('[Regenerate Draft Failed]', err);
    }
  }

  async escalateTicket(ticketId, reason) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'escalated',
          needsHuman: true,
          needsHumanReason: reason || "Manual escalation by staff",
          urgency: 'high',
          actionLog: `Escalated ticket: ${reason || "Staff requested review"}`,
          actor: "Staff Lead"
        })
      });
      const updated = await res.json();
      Object.assign(ticket, updated);
      this.refreshAllData();

      toast.show({
        title: "Ticket Escalated to Human",
        message: `High-priority alert flagged for team review.`,
        type: "urgent",
        sound: "urgent"
      });
    } catch (err) {
      console.error('[Escalate Failed]', err);
    }
  }

  async addInternalNote(ticketId, note) {
    const ticket = this.state.tickets.find(t => t.id === ticketId);
    if (!ticket || !note.trim()) return;

    try {
      const existing = ticket.staffNotes ? ticket.staffNotes + "\n\n" : "";
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedNotes = `${existing}[${timestamp} Owner]: ${note.trim()}`;

      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffNotes: updatedNotes,
          actionLog: `Added staff note: "${note.trim().slice(0, 40)}..."`,
          actor: "Sarah (Owner)"
        })
      });
      const updated = await res.json();
      Object.assign(ticket, updated);
      this.notify();

      toast.show({
        title: "Internal Note Added",
        message: "Visible only to staff members.",
        type: "info",
        sound: "pop"
      });
    } catch (err) {
      console.error('[Add Note Failed]', err);
    }
  }

  // Demo Simulation Trigger
  async simulateIncomingMessage() {
    if (this.state.isSimulating) return;
    this.state.isSimulating = true;
    this.notify();

    try {
      const res = await fetch('/api/simulate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId: this.state.activeBusiness.id })
      });
      const data = await res.json();
      
      if (data.ticket) {
        // Select the new ticket immediately
        this.state.selectedTicketId = data.ticket.id;
        this.state.selectedTicket = data.ticket;
        await this.refreshAllData();

        // Trigger live chime
        toast.show({
          title: `New Message from ${data.ticket.customer.name}! 💬`,
          message: `[${data.ticket.category.toUpperCase()}] "${data.ticket.rawMessage.slice(0, 60)}..."`,
          type: data.ticket.urgency === 'high' ? 'urgent' : 'incoming',
          sound: data.ticket.urgency === 'high' ? 'urgent' : 'incoming',
          duration: 6000
        });
      }
    } catch (err) {
      console.error('[Simulation Failed]', err);
    } finally {
      this.state.isSimulating = false;
      this.notify();
    }
  }

  // Orders Kanban Status Update
  async updateOrderStatus(orderId, status) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await res.json();
      const order = this.state.orders.find(o => o.id === orderId);
      if (order) Object.assign(order, updated);
      this.notify();

      toast.show({
        title: `Order ${orderId} Moved`,
        message: `Fulfillment status changed to "${status}".`,
        type: "success",
        sound: "pop"
      });
    } catch (err) {
      console.error('[Order Update Failed]', err);
    }
  }

  // Reset Demo Data
  async resetDemoData() {
    try {
      const res = await fetch('/api/reset-data', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await this.init();
        toast.show({
          title: "Demo Reset Complete",
          message: "All 3 businesses and realistic sample tickets restored to pristine state.",
          type: "info",
          sound: "pop"
        });
      }
    } catch (err) {
      console.error('[Reset Failed]', err);
    }
  }

  // Keyboard Navigation
  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggleCommandPalette();
        return;
      }

      // If typing in input, don't trigger shortcuts
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      // 'J' or Down: next ticket
      if (e.key === 'j' || e.key === 'ArrowDown') {
        const filtered = this.getFilteredTickets();
        const currentIndex = filtered.findIndex(t => t.id === this.state.selectedTicketId);
        if (currentIndex < filtered.length - 1) {
          this.selectTicket(filtered[currentIndex + 1].id);
        }
      }
      // 'K' or Up: previous ticket
      if (e.key === 'k' || e.key === 'ArrowUp') {
        const filtered = this.getFilteredTickets();
        const currentIndex = filtered.findIndex(t => t.id === this.state.selectedTicketId);
        if (currentIndex > 0) {
          this.selectTicket(filtered[currentIndex - 1].id);
        }
      }
      // 'E': Approve & Send
      if (e.key.toLowerCase() === 'e') {
        if (this.state.selectedTicket && this.state.selectedTicket.suggestedReply) {
          this.approveDraft(this.state.selectedTicket.id);
        }
      }
      // 'S': Simulate incoming message
      if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        this.simulateIncomingMessage();
      }
    });
  }

  toggleCommandPalette(forceState = null) {
    this.state.commandPaletteOpen = forceState !== null ? forceState : !this.state.commandPaletteOpen;
    this.notify();
  }

  toggleTour(forceState = null) {
    this.state.tourOpen = forceState !== null ? forceState : !this.state.tourOpen;
    this.notify();
  }
}

const appStore = new AppStateManager();
