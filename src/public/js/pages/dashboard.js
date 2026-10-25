// ShopDesk AI - App Dashboard Page

function renderDashboardPage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse", type: "Home Bakery" };
  const tickets = appStore.state.tickets || [];
  const orders = appStore.state.orders || [];
  const complaints = appStore.state.complaints || [];
  const analytics = appStore.state.analytics || {
    hoursSavedThisWeek: 16.5,
    avgResponseTimeMin: "1.8 mins",
    aiDraftAcceptanceRate: "88.4%",
    aiHandledPercent: 78
  };

  const urgentTickets = tickets.filter(t => t.urgency === 'high' && t.status !== 'resolved');
  const recentOrders = orders.slice(0, 4);

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Top Welcome Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Good morning, ${activeBiz.owner.split(' ')[0]}!</h1>
            <span class="px-2 py-0.5 rounded-full bg-emerald-subtle text-emerald-text text-[11px] font-bold">Desk Live</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Here is your daily snapshot for <strong>${activeBiz.name}</strong>.</p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="appStore.simulateIncomingMessage()" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-sm">
            ${getIcon('Sparkles', 'w-3.5 h-3.5')}
            <span>Simulate Incoming DM</span>
          </button>
          <a href="/app/inbox" onclick="navigateTo('/app/inbox'); return false;" class="btn btn-secondary btn-sm flex items-center gap-1.5">
            ${getIcon('Inbox', 'w-3.5 h-3.5')}
            <span>Open Inbox</span>
          </a>
        </div>
      </div>

      <!-- Urgent Items Alert Banner (If Any) -->
      ${urgentTickets.length > 0 ? `
        <div class="p-4 rounded-2xl bg-coral-subtle border border-rose-300 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-slide-up">
          <div class="flex items-start sm:items-center gap-3">
            <div class="p-2 rounded-xl bg-coral text-white flex-shrink-0 animate-pulse">
              ${getIcon('AlertTriangle', 'w-4 h-4')}
            </div>
            <div>
              <div class="text-xs font-bold text-coral-text">
                ${urgentTickets.length} Urgent Item${urgentTickets.length > 1 ? 's' : ''} Require Your Attention!
              </div>
              <div class="text-[11px] text-muted">
                Latest: ${urgentTickets[0].customer.name} - "${urgentTickets[0].rawMessage.slice(0, 65)}..."
              </div>
            </div>
          </div>
          <button onclick="appStore.selectTicket('${urgentTickets[0].id}'); navigateTo('/app/inbox');" class="btn btn-coral btn-sm whitespace-nowrap self-start sm:self-auto">
            <span>Resolve Now</span>
            ${getIcon('ArrowRight', 'w-3 h-3')}
          </button>
        </div>
      ` : ''}

      <!-- Metric Cards Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: Hours Saved Counter -->
        <div class="card p-5 bg-surface relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-muted">Hours Saved This Week</span>
            <div class="p-2 rounded-xl bg-emerald-subtle text-emerald-text">
              ${getIcon('Clock', 'w-4 h-4')}
            </div>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-3xl font-extrabold text-main font-display">${analytics.hoursSavedThisWeek}</span>
            <span class="text-xs font-bold text-emerald-500">+3.2h vs last wk</span>
          </div>
          <div class="text-[11px] text-muted">~95% less manual message typing</div>
        </div>

        <!-- Card 2: AI Acceptance Rate -->
        <div class="card p-5 bg-surface relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-muted">AI Draft Acceptance</span>
            <div class="p-2 rounded-xl bg-primary-subtle text-primary">
              ${getIcon('Sparkles', 'w-4 h-4')}
            </div>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-3xl font-extrabold text-main font-display">${analytics.aiDraftAcceptanceRate}</span>
            <span class="text-xs font-semibold text-muted">approved as-is</span>
          </div>
          <div class="text-[11px] text-muted">Strictly grounded in your FAQs</div>
        </div>

        <!-- Card 3: Avg Response Time -->
        <div class="card p-5 bg-surface relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-muted">Avg Response Speed</span>
            <div class="p-2 rounded-xl bg-teal-subtle text-teal-text">
              ${getIcon('Zap', 'w-4 h-4')}
            </div>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-3xl font-extrabold text-main font-display">${analytics.avgResponseTimeMin}</span>
            <span class="text-xs font-bold text-teal">Instant Drafts</span>
          </div>
          <div class="text-[11px] text-muted">Was 4.5 hours before ShopDesk</div>
        </div>

        <!-- Card 4: New Orders & Bookings -->
        <div class="card p-5 bg-surface relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-muted">Active Orders / Jobs</span>
            <div class="p-2 rounded-xl bg-amber-subtle text-amber-text">
              ${getIcon('ShoppingBag', 'w-4 h-4')}
            </div>
          </div>
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-3xl font-extrabold text-main font-display">${orders.length}</span>
            <span class="text-xs font-semibold text-main">in queue</span>
          </div>
          <div class="text-[11px] text-muted">${orders.filter(o => o.allergyWarning).length} with special allergy flags 🛡️</div>
        </div>
      </div>

      <!-- Mid Section: Split Bar & Quick Orders -->
      <div class="dashboard-split-grid w-full">
        <!-- Left: AI vs Human Handled Chart & Distribution (5 cols) -->
        <div class="card p-6 bg-surface flex flex-col justify-between w-full">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-display font-bold text-base text-main">AI Handled vs Human Handled</h3>
              <span class="text-xs text-muted font-medium">${analytics.aiHandledPercent || 78}% automated</span>
            </div>

            <!-- Progress Meter -->
            <div class="w-full h-4 bg-muted rounded-full overflow-hidden flex mb-4">
              <div class="bg-primary h-full transition-all duration-500" style="width: ${analytics.aiHandledPercent || 78}%" title="AI Handled"></div>
              <div class="bg-coral h-full transition-all duration-500" style="width: ${100 - (analytics.aiHandledPercent || 78)}%" title="Escalated to Human"></div>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="p-3 rounded-xl bg-canvas border border-subtle">
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span class="text-xs font-bold text-main">AI Handled</span>
                </div>
                <div class="text-lg font-bold font-display text-main">${analytics.aiHandledPercent || 78}%</div>
                <div class="text-[11px] text-muted">Auto-drafted FAQs, order confirmations & pricing</div>
              </div>

              <div class="p-3 rounded-xl bg-canvas border border-subtle">
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-coral"></span>
                  <span class="text-xs font-bold text-main">Human Review</span>
                </div>
                <div class="text-lg font-bold font-display text-main">${100 - (analytics.aiHandledPercent || 78)}%</div>
                <div class="text-[11px] text-muted">Complaints, refunds > $40, health/legal claims</div>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-teal-subtle/40 border border-teal-200 dark:border-teal-900 text-xs text-teal-text">
            <strong>Owner Tip:</strong> Your automated safety rule caught 2 potential allergen mix-ups this week!
          </div>
        </div>

        <!-- Right: Recent Extracted Orders Preview (7 cols) -->
        <div class="card p-6 bg-surface w-full">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-display font-bold text-base text-main">Recent Extracted Orders</h3>
            <a href="/app/orders" onclick="navigateTo('/app/orders'); return false;" class="text-xs font-semibold text-primary hover:underline">
              View Kanban Board →
            </a>
          </div>

          <div class="space-y-3">
            ${recentOrders.map(o => `
              <div class="p-3 rounded-xl bg-canvas border border-subtle flex items-center justify-between hover:border-primary/40 transition">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-surface border border-subtle flex items-center justify-center font-bold text-xs">
                    ${getChannelIcon(o.channel)}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-semibold text-xs text-main">${o.customerName}</span>
                      <span class="badge ${o.status === 'Confirmed' ? 'badge-order' : 'badge-booking'} text-[10px]">${o.status}</span>
                      ${o.allergyWarning ? `<span class="px-1.5 py-0.2 rounded bg-coral-subtle text-coral-text font-bold text-[9px]">⚠️ Allergen</span>` : ''}
                    </div>
                    <div class="text-[11px] text-muted">${o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</div>
                  </div>
                </div>

                <div class="text-right">
                  <div class="font-bold text-xs text-main">$${o.total.toFixed(2)}</div>
                  <div class="text-[10px] text-muted">${new Date(o.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
