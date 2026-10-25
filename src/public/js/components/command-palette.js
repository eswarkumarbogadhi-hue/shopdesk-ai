// ShopDesk AI - Command Palette (Ctrl+K / Cmd+K)

function renderCommandPalette() {
  if (!appStore.state.commandPaletteOpen) return '';

  return `
    <div id="cmd-palette-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in" onclick="if(event.target.id === 'cmd-palette-backdrop') appStore.toggleCommandPalette(false)">
      <div class="w-full max-w-xl bg-surface border border-subtle rounded-2xl shadow-2xl overflow-hidden animate-slide-up" onclick="event.stopPropagation()">
        <!-- Search Input Bar -->
        <div class="flex items-center gap-3 px-4 py-3 border-b border-subtle">
          ${getIcon('Search', 'w-5 h-5 text-muted')}
          <input 
            id="cmd-input"
            type="text" 
            placeholder="Type a command, search tickets, or ask AI..." 
            class="flex-1 bg-transparent border-0 outline-none text-main placeholder-dim text-sm"
            oninput="handleCommandSearch(this.value)"
            autofocus
          />
          <kbd class="px-2 py-0.5 text-xs bg-canvas rounded border border-subtle font-mono text-dim">ESC</kbd>
        </div>

        <!-- Command List Body -->
        <div id="cmd-results" class="max-h-80 overflow-y-auto p-2 space-y-1 text-xs">
          <!-- Quick Actions -->
          <div class="px-2 py-1 text-[11px] font-semibold text-muted uppercase tracking-wider">Quick Actions</div>
          <button onclick="appStore.simulateIncomingMessage(); appStore.toggleCommandPalette(false);" class="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-muted text-main transition group">
            <div class="flex items-center gap-2.5">
              <span class="p-1 rounded-lg bg-emerald-subtle text-emerald-text">${getIcon('Sparkles', 'w-3.5 h-3.5')}</span>
              <span class="font-medium">Simulate New Live Messy Message</span>
            </div>
            <span class="text-dim text-[11px]">Key: S</span>
          </button>

          <button onclick="appStore.toggleTour(true); appStore.toggleCommandPalette(false);" class="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-muted text-main transition group">
            <div class="flex items-center gap-2.5">
              <span class="p-1 rounded-lg bg-primary-subtle text-primary">${getIcon('Play', 'w-3.5 h-3.5')}</span>
              <span class="font-medium">Launch 2-Minute Guided Demo Tour</span>
            </div>
            <span class="text-dim text-[11px]">Tour</span>
          </button>

          <button onclick="appStore.toggleTheme(); appStore.toggleCommandPalette(false);" class="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-muted text-main transition group">
            <div class="flex items-center gap-2.5">
              <span class="p-1 rounded-lg bg-muted text-muted">${getIcon('Moon', 'w-3.5 h-3.5')}</span>
              <span class="font-medium">Toggle Dark / Light Mode</span>
            </div>
            <span class="text-dim text-[11px]">Theme</span>
          </button>

          <!-- Navigation Shortcuts -->
          <div class="px-2 py-1 mt-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Navigate to Page</div>
          <button onclick="navigateTo('/app/dashboard'); appStore.toggleCommandPalette(false);" class="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-muted text-main transition">
            ${getIcon('LayoutDashboard', 'w-3.5 h-3.5 text-muted')}
            <span>Dashboard Overview</span>
          </button>
          <button onclick="navigateTo('/app/inbox'); appStore.toggleCommandPalette(false);" class="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-muted text-main transition">
            ${getIcon('Inbox', 'w-3.5 h-3.5 text-muted')}
            <span>Unified AI Inbox</span>
          </button>
          <button onclick="navigateTo('/app/orders'); appStore.toggleCommandPalette(false);" class="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-muted text-main transition">
            ${getIcon('ShoppingBag', 'w-3.5 h-3.5 text-muted')}
            <span>Orders & Kanban Board</span>
          </button>
          <button onclick="navigateTo('/app/complaints'); appStore.toggleCommandPalette(false);" class="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-muted text-main transition">
            ${getIcon('AlertTriangle', 'w-3.5 h-3.5 text-coral')}
            <span>Complaints & Escalations Hub</span>
          </button>
          <button onclick="navigateTo('/demo'); appStore.toggleCommandPalette(false);" class="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-muted text-main transition">
            ${getIcon('Sparkles', 'w-3.5 h-3.5 text-teal')}
            <span>Live AI Demo Playground</span>
          </button>

          <!-- Switch Business -->
          <div class="px-2 py-1 mt-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Switch Active Business</div>
          ${(appStore.state.businesses || []).map(b => `
            <button onclick="appStore.switchBusiness('${b.id}'); appStore.toggleCommandPalette(false);" class="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-muted text-main transition">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full ${b.id === appStore.state.activeBusiness?.id ? 'bg-primary' : 'bg-muted'}"></span>
                <span>${b.name} (${b.type})</span>
              </div>
              ${b.id === appStore.state.activeBusiness?.id ? `<span class="text-[10px] text-primary font-bold">Active</span>` : ''}
            </button>
          `).join('')}
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 border-t border-subtle bg-canvas flex items-center justify-between text-[11px] text-dim">
          <span>Use <kbd class="font-mono">↑</kbd> <kbd class="font-mono">↓</kbd> to navigate, <kbd class="font-mono">Enter</kbd> to select</span>
          <span>Press <kbd class="font-mono">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  `;
}

function handleCommandSearch(query) {
  const container = document.getElementById('cmd-results');
  if (!container) return;
  if (!query.trim()) {
    // Re-render default commands
    container.innerHTML = `
      <div class="px-2 py-1 text-[11px] font-semibold text-muted uppercase tracking-wider">Quick Actions</div>
      <button onclick="appStore.simulateIncomingMessage(); appStore.toggleCommandPalette(false);" class="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-muted text-main transition">
        <div class="flex items-center gap-2.5">
          <span class="p-1 rounded-lg bg-emerald-subtle text-emerald-text">${getIcon('Sparkles', 'w-3.5 h-3.5')}</span>
          <span class="font-medium">Simulate New Live Messy Message</span>
        </div>
      </button>
    `;
    return;
  }

  const q = query.toLowerCase();
  const matchingTickets = (appStore.state.tickets || []).filter(t => 
    t.rawMessage.toLowerCase().includes(q) ||
    t.customer.name.toLowerCase().includes(q) ||
    t.id.toLowerCase().includes(q)
  ).slice(0, 5);

  let html = `<div class="px-2 py-1 text-[11px] font-semibold text-muted uppercase tracking-wider">Matching Tickets (${matchingTickets.length})</div>`;
  
  if (matchingTickets.length === 0) {
    html += `<div class="p-4 text-center text-muted">No tickets found matching "${query}"</div>`;
  } else {
    for (const t of matchingTickets) {
      html += `
        <button onclick="appStore.selectTicket('${t.id}'); navigateTo('/app/inbox'); appStore.toggleCommandPalette(false);" class="w-full flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-muted text-main transition">
          <div class="mt-0.5">${getChannelIcon(t.channel, 'w-3.5 h-3.5')}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-xs">${t.customer.name}</span>
              <span class="badge badge-${t.category} text-[10px]">${t.category}</span>
            </div>
            <div class="text-[11px] text-muted truncate">${t.rawMessage}</div>
          </div>
        </button>
      `;
    }
  }

  container.innerHTML = html;
}
