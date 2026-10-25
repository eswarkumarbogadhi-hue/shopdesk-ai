// ShopDesk AI - Analytics & Performance Insights Page

function renderAnalyticsPage() {
  const analytics = appStore.state.analytics || {
    totalTickets: 26,
    hoursSavedThisWeek: 16.5,
    avgResponseTimeMin: "1.8 mins",
    aiDraftAcceptanceRate: "88.4%",
    customerSatisfactionScore: "94.2%",
    categoryBreakdown: { order: 12, complaint: 3, enquiry: 6, booking: 3, refund: 2 },
    channelBreakdown: { whatsapp: 11, instagram: 9, gmail: 4, webchat: 2 }
  };

  const cats = analytics.categoryBreakdown || {};
  const channels = analytics.channelBreakdown || {};

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Analytics & AI Accuracy</h1>
            <span class="badge badge-booking text-xs font-bold">Real-time Metrics</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Tracking message volume, response times, and AI draft acceptance accuracy.</p>
        </div>

        <div class="flex items-center gap-2">
          <select class="select text-xs py-1.5 w-auto">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <!-- Key KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card p-5 bg-surface">
          <span class="text-xs text-muted font-medium">Customer CSAT</span>
          <div class="text-3xl font-extrabold text-main font-display mt-1 mb-1">${analytics.customerSatisfactionScore || "94.2%"}</div>
          <div class="text-[11px] text-emerald-500 font-bold">★ 4.9/5 satisfaction</div>
        </div>

        <div class="card p-5 bg-surface">
          <span class="text-xs text-muted font-medium">AI Draft Accuracy</span>
          <div class="text-3xl font-extrabold text-main font-display mt-1 mb-1">${analytics.aiDraftAcceptanceRate || "88.4%"}</div>
          <div class="text-[11px] text-primary font-bold">Approved with zero edits</div>
        </div>

        <div class="card p-5 bg-surface">
          <span class="text-xs text-muted font-medium">Average Response Time</span>
          <div class="text-3xl font-extrabold text-main font-display mt-1 mb-1">${analytics.avgResponseTimeMin || "1.8 mins"}</div>
          <div class="text-[11px] text-teal font-bold">Down from 4.5 hours</div>
        </div>

        <div class="card p-5 bg-surface">
          <span class="text-xs text-muted font-medium">Total Volume Analyzed</span>
          <div class="text-3xl font-extrabold text-main font-display mt-1 mb-1">${analytics.totalTickets || 26}</div>
          <div class="text-[11px] text-muted">Across all 4 channels</div>
        </div>
      </div>

      <!-- Visual Breakdown Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Category Breakdown -->
        <div class="card p-6 bg-surface space-y-4">
          <h3 class="font-display font-bold text-sm text-main">Tickets by Category</h3>
          <div class="space-y-3">
            ${Object.entries(cats).map(([cat, count]) => {
              const pct = Math.round((count / (analytics.totalTickets || 1)) * 100);
              return `
                <div>
                  <div class="flex justify-between text-xs font-medium mb-1">
                    <span class="capitalize">${cat}</span>
                    <span class="text-muted">${count} (${pct}%)</span>
                  </div>
                  <div class="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div class="bg-primary h-full" style="width: ${pct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Channel Breakdown -->
        <div class="card p-6 bg-surface space-y-4">
          <h3 class="font-display font-bold text-sm text-main">Incoming Volume by Channel</h3>
          <div class="space-y-3">
            ${Object.entries(channels).map(([ch, count]) => {
              const pct = Math.round((count / (analytics.totalTickets || 1)) * 100);
              return `
                <div>
                  <div class="flex justify-between text-xs font-medium mb-1">
                    <span class="capitalize flex items-center gap-1.5">${getChannelIcon(ch, 'w-3.5 h-3.5')} ${ch}</span>
                    <span class="text-muted">${count} (${pct}%)</span>
                  </div>
                  <div class="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div class="bg-teal h-full" style="width: ${pct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
