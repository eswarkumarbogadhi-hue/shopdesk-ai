// ShopDesk AI - Channels & Integrations Page

function renderIntegrationsPage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };
  const channels = activeBiz.channels || [
    { id: "whatsapp", name: "WhatsApp Business Cloud", handle: "+1 (555) 349-8201", connected: true },
    { id: "instagram", name: "Instagram DMs", handle: "@sweetcrumbs_atx", connected: true },
    { id: "gmail", name: "Gmail / Google Workspace", handle: "orders@sweetcrumbs.com", connected: true },
    { id: "webchat", name: "Website Storefront Widget", handle: "sweetcrumbs.com", connected: true }
  ];

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Channels & Integrations</h1>
            <span class="badge badge-order text-xs font-bold">4 Connected</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Manage webhooks, API tokens, and live customer message streams.</p>
        </div>

        <button onclick="toast.show({ title: 'Sync Completed', message: 'All 4 webhooks verified active and receiving events.', type: 'success' })" class="btn btn-secondary btn-sm flex items-center gap-1.5 shadow-sm">
          ${getIcon('RefreshCw', 'w-3.5 h-3.5')}
          <span>Check Webhook Health</span>
        </button>
      </div>

      <!-- Channels List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${channels.map(ch => `
          <div class="card p-6 bg-surface space-y-4 hover:shadow-md transition">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-canvas border border-subtle flex items-center justify-center">
                  ${getChannelIcon(ch.id, 'w-6 h-6')}
                </div>
                <div>
                  <h3 class="font-display font-bold text-sm text-main">${ch.name}</h3>
                  <div class="text-xs text-muted">${ch.handle}</div>
                </div>
              </div>

              <span class="px-2.5 py-0.5 rounded-full bg-emerald-subtle text-emerald-text text-xs font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>

            <div class="pt-3 border-t border-subtle flex items-center justify-between text-xs text-muted">
              <span>Webhook Status: <strong class="text-emerald-600">Active (200 OK)</strong></span>
              <button onclick="toast.show({ title: 'Channel Settings', message: 'Config modal for ${ch.name}', type: 'info' })" class="btn btn-secondary btn-sm text-[11px] py-1">Configure</button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Embed Script Generator for Website Widget -->
      <div class="card p-6 bg-surface space-y-3">
        <h3 class="font-display font-bold text-sm text-main flex items-center gap-2">
          ${getIcon('Zap', 'w-4 h-4 text-indigo-500')} Website Live Chat Embed Code
        </h3>
        <p class="text-xs text-muted">Copy and paste this script right before the closing &lt;/body&gt; tag on your Shopify, Squarespace, or Wix site.</p>
        
        <div class="p-3 rounded-xl bg-canvas border border-subtle font-mono text-[11px] text-main flex items-center justify-between overflow-x-auto">
          <code>&lt;script src="https://cdn.shopdesk.ai/v1/widget.js" data-shop-id="${activeBiz.id}" async&gt;&lt;/script&gt;</code>
          <button onclick="navigator.clipboard.writeText('<script src=&quot;https://cdn.shopdesk.ai/v1/widget.js&quot; data-shop-id=&quot;${activeBiz.id}&quot; async></script>'); toast.show({ title: 'Snippet Copied!', message: 'Ready to paste into your site.', type: 'info' })" class="btn btn-secondary btn-sm text-[10px] py-1 px-2.5 ml-4 flex items-center gap-1">
            ${getIcon('Copy', 'w-3 h-3')} Copy
          </button>
        </div>
      </div>
    </div>
  `;
}
