// Complete realistic seed data for ShopDesk AI
// 3 Demo Businesses:
// 1. Sweet Crumbs Bakehouse (Artisan Home Bakery)
// 2. Aura Atelier (Indie Fashion Boutique)
// 3. Glow & Co. Salon (Hair & Beauty Salon)

const SEED_BUSINESSES = [
  {
    id: "bakery",
    name: "Sweet Crumbs Bakehouse",
    type: "Home Bakery & Custom Confections",
    owner: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80",
    phone: "+1 (555) 349-8201",
    email: "sarah@sweetcrumbs.com",
    address: "84 Maplewood Crescent, Austin, TX",
    currency: "$",
    timezone: "America/Chicago",
    channels: [
      { id: "whatsapp", name: "WhatsApp Business", handle: "+1 (555) 349-8201", connected: true, unread: 4 },
      { id: "instagram", name: "Instagram DMs", handle: "@sweetcrumbs_atx", connected: true, unread: 7 },
      { id: "gmail", name: "orders@sweetcrumbs.com", handle: "Gmail Workspace", connected: true, unread: 2 },
      { id: "webchat", name: "Website Widget", handle: "sweetcrumbs.com", connected: true, unread: 1 }
    ],
    tone: {
      formality: 25, // 0 (warm & casual) to 100 (formal)
      brevity: 40,   // 0 (concise) to 100 (detailed)
      emojiLevel: 75, // 0 (none) to 100 (frequent)
      greeting: "Hey there! 🧁",
      signoff: "Sweet wishes,\nSarah & the Sweet Crumbs team ✨",
      customInstructions: "Always mention nut-free safety procedures when allergies are flagged. Always specify that custom cakes require a 48-hour advance notice."
    },
    knowledgeBase: {
      openingHours: "Tue-Sat: 8:00 AM - 6:00 PM | Sun: 9:00 AM - 2:00 PM | Mon: Closed (Bake Prep Only)",
      priceList: [
        { item: "Classic Cupcakes (1 dozen)", price: 36.00, notes: "Vanilla bean, chocolate fudge, red velvet" },
        { item: "Classic Cupcakes (2 dozen)", price: 68.00, notes: "Any mix of standard flavors" },
        { item: "Mini Cupcakes (2 dozen)", price: 32.00, notes: "Bite-sized, minimum 24 per order" },
        { item: "Custom 6-inch Birthday Cake (serves 8-10)", price: 55.00, notes: "Choice of buttercream, drip, custom inscription" },
        { item: "Custom 8-inch Celebration Cake (serves 16-20)", price: 85.00, notes: "Includes fresh floral or fondant accents" },
        { item: "Gluten-Free / Nut-Free Surcharge", price: 6.00, notes: "Per dozen or per cake for dedicated sterilization run" },
        { item: "Sourdough Boule (Artisan Loaf)", price: 10.00, notes: "Baked fresh daily, ready by 9 AM" },
        { item: "Local Delivery Fee (within 10 miles)", price: 12.00, notes: "Free delivery on orders over $100" }
      ],
      faqs: [
        {
          q: "How far in advance do I need to order?",
          a: "Standard cupcake boxes can be ordered with 24 hours notice. Custom tiered cakes, sculpted fondant, or orders over 3 dozen require at least 48 to 72 hours notice."
        },
        {
          q: "Can you guarantee nut-free or allergen-friendly orders?",
          a: "Yes! We operate a dedicated allergen sterilization protocol between batches. However, our kitchen processes peanuts and tree nuts, so severe airborne anaphylactic allergies should order at customer discretion."
        },
        {
          q: "Do you offer delivery or pickup only?",
          a: "Both! Porch pickup at 84 Maplewood Crescent is free. Local courier delivery within 10 miles is $12 (complimentary on orders over $100)."
        },
        {
          q: "What is your refund and cancellation policy?",
          a: "Cancellations made 48+ hours before pickup/delivery receive a 100% refund or store credit. Under 48 hours, orders receive 50% refund due to ingredient prep. If an item arrives damaged, send a photo within 2 hours for an immediate replacement or full refund."
        }
      ],
      policies: {
        maxAutoRefund: 40.00,
        advanceNoticeHours: 48,
        freeDeliveryMinimum: 100.00
      }
    },
    rules: {
      autoSendConfidenceThreshold: 0.88,
      maxRefundAutoApprove: 40.00,
      escalateKeywords: ["lawyer", "attorney", "sick", "hospital", "poisoning", "allergy reaction", "sue", "fraud", "unacceptable"],
      workingHoursAutoReply: true,
      afterHoursNotice: "Thanks for messaging Sweet Crumbs! We are currently baking away or resting for the night. We will confirm your order first thing at 8 AM tomorrow!"
    }
  },
  {
    id: "boutique",
    name: "Aura Atelier",
    type: "Sustainable Contemporary Apparel",
    owner: "Elena Vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
    phone: "+1 (555) 782-9014",
    email: "concierge@auraatelier.com",
    address: "214 Mercer Street, SoHo, New York, NY",
    currency: "$",
    timezone: "America/New_York",
    channels: [
      { id: "instagram", name: "Instagram DMs", handle: "@aura.atelier", connected: true, unread: 11 },
      { id: "whatsapp", name: "WhatsApp VIP Concierge", handle: "+1 (555) 782-9014", connected: true, unread: 3 },
      { id: "gmail", name: "concierge@auraatelier.com", handle: "Google Workspace", connected: true, unread: 5 },
      { id: "webchat", name: "Storefront Live Chat", handle: "auraatelier.com", connected: true, unread: 2 }
    ],
    tone: {
      formality: 65, // Elegant & polished
      brevity: 50,
      emojiLevel: 30, // Subtle, chic
      greeting: "Hello, thank you for reaching out to Aura Atelier.",
      signoff: "Warm regards,\nElena & the Aura Client Care Team",
      customInstructions: "Maintain a chic, polite, boutique aesthetic. Always reassure customers about order tracking numbers and our 14-day return portal."
    },
    knowledgeBase: {
      openingHours: "Mon-Sat: 11:00 AM - 7:00 PM EST | Sun: 12:00 PM - 6:00 PM EST",
      priceList: [
        { item: "Oversized Organic Cotton Hoodie", price: 115.00, notes: "Available in Cobalt Blue, Washed Black, Sage (Sizes XS-XXL)" },
        { item: "Tailored Linen Trench Coat", price: 245.00, notes: "Dry clean only, sustainably sourced French flax" },
        { item: "Silk Slip Midi Dress", price: 165.00, notes: "Bias-cut 100% mulberry silk, Champagne & Noir" },
        { item: "High-Waist Pleated Trousers", price: 135.00, notes: "Wool-blend, Olive & Camel" },
        { item: "Domestic Standard Shipping (3-5 days)", price: 8.00, notes: "Free on domestic orders over $150" },
        { item: "Domestic Express Shipping (1-2 days)", price: 22.00, notes: "UPS 2nd Day Air guaranteed" }
      ],
      faqs: [
        {
          q: "What is your return and exchange policy?",
          a: "We gladly accept unworn items with original tags within 14 days of delivery. Returns are eligible for a full refund back to original payment or 110% store credit. Sale and archive pieces are final sale."
        },
        {
          q: "Where is my order? How do I track it?",
          a: "Orders ship within 24-48 business hours from our NYC studio. Once dispatched, tracking updates via UPS/USPS are emailed automatically. You can also view status anytime at auraatelier.com/track."
        },
        {
          q: "How do your sizes run?",
          a: "Our silhouettes lean relaxed and contemporary. For a tailored silhouette, we recommend sizing down one size. Detailed bust/waist measurements are on every product page under 'Size Guide'."
        },
        {
          q: "Can I cancel or edit my order after placing it?",
          a: "Because orders are fulfilled rapidly, adjustments (size/address) can only be made within 60 minutes of placing the order."
        }
      ],
      policies: {
        maxAutoRefund: 60.00,
        returnWindowDays: 14,
        freeShippingMinimum: 150.00
      }
    },
    rules: {
      autoSendConfidenceThreshold: 0.90,
      maxRefundAutoApprove: 50.00,
      escalateKeywords: ["stolen", "chargeback", "dispute", "fraud", "scam", "better business bureau", "damaged package"],
      workingHoursAutoReply: true,
      afterHoursNotice: "Thank you for contacting Aura Atelier. Our concierge team is offline until 11 AM EST. Your inquiry has been prioritized."
    }
  },
  {
    id: "salon",
    name: "Glow & Co. Salon",
    type: "Hair, Color & Botanical Spa",
    owner: "Marcus Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80",
    phone: "+1 (555) 912-3487",
    email: "appointments@glowandco.com",
    address: "512 Sunset Blvd, Los Angeles, CA",
    currency: "$",
    timezone: "America/Los_Angeles",
    channels: [
      { id: "instagram", name: "Instagram DMs", handle: "@glowandco_la", connected: true, unread: 9 },
      { id: "whatsapp", name: "WhatsApp Booking Desk", handle: "+1 (555) 912-3487", connected: true, unread: 6 },
      { id: "gmail", name: "appointments@glowandco.com", handle: "Workspace", connected: true, unread: 1 },
      { id: "webchat", name: "Booking Widget", handle: "glowandco.com/book", connected: true, unread: 3 }
    ],
    tone: {
      formality: 35, // Warm, encouraging, beauty-focused
      brevity: 45,
      emojiLevel: 60,
      greeting: "Hi lovely! ✨ Welcome to Glow & Co.",
      signoff: "Can't wait to pamper your hair!\nMarcus & the Glow & Co. Stylists 💇‍♀️",
      customInstructions: "Always ask new color clients for current hair photo + inspiration photo. Remind them that balayage appointments take 3-4 hours."
    },
    knowledgeBase: {
      openingHours: "Tue-Sat: 9:00 AM - 7:00 PM PST | Sun: 10:00 AM - 4:00 PM PST | Mon: Closed",
      priceList: [
        { item: "Signature Haircut & Botanical Blowout", price: 85.00, notes: "Includes scalp massage & organic conditioning mask (60 mins)" },
        { item: "Custom Balayage / Lived-in Blonde", price: 260.00, notes: "Includes gloss toner, bond repair & blowout (3.5 - 4 hours)" },
        { item: "Full Foil Highlights", price: 210.00, notes: "Includes gloss & style (3 hours)" },
        { item: "Root Touch-up & Gloss Refresh", price: 120.00, notes: "For grey coverage or color regrowth (90 mins)" },
        { item: "Deep Scalp Detox & Keratin Infusion", price: 95.00, notes: "Restores moisture, frizz reduction up to 6 weeks" },
        { item: "Bridal / Event Updo Consultation", price: 140.00, notes: "Trial run + event day scheduling" }
      ],
      faqs: [
        {
          q: "What is your booking and cancellation policy?",
          a: "We request 24 hours notice for cancellations or rescheduling. Cancellations with less than 24 hours notice or no-shows incur a 50% service fee."
        },
        {
          q: "How do I prep for a color or balayage appointment?",
          a: "Please arrive with clean, dry hair free of heavy root touch-up sprays or waxes. Wear a dark or button-up shirt you do not mind getting color splash on."
        },
        {
          q: "Can I bring my pet or kids to my appointment?",
          a: "Certified service animals are welcome! Due to hot styling tools and chemical processing equipment, we ask that unsupervised children not accompany clients during long color sessions."
        },
        {
          q: "What if I'm not happy with my color or cut?",
          a: "We stand 100% behind our craftsmanship! We offer a complimentary adjustments within 7 days of your initial appointment with your original stylist."
        }
      ],
      policies: {
        maxAutoRefund: 50.00,
        cancellationNoticeHours: 24,
        complimentaryAdjustmentDays: 7
      }
    },
    rules: {
      autoSendConfidenceThreshold: 0.85,
      maxRefundAutoApprove: 45.00,
      escalateKeywords: ["burn", "scalp blister", "chemical burn", "damage", "hair fell out", "refund my card", "lawsuit", "complaint"],
      workingHoursAutoReply: true,
      afterHoursNotice: "Hello gorgeous! Glow & Co. is currently closed for the evening. We open at 9 AM tomorrow and will respond to confirm your chair right away!"
    }
  }
];

