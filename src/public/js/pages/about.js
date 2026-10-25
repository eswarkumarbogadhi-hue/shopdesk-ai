// ShopDesk AI - About & Impact Page

function renderAboutPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold uppercase tracking-wider text-primary">Our Mission & Principles</span>
        <h1 class="font-display font-extrabold text-4xl sm:text-5xl text-main mt-2 mb-4">
          Empowering small businesses with AI that cares
        </h1>
        <p class="text-muted text-base">
          Small business owners are the beating heart of local communities. They shouldn't have to sacrifice their evenings answering repetitive customer messages.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div class="card p-6">
          <div class="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center font-bold text-base mb-4">
            ${getIcon('Heart', 'w-5 h-5')}
          </div>
          <h3 class="font-display font-bold text-lg text-main mb-2">Why Small Businesses?</h3>
          <p class="text-xs text-muted leading-relaxed">
            Enterprise customer support tools cost thousands and require dedicated IT teams. Home bakers, boutique owners, and salon artists need an assistant that works right on their phone and costs less than a bag of flour.
          </p>
        </div>

        <div class="card p-6">
          <div class="w-10 h-10 rounded-xl bg-teal-subtle text-teal-text flex items-center justify-center font-bold text-base mb-4">
            ${getIcon('ShieldCheck', 'w-5 h-5')}
          </div>
          <h3 class="font-display font-bold text-lg text-main mb-2">Our Grounding Guarantee</h3>
          <p class="text-xs text-muted leading-relaxed">
            Traditional AI chatbots make up prices and hallucinate fake policies. ShopDesk AI is strictly constrained: it only quotes facts from your verified Knowledge Base. If it doesn't know, it asks.
          </p>
        </div>

        <div class="card p-6">
          <div class="w-10 h-10 rounded-xl bg-coral-subtle text-coral-text flex items-center justify-center font-bold text-base mb-4">
            ${getIcon('Users', 'w-5 h-5')}
          </div>
          <h3 class="font-display font-bold text-lg text-main mb-2">Human-in-the-Loop Always</h3>
          <p class="text-xs text-muted leading-relaxed">
            AI should augment the shop owner, not replace human warmth. Every draft is labeled 'AI draft', and high-risk complaints or refund requests escalate to the owner automatically.
          </p>
        </div>
      </div>

      <!-- Responsible AI Charter -->
      <div class="max-w-4xl mx-auto card p-8 border-primary/20 bg-gradient-to-br from-surface to-primary-subtle/20 shadow-xl">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 rounded-xl bg-primary text-white">
            ${getIcon('Shield', 'w-5 h-5')}
          </div>
          <div>
            <h2 class="font-display font-bold text-xl text-main">The ShopDesk Responsible AI Charter</h2>
            <div class="text-xs text-muted">Our foundational promise to every merchant</div>
          </div>
        </div>

        <div class="space-y-4 text-xs text-muted leading-relaxed pt-4 border-t border-subtle">
          <p>
            <strong>1. Zero Price Hallucinations:</strong> The model never invents discounts, promises delivery windows, or invents menu items not present in your Knowledge Base.
          </p>
          <p>
            <strong>2. Health & Safety Prioritization:</strong> Any mention of allergens, burns, sickness, or severe complaints instantly pauses automation and triggers owner notification.
          </p>
          <p>
            <strong>3. Privacy by Design:</strong> Customer personal messages are never sold or used for public model training. You own your data 100%.
          </p>
        </div>
      </div>
    </div>
  `;
}
