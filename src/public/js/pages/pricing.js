// ShopDesk AI - Pricing Page

let isAnnualPricing = true;

function renderPricingPage() {
  const discountMultiplier = isAnnualPricing ? 0.8 : 1.0;
  const period = isAnnualPricing ? "/mo (billed annually)" : "/month";

  const tiers = [
    {
      name: "Starter",
      badge: "Sole Proprietor",
      price: Math.round(29 * discountMultiplier),
      description: "Ideal for home bakeries and solo artisans clearing DMs in spare moments.",
      highlight: false,
      features: [
        "Up to 500 AI-processed messages/mo",
        "2 Connected Channels (e.g. WhatsApp + IG)",
        "Knowledge Base grounding (up to 20 FAQs)",
        "Standard Tone & Voice Sliders",
        "Visual Orders Kanban Board",
        "1 Staff Seat"
      ]
    },
    {
      name: "Growth",
      badge: "Most Popular",
      price: Math.round(79 * discountMultiplier),
      description: "For busy storefront boutiques and salons managing steady customer flows.",
      highlight: true,
      features: [
        "Up to 2,500 AI-processed messages/mo",
        "All 4 Channels (WhatsApp, IG, Gmail, Webchat)",
        "Unlimited FAQs, Price Lists & Policies",
        "Advanced Tone Sliders & Custom Sign-offs",
        "Complaints & SLA Escalation Timers",
        "Customer CRM & Lifetime Value Tracking",
        "Up to 5 Staff Seats with Role Routing"
      ]
    },
    {
      name: "Scale",
      badge: "Multi-Location",
      price: Math.round(199 * discountMultiplier),
      description: "For high-volume retail, franchise locations, or multi-brand studios.",
      highlight: false,
      features: [
        "Unlimited AI-processed messages",
        "Custom LLM API Key Integration (Bring Your Own Key)",
        "Custom Webhook & Shopify/Square integrations",
        "Multi-location business switcher",
        "Dedicated account manager & 99.9% SLA",
        "Unlimited Staff Seats"
      ]
    }
  ];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-primary">Transparent Pricing</span>
        <h1 class="font-display font-extrabold text-4xl sm:text-5xl text-main mt-2 mb-4">
          Simple plans that pay for themselves in 2 days
        </h1>
        <p class="text-muted text-base mb-8">
          Save 10+ hours of tedious typing every week. Start with our full-featured demo today.
        </p>

        <!-- Monthly / Annual Toggle -->
        <div class="inline-flex items-center gap-3 p-1.5 rounded-full border border-subtle bg-surface shadow-sm">
          <button 
            onclick="togglePricingCycle(false)" 
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition ${!isAnnualPricing ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-main'}"
          >
            Monthly Billing
          </button>
          <button 
            onclick="togglePricingCycle(true)" 
            class="px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${isAnnualPricing ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-main'}"
          >
            <span>Yearly Billing</span>
            <span class="px-1.5 py-0.2 rounded-md bg-emerald-400 text-emerald-950 font-bold text-[10px]">SAVE 20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        ${tiers.map(t => `
          <div class="card p-8 flex flex-col justify-between relative ${
            t.highlight ? 'border-primary ring-2 ring-primary/20 shadow-xl' : ''
          }">
            ${t.badge ? `
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold ${
                t.highlight ? 'bg-primary text-white shadow-md' : 'bg-canvas border border-subtle text-muted'
              }">
                ${t.badge}
              </div>
            ` : ''}

            <div>
              <h3 class="font-display font-bold text-xl text-main mb-1">${t.name}</h3>
              <p class="text-xs text-muted mb-6">${t.description}</p>
              
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-4xl font-extrabold text-main font-display">$${t.price}</span>
                <span class="text-xs text-muted">${period}</span>
              </div>

              <div class="space-y-3 pt-6 border-t border-subtle mb-8">
                ${t.features.map(f => `
                  <div class="flex items-start gap-2 text-xs text-main">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>${f}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="btn ${
              t.highlight ? 'btn-primary' : 'btn-secondary'
            } w-full py-2.5 text-xs font-semibold">
              ${t.highlight ? 'Start 14-Day Free Trial' : 'Get Started'}
            </a>
          </div>
        `).join('')}
      </div>

      <!-- Comparison Matrix Table -->
      <div class="max-w-5xl mx-auto card p-6 sm:p-8">
        <h3 class="font-display font-bold text-xl text-main mb-6 text-center">Feature Comparison Matrix</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-subtle text-muted uppercase text-[10px] tracking-wider">
                <th class="py-3 px-4 font-bold">Feature</th>
                <th class="py-3 px-4 font-bold">Starter</th>
                <th class="py-3 px-4 font-bold text-primary">Growth</th>
                <th class="py-3 px-4 font-bold">Scale</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle">
              <tr>
                <td class="py-3 px-4 font-medium text-main">Supported Channels</td>
                <td class="py-3 px-4 text-muted">WhatsApp & Instagram</td>
                <td class="py-3 px-4 font-semibold text-primary">WhatsApp, IG, Gmail, Web</td>
                <td class="py-3 px-4 text-muted">All + Custom API</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-main">Grounding & KB Verification</td>
                <td class="py-3 px-4 text-muted">Yes (Strict)</td>
                <td class="py-3 px-4 font-semibold text-primary">Yes (Strict)</td>
                <td class="py-3 px-4 text-muted">Yes (Custom Rules)</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-main">Allergy & Health Alert Extraction</td>
                <td class="py-3 px-4 text-muted">Yes</td>
                <td class="py-3 px-4 font-semibold text-primary">Yes + Push Notifications</td>
                <td class="py-3 px-4 text-muted">Yes + SMS Dispatch</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-main">Automatic Refund Escalation Limits</td>
                <td class="py-3 px-4 text-muted">Fixed $40</td>
                <td class="py-3 px-4 font-semibold text-primary">Fully Customizable</td>
                <td class="py-3 px-4 text-muted">Custom by department</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-main">Fulfillment Kanban Board</td>
                <td class="py-3 px-4 text-muted">Included</td>
                <td class="py-3 px-4 font-semibold text-primary">Included + CSV Export</td>
                <td class="py-3 px-4 text-muted">Included + ERP Sync</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-main">Support SLA</td>
                <td class="py-3 px-4 text-muted">Email (24h)</td>
                <td class="py-3 px-4 font-semibold text-primary">Priority WhatsApp (2h)</td>
                <td class="py-3 px-4 text-muted">Dedicated 15-min SLA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function togglePricingCycle(annual) {
  isAnnualPricing = annual;
  renderApp();
}
