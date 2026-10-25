// ShopDesk AI - Live Demo Playground (Zero Login Required!)

let demoMessageInput = "2 dozen choc cupcakes for sat 5pm pls, one box nut-free for my nephew's birthday!! Can we pick up around 5? Also can u write Happy 7th Leo in blue on the toppers?? 🙏🎂";
let demoChannelInput = "whatsapp";
let demoProcessing = false;
let demoResult = null;

const SAMPLE_DEMO_PRESETS = [
  {
    label: "Bakery Nut Allergy Rush",
    biz: "bakery",
    channel: "whatsapp",
    text: "2 dozen choc cupcakes for sat 5pm pls, one box nut-free for my nephew's birthday!! Can we pick up around 5? Also can u write Happy 7th Leo in blue on the toppers?? 🙏🎂"
  },
  {
    label: "Boutique Tracking Complaint",
    biz: "boutique",
    channel: "instagram",
    text: "hey!! ordered the blue hoodie size M last wk still nothing?? 😡 order #4821 tracking just says label created for 6 days. this was supposed to be a birthday gift for yesterday!!"
  },
  {
    label: "Salon Balayage Booking",
    biz: "salon",
    channel: "instagram",
    text: "hey Marcus!! Need a full balayage touchup & haircut before my sister's wedding in Malibu! 👰‍♀️ Are you open next Thursday afternoon around 2pm or 3pm? Sending you my inspo pic in next dm!!"
  },
  {
    label: "Spanish Sizing Inquiry",
    biz: "boutique",
    channel: "whatsapp",
    text: "Hola! Compré el vestido de seda champagne para mi prometida pero le quedó grande. ¿Cómo gestiono el cambio de talla o reembolso? Pedido #AA-5092. Gracias!"
  },
  {
    label: "Critical Scalp Irritation",
    biz: "salon",
    channel: "whatsapp",
    text: "My scalp is burning and red after my bleach session yesterday with Tyler 😭 It feels so tender and there are tiny blisters near my temple. I need Marcus to call me immediately."
  },
  {
    label: "Spam Follower Bot",
    biz: "bakery",
    channel: "instagram",
    text: "DM us for 50k authentic real Instagram followers starting at $15! Boost your bakery exposure today click link in bio 🚀🚀"
  }
];

