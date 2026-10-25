// ShopDesk AI - Orders Kanban & Table Management

let ordersViewMode = "kanban"; // 'kanban' or 'table'

const KANBAN_STAGES = ["New", "Confirmed", "Preparing", "Ready", "Delivered"];

function renderOrdersPage() {
  const orders = appStore.state.orders || [];
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Orders Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Orders & Fulfillment</h1>
            <span class="badge badge-order text-xs font-bold">${orders.length} Active Orders</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Auto-extracted directly from customer WhatsApp and Instagram messages.</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="p-1 rounded-xl bg-canvas border border-subtle flex items-center gap-1">
            <button 
              onclick="setOrdersView('kanban')" 
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${ordersViewMode === 'kanban' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-main'}"
            >
              Kanban Board
            </button>
            <button 
              onclick="setOrdersView('table')" 
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${ordersViewMode === 'table' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-main'}"
            >
              Table View
            </button>
          </div>

          <div class="text-right pl-3 border-l border-subtle hidden sm:block">
            <div class="text-[10px] text-muted uppercase font-semibold">Total Revenue</div>
            <div class="text-sm font-bold text-main font-display">$${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <!-- Main Orders View -->
      ${ordersViewMode === 'kanban' ? renderKanbanBoard(orders) : renderOrdersTable(orders)}
    </div>
  `;
}

function setOrdersView(mode) {
  ordersViewMode = mode;
  renderApp();
}

function renderKanbanBoard(orders) {
  return `
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
      ${KANBAN_STAGES.map(stage => {
        const stageOrders = orders.filter(o => o.status === stage);
        return `
          <div class="p-3 rounded-2xl bg-canvas border border-subtle flex flex-col min-w-[220px]">
            <!-- Column Header -->
            <div class="flex items-center justify-between mb-3 px-1">
              <span class="font-bold text-xs text-main">${stage}</span>
              <span class="px-2 py-0.5 rounded-full bg-surface border border-subtle text-[10px] font-bold text-muted">${stageOrders.length}</span>
            </div>

            <!-- Cards -->
            <div class="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              ${stageOrders.length === 0 ? `
                <div class="p-4 rounded-xl border border-dashed border-subtle text-center text-[11px] text-muted">
                  No orders in ${stage}
                </div>
              ` : stageOrders.map(o => `
                <div class="card p-3 bg-surface hover:shadow-md transition text-xs space-y-2 border-subtle">
                  <div class="flex items-start justify-between gap-1">
                    <span class="font-bold text-main truncate">${o.customerName}</span>
                    <span class="font-bold text-emerald-600">$${o.total.toFixed(2)}</span>
                  </div>

                  <!-- Allergy Tag if present -->
                  ${o.allergyWarning ? `
                    <div class="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-700 dark:text-rose-300 text-[10px] font-bold flex items-center gap-1">
                      <span>🛡️</span>
                      <span class="truncate">${o.allergyWarning}</span>
                    </div>
                  ` : ''}

                  <!-- Items snippet -->
                  <div class="text-[11px] text-muted">
                    ${o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>

                  <div class="pt-2 border-t border-subtle flex items-center justify-between text-[10px] text-muted">
                    <span>${o.deliveryType || 'Pickup'}</span>
                    
                    <!-- Move Stage Select -->
                    <select 
                      onchange="appStore.updateOrderStatus('${o.id}', this.value)"
                      class="select text-[10px] py-0.5 px-1.5 w-auto bg-canvas"
                    >
                      ${KANBAN_STAGES.map(s => `
                        <option value="${s}" ${s === o.status ? 'selected' : ''}>→ ${s}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderOrdersTable(orders) {
  return `
    <div class="card p-0 overflow-hidden bg-surface">
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="border-b border-subtle bg-canvas text-muted uppercase text-[10px] tracking-wider">
              <th class="py-3 px-4 font-bold">Order ID</th>
              <th class="py-3 px-4 font-bold">Customer</th>
              <th class="py-3 px-4 font-bold">Items</th>
              <th class="py-3 px-4 font-bold">Allergies / Special</th>
              <th class="py-3 px-4 font-bold">Fulfillment</th>
              <th class="py-3 px-4 font-bold">Status</th>
              <th class="py-3 px-4 font-bold text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-subtle">
            ${orders.map(o => `
              <tr class="hover:bg-muted/40 transition">
                <td class="py-3 px-4 font-mono font-bold text-primary">${o.id}</td>
                <td class="py-3 px-4">
                  <div class="font-semibold text-main">${o.customerName}</div>
                  <div class="text-[10px] text-muted">${o.customerPhone || 'Via DM'}</div>
                </td>
                <td class="py-3 px-4 text-main">
                  ${o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </td>
                <td class="py-3 px-4">
                  ${o.allergyWarning ? `
                    <span class="px-2 py-0.5 rounded-full bg-coral-subtle text-coral-text font-bold text-[10px]">
                      🛡️ ${o.allergyWarning}
                    </span>
                  ` : `<span class="text-muted">Standard</span>`}
                </td>
                <td class="py-3 px-4 text-muted">
                  <div>${o.deliveryType || 'Pickup'}</div>
                  <div class="text-[10px]">${new Date(o.createdAt).toLocaleDateString()}</div>
                </td>
                <td class="py-3 px-4">
                  <select 
                    onchange="appStore.updateOrderStatus('${o.id}', this.value)"
                    class="select text-[11px] py-1 px-2 w-auto"
                  >
                    ${KANBAN_STAGES.map(s => `
                      <option value="${s}" ${s === o.status ? 'selected' : ''}>${s}</option>
                    `).join('')}
                  </select>
                </td>
                <td class="py-3 px-4 text-right font-bold font-display text-main">$${o.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
