// ShopDesk AI - App Sidebar & Mobile Bottom Navigation Bar

function renderSidebar() {
  const cfg = appStore.state.config || { name: "ShopDesk AI" };
  const currentPath = window.location.pathname;
  const stats = appStore.state.stats || { urgentCount: 0, ordersCount: 0, complaintsCount: 0 };

  const navItems = [
    { label: "Dashboard", path: "/app/dashboard", icon: "LayoutDashboard" },
    { label: "Unified Inbox", path: "/app/inbox", icon: "Inbox", badge: stats.urgentCount, badgeColor: "bg-coral text-white" },
    { label: "Orders", path: "/app/orders", icon: "ShoppingBag", badge: stats.ordersCount, badgeColor: "bg-primary-subtle text-primary" },
    { label: "Complaints", path: "/app/complaints", icon: "AlertTriangle", badge: stats.complaintsCount, badgeColor: "bg-amber text-white" },
    { label: "Customers", path: "/app/customers", icon: "Users" },
    { label: "Tone & Voice", path: "/app/tone", icon: "Sliders" },
    { label: "Knowledge Base", path: "/app/knowledge", icon: "BookOpen" },
    { label: "Automation Rules", path: "/app/rules", icon: "ShieldCheck" },
    { label: "Analytics", path: "/app/analytics", icon: "BarChart3" },
    { label: "Team", path: "/app/team", icon: "UserCheck" },
    { label: "Integrations", path: "/app/integrations", icon: "Layers" },
    { label: "Settings", path: "/app/settings", icon: "Settings" },
    { label: "Help Center", path: "/app/help", icon: "HelpCircle" }
  ];

  return `
    <!-- Desktop Collapsible Sidebar -->
    <aside id="app-sidebar" class="hidden lg:flex flex-col w-64 border-r border-subtle bg-surface flex-shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <div class="p-3 space-y-1">
        ${navItems.map(item => {
          const isActive = currentPath === item.path || (item.path === '/app/inbox' && currentPath.startsWith('/app/inbox'));
          return `
            <a href="${item.path}" onclick="navigateTo('${item.path}'); return false;" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
              isActive ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-main hover:bg-muted'
            }">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="${isActive ? 'text-white' : 'text-muted'}">${getIcon(item.icon, 'w-4 h-4')}</span>
                <span class="truncate">${item.label}</span>
              </div>
              ${item.badge && item.badge > 0 ? `
                <span class="px-1.5 py-0.5 text-[10px] font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-muted text-muted'}">
                  ${item.badge}
                </span>
              ` : ''}
            </a>
          `;
        }).join('')}
      </div>

      <!-- Bottom Card: Live Demo Reset & Info -->
      <div class="mt-auto p-3 border-t border-subtle">
        <div class="p-3 rounded-xl bg-canvas border border-subtle text-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-semibold text-main text-[11px] uppercase tracking-wider">Demo Environment</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p class="text-[11px] text-muted mb-2.5">3 switchable sample businesses seeded with realistic messy messages.</p>
          <button onclick="appStore.resetDemoData()" class="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg border border-subtle bg-surface hover:bg-muted text-main transition">
            ${getIcon('RefreshCw', 'w-3 h-3 text-muted')}
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile Drawer Sidebar (Sliding Modal for Small Screens) -->
    <div id="mobile-sidebar-drawer" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden lg:hidden" onclick="toggleMobileSidebar(false)">
      <div class="w-72 h-full bg-surface border-r border-subtle p-4 flex flex-col overflow-y-auto" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-subtle">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-xs">SD</div>
            <span class="font-display font-bold text-sm text-main">${cfg.name}</span>
          </div>
          <button onclick="toggleMobileSidebar(false)" class="p-1 text-muted hover:text-main rounded-md">
            ${getIcon('XCircle', 'w-5 h-5')}
          </button>
        </div>
        <div class="space-y-1">
          ${navItems.map(item => `
            <a href="${item.path}" onclick="navigateTo('${item.path}'); toggleMobileSidebar(false); return false;" class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
              currentPath === item.path ? 'bg-primary text-white font-semibold' : 'text-muted hover:bg-muted text-main'
            }">
              <div class="flex items-center gap-3">
                ${getIcon(item.icon, 'w-4 h-4')}
                <span>${item.label}</span>
              </div>
              ${item.badge && item.badge > 0 ? `<span class="px-2 py-0.5 text-xs font-bold rounded-full ${item.badgeColor}">${item.badge}</span>` : ''}
            </a>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar (5-second clarity on phone) -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-subtle h-16 flex items-center justify-around px-2 shadow-lg">
      <a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="flex flex-col items-center gap-1 text-[10px] font-medium ${currentPath === '/app/dashboard' ? 'text-primary' : 'text-muted'}">
        ${getIcon('LayoutDashboard', 'w-5 h-5')}
        <span>Dashboard</span>
      </a>
      <a href="/app/inbox" onclick="navigateTo('/app/inbox'); return false;" class="flex flex-col items-center gap-1 text-[10px] font-medium relative ${currentPath.startsWith('/app/inbox') ? 'text-primary' : 'text-muted'}">
        ${getIcon('Inbox', 'w-5 h-5')}
        <span>Inbox</span>
        ${stats.urgentCount > 0 ? `<span class="absolute top-0 right-2 w-2 h-2 rounded-full bg-coral animate-ping"></span>` : ''}
      </a>
      <a href="/app/orders" onclick="navigateTo('/app/orders'); return false;" class="flex flex-col items-center gap-1 text-[10px] font-medium ${currentPath === '/app/orders' ? 'text-primary' : 'text-muted'}">
        ${getIcon('ShoppingBag', 'w-5 h-5')}
        <span>Orders</span>
      </a>
      <a href="/app/complaints" onclick="navigateTo('/app/complaints'); return false;" class="flex flex-col items-center gap-1 text-[10px] font-medium ${currentPath === '/app/complaints' ? 'text-primary' : 'text-muted'}">
        ${getIcon('AlertTriangle', 'w-5 h-5')}
        <span>Complaints</span>
      </a>
      <button onclick="toggleMobileSidebar(true)" class="flex flex-col items-center gap-1 text-[10px] font-medium text-muted">
        ${getIcon('Layers', 'w-5 h-5')}
        <span>More</span>
      </button>
    </nav>
  `;
}

function toggleMobileSidebar(forceState = null) {
  const el = document.getElementById('mobile-sidebar-drawer');
  if (!el) return;
  if (forceState !== null) {
    if (forceState) el.classList.remove('hidden');
    else el.classList.add('hidden');
  } else {
    el.classList.toggle('hidden');
  }
}
