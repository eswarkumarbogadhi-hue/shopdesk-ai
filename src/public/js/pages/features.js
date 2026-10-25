// ShopDesk AI - Features Page

function renderFeaturesPage() {
  const features = [
    {
      title: "Omnichannel Inbox Aggregation",
      badge: "Channels",
      description: "Unifies messy messages across WhatsApp Business, Instagram Direct Messages, Gmail/Outlook, and your web storefront chat into one synchronized queue.",
      icon: "Layers",
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
      details: ["Real-time synchronization with read receipts", "Unified customer identity across handles and phone numbers", "Automatic channel routing and spam filtering"]
    },
    {
      title: "Zero-Shot Messy Intent Sorting",
      badge: "Classification",
      description: "Deciphers slang, typos, emojis, and voice-note transcriptions into 7 discrete ticket types: Order, Complaint, Enquiry, Booking, Refund, Feedback, or Spam.",
      icon: "Sparkles",
      color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40",
      details: ["Understands multiple requests inside a single message", "Urgency detection (Low, Medium, High) with sentiment tracking", "Multilingual translation and reply generation"]
    },
    {
      title: "Smart Entity & Allergy Extraction",
      badge: "Extraction",
      description: "Extracts exact items, quantities, dates, delivery addresses, and critical allergy flags directly into structured order records without manual copying.",
      icon: "ShoppingBag",
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
      details: ["Flags health warnings (nut-free, gluten-free, sensitive scalp)", "Parses messy date/time references ('this sat 5pm')", "Populates visual Kanban fulfillment board automatically"]
    },
    {
      title: "Knowledge-Base Grounding Guarantee",
      badge: "Zero Hallucinations",
      description: "The AI is strictly restricted to facts in your verified business Knowledge Base: prices, opening hours, delivery fees, and policies. It will never invent prices.",
      icon: "BookOpen",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
      details: ["Answers repetitive FAQ questions in 3 seconds", "Clarifies missing details instead of guessing", "Syncs live price updates to customer drafts instantly"]
    },
    {
      title: "Personalized Voice & Tone Sliders",
      badge: "Tone of Voice",
      description: "Replies sound genuinely like you. Fine-tune formality, brevity, and emoji frequency sliders with interactive live previews and custom signoffs.",
      icon: "Sliders",
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
      details: ["Formality control (casual warmth to polished boutique)", "Emoji level calibration (none to expressive ✨🧁)", "Custom owner sign-offs and greeting styles"]
    },
    {
      title: "Responsible Human Escalation Guardrails",
      badge: "Safety",
      description: "Protects your business reputation by auto-escalating high-risk scenarios: angry sentiment, refunds over threshold, safety/health claims, or low confidence.",
      icon: "ShieldCheck",
      color: "text-coral bg-rose-50 dark:bg-rose-950/40",
      details: ["Configurable refund limit thresholds ($40 default)", "Real-time keyword tripwires (lawsuit, hospital, blister)", "Transparent 'Why this was classified' explainability cards"]
    }
  ];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold uppercase tracking-wider text-primary">Engineered for Small Businesses</span>
        <h1 class="font-display font-extrabold text-4xl sm:text-5xl text-main mt-2 mb-4">
          Everything you need to master customer messaging
        </h1>
        <p class="text-muted text-base">
          Built specifically for home bakeries, boutiques, and salons who need enterprise-grade AI power without enterprise complexity.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${features.map(f => `
          <div class="card p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center ${f.color}">
                  ${getIcon(f.icon, 'w-5 h-5')}
                </div>
                <span class="px-2 py-0.5 rounded-full bg-canvas border border-subtle text-[11px] font-semibold text-muted">${f.badge}</span>
              </div>
              <h3 class="font-display font-bold text-lg text-main mb-2">${f.title}</h3>
              <p class="text-xs text-muted leading-relaxed mb-6">${f.description}</p>
            </div>

            <div class="pt-4 border-t border-subtle space-y-2">
              ${f.details.map(d => `
                <div class="flex items-center gap-2 text-xs text-main">
                  <span class="text-emerald-500 font-bold">✓</span>
                  <span>${d}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Feature Callout -->
      <div class="mt-16 p-8 rounded-3xl bg-surface border border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="font-display font-bold text-xl text-main mb-1">Want to see the classification engine in real time?</h3>
          <p class="text-xs text-muted">Try out our interactive playground with zero login or setup required.</p>
        </div>
        <a href="/demo" onclick="navigateTo('/demo'); return false;" class="btn btn-primary px-6 py-2.5 text-xs whitespace-nowrap shadow-md">
          <span>Test Live Playground</span>
          ${getIcon('ArrowRight', 'w-4 h-4')}
        </a>
      </div>
    </div>
  `;
}
