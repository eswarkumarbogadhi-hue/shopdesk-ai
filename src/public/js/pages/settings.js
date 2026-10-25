// ShopDesk AI - Settings, Privacy & Data Controls Page

function renderSettingsPage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="pb-2 border-b border-subtle">
        <h1 class="font-display font-extrabold text-2xl text-main">Settings & Preferences</h1>
        <p class="text-xs text-muted mt-0.5">Manage business profile, team notifications, data privacy, and demo environment.</p>
      </div>

      <!-- Business Profile -->
      <div class="card p-6 bg-surface space-y-4">
        <h3 class="font-display font-bold text-sm text-main">Business Information</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Company / Brand Name</label>
            <input type="text" value="${activeBiz.name}" class="input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Owner / Primary Contact</label>
            <input type="text" value="${activeBiz.owner}" class="input text-xs" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Currency</label>
            <input type="text" value="USD ($)" class="input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Timezone</label>
            <input type="text" value="${activeBiz.timezone || 'America/Chicago'}" class="input text-xs" />
          </div>
        </div>
      </div>

      <!-- Audio & Sound Notifications -->
      <div class="card p-6 bg-surface space-y-3">
        <h3 class="font-display font-bold text-sm text-main">Acoustic & Audio Feedback</h3>
        <p class="text-xs text-muted">Play synthetic chimes when new messages or urgent escalations arrive.</p>
        <div class="flex items-center gap-3 pt-2">
          <button onclick="toast.playSound('incoming'); toast.show({ title: 'Test Sound', message: 'Incoming melodic chime', type: 'incoming' })" class="btn btn-secondary btn-sm text-xs">
            Test Incoming Chime
          </button>
          <button onclick="toast.playSound('urgent'); toast.show({ title: 'Test Alert', message: 'Urgent escalation buzzer', type: 'urgent' })" class="btn btn-secondary btn-sm text-xs">
            Test Urgent Tone
          </button>
        </div>
      </div>

      <!-- Data Export & Demo Reset -->
      <div class="card p-6 bg-surface space-y-4 border-rose-200 dark:border-rose-900/40">
        <div>
          <h3 class="font-display font-bold text-sm text-coral-text">Privacy & Data Governance</h3>
          <p class="text-xs text-muted mt-1 leading-relaxed">
            You own 100% of your customer records. You can download your full database at any time or reset the demo sandbox.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button onclick="exportDataJson()" class="btn btn-secondary btn-sm flex items-center gap-1.5 text-xs">
            ${getIcon('Download', 'w-3.5 h-3.5')}
            <span>Export Complete JSON Data</span>
          </button>
          <button onclick="appStore.resetDemoData()" class="btn btn-coral btn-sm flex items-center gap-1.5 text-xs font-bold">
            ${getIcon('RefreshCw', 'w-3.5 h-3.5')}
            <span>Wipe & Reset Demo Environment</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function exportDataJson() {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    business: appStore.state.activeBusiness,
    tickets: appStore.state.tickets,
    orders: appStore.state.orders,
    complaints: appStore.state.complaints,
    customers: appStore.state.customers
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shopdesk-${appStore.state.activeBusiness.id}-export.json`;
  a.click();
  URL.revokeObjectURL(url);

  toast.show({
    title: "Data Exported! 📥",
    message: "JSON download started with all tickets, orders, and customer records.",
    type: "success",
    sound: "pop"
  });
}
