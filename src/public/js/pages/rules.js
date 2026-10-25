// ShopDesk AI - Automation & Escalation Rules Page

function renderRulesPage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };
  const rules = activeBiz.rules || {
    autoSendConfidenceThreshold: 0.88,
    maxRefundAutoApprove: 40.00,
    escalateKeywords: ["lawyer", "attorney", "sick", "hospital", "poisoning", "allergy reaction", "sue", "fraud"],
    workingHoursAutoReply: true,
    afterHoursNotice: "Thanks for messaging us! We will confirm first thing at 8 AM tomorrow."
  };

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Automation & Safety Guardrails</h1>
            <span class="badge badge-complaint text-xs font-bold">Risk Management</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Define exact boundaries for where the AI may auto-draft vs when a human must intervene.</p>
        </div>

        <button onclick="toast.show({ title: 'Safety Policies Saved', message: 'Rules applied across all incoming channels.', type: 'success' })" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-sm">
          ${getIcon('ShieldCheck', 'w-3.5 h-3.5')}
          <span>Save Safety Policies</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Rule 1: AI Confidence Threshold -->
        <div class="card p-6 bg-surface space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-sm text-main flex items-center gap-2">
              ${getIcon('Sparkles', 'w-4 h-4 text-primary')} Confidence Threshold for AI Drafts
            </h3>
            <span class="font-bold text-xs text-primary">${Math.round(rules.autoSendConfidenceThreshold * 100)}%</span>
          </div>
          <p class="text-xs text-muted leading-relaxed">
            If the AI is less than <strong>${Math.round(rules.autoSendConfidenceThreshold * 100)}%</strong> confident about the customer's intent, it will automatically escalate the ticket to a human with a clear explanation note.
          </p>
          <input type="range" min="50" max="98" value="${Math.round(rules.autoSendConfidenceThreshold * 100)}" class="w-full accent-indigo-600" />
          <div class="flex justify-between text-[10px] text-muted">
            <span>50% (Permissive)</span>
            <span>88% (Recommended)</span>
            <span>98% (Ultra Strict)</span>
          </div>
        </div>

        <!-- Rule 2: Automatic Refund Limit -->
        <div class="card p-6 bg-surface space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-sm text-main flex items-center gap-2">
              ${getIcon('AlertTriangle', 'w-4 h-4 text-amber')} Max Auto-Refund Approval Limit
            </h3>
            <span class="font-bold text-xs text-amber-text">$${rules.maxRefundAutoApprove.toFixed(2)}</span>
          </div>
          <p class="text-xs text-muted leading-relaxed">
            Refund or credit requests above this dollar amount require explicit human authorization by the owner before any voucher or Stripe refund is processed.
          </p>
          <div class="relative">
            <span class="absolute left-3 top-2 text-muted text-xs">$</span>
            <input type="number" value="${rules.maxRefundAutoApprove}" class="input text-xs pl-7 font-bold text-main" />
          </div>
        </div>

        <!-- Rule 3: Safety / Legal Escalate Keywords -->
        <div class="card p-6 bg-surface space-y-4 md:col-span-2">
          <div>
            <h3 class="font-display font-bold text-sm text-main flex items-center gap-2">
              ${getIcon('ShieldCheck', 'w-4 h-4 text-coral')} Instant Escalation Keywords (Safety & Legal Tripwires)
            </h3>
            <p class="text-xs text-muted mt-1 leading-relaxed">
              If an incoming message contains any of these words or phrases, the AI immediately halts automated replies and dispatches an urgent push alert to the owner.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            ${(rules.escalateKeywords || []).map(kw => `
              <span class="px-3 py-1 rounded-full bg-coral-subtle text-coral-text border border-rose-200 dark:border-rose-900/50 text-xs font-semibold flex items-center gap-1.5">
                <span>${kw}</span>
                <button class="hover:text-rose-950 p-0.5">×</button>
              </span>
            `).join('')}
            <button onclick="toast.show({ title: 'Add Keyword', message: 'Enter new safety keyword.', type: 'info' })" class="px-3 py-1 rounded-full border border-dashed border-subtle text-xs text-muted hover:text-main flex items-center gap-1">
              + Add keyword
            </button>
          </div>
        </div>

        <!-- Rule 4: After-Hours Routing -->
        <div class="card p-6 bg-surface space-y-4 md:col-span-2">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-display font-bold text-sm text-main">After-Hours Friendly Notice</h3>
              <p class="text-xs text-muted">Auto-acknowledge messages received when your shop is closed for the night.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <textarea class="textarea text-xs h-20 leading-relaxed font-sans">${rules.afterHoursNotice || ''}</textarea>
        </div>
      </div>
    </div>
  `;
}
