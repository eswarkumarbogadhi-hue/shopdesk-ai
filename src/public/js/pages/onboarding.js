// ShopDesk AI - 3-Step Under-2-Minute Onboarding Wizard

let onboardingStep = 1;

function renderOnboardingPage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };

  return `
    <div class="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between text-xs font-semibold text-muted mb-2">
          <span>Step ${onboardingStep} of 3</span>
          <span>${onboardingStep === 1 ? 'Business Profile' : onboardingStep === 2 ? 'Knowledge & Prices' : 'Tone & Channels'}</span>
        </div>
        <div class="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div class="bg-primary h-full transition-all duration-300" style="width: ${(onboardingStep / 3) * 100}%"></div>
        </div>
      </div>

      <!-- Main Step Card -->
      <div class="card p-8 bg-surface shadow-xl">
        ${onboardingStep === 1 ? renderOnboardingStep1(activeBiz) :
          onboardingStep === 2 ? renderOnboardingStep2(activeBiz) :
          renderOnboardingStep3(activeBiz)}
      </div>
    </div>
  `;
}

function renderOnboardingStep1(biz) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="font-display font-bold text-2xl text-main mb-1">Tell us about your business</h2>
        <p class="text-xs text-muted">This sets the foundation for your AI desk to address customers accurately.</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-muted mb-1">Business Name</label>
          <input type="text" id="ob-biz-name" value="${biz.name}" class="input text-xs" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Business Type</label>
            <input type="text" id="ob-biz-type" value="${biz.type}" class="input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Primary Owner</label>
            <input type="text" id="ob-biz-owner" value="${biz.owner}" class="input text-xs" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-muted mb-1">Opening / Working Hours</label>
          <input type="text" id="ob-biz-hours" value="${biz.knowledgeBase?.openingHours || 'Tue-Sat: 8am - 6pm'}" class="input text-xs" />
        </div>
      </div>

      <div class="pt-4 border-t border-subtle flex justify-end">
        <button onclick="onboardingStep = 2; renderApp();" class="btn btn-primary text-xs font-bold px-6 py-2.5">
          <span>Continue to Knowledge Base</span>
          ${getIcon('ArrowRight', 'w-4 h-4')}
        </button>
      </div>
    </div>
  `;
}

function renderOnboardingStep2(biz) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="font-display font-bold text-2xl text-main mb-1">Paste your FAQs, Prices & Policies</h2>
        <p class="text-xs text-muted">The AI will strictly quote these facts and never invent unverified promises.</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-muted mb-1">Price List & Offerings (Item - Price - Notes)</label>
          <textarea class="textarea text-xs font-mono h-28 leading-relaxed" placeholder="Classic Cupcakes (1 dozen) - $36.00&#10;Custom 8-inch Cake - $85.00&#10;Gluten-free surcharge - $6.00">${(biz.knowledgeBase?.priceList || []).map(p => `${p.item} - $${p.price.toFixed(2)} (${p.notes})`).join('\n')}</textarea>
        </div>

        <div>
          <label class="block text-xs font-semibold text-muted mb-1">Key Customer FAQs</label>
          <textarea class="textarea text-xs h-28 leading-relaxed" placeholder="Paste return policies, advance notice requirements, allergen safety...">${(biz.knowledgeBase?.faqs || []).map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}</textarea>
        </div>
      </div>

      <div class="pt-4 border-t border-subtle flex justify-between items-center">
        <button onclick="onboardingStep = 1; renderApp();" class="btn btn-secondary text-xs">
          ← Back
        </button>
        <button onclick="onboardingStep = 3; renderApp();" class="btn btn-primary text-xs font-bold px-6 py-2.5">
          <span>Continue to Tone of Voice</span>
          ${getIcon('ArrowRight', 'w-4 h-4')}
        </button>
      </div>
    </div>
  `;
}

function renderOnboardingStep3(biz) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="font-display font-bold text-2xl text-main mb-1">Set your Tone & Connect Channels</h2>
        <p class="text-xs text-muted">Adjust how your AI drafts replies so they sound authentically like you.</p>
      </div>

      <!-- Tone Sliders -->
      <div class="p-4 rounded-2xl bg-canvas border border-subtle space-y-4">
        <div>
          <div class="flex justify-between text-xs font-medium mb-1">
            <span>Formality</span>
            <span class="text-primary font-bold">Warm & Friendly (25%)</span>
          </div>
          <input type="range" min="0" max="100" value="25" class="w-full accent-indigo-600" />
          <div class="flex justify-between text-[10px] text-muted mt-1">
            <span>Casual & Friendly</span>
            <span>Formal & Corporate</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs font-medium mb-1">
            <span>Emoji Frequency</span>
            <span class="text-primary font-bold">Expressive (75%) ✨🧁</span>
          </div>
          <input type="range" min="0" max="100" value="75" class="w-full accent-indigo-600" />
        </div>
      </div>

      <!-- Mock Connect Channels -->
      <div>
        <label class="block text-xs font-semibold text-muted mb-2">Connect Your Channels</label>
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl border border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between">
            <div class="flex items-center gap-2">
              ${getChannelIcon('whatsapp')}
              <span class="font-medium text-main">WhatsApp Business</span>
            </div>
            <span class="text-emerald-600 text-xs font-bold">Connected ✓</span>
          </div>

          <div class="p-3 rounded-xl border border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between">
            <div class="flex items-center gap-2">
              ${getChannelIcon('instagram')}
              <span class="font-medium text-main">Instagram DMs</span>
            </div>
            <span class="text-emerald-600 text-xs font-bold">Connected ✓</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-subtle flex justify-between items-center">
        <button onclick="onboardingStep = 2; renderApp();" class="btn btn-secondary text-xs">
          ← Back
        </button>
        <button onclick="onboardingStep = 1; navigateTo('/app/dashboard'); toast.show({ title: 'Welcome to ShopDesk AI!', message: 'Your business desk is fully configured and ready.', type: 'success' });" class="btn btn-primary text-xs font-bold px-8 py-2.5 shadow-md">
          <span>Finish Setup & Launch Desk 🚀</span>
        </button>
      </div>
    </div>
  `;
}