function renderLiveDemoPage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Title -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-subtle text-teal-text text-xs font-bold mb-3">
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          Interactive AI Sandbox (Real Server-Side AI)
        </span>
        <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-main mb-3">
          Experience Live AI Classification & Drafting
        </h1>
        <p class="text-muted text-sm sm:text-base">
          Paste any messy, typo-filled customer message or choose one of our real-world presets below.
        </p>
      </div>

      <!-- Quick Preset Buttons -->
      <div class="mb-8">
        <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-2.5 text-center">
          Click a realistic messy message preset:
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          ${SAMPLE_DEMO_PRESETS.map((p, idx) => `
            <button 
              onclick="loadDemoPreset(${idx})"
              class="px-3 py-1.5 rounded-xl border border-subtle bg-surface hover:bg-muted text-xs font-medium text-main transition flex items-center gap-1.5 shadow-sm"
            >
              ${getChannelIcon(p.channel, 'w-3.5 h-3.5')}
              <span>${p.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Two-Column Interactive Sandbox -->
      <div class="demo-grid w-full">
        <!-- Left: Input Console (5 cols) -->
        <div class="card p-6 bg-surface shadow-xl w-full flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-subtle">
              <span class="font-display font-bold text-sm text-main flex items-center gap-2">
                ${getIcon('MessageSquare', 'w-4 h-4 text-primary')} Input Console
              </span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-muted">Channel:</span>
                <select 
                  id="demo-channel" 
                  class="select text-xs py-1 px-2 w-auto font-medium"
                  onchange="demoChannelInput = this.value"
                >
                  <option value="whatsapp" ${demoChannelInput === 'whatsapp' ? 'selected' : ''}>WhatsApp</option>
                  <option value="instagram" ${demoChannelInput === 'instagram' ? 'selected' : ''}>Instagram DM</option>
                  <option value="gmail" ${demoChannelInput === 'gmail' ? 'selected' : ''}>Gmail</option>
                  <option value="webchat" ${demoChannelInput === 'webchat' ? 'selected' : ''}>Website Chat</option>
                </select>
              </div>
            </div>

            <label class="block text-xs font-semibold text-muted mb-2">Messy Customer Message:</label>
            <textarea 
              id="demo-textarea"
              class="textarea text-xs font-mono leading-relaxed h-44 mb-4 resize-none w-full"
              placeholder="Paste any messy customer message here..."
              oninput="demoMessageInput = this.value"
            >${demoMessageInput}</textarea>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-subtle">
            <span class="text-[11px] text-muted">
              Context: <strong>${activeBiz.name}</strong>
            </span>
            <button 
              onclick="executeDemoProcessing()" 
              class="btn btn-primary text-xs px-5 py-2.5 font-bold shadow-md flex items-center gap-2 ${demoProcessing ? 'opacity-60 pointer-events-none' : ''}"
            >
              ${demoProcessing ? `
                <span class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Processing...</span>
              ` : `
                ${getIcon('Sparkles', 'w-4 h-4')}
                <span>Analyze & Draft Reply</span>
              `}
            </button>
          </div>
        </div>

        <!-- Right: AI Output Console (7 cols) -->
        <div class="card p-6 bg-surface shadow-xl w-full">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-subtle">
            <span class="font-display font-bold text-sm text-main flex items-center gap-2">
              ${getIcon('Sparkles', 'w-4 h-4 text-teal')} AI Structured Result
            </span>
            <div id="demo-confidence-badge">
              ${demoResult ? `
                <span class="px-2.5 py-1 rounded-full bg-emerald-subtle text-emerald-text text-xs font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Confidence: ${Math.round(demoResult.confidence * 100)}%
                </span>
              ` : `<span class="text-xs text-muted">Click Analyze to run</span>`}
            </div>
          </div>

          <div id="demo-results-container">
            ${demoResult ? renderDemoResultDetails(demoResult) : `
              <div class="p-12 text-center text-muted">
                <div class="w-12 h-12 rounded-2xl bg-canvas border border-subtle mx-auto mb-3 flex items-center justify-center text-muted">
                  ${getIcon('Sparkles', 'w-6 h-6')}
                </div>
                <div class="font-semibold text-sm text-main mb-1">Waiting for input</div>
                <p class="text-xs max-w-sm mx-auto">
                  Click the "Analyze & Draft Reply" button to see classification, allergy extraction, and grounded drafts in action.
                </p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDemoResultDetails(r) {
  return `
    <div class="space-y-4 animate-fade-in text-xs">
      <!-- Badges Row -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="badge badge-${r.category} text-xs font-bold uppercase tracking-wider">
          ${r.category}
        </span>
        <span class="badge badge-urgent-${r.urgency} text-xs">
          Urgency: ${r.urgency.toUpperCase()}
        </span>
        <span class="px-2.5 py-0.5 rounded-full bg-canvas border border-subtle text-muted text-xs font-medium">
          Sentiment: ${r.sentiment}
        </span>
        <span class="px-2.5 py-0.5 rounded-full bg-canvas border border-subtle text-muted text-xs font-medium uppercase">
          Lang: ${r.language}
        </span>
      </div>

      <!-- Explainability Card -->
      <div class="p-3 rounded-xl bg-canvas border border-subtle">
        <div class="font-semibold text-main mb-1 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
          ${getIcon('Info', 'w-3.5 h-3.5 text-primary')} Why This Classification:
        </div>
        <p class="text-muted leading-relaxed">${r.why_classification || "Analyzed keywords and semantic patterns."}</p>
      </div>

      <!-- Extracted Entities -->
      <div class="p-4 rounded-xl bg-surface border border-subtle shadow-sm space-y-2">
        <div class="font-semibold text-main text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          ${getIcon('ShoppingBag', 'w-3.5 h-3.5 text-emerald')} Extracted Entities:
        </div>
        ${r.entities.allergies ? `
          <div class="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold flex items-center gap-2">
            <span>🛡️ SAFETY WARNING:</span>
            <span>${r.entities.allergies}</span>
          </div>
        ` : ''}
        <div class="grid grid-cols-2 gap-2 text-muted">
          <div>Items: <strong class="text-main">${r.entities.items ? r.entities.items.join(', ') : 'None extracted'}</strong></div>
          <div>Dates: <strong class="text-main">${r.entities.dates || 'None'}</strong></div>
          <div>Order #: <strong class="text-main">${r.entities.order_number || 'None'}</strong></div>
          <div>Action: <strong class="text-main">${r.suggested_next_action}</strong></div>
        </div>
      </div>

      <!-- Human Escalation Alert -->
      ${r.needs_human ? `
        <div class="p-3 rounded-xl bg-coral-subtle border border-rose-300 text-coral-text flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${getIcon('AlertTriangle', 'w-4 h-4')}
            <span class="font-bold">Human Escalation Triggered:</span>
            <span>${r.needs_human_reason}</span>
          </div>
          <span class="text-[10px] font-bold uppercase bg-coral text-white px-2 py-0.5 rounded-full">Requires Review</span>
        </div>
      ` : `
        <div class="p-2.5 rounded-xl bg-emerald-subtle border border-emerald-200 text-emerald-text flex items-center gap-2 text-[11px]">
          ${getIcon('CheckCircle2', 'w-4 h-4')}
          <span>Within safe automated parameters. AI draft ready for 1-click approval.</span>
        </div>
      `}

      <!-- Grounded Draft Reply -->
      <div class="p-4 rounded-xl bg-canvas border border-subtle space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-main text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            ${getIcon('Sparkles', 'w-3.5 h-3.5 text-primary')} Grounded AI Draft Reply:
          </span>
          <button onclick="navigator.clipboard.writeText(document.getElementById('draft-text-content').innerText); toast.show({ title: 'Copied to clipboard!', message: 'Draft copied successfully.', type: 'info' })" class="text-muted hover:text-main text-[11px] flex items-center gap-1">
            ${getIcon('Copy', 'w-3 h-3')} Copy
          </button>
        </div>
        <div id="draft-text-content" class="p-3.5 rounded-xl bg-surface border border-subtle text-xs text-main leading-relaxed whitespace-pre-line font-sans shadow-sm">
          ${r.suggested_reply || "No reply draft generated."}
        </div>
      </div>
    </div>
  `;
}

function loadDemoPreset(index) {
  const p = SAMPLE_DEMO_PRESETS[index];
  demoMessageInput = p.text;
  demoChannelInput = p.channel;
  if (p.biz !== appStore.state.activeBusiness?.id) {
    appStore.switchBusiness(p.biz);
  }
  executeDemoProcessing();
}

async function executeDemoProcessing() {
  const textarea = document.getElementById('demo-textarea');
  const text = textarea ? textarea.value : demoMessageInput;
  if (!text.trim()) return;

  demoProcessing = true;
  renderApp();

  try {
    const res = await fetch('/api/process-ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        channel: demoChannelInput,
        businessId: appStore.state.activeBusiness?.id
      })
    });
    demoResult = await res.json();
    toast.playSound('pop');
  } catch (e) {
    console.error('[Live Demo Error]', e);
  } finally {
    demoProcessing = false;
    renderApp();
  }
}