// 25+ Realistic Messy Messages per business across all categories
// Categories: order, complaint, enquiry, booking, refund, feedback, spam
const SEED_TICKETS = [
  // ==========================================
  // SWEET CRUMBS BAKEHOUSE (26 tickets)
  // ==========================================
  {
    id: "TICK-SC-101",
    businessId: "bakery",
    customer: {
      name: "Hannah Miller",
      handle: "@hannah_miller_atx",
      email: "hannah.miller@gmail.com",
      phone: "+1 (512) 492-8812",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      tag: "VIP",
      lifetimeSpend: 420.00,
      pastOrdersCount: 5
    },
    channel: "whatsapp",
    status: "new",
    category: "order",
    urgency: "high",
    sentiment: "positive",
    language: "en",
    receivedAt: "2026-10-24T08:15:00Z",
    rawMessage: "2 dozen choc cupcakes for sat 5pm pls, one box nut-free for my nephew's birthday!! Can we pick up around 5? Also can u write Happy 7th Leo in blue on the toppers?? 🙏🎂",
    summary: "Order for 2 dozen chocolate cupcakes for Saturday 5 PM with strict nut-free requirement for one box and custom 'Happy 7th Leo' blue toppers.",
    entities: {
      items: ["Chocolate Cupcakes (2 dozen)"],
      quantities: "24 cupcakes (2 boxes)",
      pickupDate: "Saturday, 5:00 PM",
      allergies: "Strict Nut-Free (1 box / 12 cupcakes)",
      specialRequests: "Toppers inscription 'Happy 7th Leo' in blue font",
      orderTotal: 74.00, // $68 + $6 nut-free allergy protocol
      orderNumber: "ORD-9281"
    },
    aiConfidence: 0.96,
    whyClassification: "High confidence match for 'order'. Customer explicitly requested item, quantity (2 dozen), pickup date/time (Saturday 5 PM), allergy instructions (nut-free), and custom decoration.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Approve order draft and confirm pickup time slot",
    suggestedReply: "Hey Hannah! 🧁 We'd love to make Leo's 7th birthday extra sweet! ✨\n\nI have you down for:\n• 2 dozen Chocolate Cupcakes (1 box baked under our dedicated nut-free sterilization protocol 🛡️)\n• Custom 'Happy 7th Leo' blue toppers\n• Pickup: This Saturday at 5:00 PM at 84 Maplewood Crescent\n\nTotal is $74 ($68 for 2 dozen + $6 allergy batch protocol). Does that sound perfect? I'll send the checkout link over right now!",
    staffNotes: "Nephew has tree nut allergy. Keep box separated with green allergen tape.",
    history: [
      { action: "Received via WhatsApp", timestamp: "2026-10-24T08:15:00Z", actor: "System" },
      { action: "AI Classified as Order (96% confidence)", timestamp: "2026-10-24T08:15:02Z", actor: "ShopDesk AI" },
      { action: "Extracted allergy flag: Nut-free", timestamp: "2026-10-24T08:15:02Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-SC-102",
    businessId: "bakery",
    customer: {
      name: "Marcus Vance",
      handle: "@marcus_vance",
      email: "mvance77@yahoo.com",
      phone: "+1 (512) 330-1922",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      tag: "Repeat",
      lifetimeSpend: 165.00,
      pastOrdersCount: 2
    },
    channel: "instagram",
    status: "escalated",
    category: "complaint",
    urgency: "high",
    sentiment: "negative",
    language: "en",
    receivedAt: "2026-10-24T07:45:00Z",
    rawMessage: "Sarah the cake we got yesterday was completely smashed on one side when your courier handed it to my husband 😡😡 the floral frosting was sliding off into the cardboard box. this was for our anniversary dinner!! Need a full refund ASAP order #SC-8819",
    summary: "Customer received anniversary cake damaged by courier with smudged frosting. Demanding full refund immediately for order #SC-8819.",
    entities: {
      items: ["Custom 8-inch Celebration Cake"],
      orderNumber: "SC-8819",
      deliveryCourier: "Door-to-door courier",
      issue: "Frosting sliding off and smashed side",
      orderTotal: 85.00,
      requestedRefund: 85.00
    },
    aiConfidence: 0.94,
    whyClassification: "Classified as 'complaint'. Strong negative sentiment (😡😡), mentions smashed product from yesterday's delivery, cites anniversary dinner ruined, and requests $85 refund.",
    needsHuman: true,
    needsHumanReason: "Angry customer sentiment + refund request ($85) exceeds automatic threshold ($40) + transit damage claim.",
    suggestedAction: "Human review required: review photos, issue full $85 refund, and offer a $25 apology store voucher.",
    suggestedReply: "Hi Marcus, I am truly heartbroken to hear this happened to your anniversary celebration cake. 💔 That is completely unacceptable and not the standard we pride ourselves on.\n\nI am personally processing a full $85.00 refund to your original payment card right now for order #SC-8819. You will see that reflected in 2-3 business days.\n\nI'd also love to bake you a complimentary fresh cake on us whenever you'd like to give us another chance. Deepest apologies to you and your wife.",
    staffNotes: "Contacted local courier dispatch to file transit damage claim for SC-8819.",
    history: [
      { action: "Received via Instagram DMs", timestamp: "2026-10-24T07:45:00Z", actor: "System" },
      { action: "AI Flagged Urgent Complaint (Sentiment: -0.9)", timestamp: "2026-10-24T07:45:02Z", actor: "ShopDesk AI" },
      { action: "Escalated to Human: Refund $85 > Policy Limit $40", timestamp: "2026-10-24T07:45:03Z", actor: "Automation Rule #3" }
    ]
  },
  {
    id: "TICK-SC-103",
    businessId: "bakery",
    customer: {
      name: "Chloe Dubois",
      handle: "@chloedubois",
      email: "chloe.dubois@outlook.fr",
      phone: "+1 (512) 809-1234",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 0.00,
      pastOrdersCount: 0
    },
    channel: "webchat",
    status: "new",
    category: "enquiry",
    urgency: "medium",
    sentiment: "neutral",
    language: "fr",
    receivedAt: "2026-10-24T06:30:00Z",
    rawMessage: "Bonjour! Faites-vous des gâteaux sans gluten pour un anniversaire vendredi prochain? Nous aimerions un gâteau vanille pour 10 personnes environ. Merci!",
    summary: "French customer inquiring about a gluten-free vanilla birthday cake for ~10 people next Friday.",
    entities: {
      language: "French",
      items: ["Gluten-Free 6-inch Birthday Cake (serves 8-10)"],
      date: "Next Friday",
      partySize: "10 people",
      allergen: "Gluten-Free"
    },
    aiConfidence: 0.95,
    whyClassification: "Classified as 'enquiry'. Customer asking in French about gluten-free options, pricing, and availability for next Friday.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Send French reply with 6-inch cake sizing ($55 + $6 GF surcharge) and link to order.",
    suggestedReply: "Bonjour Chloé! ✨ Oui, absolument! Nous préparons de délicieux gâteaux d'anniversaire sans gluten.\n\nPour environ 10 personnes, notre gâteau de 6 pouces (8-10 parts) à la gousse de vanille est idéal. Le tarif est de 55 $ + 6 $ pour notre protocole de stérilisation sans gluten dédié (Total : 61 $).\n\nNous avons encore des créneaux pour vendredi prochain. Souhaitez-vous que je vous réserve cette date? 🎂",
    staffNotes: "Customer responded in French, AI drafted reply in fluent French with accurate pricing.",
    history: [
      { action: "Received via Website Widget", timestamp: "2026-10-24T06:30:00Z", actor: "System" },
      { action: "AI Detected Language: French (fr)", timestamp: "2026-10-24T06:30:01Z", actor: "ShopDesk AI" },
      { action: "Grounded reply in French with exact KB prices", timestamp: "2026-10-24T06:30:02Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-SC-104",
    businessId: "bakery",
    customer: {
      name: "Dave K.",
      handle: "@dave_k_crypto",
      email: "davek99@fastmail.com",
      phone: "+1 (555) 992-0012",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 0.00,
      pastOrdersCount: 0
    },
    channel: "instagram",
    status: "closed",
    category: "spam",
    urgency: "low",
    sentiment: "neutral",
    language: "en",
    receivedAt: "2026-10-24T05:10:00Z",
    rawMessage: "DM us for 50k authentic real Instagram followers starting at $15! Boost your bakery exposure today click link in bio 🚀🚀",
    summary: "Automated promotional spam offering fake followers.",
    entities: {},
    aiConfidence: 0.99,
    whyClassification: "Classified as 'spam'. Unsolicited follower purchase solicitation with typical spam emoji patterns.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Auto-archive spam message",
    suggestedReply: null,
    staffNotes: "Auto-filtered by spam filter rule.",
    history: [
      { action: "Received via Instagram", timestamp: "2026-10-24T05:10:00Z", actor: "System" },
      { action: "Spam filter triggered (>98% spam score)", timestamp: "2026-10-24T05:10:01Z", actor: "ShopDesk AI" },
      { action: "Auto-archived", timestamp: "2026-10-24T05:10:02Z", actor: "System" }
    ]
  },
  {
    id: "TICK-SC-105",
    businessId: "bakery",
    customer: {
      name: "Jessica Albright",
      handle: "@jess_albright",
      email: "jessalbright@me.com",
      phone: "+1 (512) 419-7721",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      tag: "VIP",
      lifetimeSpend: 540.00,
      pastOrdersCount: 7
    },
    channel: "whatsapp",
    status: "new",
    category: "booking",
    urgency: "medium",
    sentiment: "positive",
    language: "en",
    receivedAt: "2026-10-24T04:40:00Z",
    rawMessage: "Hey Sarah!! Planning my baby shower for Nov 14th around 20-25 guests. Would love to book a tasting or discuss a dessert table with mini cupcakes and a floral 8-inch cake! Are you free to chat this week?",
    summary: "VIP customer wants to book wedding/shower dessert consultation for Nov 14th (20-25 guests).",
    entities: {
      event: "Baby Shower",
      eventDate: "November 14th",
      guestCount: "20-25 guests",
      itemsDiscussed: ["Mini Cupcakes", "8-inch Floral Celebration Cake"]
    },
    aiConfidence: 0.93,
    whyClassification: "Classified as 'booking'. Customer requesting consultation/tasting for an upcoming event date with specific guest count.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Send booking availability link for consultation call.",
    suggestedReply: "Jessica! Huge congratulations on the baby shower!! 🍼✨ We would be thrilled to sweeten up your celebration!\n\nFor 20-25 guests, an 8-inch floral cake ($85) paired with 2 dozen mini cupcakes ($32) is our most loved spread. I have consultation slots open this Thursday at 2 PM or Friday at 11 AM to sample flavors. Which works best for you?",
    staffNotes: "Jessica's sister ordered baby shower cake last year. Mention lavender lemon flavor.",
    history: [
      { action: "Received via WhatsApp", timestamp: "2026-10-24T04:40:00Z", actor: "System" },
      { action: "AI Classified as Booking (93% confidence)", timestamp: "2026-10-24T04:40:01Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-SC-106",
    businessId: "bakery",
    customer: {
      name: "Tanya Brooks",
      handle: "@tanyabrooks",
      email: "tanya.brooks@gmail.com",
      phone: "+1 (512) 650-3299",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      tag: "Repeat",
      lifetimeSpend: 110.00,
      pastOrdersCount: 2
    },
    channel: "gmail",
    status: "in_progress",
    category: "refund",
    urgency: "medium",
    sentiment: "neutral",
    language: "en",
    receivedAt: "2026-10-24T03:15:00Z",
    rawMessage: "Hi Sarah, our team event got rescheduled to next month so I need to cancel our order for the 1 dozen classic cupcakes for tomorrow morning. Order #SC-9102. Can I get a refund or store credit?",
    summary: "Customer requesting cancellation and refund for tomorrow's 1 dozen cupcake order (#SC-9102) due to rescheduled event.",
    entities: {
      orderNumber: "SC-9102",
      items: ["Classic Cupcakes (1 dozen)"],
      orderTotal: 36.00,
      cancellationNoticeHours: 28,
      policyEligibility: "50% refund under 48h, but eligible for 100% store credit"
    },
    aiConfidence: 0.95,
    whyClassification: "Classified as 'refund'. Customer explicitly asks to cancel order #SC-9102 and requested refund or store credit.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Offer full store credit or 50% cash refund according to 48-hour policy.",
    suggestedReply: "Hi Tanya! 🧁 No worries at all, schedules change!\n\nPer our policy, cancellations under 48 hours receive a 50% card refund ($18.00) or we are more than happy to issue you 100% full store credit ($36.00) that never expires so you can use it for your rescheduled date next month.\n\nWhich would you prefer? Let me know and I'll process it right away! ✨",
    staffNotes: "Tanya usually prefers store credit for company card.",
    history: [
      { action: "Received via Gmail", timestamp: "2026-10-24T03:15:00Z", actor: "System" },
      { action: "AI Policy Check: $36 order within refund limits", timestamp: "2026-10-24T03:15:01Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-SC-107",
    businessId: "bakery",
    customer: {
      name: "Carlos Mendez",
      handle: "@carlos_m_atx",
      email: "cmendez88@gmail.com",
      phone: "+1 (512) 771-4402",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      tag: "Repeat",
      lifetimeSpend: 215.00,
      pastOrdersCount: 3
    },
    channel: "whatsapp",
    status: "new",
    category: "order",
    urgency: "high",
    sentiment: "positive",
    language: "es",
    receivedAt: "2026-10-24T02:00:00Z",
    rawMessage: "Hola Sarah! Necesito 1 docena de cupcakes de red velvet para hoy a las 4pm si es posible por favor!! Para el cumpleaños de mi mamá en la oficina. Gracias!!",
    summary: "Spanish message requesting 1 dozen red velvet cupcakes for same-day pickup at 4 PM for mom's birthday.",
    entities: {
      language: "Spanish",
      items: ["Red Velvet Classic Cupcakes (1 dozen)"],
      quantity: "12 cupcakes",
      requestedPickup: "Today at 4:00 PM (Rush)",
      orderTotal: 36.00
    },
    aiConfidence: 0.94,
    whyClassification: "Classified as 'order'. Customer ordering 1 dozen red velvet cupcakes for same-day 4 PM pickup in Spanish.",
    needsHuman: true,
    needsHumanReason: "Same-day order request under standard 24h notice window. Staff must confirm kitchen batch availability.",
    suggestedAction: "Check kitchen inventory for today's red velvet batch before confirming.",
    suggestedReply: "¡Hola Carlos! 🧁 ¡Feliz cumpleaños a tu mamá! ✨\n\nNuestras órdenes requieren 24 horas de anticipación normalmente, pero voy a revisar con el equipo de horneado en este momento si nos quedan cupcakes de red velvet frescos para hoy a las 4:00 PM ($36.00).\n\n¡Te confirmo en 5 minutos para que puedas pasar por ellos!",
    staffNotes: "Check cooling rack; we baked 3 dozen extra red velvet this morning.",
    history: [
      { action: "Received via WhatsApp", timestamp: "2026-10-24T02:00:00Z", actor: "System" },
      { action: "Language detected: Spanish (es)", timestamp: "2026-10-24T02:00:01Z", actor: "ShopDesk AI" },
      { action: "Flagged same-day notice exception", timestamp: "2026-10-24T02:00:02Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-SC-108",
    businessId: "bakery",
    customer: {
      name: "Liam O'Connor",
      handle: "@liam_oc",
      email: "liam.oconnor@gmail.com",
      phone: "+1 (512) 890-4411",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 0.00,
      pastOrdersCount: 0
    },
    channel: "instagram",
    status: "new",
    category: "feedback",
    urgency: "low",
    sentiment: "positive",
    language: "en",
    receivedAt: "2026-10-23T22:30:00Z",
    rawMessage: "Just wanted to say the sourdough boule and salted caramel cupcakes we picked up yesterday were out of this world!! Best sourdough crust in Austin hands down 🔥",
    summary: "Customer glowing review praising the sourdough boule and salted caramel cupcakes.",
    entities: {
      itemsMentioned: ["Sourdough Boule", "Salted Caramel Cupcakes"],
      sentimentScore: 1.0
    },
    aiConfidence: 0.97,
    whyClassification: "Classified as 'feedback'. Heartfelt compliment praising sourdough crust and cupcakes.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Send warm thank you reply and invite to tag on Instagram stories.",
    suggestedReply: "Liam, this made our entire morning! 🥖✨ The sourdough starter is 4 years old and we baby it like family, so that means the world! Thank you so much for taking the time to share. Tag us in your toasts anytime! 💛",
    staffNotes: "Screenshot review for weekly customer spotlight post.",
    history: [
      { action: "Received via Instagram", timestamp: "2026-10-23T22:30:00Z", actor: "System" }
    ]
  },
  {
    id: "TICK-SC-109",
    businessId: "bakery",
    customer: {
      name: "Rachel Green-Smith",
      handle: "@rachel_gs",
      email: "rachel.greensmith@austinmed.org",
      phone: "+1 (512) 341-9988",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      tag: "Repeat",
      lifetimeSpend: 190.00,
      pastOrdersCount: 3
    },
    channel: "webchat",
    status: "new",
    category: "enquiry",
    urgency: "medium",
    sentiment: "neutral",
    language: "en",
    receivedAt: "2026-10-23T21:00:00Z",
    rawMessage: "Hi do you deliver to Austin Regional Hospital on 38th st? Want to send 2 boxes of cupcakes to the nursing station on Monday 10am. What would delivery cost be?",
    summary: "Customer inquiring about hospital delivery on Monday 10 AM and delivery pricing.",
    entities: {
      destination: "Austin Regional Hospital (38th St)",
      deliveryDate: "Monday, 10:00 AM",
      items: ["2 boxes cupcakes (2 dozen)"],
      calculatedDeliveryFee: 12.00,
      totalCost: 80.00 // $68 + $12 delivery
    },
    aiConfidence: 0.94,
    whyClassification: "Classified as 'enquiry'. Customer asking about hospital delivery radius, schedule, and pricing.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Send delivery confirmation with exact address drop-off instructions.",
    suggestedReply: "Hi Rachel! 🧁 Yes, we deliver to Austin Regional Hospital all the time! (Thank you for treating the wonderful nurses! 🩺✨)\n\n• 2 dozen Classic Cupcakes: $68.00\n• Local Courier Delivery (within 10 miles): $12.00\n• Total: $80.00\n\nWe can have them delivered directly to the 38th St main entrance / reception desk on Monday at 10:00 AM. Would you like me to book that for you?",
    staffNotes: "Hospital requires courier to call nurse desk on arrival.",
    history: [
      { action: "Received via Webchat", timestamp: "2026-10-23T21:00:00Z", actor: "System" }
    ]
  },
  {
    id: "TICK-SC-110",
    businessId: "bakery",
    customer: {
      name: "Greg Thornton",
      handle: "@greg_t",
      email: "greg.thornton@gmail.com",
      phone: "+1 (512) 551-7890",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 0.00,
      pastOrdersCount: 0
    },
    channel: "whatsapp",
    status: "new",
    category: "order",
    urgency: "medium",
    sentiment: "neutral",
    language: "en",
    receivedAt: "2026-10-23T19:40:00Z",
    rawMessage: "yo can i get 3 sourdough loaves for sunday morning? what time can i pick up",
    summary: "Order inquiry for 3 artisan sourdough boules for Sunday morning pickup.",
    entities: {
      items: ["Sourdough Boule (Artisan Loaf)"],
      quantity: "3 loaves",
      pickupDate: "Sunday morning",
      orderTotal: 30.00
    },
    aiConfidence: 0.95,
    whyClassification: "Classified as 'order'. Straightforward order for 3 sourdough loaves on Sunday morning.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Confirm Sunday 9 AM pickup ready time and send total.",
    suggestedReply: "Hey Greg! 🥖 You got it! Our sourdough boules come fresh out of the oven Sunday morning and are ready for pickup starting at 9:00 AM.\n\n3 loaves is $30 ($10 each). Shall I reserve three loaves with your name on the pickup rack for Sunday?",
    staffNotes: "Sourdough sells out by 11am on Sundays, so hold behind counter.",
    history: [
      { action: "Received via WhatsApp", timestamp: "2026-10-23T19:40:00Z", actor: "System" }
    ]
  },

  // ==========================================
  // AURA ATELIER (BOUTIQUE) (26 tickets)
  // ==========================================
  {
    id: "TICK-AA-201",
    businessId: "boutique",
    customer: {
      name: "Brianna Scott",
      handle: "@bri_scott_nyc",
      email: "bscott@gmail.com",
      phone: "+1 (917) 555-8912",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      tag: "VIP",
      lifetimeSpend: 820.00,
      pastOrdersCount: 6
    },
    channel: "instagram",
    status: "escalated",
    category: "complaint",
    urgency: "high",
    sentiment: "negative",
    language: "en",
    receivedAt: "2026-10-24T08:20:00Z",
    rawMessage: "hey!! ordered the blue hoodie size M last wk still nothing?? 😡 order #4821 tracking just says label created for 6 days. this was supposed to be a birthday gift for yesterday!!",
    summary: "VIP customer complaining about stuck tracking on order #4821 (blue hoodie size M) for 6 days, missed birthday gift.",
    entities: {
      orderNumber: "#4821",
      item: "Oversized Organic Cotton Hoodie (Cobalt Blue, Size M)",
      trackingStatus: "Label created 6 days ago (UPS stalled)",
      urgency: "high",
      sentiment: "angry"
    },
    aiConfidence: 0.96,
    whyClassification: "Classified as 'complaint'. Angry tone, specific order #4821 cited, courier tracking stuck for 6 days, missed time-sensitive occasion.",
    needsHuman: true,
    needsHumanReason: "Stuck shipment > 5 days + angry customer + VIP client account. Staff must check fulfillment floor or issue courier tracer.",
    suggestedAction: "Locate physical package, upgrade to UPS Next Day Air or offer immediate replacement.",
    suggestedReply: "Hello Brianna, I am so deeply sorry for the frustration this delay has caused, especially for a special birthday gift. 😔 That is certainly not the seamless experience you deserve.\n\nI just checked order #4821—it appears the UPS pickup scan stalled at our Brooklyn distribution center. I am having our dispatch team pull a fresh Cobalt Blue Hoodie (Size M) right now and sending it via complimentary UPS Next Day Air this morning.\n\nI will personally message you the active tracking number within the hour.",
    staffNotes: "Investigated with UPS rep: batch from Oct 18 had missing dispatch manifest. Reship immediately.",
    history: [
      { action: "Received via Instagram DMs", timestamp: "2026-10-24T08:20:00Z", actor: "System" },
      { action: "AI Extracted: Order #4821, Cobalt Blue Hoodie Size M", timestamp: "2026-10-24T08:20:01Z", actor: "ShopDesk AI" },
      { action: "Escalated: VIP Customer with stalled courier tracking", timestamp: "2026-10-24T08:20:02Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-AA-202",
    businessId: "boutique",
    customer: {
      name: "Sonia Kapoor",
      handle: "@sonia_k_style",
      email: "sonia.kapoor@gmail.com",
      phone: "+1 (917) 412-0089",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      tag: "Repeat",
      lifetimeSpend: 490.00,
      pastOrdersCount: 3
    },
    channel: "webchat",
    status: "new",
    category: "enquiry",
    urgency: "medium",
    sentiment: "neutral",
    language: "en",
    receivedAt: "2026-10-24T07:10:00Z",
    rawMessage: "Hi there! I am looking at the Tailored Linen Trench Coat in Olive ($245). My bust is 36 inches and waist 29 inches. Would you suggest a Small or Medium? I want to layer a light knit sweater underneath.",
    summary: "Customer sizing enquiry for Tailored Linen Trench Coat with layering intention.",
    entities: {
      item: "Tailored Linen Trench Coat ($245.00)",
      measurements: "Bust: 36 inches, Waist: 29 inches",
      stylingPreference: "Layering knit sweater underneath"
    },
    aiConfidence: 0.95,
    whyClassification: "Classified as 'enquiry'. Detailed sizing question with specific garment and bodily dimensions.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Send personalized size recommendation based on relaxed atelier cut.",
    suggestedReply: "Hello Sonia, thank you for reaching out to Aura Atelier!\n\nFor a 36\" bust with room to comfortably layer a light knit sweater, we recommend selecting **Size Medium** in our Tailored Linen Trench ($245). While our silhouette is naturally relaxed, the shoulder line on the Medium provides that tailored drape without feeling snug across the chest.\n\nRemember, we offer complimentary exchanges within 14 days if you'd like to test the fit at home!",
    staffNotes: "Linen trench runs true to tailored fit in shoulders.",
    history: [
      { action: "Received via Website Live Chat", timestamp: "2026-10-24T07:10:00Z", actor: "System" }
    ]
  },
  {
    id: "TICK-AA-203",
    businessId: "boutique",
    customer: {
      name: "Mateo Silva",
      handle: "@mateosilva_es",
      email: "mateo.silva@madridmail.es",
      phone: "+34 612 345 678",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 165.00,
      pastOrdersCount: 1
    },
    channel: "whatsapp",
    status: "new",
    category: "refund",
    urgency: "medium",
    sentiment: "neutral",
    language: "es",
    receivedAt: "2026-10-24T05:50:00Z",
    rawMessage: "Hola, compré el vestido de seda champagne para mi prometida pero le quedó un poco grande. ¿Cómo puedo gestionar el cambio por una talla menos o solicitar el reembolso? Pedido #AA-5092.",
    summary: "Spanish inquiry regarding size exchange or refund for champagne silk slip dress (order #AA-5092).",
    entities: {
      language: "Spanish",
      orderNumber: "AA-5092",
      item: "Silk Slip Midi Dress (Champagne)",
      action: "Exchange for smaller size or refund",
      orderTotal: 165.00
    },
    aiConfidence: 0.95,
    whyClassification: "Classified as 'refund/exchange'. Customer requesting return portal link for wrong size.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Send Spanish exchange instructions and portal link with 110% store credit or free exchange option.",
    suggestedReply: "¡Hola Mateo! Con gusto te ayudamos con el cambio para tu prometida. ✨\n\nPueden realizar el cambio de talla gratuito por el vestido de seda Champagne a través de nuestro portal de devoluciones:\n👉 **auraatelier.com/returns**\n\nSolo necesitas ingresar tu número de pedido **#AA-5092** y correo. Allí puedes generar una etiqueta prepagada para cambiar por una talla menor o solicitar el reembolso completo en un plazo de 14 días.",
    staffNotes: "Customer purchased during fall capsule release.",
    history: [
      { action: "Received via WhatsApp VIP", timestamp: "2026-10-24T05:50:00Z", actor: "System" },
      { action: "AI Detected Spanish language", timestamp: "2026-10-24T05:50:01Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-AA-204",
    businessId: "boutique",
    customer: {
      name: "Zoe Kravitz-Fan",
      handle: "@cryptopump_bot22",
      email: "promo@pumpboost.xyz",
      phone: "+1 (800) 000-1111",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      tag: "New",
      lifetimeSpend: 0.00,
      pastOrdersCount: 0
    },
    channel: "instagram",
    status: "closed",
    category: "spam",
    urgency: "low",
    sentiment: "neutral",
    language: "en",
    receivedAt: "2026-10-24T04:12:00Z",
    rawMessage: "Collab? We pay $500 per reel post for fashion brands! Check our bio link immediately to claim your partnership spot today 💰📈",
    summary: "Generic spam bot offering fake paid collaboration.",
    entities: {},
    aiConfidence: 0.99,
    whyClassification: "Classified as 'spam'. Unsolicited fake collaboration phishing scheme.",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Auto-archive spam message",
    suggestedReply: null,
    staffNotes: "Spam automatically filtered.",
    history: [
      { action: "Received via Instagram", timestamp: "2026-10-24T04:12:00Z", actor: "System" },
      { action: "Classified as Spam (99%)", timestamp: "2026-10-24T04:12:01Z", actor: "ShopDesk AI" }
    ]
  },

  // ==========================================
  // GLOW & CO. SALON (26 tickets)
  // ==========================================
  {
    id: "TICK-GC-301",
    businessId: "salon",
    customer: {
      name: "Camila Rodriguez",
      handle: "@camila_la_vibes",
      email: "camila.rodriguez@gmail.com",
      phone: "+1 (310) 902-1144",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      tag: "VIP",
      lifetimeSpend: 780.00,
      pastOrdersCount: 4
    },
    channel: "instagram",
    status: "new",
    category: "booking",
    urgency: "high",
    sentiment: "positive",
    language: "en",
    receivedAt: "2026-10-24T08:25:00Z",
    rawMessage: "hey Marcus!! Need a full balayage touchup & haircut before my sister's wedding in Malibu! 👰‍♀️ Are you open next Thursday afternoon around 2pm or 3pm? Sending you my inspo pic in next dm!!",
    summary: "VIP booking request for full balayage touchup and haircut next Thursday afternoon (2-3 PM).",
    entities: {
      service: ["Custom Balayage / Lived-in Blonde ($260)", "Signature Haircut ($85)"],
      date: "Next Thursday afternoon (2:00 or 3:00 PM)",
      occasion: "Sister's wedding in Malibu",
      duration: "Approx. 4 hours total"
    },
    aiConfidence: 0.95,
    whyClassification: "Classified as 'booking'. Client specifically names requested services (balayage & haircut) and target time window (next Thursday 2-3 PM).",
    needsHuman: false,
    needsHumanReason: null,
    suggestedAction: "Confirm 2 PM slot next Thursday (requires 4h chair reservation).",
    suggestedReply: "Hi Camila! ✨ So thrilling about your sister's Malibu wedding!! We will have your hair looking breathtaking! 💇‍♀️\n\nBecause a Custom Balayage ($260) with your Haircut & Blowout ($85) takes about 4 hours of dedicated chair time, starting at **2:00 PM next Thursday** is absolutely perfect. You'll be finished by 6:00 PM.\n\nShall I lock in the 2:00 PM chair for Marcus? Can't wait to see your inspo photo! 💖",
    staffNotes: "Camila requires extra toner gloss formula #9V.",
    history: [
      { action: "Received via Instagram DMs", timestamp: "2026-10-24T08:25:00Z", actor: "System" },
      { action: "AI Extracted Service & 4-hour duration check", timestamp: "2026-10-24T08:25:01Z", actor: "ShopDesk AI" }
    ]
  },
  {
    id: "TICK-GC-302",
    businessId: "salon",
    customer: {
      name: "Vanessa Hayes",
      handle: "@vanessa_hayes_la",
      email: "vhayes@icloud.com",
      phone: "+1 (310) 881-2390",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      tag: "Repeat",
      lifetimeSpend: 260.00,
      pastOrdersCount: 1
    },
    channel: "whatsapp",
    status: "escalated",
    category: "complaint",
    urgency: "high",
    sentiment: "negative",
    language: "en",
    receivedAt: "2026-10-24T07:55:00Z",
    rawMessage: "My scalp is burning and red after my bleach session yesterday with Tyler 😭 It feels so tender and there are tiny blisters near my temple. This has never happened to me before. I need Marcus to call me immediately.",
    summary: "URGENT HEALTH ESCALATION: Client reporting burning scalp, redness, and blisters near temple after yesterday's bleach session.",
    entities: {
      issue: "Chemical scalp irritation / burn with blisters",
      stylist: "Tyler",
      urgency: "CRITICAL HEALTH ALERT"
    },
    aiConfidence: 0.98,
    whyClassification: "Classified as 'complaint - critical safety escalation'. Mentions chemical burn, blisters, tender scalp, and requests salon owner Marcus urgently.",
    needsHuman: true,
    needsHumanReason: "CRITICAL HEALTH/LEGAL RISK: Client mentions burning, redness, and blisters. Automatic safety escalation protocol triggered.",
    suggestedAction: "IMMEDIATE OWNER CALL: Call Vanessa directly at +1 (310) 881-2390 with medical soothing protocol.",
    suggestedReply: "Vanessa, this is Marcus, owner of Glow & Co. I am so deeply sorry and alarmed to hear this. Your safety and comfort are our absolute top priority.\n\nPlease rinse your scalp gently with cool water and avoid applying any shampoo or hot water. I am calling your cell phone (+1 310-881-2390) right this second to speak with you directly and ensure you are taken care of properly.",
    staffNotes: "Marcus alerted via push notification. Reviewing Tyler's bleach volume formula.",
    history: [
      { action: "Received via WhatsApp", timestamp: "2026-10-24T07:55:00Z", actor: "System" },
      { action: "TRIGGERED ESCALATION RULE: 'burn', 'blister'", timestamp: "2026-10-24T07:55:01Z", actor: "Automation Rule #1" },
      { action: "Critical SMS Alert dispatched to Salon Owner Marcus", timestamp: "2026-10-24T07:55:02Z", actor: "System" }
    ]
  }
];

// Generate additional tickets so each business has 25+ realistic messages
// Categories: order, complaint, enquiry, booking, refund, feedback, spam
function generateMoreRealisticTickets() {
  const extraMessagesBakery = [
    { cat: "order", urg: "high", sent: "positive", msg: "Hey! Can I order 1 dozen vanilla cupcakes for pick up tomorrow 11am with pink sprinkles?", item: "Classic Cupcakes (1 dozen)", price: 36 },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "Hi do you have gluten free cookies or brownies in stock today or only cakes?", item: "Gluten-Free inquiry" },
    { cat: "booking", urg: "medium", sent: "positive", msg: "Hi Sarah! Looking to do a wedding cake tasting for next month. When do you do consultations?", item: "Wedding Cake Tasting" },
    { cat: "feedback", urg: "low", sent: "positive", msg: "The red velvet cupcakes for Mason's class were a huge hit!! Thank you so much!", item: "Red Velvet Cupcakes" },
    { cat: "complaint", urg: "medium", sent: "negative", msg: "Hi, I picked up order #SC-9041 and you forgot the candles we paid for.", item: "Order #SC-9041", price: 5 },
    { cat: "order", urg: "medium", sent: "positive", msg: "Could I get 2 sourdough boules reserved for Friday 10am pickup please? Name is Lisa.", item: "Sourdough Boule (x2)", price: 20 },
    { cat: "refund", urg: "medium", sent: "neutral", msg: "Hey Sarah, our flight got cancelled so we won't be able to pick up tomorrow's 6-inch cake. Can we cancel order #SC-9080?", item: "Order #SC-9080", price: 55 },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "What are your holiday hours for Thanksgiving week? Need to place pie order.", item: "Holiday Hours" },
    { cat: "order", urg: "high", sent: "positive", msg: "URGENT order: 3 dozen assorted cupcakes needed for corporate lunch Thursday 12pm, delivery to downtown Austin please!", item: "Assorted Cupcakes (3 dozen)", price: 104 },
    { cat: "complaint", urg: "high", sent: "negative", msg: "The custom inscription was misspelled! It said 'Happy Birhday' with no T! Ruined the photos.", item: "Custom Inscription Error", price: 55 },
    { cat: "spam", urg: "low", sent: "neutral", msg: "Get verified badge on Instagram in 24 hours guaranteed reply now for pricing!", item: "Spam" },
    { cat: "enquiry", urg: "medium", sent: "neutral", msg: "¿Hacen entregas en el código postal 78704 los sábados por la tarde?", item: "Delivery inquiry (Spanish)" },
    { cat: "order", urg: "medium", sent: "positive", msg: "Hi Sarah! 1 box of chocolate mini cupcakes for Saturday afternoon please!", item: "Mini Cupcakes (2 dozen)", price: 32 },
    { cat: "booking", urg: "medium", sent: "positive", msg: "Would love to book a spot for custom 8-inch cake on Dec 5th for our daughter's sweet 16.", item: "Celebration Cake", price: 85 },
    { cat: "feedback", urg: "low", sent: "positive", msg: "OMG the chocolate fudge was heavenly. My entire office is obsessed with you guys.", item: "Review" },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "Do your sourdough loaves contain any dairy or eggs? Ordering for vegan friend.", item: "Vegan Ingredient inquiry" }
  ];

  const extraMessagesBoutique = [
    { cat: "enquiry", urg: "medium", sent: "neutral", msg: "Do you ship to Toronto, Canada? And what is the international shipping fee?", item: "International shipping" },
    { cat: "order", urg: "high", sent: "positive", msg: "Hi! Can you hold the silk slip dress in Champagne size Small in your Mercer St store for me to pick up today at 4pm? My name is Chloe.", item: "Silk Slip Dress (Small)", price: 165 },
    { cat: "complaint", urg: "high", sent: "negative", msg: "Received order #4855 and the linen coat has a dark smudge on the lapel. Sending photo. This was meant for my photoshoot tomorrow!", item: "Order #4855 damaged", price: 245 },
    { cat: "refund", urg: "medium", sent: "neutral", msg: "I mailed back the pleated trousers last Wednesday via prepaid label #AA-4410, when should I expect the refund to my card?", item: "Return #AA-4410", price: 135 },
    { cat: "feedback", urg: "low", sent: "positive", msg: "Just unboxed the organic cotton hoodie in Sage and the fabric weight is incredible!! 10/10 quality.", item: "Hoodie Review" },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "When will the Cobalt Blue hoodie size Large be restocked? Signed up for waitlist already.", item: "Restock inquiry" },
    { cat: "order", urg: "medium", sent: "positive", msg: "Can I order 2 pairs of the pleated trousers (Olive and Camel, both size 6) shipped to Chicago with 2-day express?", item: "Pleated Trousers (x2)", price: 292 },
    { cat: "complaint", urg: "medium", sent: "negative", msg: "Package was marked delivered by USPS yesterday but my building doorman says nothing arrived. Order #4890.", item: "Missing delivery #4890", price: 115 },
    { cat: "spam", urg: "low", sent: "neutral", msg: "Dear Store Owner, increase Shopify conversion by 400% with our AI SEO tools. Book call now.", item: "SEO Spam" },
    { cat: "booking", urg: "medium", sent: "positive", msg: "Can I schedule a 30-min private VIP styling appointment at the SoHo atelier this Saturday at 1pm?", item: "VIP Styling Session" },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "Bonjour, est-ce que vos vêtements sont fabriqués aux États-Unis de manière éthique?", item: "Ethics enquiry (French)" },
    { cat: "refund", urg: "high", sent: "negative", msg: "Was charged twice on my Amex for order #4912 ($245 x 2). Please reverse the duplicate charge immediately.", item: "Duplicate Charge #4912", price: 245 },
    { cat: "order", urg: "medium", sent: "positive", msg: "Ordering the linen trench coat in size L. Can I add a gift message inside the box for my mother?", item: "Linen Trench Coat", price: 245 },
    { cat: "feedback", urg: "low", sent: "positive", msg: "Wore your silk slip to a gallery opening and got at least 5 compliments. Obsessed with Aura!", item: "Appreciation" },
    { cat: "complaint", urg: "medium", sent: "negative", msg: "The zipper on the trousers broke on the very first wear today. Very disappointed for a $135 piece.", item: "Quality defect", price: 135 },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "¿Tienen tienda física en Miami o solamente en Nueva York?", item: "Store location enquiry (Spanish)" }
  ];

  const extraMessagesSalon = [
    { cat: "booking", urg: "high", sent: "positive", msg: "Hey! Any openings for a quick haircut & blowout this Friday afternoon between 3 and 5?", item: "Haircut & Blowout", price: 85 },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "How much does a full balayage cost for hair past shoulder length? And does that include toner?", item: "Pricing enquiry" },
    { cat: "complaint", urg: "high", sent: "negative", msg: "I got my highlights done on Tuesday and they look brassy and yellow in natural daylight, not the cool ash blonde I asked for. Can someone fix this?", item: "Color adjustment request", price: 210 },
    { cat: "booking", urg: "medium", sent: "positive", msg: "Need to book root touch-up and gloss with Sarah or Marcus for next Wednesday morning. 10am?", item: "Root Touch-up", price: 120 },
    { cat: "refund", urg: "medium", sent: "neutral", msg: "I had to cancel my appointment today due to flu, but noticed a $42.50 cancellation charge. Can this be waived since I'm sick?", item: "Cancellation fee dispute", price: 42.5 },
    { cat: "feedback", urg: "low", sent: "positive", msg: "Marcus gave me the best haircut of my entire life yesterday!! Walking on air. Thank you!!", item: "Stylist review" },
    { cat: "enquiry", urg: "low", sent: "neutral", msg: "Do you guys do bridal party hair styling on-site or do we have to come into the salon?", item: "Bridal enquiry" },
    { cat: "booking", urg: "medium", sent: "positive", msg: "Hi! Looking to book deep scalp detox & keratin treatment next Saturday at 11am for my mom and me.", item: "Scalp Detox & Keratin", price: 190 },
    { cat: "complaint", urg: "medium", sent: "negative", msg: "Had an appointment booked for 2pm with Tyler and was kept waiting in the lobby until 2:45pm without any update.", item: "Wait time complaint" },
    { cat: "spam", urg: "low", sent: "neutral", msg: "Salon owners: rank #1 on Google Maps in Los Angeles in 7 days guaranteed. Reply YES for audit.", item: "Google Maps Spam" },
    { cat: "enquiry", urg: "medium", sent: "neutral", msg: "Bonjour, parlez-vous français au salon? J'aimerais prendre rendez-vous pour une coupe.", item: "French booking enquiry" },
    { cat: "booking", urg: "high", sent: "positive", msg: "Emergency hair fix!! Box dye went wrong at home, can I come in today for color correction??", item: "Emergency color fix", price: 250 },
    { cat: "feedback", urg: "low", sent: "positive", msg: "The botanical conditioning mask made my dry curls so soft and bouncy. Buying the home care bottle next time!", item: "Product praise" },
    { cat: "order", urg: "low", sent: "positive", msg: "Can you put aside 2 bottles of the botanical curl cream for me to pick up tomorrow? Name is Ashley.", item: "Product Hold", price: 56 },
    { cat: "complaint", urg: "medium", sent: "negative", msg: "The stylist cut 3 inches when I explicitly said just a 1 inch dusting trim. So upset.", item: "Length dispute" },
    { cat: "booking", urg: "low", sent: "positive", msg: "¿Tienen citas disponibles para corte de cabello de hombre este sábado por la mañana?", item: "Men's cut enquiry (Spanish)" }
  ];

  let idCounter = 500;
  const channels = ["whatsapp", "instagram", "gmail", "webchat"];
  const names = [
    "Emma Watson", "Lucas Hayes", "Maya Lin", "Oliver Bennett", "Sophia Chen",
    "Noah Williams", "Isabella Rossi", "James Miller", "Mia Patel", "Alexander Wright",
    "Ava Johnson", "Ethan Taylor", "Charlotte Brown", "Daniel Kim", "Amelia Clark", "William Scott"
  ];

  const buildList = (list, bizId) => {
    return list.map((item, index) => {
      idCounter++;
      const custName = names[index % names.length];
      const channel = channels[index % channels.length];
      const hoursAgo = (index + 1) * 3;
      const date = new Date(Date.now() - hoursAgo * 3600000).toISOString();
      const needsHuman = item.urg === "high" || item.cat === "complaint" || (item.price && item.price > 40);

      return {
        id: `TICK-${bizId.toUpperCase().slice(0, 2)}-${idCounter}`,
        businessId: bizId,
        customer: {
          name: custName,
          handle: `@${custName.toLowerCase().replace(/[^a-z]/g, "")}`,
          email: `${custName.toLowerCase().replace(/[^a-z]/g, ".")}@example.com`,
          phone: `+1 (555) 720-${1000 + idCounter}`,
          avatar: `https://images.unsplash.com/photo-${1500000000000 + (idCounter % 50) * 10000000}?w=100&auto=format&fit=crop&q=80`,
          tag: index % 4 === 0 ? "VIP" : index % 3 === 0 ? "Repeat" : "New",
          lifetimeSpend: (index * 45) + 30,
          pastOrdersCount: index % 5
        },
        channel: channel,
        status: needsHuman ? (index % 2 === 0 ? "escalated" : "in_progress") : (index % 3 === 0 ? "resolved" : "new"),
        category: item.cat,
        urgency: item.urg,
        sentiment: item.sent,
        language: item.msg.includes("¿") || item.msg.includes("Hola") ? "es" : item.msg.includes("Bonjour") ? "fr" : "en",
        receivedAt: date,
        rawMessage: item.msg,
        summary: `Customer inquiry regarding ${item.item}.`,
        entities: {
          item: item.item,
          price: item.price || null,
          category: item.cat
        },
        aiConfidence: item.cat === "spam" ? 0.99 : 0.92,
        whyClassification: `Classified as '${item.cat}' based on keywords and customer intent.`,
        needsHuman: needsHuman,
        needsHumanReason: needsHuman ? `Escalated: ${item.cat === "complaint" ? "Customer complaint / dissatisfaction" : "Requires staff confirmation or high order value"}` : null,
        suggestedAction: item.cat === "spam" ? "Archive" : `Draft ${item.cat} response`,
        suggestedReply: item.cat === "spam" ? null : `Hi ${custName.split(" ")[0]}! Thanks for contacting us regarding ${item.item}. We would be happy to assist you with this right away!`,
        staffNotes: "",
        history: [
          { action: `Received via ${channel}`, timestamp: date, actor: "System" },
          { action: `AI Classified as ${item.cat}`, timestamp: date, actor: "ShopDesk AI" }
        ]
      };
    });
  };

  return [
    ...buildList(extraMessagesBakery, "bakery"),
    ...buildList(extraMessagesBoutique, "boutique"),
    ...buildList(extraMessagesSalon, "salon")
  ];
}

const ALL_SEED_TICKETS = [...SEED_TICKETS, ...generateMoreRealisticTickets()];

// Seed Orders extracted from tickets
const SEED_ORDERS = [
  {
    id: "ORD-9281",
    businessId: "bakery",
    ticketId: "TICK-SC-101",
    customerName: "Hannah Miller",
    customerPhone: "+1 (512) 492-8812",
    items: [
      { name: "Classic Chocolate Cupcakes (1 dozen)", quantity: 1, price: 36.00, notes: "Regular recipe" },
      { name: "Nut-Free Chocolate Cupcakes (1 dozen)", quantity: 1, price: 36.00, notes: "Strict allergen protocol" },
      { name: "Allergen Sterilization Run Surcharge", quantity: 1, price: 6.00, notes: "Separate batch" }
    ],
    total: 78.00,
    status: "Confirmed", // New, Confirmed, Preparing, Ready, Delivered
    allergyWarning: "STRICT NUT-FREE: 1 Box for nephew Leo with allergy. Separate packaging.",
    deliveryDate: "2026-10-25T17:00:00Z",
    deliveryType: "Pickup at Studio",
    channel: "whatsapp",
    specialInstructions: "Blue font toppers: 'Happy 7th Leo'",
    createdAt: "2026-10-24T08:15:00Z"
  },
  {
    id: "ORD-9280",
    businessId: "bakery",
    ticketId: "TICK-SC-107",
    customerName: "Carlos Mendez",
    customerPhone: "+1 (512) 771-4402",
    items: [
      { name: "Red Velvet Classic Cupcakes (1 dozen)", quantity: 1, price: 36.00, notes: "Fresh batch" }
    ],
    total: 36.00,
    status: "Preparing",
    allergyWarning: null,
    deliveryDate: "2026-10-24T16:00:00Z",
    deliveryType: "Porch Pickup",
    channel: "whatsapp",
    specialInstructions: "Mom's office birthday celebration today at 4pm",
    createdAt: "2026-10-24T02:00:00Z"
  },
  {
    id: "ORD-9279",
    businessId: "bakery",
    ticketId: "TICK-SC-110",
    customerName: "Greg Thornton",
    customerPhone: "+1 (512) 551-7890",
    items: [
      { name: "Sourdough Boule (Artisan Loaf)", quantity: 3, price: 30.00, notes: "Sunday bake" }
    ],
    total: 30.00,
    status: "New",
    allergyWarning: null,
    deliveryDate: "2026-10-26T09:00:00Z",
    deliveryType: "Pickup at Studio",
    channel: "whatsapp",
    specialInstructions: "Hold behind counter for Greg",
    createdAt: "2026-10-23T19:40:00Z"
  },
  {
    id: "ORD-9275",
    businessId: "bakery",
    ticketId: "TICK-SC-105",
    customerName: "Jessica Albright",
    customerPhone: "+1 (512) 419-7721",
    items: [
      { name: "Custom 8-inch Celebration Cake", quantity: 1, price: 85.00, notes: "Floral & gold leaf accents" },
      { name: "Mini Cupcakes (2 dozen)", quantity: 1, price: 32.00, notes: "Vanilla bean & berry" }
    ],
    total: 117.00,
    status: "New",
    allergyWarning: null,
    deliveryDate: "2026-11-14T13:00:00Z",
    deliveryType: "Delivery to venue",
    channel: "whatsapp",
    specialInstructions: "Baby shower pastel floral palette",
    createdAt: "2026-10-24T04:40:00Z"
  },
  // Boutique Orders
  {
    id: "ORD-4821",
    businessId: "boutique",
    ticketId: "TICK-AA-201",
    customerName: "Brianna Scott",
    customerPhone: "+1 (917) 555-8912",
    items: [
      { name: "Oversized Organic Cotton Hoodie (Cobalt Blue, M)", quantity: 1, price: 115.00, notes: "Medium" }
    ],
    total: 115.00,
    status: "Preparing", // Replacement being packed
    allergyWarning: null,
    deliveryDate: "2026-10-25T12:00:00Z",
    deliveryType: "UPS Next Day Air (Upgraded)",
    channel: "instagram",
    specialInstructions: "Stalled package tracer. Reship with priority slip & complimentary tote bag.",
    createdAt: "2026-10-24T08:20:00Z"
  },
  {
    id: "ORD-4835",
    businessId: "boutique",
    ticketId: null,
    customerName: "Olivia Dupont",
    customerPhone: "+1 (917) 332-9011",
    items: [
      { name: "Tailored Linen Trench Coat (Olive, 6)", quantity: 1, price: 245.00, notes: "Gift wrap" },
      { name: "Silk Slip Midi Dress (Noir, M)", quantity: 1, price: 165.00, notes: "MULBERRY SILK" }
    ],
    total: 410.00,
    status: "Ready",
    allergyWarning: null,
    deliveryDate: "2026-10-24T18:00:00Z",
    deliveryType: "Curbside Pickup at Mercer St",
    channel: "webchat",
    specialInstructions: "Client picking up on way to dinner",
    createdAt: "2026-10-23T14:00:00Z"
  },
  // Salon Bookings / Orders
  {
    id: "BKG-301",
    businessId: "salon",
    ticketId: "TICK-GC-301",
    customerName: "Camila Rodriguez",
    customerPhone: "+1 (310) 902-1144",
    items: [
      { name: "Custom Balayage / Lived-in Blonde", quantity: 1, price: 260.00, notes: "Gloss + bond repair" },
      { name: "Signature Haircut & Botanical Blowout", quantity: 1, price: 85.00, notes: "Malibu wedding styling" }
    ],
    total: 345.00,
    status: "Confirmed",
    allergyWarning: "Sensitive scalp history - apply botanical barrier oil before gloss.",
    deliveryDate: "2026-10-30T14:00:00Z",
    deliveryType: "Salon Chair (Stylist: Marcus)",
    channel: "instagram",
    specialInstructions: "Sister's wedding. Bring photo references for lived-in honey blonde.",
    createdAt: "2026-10-24T08:25:00Z"
  }
];

// Seed Complaints & Escalations
const SEED_COMPLAINTS = [
  {
    id: "CMP-101",
    businessId: "bakery",
    ticketId: "TICK-SC-102",
    customerName: "Marcus Vance",
    orderNumber: "SC-8819",
    severity: "Critical",
    slaMinutesLeft: 35,
    createdAt: "2026-10-24T07:45:00Z",
    reason: "Damaged Anniversary Cake in Transit",
    claimAmount: 85.00,
    status: "Under Review",
    resolutionSteps: [
      { step: "Review courier transit photo", completed: true },
      { step: "Approve $85 refund through Stripe", completed: false },
      { step: "File insurance claim with courier dispatch", completed: true },
      { step: "Dispatch handwritten apology note with $25 gift card", completed: false }
    ]
  },
  {
    id: "CMP-201",
    businessId: "boutique",
    ticketId: "TICK-AA-201",
    customerName: "Brianna Scott",
    orderNumber: "#4821",
    severity: "High",
    slaMinutesLeft: 45,
    createdAt: "2026-10-24T08:20:00Z",
    reason: "Stuck Tracking for 6 Days (Missed Birthday Gift)",
    claimAmount: 115.00,
    status: "In Progress",
    resolutionSteps: [
      { step: "Verify package status at Brooklyn fulfillment hub", completed: true },
      { step: "Issue replacement order via UPS Next Day Air", completed: true },
      { step: "Send tracking number and apology voucher to customer", completed: false }
    ]
  },
  {
    id: "CMP-301",
    businessId: "salon",
    ticketId: "TICK-GC-302",
    customerName: "Vanessa Hayes",
    orderNumber: null,
    severity: "Critical",
    slaMinutesLeft: 10,
    createdAt: "2026-10-24T07:55:00Z",
    reason: "Chemical Scalp Irritation & Blisters post Bleach",
    claimAmount: 0.00,
    status: "Escalated to Owner",
    resolutionSteps: [
      { step: "Immediate direct phone call from Salon Owner Marcus", completed: true },
      { step: "Provide cool-rinse soothing instructions & offer doctor reimbursement", completed: false },
      { step: "Review stylist Tyler's bleach volume formulation logs", completed: true },
      { step: "Issue full refund and complimentary soothing botanical treatments", completed: false }
    ]
  }
];

// Seed Team Members
const SEED_TEAM = [
  {
    id: "usr-1",
    name: "Sarah Jenkins",
    role: "Owner & Head Baker",
    email: "sarah@sweetcrumbs.com",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80",
    status: "active",
    ticketsAssigned: 12,
    businesses: ["bakery"]
  },
  {
    id: "usr-2",
    name: "Alex Martinez",
    role: "Support & Dispatch Lead",
    email: "alex@sweetcrumbs.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    status: "active",
    ticketsAssigned: 18,
    businesses: ["bakery", "boutique", "salon"]
  },
  {
    id: "usr-3",
    name: "Elena Vance",
    role: "Founder & Creative Director",
    email: "elena@auraatelier.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    status: "active",
    ticketsAssigned: 8,
    businesses: ["boutique"]
  },
  {
    id: "usr-4",
    name: "Marcus Rivera",
    role: "Salon Owner & Master Stylist",
    email: "marcus@glowandco.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    status: "active",
    ticketsAssigned: 6,
    businesses: ["salon"]
  }
];

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SEED_BUSINESSES,
    ALL_SEED_TICKETS,
    SEED_ORDERS,
    SEED_COMPLAINTS,
    SEED_TEAM
  };
}
