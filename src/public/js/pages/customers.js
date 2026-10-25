// ShopDesk AI - Customers CRM Page

function renderCustomersPage() {
  const customers = appStore.state.customers || [];

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Customer Profiles & CRM</h1>
            <span class="badge badge-enquiry text-xs font-bold">${customers.length} Profiles</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Unified profiles automatically matched across WhatsApp, Instagram, and Email.</p>
        </div>

        <div class="flex items-center gap-2">
          <input type="text" placeholder="Search customers..." class="input text-xs py-1.5 w-60" />
        </div>
      </div>

      <!-- Customers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${customers.map(c => `
          <div class="card p-5 bg-surface hover:shadow-md transition space-y-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full overflow-hidden border border-subtle flex-shrink-0">
                  <img src="${c.avatar}" class="w-full h-full object-cover" alt="${c.name}">
                </div>
                <div>
                  <h3 class="font-display font-bold text-sm text-main">${c.name}</h3>
                  <div class="text-xs text-muted">${c.handle}</div>
                  <div class="text-[11px] text-muted">${c.email}</div>
                </div>
              </div>

              <!-- Tag -->
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                c.tag === 'VIP' ? 'bg-amber-subtle text-amber-text border border-amber-300' :
                c.tag === 'Repeat' ? 'bg-primary-subtle text-primary-text' :
                'bg-muted text-muted'
              }">
                ${c.tag || 'New'}
              </span>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-2 gap-2 pt-3 border-t border-subtle text-xs">
              <div class="p-2 rounded-xl bg-canvas border border-subtle">
                <div class="text-[10px] text-muted">Lifetime Value</div>
                <div class="font-bold text-sm text-main font-display">$${(c.lifetimeSpend || 0).toFixed(2)}</div>
              </div>
              <div class="p-2 rounded-xl bg-canvas border border-subtle">
                <div class="text-[10px] text-muted">Interactions</div>
                <div class="font-bold text-sm text-main font-display">${c.ticketsCount || 1} messages</div>
              </div>
            </div>

            <button onclick="appStore.setFilter({ search: '${c.name.split(' ')[0]}' }); navigateTo('/app/inbox');" class="btn btn-secondary btn-sm w-full text-xs">
              View Conversation History →
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
