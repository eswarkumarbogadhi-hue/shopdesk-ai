// ShopDesk AI - Login, Signup & 404 Pages

function renderLoginPage() {
  return `
    <div class="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div class="card p-8 bg-surface shadow-2xl">
        <div class="text-center mb-6">
          <div class="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            ${getIcon('Sparkles', 'w-5 h-5 text-white')}
          </div>
          <h1 class="font-display font-bold text-2xl text-main">Welcome back</h1>
          <p class="text-xs text-muted mt-1">Select a demo role or enter your credentials</p>
        </div>

        <!-- 1-Click Fast Demo Login Roles -->
        <div class="mb-6 space-y-2">
          <div class="text-[11px] font-semibold text-muted uppercase tracking-wider text-center">Fast Demo Access</div>
          
          <button 
            onclick="appStore.switchBusiness('bakery'); navigateTo('/app/dashboard');" 
            class="w-full flex items-center justify-between p-2.5 rounded-xl border border-primary/30 bg-primary-subtle/50 hover:bg-primary-subtle text-xs transition"
          >
            <div class="flex items-center gap-2.5 text-left">
              <span class="text-base">🧁</span>
              <div>
                <div class="font-bold text-primary">Login as Sarah (Owner)</div>
                <div class="text-[10px] text-muted">Sweet Crumbs Bakehouse</div>
              </div>
            </div>
            ${getIcon('ArrowRight', 'w-4 h-4 text-primary')}
          </button>

          <button 
            onclick="appStore.switchBusiness('boutique'); navigateTo('/app/dashboard');" 
            class="w-full flex items-center justify-between p-2.5 rounded-xl border border-subtle bg-canvas hover:bg-muted text-xs transition"
          >
            <div class="flex items-center gap-2.5 text-left">
              <span class="text-base">👗</span>
              <div>
                <div class="font-bold text-main">Login as Elena (Owner)</div>
                <div class="text-[10px] text-muted">Aura Atelier SoHo</div>
              </div>
            </div>
            ${getIcon('ArrowRight', 'w-4 h-4 text-muted')}
          </button>

          <button 
            onclick="appStore.switchBusiness('salon'); navigateTo('/app/dashboard');" 
            class="w-full flex items-center justify-between p-2.5 rounded-xl border border-subtle bg-canvas hover:bg-muted text-xs transition"
          >
            <div class="flex items-center gap-2.5 text-left">
              <span class="text-base">💇‍♀️</span>
              <div>
                <div class="font-bold text-main">Login as Marcus (Owner)</div>
                <div class="text-[10px] text-muted">Glow & Co. Salon</div>
              </div>
            </div>
            ${getIcon('ArrowRight', 'w-4 h-4 text-muted')}
          </button>
        </div>

        <div class="relative flex py-2 items-center mb-4">
          <div class="flex-grow border-t border-subtle"></div>
          <span class="flex-shrink mx-3 text-muted text-[11px] uppercase">or email sign-in</span>
          <div class="flex-grow border-t border-subtle"></div>
        </div>

        <form onsubmit="event.preventDefault(); navigateTo('/app/dashboard');" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Email address</label>
            <input type="email" value="sarah@sweetcrumbs.com" class="input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Password</label>
            <input type="password" value="••••••••••••" class="input text-xs" />
          </div>
          <button type="submit" class="btn btn-primary w-full py-2.5 text-xs font-bold shadow-md">
            Sign In to Desk
          </button>
        </form>

        <div class="text-center mt-6 text-xs text-muted">
          Don't have a desk? <a href="/signup" onclick="navigateTo('/signup'); return false;" class="text-primary font-bold hover:underline">Create free account</a>
        </div>
      </div>
    </div>
  `;
}

function renderSignupPage() {
  return `
    <div class="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div class="card p-8 bg-surface shadow-2xl">
        <div class="text-center mb-6">
          <div class="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            ${getIcon('Sparkles', 'w-5 h-5 text-white')}
          </div>
          <h1 class="font-display font-bold text-2xl text-main">Start your 14-day trial</h1>
          <p class="text-xs text-muted mt-1">Takes under 2 minutes. No credit card needed.</p>
        </div>

        <form onsubmit="event.preventDefault(); navigateTo('/app/onboarding');" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Your Full Name</label>
            <input type="text" required placeholder="Sarah Jenkins" class="input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Business Name</label>
            <input type="text" required placeholder="Sweet Crumbs Bakehouse" class="input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Business Category</label>
            <select class="select text-xs">
              <option>Home Bakery & Confections</option>
              <option>Clothing & Fashion Boutique</option>
              <option>Hair Salon & Beauty Spa</option>
              <option>Coffee Shop & Cafe</option>
              <option>Repair & Artisan Services</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-1">Email address</label>
            <input type="email" required placeholder="sarah@sweetcrumbs.com" class="input text-xs" />
          </div>
          <button type="submit" class="btn btn-primary w-full py-2.5 text-xs font-bold shadow-md">
            Start Setup Wizard →
          </button>
        </form>

        <div class="text-center mt-6 text-xs text-muted">
          Already have an account? <a href="/login" onclick="navigateTo('/login'); return false;" class="text-primary font-bold hover:underline">Log in</a>
        </div>
      </div>
    </div>
  `;
}

function renderNotFoundPage() {
  return `
    <div class="max-w-lg mx-auto px-4 py-24 text-center">
      <div class="text-7xl font-extrabold gradient-brand-text mb-4 font-display">404</div>
      <h1 class="font-display font-bold text-2xl text-main mb-2">Page Not Found</h1>
      <p class="text-xs text-muted max-w-sm mx-auto mb-8 leading-relaxed">
        We couldn't locate the page you were looking for. Perhaps you'd like to check out the live inbox or try the playground?
      </p>
      <div class="flex items-center justify-center gap-3">
        <a href="/" onclick="navigateTo('/'); return false;" class="btn btn-secondary text-xs">
          Home
        </a>
        <a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="btn btn-primary text-xs">
          Open Demo Desk
        </a>
      </div>
    </div>
  `;
}
