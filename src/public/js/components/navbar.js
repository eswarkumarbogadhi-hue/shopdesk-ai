// ShopDesk AI - Top Navigation Bar (Public & App Header)

function renderNavbar(isApp = false) {
  const cfg = appStore.state.config || { name: "ShopDesk AI" };
  const currentPath = window.location.pathname;
  const isDark = appStore.state.darkMode;
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse", type: "Home Bakery" };
  const businesses = appStore.state.businesses || [];
  const urgentCount = appStore.state.stats?.urgentCount || 0;

  if (!isApp) {
    // ==========================================
    // PUBLIC HEADER
    // ==========================================
    return `
      <header class="sticky top-0 z-40 w-full border-b bg-glass border-subtle transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <!-- Brand Logo -->
          <a href="/" onclick="navigateTo('/'); return false;" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              ${getIcon('Sparkles', 'w-5 h-5 text-white')}
            </div>
            <div>
              <span class="font-display font-bold text-xl tracking-tight text-main">${cfg.name}</span>
              <span class="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-primary-subtle text-primary-text">AI Desk</span>
            </div>
          </a>

          <!-- Public Nav Links -->
          <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
            <a href="/features" onclick="navigateTo('/features'); return false;" class="hover:text-main transition ${currentPath === '/features' ? 'text-primary font-semibold' : ''}">Features</a>
            <a href="/how-it-works" onclick="navigateTo('/how-it-works'); return false;" class="hover:text-main transition ${currentPath === '/how-it-works' ? 'text-primary font-semibold' : ''}">How It Works</a>
            <a href="/pricing" onclick="navigateTo('/pricing'); return false;" class="hover:text-main transition ${currentPath === '/pricing' ? 'text-primary font-semibold' : ''}">Pricing</a>
            <a href="/demo" onclick="navigateTo('/demo'); return false;" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-subtle text-teal-text hover:bg-teal-subtle/80 transition ${currentPath === '/demo' ? 'ring-2 ring-teal-500' : ''}">
              <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Live AI Playground
            </a>
            <a href="/about" onclick="navigateTo('/about'); return false;" class="hover:text-main transition ${currentPath === '/about' ? 'text-primary font-semibold' : ''}">About</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button onclick="appStore.toggleTheme()" class="p-2 text-muted hover:text-main rounded-lg transition" title="Toggle Theme" aria-label="Toggle Theme">
              ${getIcon(isDark ? 'Sun' : 'Moon', 'w-5 h-5')}
            </button>
            <a href="/login" onclick="navigateTo('/login'); return false;" class="text-sm font-medium text-muted hover:text-main px-3 py-1.5 rounded-lg transition">Log in</a>
            <a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="btn btn-primary text-sm shadow-md">
              <span>Open Demo App</span>
              ${getIcon('ArrowRight', 'w-4 h-4')}
            </a>
          </div>
        </div>
      </header>
    `;
  }

  // ==========================================
  // APP TOP BAR (DASHBOARD & INBOX)
  // ==========================================
  return `
    <header class="sticky top-0 z-30 w-full border-b bg-surface border-subtle h-14 flex items-center justify-between px-4 sm:px-6">
      <div class="flex items-center gap-3 sm:gap-5">
        <!-- Mobile Sidebar Toggle -->
        <button onclick="toggleMobileSidebar()" class="lg:hidden p-1.5 text-muted hover:text-main rounded-lg border border-subtle">
          ${getIcon('Layers', 'w-5 h-5')}
        </button>

        <!-- Business Switcher Dropdown -->
        <div class="relative">
          <button id="biz-dropdown-btn" onclick="toggleBizDropdown()" class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-subtle bg-canvas hover:bg-muted text-left transition shadow-sm">
            <div class="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-primary-subtle flex items-center justify-center font-bold text-xs text-primary">
              ${activeBiz.name.slice(0, 2).toUpperCase()}
            </div>
            <div class="hidden sm:block">
              <div class="font-semibold text-xs text-main leading-tight">${activeBiz.name}</div>
              <div class="text-[10px] text-muted">${activeBiz.type}</div>
            </div>
            ${getIcon('ChevronDown', 'w-3.5 h-3.5 text-muted ml-1')}
          </button>

          <!-- Dropdown Menu -->
          <div id="biz-dropdown-menu" class="hidden absolute top-full left-0 mt-1.5 w-64 bg-surface border border-subtle rounded-2xl shadow-xl p-1.5 z-50 animate-slide-up">
            <div class="px-2.5 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Switch Demo Business</div>
            ${businesses.map(b => `
              <button onclick="appStore.switchBusiness('${b.id}'); toggleBizDropdown(false);" class="w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition ${b.id === activeBiz.id ? 'bg-primary-subtle text-primary font-semibold' : 'hover:bg-muted text-main'}">
                <div class="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center text-xs font-bold">
                  ${b.name.slice(0, 2).toUpperCase()}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs truncate">${b.name}</div>
                  <div class="text-[10px] text-muted truncate">${b.type}</div>
                </div>
                ${b.id === activeBiz.id ? getIcon('Check', 'w-4 h-4 text-primary') : ''}
              </button>
            `).join('')}
            <div class="border-t border-subtle my-1"></div>
            <button onclick="navigateTo('/app/onboarding'); toggleBizDropdown(false);" class="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-muted hover:text-main rounded-xl hover:bg-muted transition">
              ${getIcon('Plus', 'w-3.5 h-3.5')}
              <span>Add New Business Profile</span>
            </button>
          </div>
        </div>

        <!-- Quick Tour Pill -->
        <button onclick="appStore.toggleTour(true)" class="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-subtle text-xs text-muted hover:text-main hover:bg-muted transition">
          ${getIcon('Play', 'w-3 h-3 text-teal')}
          <span>2-Min Demo Tour</span>
        </button>
      </div>

      <!-- Right Action Tools -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Simulate Incoming Message Button -->
        <button onclick="appStore.simulateIncomingMessage()" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-md relative overflow-hidden" title="Simulate a realistic live messy message">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-semibold text-xs whitespace-nowrap">Simulate Incoming Message</span>
        </button>

        <!-- Command Palette Trigger (Ctrl+K) -->
        <button onclick="appStore.toggleCommandPalette(true)" class="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-subtle bg-canvas hover:bg-muted text-muted text-xs transition" title="Search commands & tickets (Ctrl+K)">
          ${getIcon('Search', 'w-3.5 h-3.5')}
          <span class="text-dim">Search</span>
          <kbd class="px-1.5 py-0.5 text-[10px] bg-surface rounded border border-subtle font-mono text-dim">⌘K</kbd>
        </button>

        <!-- Dark Mode Toggle -->
        <button onclick="appStore.toggleTheme()" class="p-2 text-muted hover:text-main rounded-xl hover:bg-muted transition" title="Toggle Dark/Light Mode">
          ${getIcon(isDark ? 'Sun' : 'Moon', 'w-4 h-4')}
        </button>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-2 pl-2 border-l border-subtle">
          <div class="w-8 h-8 rounded-full overflow-hidden border border-subtle flex-shrink-0">
            <img src="${activeBiz.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80'}" alt="${activeBiz.owner}" class="w-full h-full object-cover">
          </div>
          <div class="hidden md:block text-left">
            <div class="text-xs font-semibold text-main leading-none">${activeBiz.owner}</div>
            <div class="text-[10px] text-muted leading-tight mt-0.5">Owner</div>
          </div>
        </div>
      </div>
    </header>
  `;
}

function toggleBizDropdown(forceState = null) {
  const menu = document.getElementById('biz-dropdown-menu');
  if (!menu) return;
  if (forceState !== null) {
    if (forceState) menu.classList.remove('hidden');
    else menu.classList.add('hidden');
  } else {
    menu.classList.toggle('hidden');
  }
}

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
  const btn = document.getElementById('biz-dropdown-btn');
  const menu = document.getElementById('biz-dropdown-menu');
  if (menu && !menu.classList.contains('hidden') && btn && !btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});
