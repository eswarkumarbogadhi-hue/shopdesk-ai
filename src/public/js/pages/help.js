// ShopDesk AI - Help Center with Searchable Articles

function renderHelpPage() {
  const articles = [
    {
      category: "Getting Started",
      title: "How to complete the 2-minute onboarding wizard",
      snippet: "Paste your price list and primary FAQs to ground the AI model immediately."
    },
    {
      category: "Omnichannel Desk",
      title: "Connecting your WhatsApp Business Cloud API",
      snippet: "Step-by-step verification of Meta Graph tokens and webhook subscriptions."
    },
    {
      category: "Grounding & Accuracy",
      title: "Why does ShopDesk never hallucinate prices?",
      snippet: "Our strict grounding pipeline forces the AI to check verified Knowledge Base prices before generating text."
    },
    {
      category: "Safety & Escalations",
      title: "Setting up allergen alerts and custom keyword triggers",
      snippet: "Configure tripwires like 'hospital', 'sue', or 'poisoning' to halt automation instantly."
    },
    {
      category: "Productivity",
      title: "Keyboard shortcuts cheatsheet for lightning-fast inbox triage",
      snippet: "Press J/K to jump between tickets, and E to approve and send replies in 1 second."
    }
  ];

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-8">
        <h1 class="font-display font-extrabold text-3xl text-main mb-2">Help Center & Knowledge</h1>
        <p class="text-xs text-muted mb-6">Find guides, setup tutorials, and tips to maximize your desk efficiency.</p>
        
        <div class="relative max-w-md mx-auto">
          <input type="text" placeholder="Search documentation articles..." class="input text-xs pl-8 py-2.5 shadow-sm" />
          <span class="absolute left-3 top-3 text-muted">${getIcon('Search', 'w-3.5 h-3.5')}</span>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="space-y-3">
        ${articles.map(a => `
          <div class="card p-5 bg-surface hover:shadow-md transition cursor-pointer flex items-center justify-between group">
            <div class="space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-primary">${a.category}</span>
              <h3 class="font-display font-bold text-sm text-main group-hover:text-primary transition">${a.title}</h3>
              <p class="text-xs text-muted">${a.snippet}</p>
            </div>
            ${getIcon('ChevronRight', 'w-4 h-4 text-muted group-hover:translate-x-1 transition-transform')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
