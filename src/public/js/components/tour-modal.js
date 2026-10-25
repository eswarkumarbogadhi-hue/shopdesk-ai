// ShopDesk AI - 2-Minute Guided Product Tour Modal
// Designed specifically for hackathon judges & first-time shop owners

let currentTourStep = 0;

const TOUR_STEPS = [
  {
    title: "1. The Unified Multi-Channel Inbox",
    subtitle: "Say goodbye to jumping between WhatsApp, Instagram, and Gmail.",
    description: "ShopDesk AI pulls every messy customer message into a single, clean workspace. Notice how channel icons, customer VIP badges, and real-time urgency alerts give the shop owner complete clarity in under 5 seconds.",
    targetRoute: "/app/inbox",
    badge: "Omnichannel Desk"
  },
  {
    title: "2. Instant Classification & Entity Extraction",
    subtitle: "AI sorts orders, complaints, enquiries, and refunds automatically.",
    description: "Watch how messy messages with typos, emojis, and voice transcripts get extracted into structured orders: quantities, allergy flags, delivery dates, and item totals. No manual data entry ever again.",
    targetRoute: "/app/inbox",
    badge: "Structured Extraction"
  },
  {
    title: "3. Grounded Drafts in the Owner's Voice",
    subtitle: "Strictly grounded in your Knowledge Base. Zero hallucinations.",
    description: "Every AI draft replies in the owner's exact tone (warm, concise, or playful with emojis) and strictly quotes prices, allergen policies, and opening hours from the verified Knowledge Base. If details are missing, it asks a clarifying question.",
    targetRoute: "/app/tone",
    badge: "100% Grounded"
  },
  {
    title: "4. Safe Human-in-the-Loop & Automatic Escalation",
    subtitle: "Full control when it matters most.",
    description: "High-risk situations (angry customers, refund requests over $40, or safety/allergy claims) are automatically escalated to a human with clear 'Why this was flagged' explanations. One-click Approve & Send lets owners clear their inbox in minutes.",
    targetRoute: "/app/complaints",
    badge: "Responsible AI"
  }
];

function renderTourModal() {
  if (!appStore.state.tourOpen) return '';

  const step = TOUR_STEPS[currentTourStep];

  return `
    <div id="tour-backdrop" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div class="w-full max-w-lg bg-surface border border-subtle rounded-3xl shadow-2xl overflow-hidden animate-slide-up" onclick="event.stopPropagation()">
        <!-- Header Banner -->
        <div class="p-6 gradient-brand text-white relative">
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Step ${currentTourStep + 1} of ${TOUR_STEPS.length}: ${step.badge}
            </span>
            <button onclick="appStore.toggleTour(false)" class="text-white/80 hover:text-white p-1 rounded-md transition">
              ${getIcon('XCircle', 'w-5 h-5')}
            </button>
          </div>
          <h3 class="font-display font-bold text-xl text-white mb-1">${step.title}</h3>
          <p class="text-xs text-white/90 font-medium">${step.subtitle}</p>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4">
          <p class="text-sm text-muted leading-relaxed">${step.description}</p>
          
          <!-- Stepper Dots -->
          <div class="flex items-center justify-center gap-2 pt-2">
            ${TOUR_STEPS.map((_, i) => `
              <span class="w-2.5 h-2.5 rounded-full transition-all ${i === currentTourStep ? 'w-8 bg-primary' : 'bg-muted'}"></span>
            `).join('')}
          </div>
        </div>

        <!-- Actions -->
        <div class="p-4 px-6 border-t border-subtle bg-canvas flex items-center justify-between">
          <button 
            onclick="prevTourStep()" 
            class="btn btn-secondary text-xs ${currentTourStep === 0 ? 'opacity-40 pointer-events-none' : ''}"
          >
            ${getIcon('ChevronLeft', 'w-4 h-4')}
            <span>Previous</span>
          </button>

          <div class="flex items-center gap-2">
            <button onclick="appStore.toggleTour(false)" class="text-xs text-muted hover:text-main px-3 py-1.5">
              Skip Tour
            </button>
            <button onclick="nextTourStep()" class="btn btn-primary text-xs">
              <span>${currentTourStep === TOUR_STEPS.length - 1 ? 'Finish & Explore' : 'Next Step'}</span>
              ${getIcon('ArrowRight', 'w-4 h-4')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function nextTourStep() {
  if (currentTourStep < TOUR_STEPS.length - 1) {
    currentTourStep++;
    const step = TOUR_STEPS[currentTourStep];
    if (step.targetRoute && window.location.pathname !== step.targetRoute) {
      navigateTo(step.targetRoute);
    }
    appStore.notify();
  } else {
    appStore.toggleTour(false);
    currentTourStep = 0;
  }
}

function prevTourStep() {
  if (currentTourStep > 0) {
    currentTourStep--;
    const step = TOUR_STEPS[currentTourStep];
    if (step.targetRoute && window.location.pathname !== step.targetRoute) {
      navigateTo(step.targetRoute);
    }
    appStore.notify();
  }
}
