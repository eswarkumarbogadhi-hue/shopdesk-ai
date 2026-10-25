// ShopDesk AI - Knowledge Base Management Page (The Ground Truth for AI)

function renderKnowledgePage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };
  const kb = activeBiz.knowledgeBase || {
    openingHours: "Tue-Sat: 8am - 6pm",
    priceList: [],
    faqs: [],
    policies: {}
  };

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Knowledge Base (AI Ground Truth)</h1>
            <span class="badge badge-enquiry text-xs font-bold">100% Fact-Checked</span>
          </div>
          <p class="text-xs text-muted mt-0.5">This is the <strong>only source of facts</strong> the AI may quote. It will never invent prices or unapproved promises.</p>
        </div>

        <button onclick="toast.show({ title: 'KB Synced with AI', message: 'All model inference prompts updated immediately.', type: 'success' })" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-sm">
          ${getIcon('Sparkles', 'w-3.5 h-3.5')}
          <span>Save & Re-Index AI</span>
        </button>
      </div>

      <!-- Warning Callout Banner -->
      <div class="p-4 rounded-2xl bg-teal-subtle border border-teal-200 dark:border-teal-900/50 flex items-start gap-3">
        <div class="p-2 rounded-xl bg-teal text-white flex-shrink-0 mt-0.5">
          ${getIcon('ShieldCheck', 'w-4 h-4')}
        </div>
        <div class="text-xs leading-relaxed text-teal-text">
          <strong>Grounding Guarantee:</strong> If a customer asks for a flavor, discount, or timeframe that is not listed below, ShopDesk AI is instructed to ask a clarifying question or escalate to you, rather than hallucinating an answer.
        </div>
      </div>

      <!-- Section 1: Opening Hours & Service Windows -->
      <div class="card p-6 bg-surface space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-display font-bold text-base text-main flex items-center gap-2">
            ${getIcon('Clock', 'w-4 h-4 text-primary')} Operating Hours & Pickup Schedule
          </h3>
        </div>
        <input type="text" value="${kb.openingHours || ''}" class="input text-xs font-medium" />
      </div>

      <!-- Section 2: Price List & Services Catalog -->
      <div class="card p-6 bg-surface space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-display font-bold text-base text-main flex items-center gap-2">
              ${getIcon('ShoppingBag', 'w-4 h-4 text-emerald')} Price List & Catalog
            </h3>
            <p class="text-xs text-muted">The AI checks these exact prices when extracting orders or answering enquiries.</p>
          </div>
          <button onclick="toast.show({ title: 'Add Item', message: 'New catalog row created.', type: 'info' })" class="btn btn-secondary btn-sm flex items-center gap-1">
            ${getIcon('Plus', 'w-3 h-3')} Add Item
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-subtle bg-canvas text-muted uppercase text-[10px] tracking-wider">
                <th class="py-2.5 px-3 font-bold">Item Name</th>
                <th class="py-2.5 px-3 font-bold">Standard Price</th>
                <th class="py-2.5 px-3 font-bold">Notes / Inclusions</th>
                <th class="py-2.5 px-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle">
              ${(kb.priceList || []).map(p => `
                <tr class="hover:bg-muted/40 transition">
                  <td class="py-2.5 px-3 font-semibold text-main">${p.item}</td>
                  <td class="py-2.5 px-3 font-bold text-emerald-600 font-display">$${p.price.toFixed(2)}</td>
                  <td class="py-2.5 px-3 text-muted">${p.notes}</td>
                  <td class="py-2.5 px-3 text-right">
                    <button class="text-muted hover:text-main p-1">${getIcon('Edit3', 'w-3.5 h-3.5')}</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: Verified FAQs -->
      <div class="card p-6 bg-surface space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-display font-bold text-base text-main flex items-center gap-2">
              ${getIcon('BookOpen', 'w-4 h-4 text-primary')} Verified Business FAQs
            </h3>
            <p class="text-xs text-muted">When customers ask these questions, the AI answers using your exact policies.</p>
          </div>
          <button onclick="toast.show({ title: 'Add FAQ', message: 'New FAQ slot ready.', type: 'info' })" class="btn btn-secondary btn-sm flex items-center gap-1">
            ${getIcon('Plus', 'w-3 h-3')} Add FAQ
          </button>
        </div>

        <div class="space-y-3">
          ${(kb.faqs || []).map(f => `
            <div class="p-4 rounded-xl bg-canvas border border-subtle space-y-2">
              <div class="font-semibold text-xs text-main flex items-center gap-2">
                <span class="text-primary font-bold">Q:</span>
                <span>${f.q}</span>
              </div>
              <div class="text-xs text-muted leading-relaxed pl-5">
                <span class="text-emerald-500 font-bold">A:</span> ${f.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
