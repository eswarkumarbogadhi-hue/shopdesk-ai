// ShopDesk AI - Interactive How It Works Stepper Page

let activeStepperIndex = 0;

const STEPPER_DATA = [
  {
    step: "01",
    title: "Customer sends a messy message",
    subtitle: "From WhatsApp, Instagram, or Email at any hour",
    description: "Your customer dashes off a fast message full of emojis, abbreviations, and informal notes like: 'hey Sarah 2 dozen choc cupcakes for sat 5pm pls one box nut free for Leo!!'. You don't have to decipher it manually between customers.",
    previewType: "messy",
    highlight: "Zero formatting required from the customer."
  },
  {
    step: "02",
    title: "AI classifies intent & extracts entities",
    subtitle: "Sub-second natural language processing",
    description: "ShopDesk AI parses the message into an Order ticket, pulls out the exact item, flags a critical nut allergy, schedules the pickup time (Saturday 5:00 PM), and checks your pricing catalog for the total ($74.00).",
    previewType: "extraction",
    highlight: "96% classification accuracy with explicit allergy alert."
  },
  {
    step: "03",
    title: "Draft generated in your voice",
    subtitle: "Strictly grounded in your FAQs & pricing",
    description: "The AI crafts a draft reply reflecting your chosen warmth, brevity, and emoji settings. It acknowledges the nut-free sterilization protocol and confirms Saturday pickup at 84 Maplewood Crescent.",
    previewType: "draft",
    highlight: "Never makes up prices or promises outside the Knowledge Base."
  },
  {
    step: "04",
    title: "Owner approves or edits with 1 tap",
    subtitle: "Human-in-the-loop peace of mind",
    description: "Review the draft on your phone in 5 seconds. Hit 'Approve & Send' to dispatch the reply via the customer's original channel, or make a quick manual edit if you want to add a personal greeting.",
    previewType: "approved",
    highlight: "Clear an entire morning inbox in under 5 minutes."
  }
];

function renderHowItWorksPage() {
  const current = STEPPER_DATA[activeStepperIndex];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold uppercase tracking-wider text-teal">Interactive Walkthrough</span>
        <h1 class="font-display font-extrabold text-4xl sm:text-5xl text-main mt-2 mb-4">
          How ShopDesk AI works behind the scenes
        </h1>
        <p class="text-muted text-base">Click through each stage of the AI pipeline to see how raw messages become delighted customers.</p>
      </div>

      <!-- Stepper Tabs -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
        ${STEPPER_DATA.map((s, idx) => `
          <button 
            onclick="setStepperStep(${idx})"
            class="p-4 rounded-2xl border text-left transition ${
              idx === activeStepperIndex 
                ? 'border-primary bg-primary-subtle/50 shadow-md ring-2 ring-primary/20' 
                : 'border-subtle bg-surface hover:bg-muted'
            }"
          >
            <div class="text-xs font-bold ${idx === activeStepperIndex ? 'text-primary' : 'text-muted'} mb-1">STEP ${s.step}</div>
            <div class="text-xs font-semibold text-main truncate">${s.title}</div>
          </button>
        `).join('')}
      </div>

      <!-- Active Step Visualizer Box -->
      <div class="max-w-4xl mx-auto card p-6 sm:p-10 shadow-xl bg-surface">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-subtle text-teal-text text-xs font-bold mb-4">
              ${current.highlight}
            </div>
            <h2 class="font-display font-bold text-2xl text-main mb-2">${current.title}</h2>
            <h3 class="text-sm text-primary font-medium mb-4">${current.subtitle}</h3>
            <p class="text-xs text-muted leading-relaxed mb-6">${current.description}</p>
            
            <div class="flex items-center gap-3">
              <button onclick="setStepperStep(${(activeStepperIndex - 1 + 4) % 4})" class="btn btn-secondary btn-sm">
                ← Previous
              </button>
              <button onclick="setStepperStep(${(activeStepperIndex + 1) % 4})" class="btn btn-primary btn-sm">
                Next Stage →
              </button>
            </div>
          </div>

          <!-- Interactive Mock Preview for this step -->
          <div class="p-5 rounded-2xl bg-canvas border border-subtle shadow-inner">
            ${renderStepPreview(current.previewType)}
          </div>
        </div>
      </div>
    </div>
  `;
}

function setStepperStep(index) {
  activeStepperIndex = index;
  renderApp();
}

function renderStepPreview(type) {
  switch (type) {
    case 'messy':
      return `
        <div class="text-xs font-semibold text-muted mb-2 flex items-center justify-between">
          <span>WhatsApp Message</span>
          <span class="text-coral">Raw & Unsorted</span>
        </div>
        <div class="p-4 rounded-xl bg-surface border border-subtle text-xs text-main font-mono leading-relaxed shadow-sm">
          "hey Sarah 2 dozen choc cupcakes for sat 5pm pls one box nut free for Leo!! also can u do happy 7th leo on top? 🙏"
        </div>
      `;
    case 'extraction':
      return `
        <div class="text-xs font-semibold text-muted mb-2 flex items-center justify-between">
          <span>AI Entity Extractor</span>
          <span class="badge badge-order">ORDER DETECTED</span>
        </div>
        <div class="p-3.5 rounded-xl bg-surface border border-subtle text-xs space-y-2 shadow-sm font-sans">
          <div class="flex justify-between border-b pb-1"><span>Category:</span> <span class="font-bold text-primary">Order (96% match)</span></div>
          <div class="flex justify-between border-b pb-1"><span>Items:</span> <span class="font-medium">2 Dozen Chocolate Cupcakes</span></div>
          <div class="flex justify-between border-b pb-1"><span>Allergy Flag:</span> <span class="font-bold text-coral">Strict Nut-Free (1 Box) 🛡️</span></div>
          <div class="flex justify-between"><span>Scheduled Time:</span> <span class="font-medium">Saturday 5:00 PM</span></div>
        </div>
      `;
    case 'draft':
      return `
        <div class="text-xs font-semibold text-muted mb-2 flex items-center justify-between">
          <span>Grounded AI Draft</span>
          <span class="text-emerald-500 font-bold">100% Verified</span>
        </div>
        <div class="p-3.5 rounded-xl bg-surface border border-subtle text-xs text-main leading-relaxed shadow-sm">
          "Hey Hannah! 🧁 We'd love to make Leo's 7th birthday extra sweet! I have you down for 2 dozen chocolate cupcakes (1 box sterilized nut-free 🛡️) for Saturday at 5 PM. Total is $74. Shall I send the link?"
        </div>
      `;
    case 'approved':
      return `
        <div class="text-xs font-semibold text-muted mb-2 flex items-center justify-between">
          <span>One-Click Action</span>
          <span class="text-primary font-bold">Dispatched</span>
        </div>
        <div class="p-4 rounded-xl bg-emerald-subtle border border-emerald-300 text-xs text-emerald-text text-center space-y-2">
          <div class="font-bold text-sm">✓ Reply Sent to Customer</div>
          <div class="text-[11px] text-muted">Order ORD-9281 added to Kitchen Kanban Board. Total time: 8 seconds.</div>
        </div>
      `;
  }
}
