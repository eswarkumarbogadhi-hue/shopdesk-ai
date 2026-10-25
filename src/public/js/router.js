// ShopDesk AI - Client-Side Router & Root Application Orchestrator

function navigateTo(path) {
  window.history.pushState({}, '', path);
  appStore.state.currentRoute = path;
  window.scrollTo(0, 0);
  renderApp();
}

window.addEventListener('popstate', () => {
  appStore.state.currentRoute = window.location.pathname;
  renderApp();
});

function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const path = window.location.pathname;
  const isAppRoute = path.startsWith('/app');

  let pageContent = '';

  // Public Routes
  if (path === '/' || path === '') {
    pageContent = renderHomePage();
  } else if (path === '/features') {
    pageContent = renderFeaturesPage();
  } else if (path === '/how-it-works') {
    pageContent = renderHowItWorksPage();
  } else if (path === '/pricing') {
    pageContent = renderPricingPage();
  } else if (path === '/demo') {
    pageContent = renderLiveDemoPage();
  } else if (path === '/about') {
    pageContent = renderAboutPage();
  } else if (path === '/contact') {
    pageContent = renderContactPage();
  } else if (path === '/login') {
    pageContent = renderLoginPage();
  } else if (path === '/signup') {
    pageContent = renderSignupPage();
  }
  // App Routes
  else if (path === '/app' || path === '/app/dashboard') {
    pageContent = renderDashboardPage();
  } else if (path === '/app/inbox') {
    pageContent = renderInboxPage();
  } else if (path === '/app/orders') {
    pageContent = renderOrdersPage();
  } else if (path === '/app/complaints') {
    pageContent = renderComplaintsPage();
  } else if (path === '/app/customers') {
    pageContent = renderCustomersPage();
  } else if (path === '/app/tone') {
    pageContent = renderTonePage();
  } else if (path === '/app/knowledge') {
    pageContent = renderKnowledgePage();
  } else if (path === '/app/rules') {
    pageContent = renderRulesPage();
  } else if (path === '/app/analytics') {
    pageContent = renderAnalyticsPage();
  } else if (path === '/app/team') {
    pageContent = renderTeamPage();
  } else if (path === '/app/integrations') {
    pageContent = renderIntegrationsPage();
  } else if (path === '/app/settings') {
    pageContent = renderSettingsPage();
  } else if (path === '/app/help') {
    pageContent = renderHelpPage();
  } else if (path === '/app/onboarding') {
    pageContent = renderOnboardingPage();
  } else {
    pageContent = renderNotFoundPage();
  }

  // Assemble full layout
  if (isAppRoute && path !== '/app/onboarding') {
    // App Layout: Topbar + Sidebar + Main Content + Mobile Bottom Bar
    root.innerHTML = `
      <div class="min-h-screen flex flex-col bg-canvas">
        ${renderNavbar(true)}
        <div class="flex-1 flex overflow-hidden">
          ${renderSidebar()}
          <main class="flex-1 overflow-y-auto pb-16 lg:pb-0">
            ${pageContent}
          </main>
        </div>
        ${renderCommandPalette()}
        ${renderTourModal()}
      </div>
    `;
  } else {
    // Public Layout: Public Navbar + Page + Public Footer
    root.innerHTML = `
      <div class="min-h-screen flex flex-col bg-canvas">
        ${renderNavbar(false)}
        <main class="flex-1">
          ${pageContent}
        </main>
        ${renderPublicFooter()}
        ${renderCommandPalette()}
        ${renderTourModal()}
      </div>
    `;
  }
}

function renderPublicFooter() {
  const cfg = appStore.state.config || { name: "ShopDesk AI" };

  return `
    <footer class="border-t border-subtle bg-surface py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-6 h-6 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-xs">SD</div>
              <span class="font-display font-bold text-sm text-main">${cfg.name}</span>
            </div>
            <p class="text-muted leading-relaxed">
              The AI support desk for small businesses. Turn chaotic messages into clean tickets and happy customers.
            </p>
          </div>

          <div>
            <div class="font-bold text-main uppercase text-[11px] mb-3">Product</div>
            <ul class="space-y-2 text-muted">
              <li><a href="/features" onclick="navigateTo('/features'); return false;" class="hover:text-main">Features</a></li>
              <li><a href="/how-it-works" onclick="navigateTo('/how-it-works'); return false;" class="hover:text-main">How It Works</a></li>
              <li><a href="/pricing" onclick="navigateTo('/pricing'); return false;" class="hover:text-main">Pricing</a></li>
              <li><a href="/demo" onclick="navigateTo('/demo'); return false;" class="hover:text-main text-teal font-semibold">Live AI Playground</a></li>
            </ul>
          </div>

          <div>
            <div class="font-bold text-main uppercase text-[11px] mb-3">Demo Businesses</div>
            <ul class="space-y-2 text-muted">
              <li><button onclick="appStore.switchBusiness('bakery'); navigateTo('/app/dashboard');" class="hover:text-main text-left">Sweet Crumbs (Bakery)</button></li>
              <li><button onclick="appStore.switchBusiness('boutique'); navigateTo('/app/dashboard');" class="hover:text-main text-left">Aura Atelier (Boutique)</button></li>
              <li><button onclick="appStore.switchBusiness('salon'); navigateTo('/app/dashboard');" class="hover:text-main text-left">Glow & Co. (Salon)</button></li>
            </ul>
          </div>

          <div>
            <div class="font-bold text-main uppercase text-[11px] mb-3">Company & Trust</div>
            <ul class="space-y-2 text-muted">
              <li><a href="/about" onclick="navigateTo('/about'); return false;" class="hover:text-main">Mission & Impact</a></li>
              <li><a href="/contact" onclick="navigateTo('/contact'); return false;" class="hover:text-main">Contact Support</a></li>
              <li><a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="hover:text-main text-primary font-bold">Launch App</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-subtle flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted gap-4">
          <div>© 2026 ${cfg.name}. Built with pride for small businesses everywhere.</div>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> All systems operational</span>
            <button onclick="appStore.resetDemoData()" class="hover:underline">Reset Demo Data</button>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Global bootstrap
window.addEventListener('DOMContentLoaded', async () => {
  await appStore.init();
  appStore.subscribe(() => renderApp());
  renderApp();
});
