// ShopDesk AI - Public Home Page

function renderHomePage() {
  const cfg = appStore.state.config || { name: "ShopDesk AI" };

  return `
    <div class="relative overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
      <div class="absolute top-20 -right-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

      <!-- ==========================================
           HERO SECTION
           ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <!-- Floating Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-subtle bg-surface shadow-sm mb-6 animate-fade-in">
          <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-semibold gradient-brand-text">The AI Support Desk for Small Businesses</span>
          <span class="text-muted text-xs">| WhatsApp, Instagram & Email</span>
        </div>

        <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-main max-w-4xl mx-auto mb-6 leading-[1.15]">
          Turn messy customer DMs into <span class="gradient-brand-text">clean orders & happy replies</span> in seconds.
        </h1>

        <p class="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Stop losing orders in chaotic WhatsApp chats and Instagram DMs. ShopDesk AI auto-extracts order details, flags allergies, and drafts grounded replies in your exact voice.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <a href="/demo" onclick="navigateTo('/demo'); return false;" class="btn btn-primary btn-lg shadow-lg w-full sm:w-auto">
            ${getIcon('Sparkles', 'w-5 h-5 text-white')}
            <span class="font-semibold">Try Live AI Playground</span>
          </a>
          <a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="btn btn-secondary btn-lg w-full sm:w-auto">
            <span>Open Demo Desk</span>
            ${getIcon('ArrowRight', 'w-4 h-4')}
          </a>
        </div>

        <!-- ==========================================
             INTERACTIVE "MESSY MESSAGE TO CLEAN TICKET" DEMO WIDGET
             ========================================== -->
        <div class="max-w-4xl mx-auto bg-surface border border-subtle rounded-3xl shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden">
          <div class="flex items-center justify-between pb-4 border-b border-subtle mb-5">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span class="text-xs font-bold text-muted ml-2">Live Transformation Demo</span>
            </div>
            <div class="text-xs text-muted font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Classification Engine: 96% Confidence
            </div>
          </div>

          <div class="hero-transformer-grid w-full">
            <!-- Left: Raw Messy Message -->
            <div class="p-4 rounded-2xl bg-canvas border border-subtle flex flex-col justify-between w-full">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-coral flex items-center gap-1.5">
                    ${getChannelIcon('whatsapp')} Incoming Messy WhatsApp DM
                  </span>
                  <span class="text-[11px] text-muted">Hannah M. • 2m ago</span>
                </div>
                <div class="p-3.5 rounded-xl bg-surface border border-subtle text-xs text-main leading-relaxed shadow-sm font-mono">
                  "2 dozen choc cupcakes for sat 5pm pls, one box nut-free for my nephew's birthday!! Can we pick up around 5? Also can u write Happy 7th Leo in blue on the toppers?? 🙏🎂"
                </div>
              </div>
              <div class="mt-4 pt-3 border-t border-subtle text-[11px] text-muted flex items-center justify-between">
                <span>⚠️ Typos, allergy alert, custom request</span>
                <span class="text-coral font-medium">Unsorted</span>
              </div>
            </div>

            <!-- Right: Clean Structured Ticket -->
            <div class="p-4 rounded-2xl bg-primary-subtle/40 border border-primary/20 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    ${getIcon('Sparkles', 'w-3.5 h-3.5 text-primary')} Clean AI Ticket
                  </span>
                  <span class="badge badge-order text-[11px]">ORDER • $74.00</span>
                </div>

                <!-- Extracted Entities Card -->
                <div class="p-3 rounded-xl bg-surface border border-subtle text-xs space-y-1.5 shadow-sm mb-3">
                  <div class="flex justify-between"><span class="text-muted">Items:</span> <span class="font-medium">2 Dozen Chocolate Cupcakes</span></div>
                  <div class="flex justify-between"><span class="text-muted">Ready Time:</span> <span class="font-medium">Saturday 5:00 PM</span></div>
                  <div class="flex justify-between"><span class="text-muted">Allergy Alert:</span> <span class="font-bold text-coral">Strict Nut-Free (1 Box) 🛡️</span></div>
                  <div class="flex justify-between"><span class="text-muted">Custom Topper:</span> <span class="font-medium">"Happy 7th Leo" (Blue)</span></div>
                </div>

                <!-- Grounded Draft Reply -->
                <div class="p-2.5 rounded-lg bg-emerald-subtle border border-emerald/20 text-[11px] text-emerald-text leading-relaxed">
                  <strong>AI Draft Reply:</strong> "Hey Hannah! 🧁 We'd love to make Leo's 7th birthday extra sweet! I have you down for 2 dozen chocolate cupcakes with dedicated nut-free sterilization protocol ($74 total). Saturday 5pm pickup..."
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-primary/20 flex items-center justify-between">
                <span class="text-[11px] text-primary font-medium">✨ Ready for 1-Click Approve</span>
                <a href="/demo" onclick="navigateTo('/demo'); return false;" class="text-xs font-bold text-primary hover:underline">
                  Try Your Own Message →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           TRUST BAR
           ========================================== -->
      <section class="border-y border-subtle bg-surface/50 py-8">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted mb-6">
            Empowering 2,400+ Home Bakeries, Boutiques, Salons & Indie Sellers
          </p>
          <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all text-xs font-bold tracking-wider text-muted">
            <span class="flex items-center gap-1.5 text-main">🧁 SWEET CRUMBS</span>
            <span class="flex items-center gap-1.5 text-main">👗 AURA ATELIER</span>
            <span class="flex items-center gap-1.5 text-main">💇‍♀️ GLOW & CO.</span>
            <span class="flex items-center gap-1.5 text-main">☕ VELVET BEAN CAFE</span>
            <span class="flex items-center gap-1.5 text-main">🌸 BLOOM & STEM</span>
          </div>
        </div>
      </section>

      <!-- ==========================================
           3-STEP HOW IT WORKS
           ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Simple & Powerful</span>
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-main mt-2 mb-4">
            From chaos to inbox zero in 3 effortless steps
          </h2>
          <p class="text-muted text-sm sm:text-base">Designed for busy business owners answering messages between customers.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="card p-6 relative">
            <div class="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center font-bold text-base mb-4">1</div>
            <h3 class="font-display font-bold text-lg text-main mb-2">Connect Channels</h3>
            <p class="text-xs text-muted leading-relaxed mb-4">
              Link your WhatsApp Business, Instagram DMs, Gmail, and website chat widget in 60 seconds with zero coding.
            </p>
            <div class="p-3 rounded-xl bg-canvas border border-subtle flex items-center gap-3">
              ${getChannelIcon('whatsapp', 'w-5 h-5')}
              ${getChannelIcon('instagram', 'w-5 h-5')}
              ${getChannelIcon('gmail', 'w-5 h-5')}
              <span class="text-[11px] text-muted ml-auto font-medium">All in 1 desk</span>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="card p-6 relative">
            <div class="w-10 h-10 rounded-xl bg-teal-subtle text-teal-text flex items-center justify-center font-bold text-base mb-4">2</div>
            <h3 class="font-display font-bold text-lg text-main mb-2">AI Sorts & Extracts</h3>
            <p class="text-xs text-muted leading-relaxed mb-4">
              Our AI classifies orders, complaints, enquiries, and bookings while extracting quantities, allergies, and delivery dates.
            </p>
            <div class="p-3 rounded-xl bg-canvas border border-subtle flex items-center justify-between text-[11px]">
              <span class="badge badge-order">Order</span>
              <span class="badge badge-complaint">Complaint</span>
              <span class="badge badge-booking">Booking</span>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="card p-6 relative">
            <div class="w-10 h-10 rounded-xl bg-coral-subtle text-coral-text flex items-center justify-center font-bold text-base mb-4">3</div>
            <h3 class="font-display font-bold text-lg text-main mb-2">One-Click Approve</h3>
            <p class="text-xs text-muted leading-relaxed mb-4">
              Review replies drafted in your personal tone and strictly grounded in your price list and FAQs. Approve in 1 second.
            </p>
            <div class="p-2.5 rounded-xl bg-canvas border border-subtle flex items-center justify-between">
              <span class="text-xs font-semibold text-main">Approve & Send</span>
              <span class="btn btn-emerald btn-sm py-1">Sent ✓</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           BEFORE VS AFTER COMPARISON
           ========================================== -->
      <section class="bg-surface border-y border-subtle py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-wider text-teal">Real-World Impact</span>
            <h2 class="font-display font-bold text-3xl sm:text-4xl text-main mt-2 mb-4">
              Your day before and after ShopDesk AI
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Before -->
            <div class="p-6 rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
              <div class="flex items-center gap-2 mb-4 text-rose-600 font-bold text-sm">
                ${getIcon('XCircle', 'w-5 h-5')} Without ShopDesk AI (Messy & Stressful)
              </div>
              <ul class="space-y-3 text-xs text-muted leading-relaxed">
                <li class="flex items-start gap-2">❌ 2.5 hours every evening manually scrolling through 4 different apps</li>
                <li class="flex items-start gap-2">❌ Missed custom cake orders and forgotten nut allergy notes written on napkins</li>
                <li class="flex items-start gap-2">❌ Anxious customers waiting 8 hours for a basic price or availability check</li>
                <li class="flex items-start gap-2">❌ Answering the exact same "What are your opening hours?" question 15 times a day</li>
              </ul>
            </div>

            <!-- After -->
            <div class="p-6 rounded-3xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
              <div class="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-sm">
                ${getIcon('CheckCircle2', 'w-5 h-5')} With ShopDesk AI (Calm & Controlled)
              </div>
              <ul class="space-y-3 text-xs text-muted leading-relaxed">
                <li class="flex items-start gap-2">✨ <strong>Inbox cleared in 12 minutes:</strong> review and approve smart AI drafts</li>
                <li class="flex items-start gap-2">✨ <strong>Orders automatically populated</strong> into a visual Kanban board with allergy tags</li>
                <li class="flex items-start gap-2">✨ <strong>Customers get instant replies</strong> under 2 minutes in your exact warm tone</li>
                <li class="flex items-start gap-2">✨ <strong>Peace of mind:</strong> high-risk complaints or refund claims auto-escalate to you</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           TESTIMONIALS
           ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Loved by Owners</span>
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-main mt-2 mb-4">
            Hear from shop owners who took their weekends back
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card p-6 flex flex-col justify-between">
            <p class="text-xs text-muted leading-relaxed mb-6 italic">
              "During wedding season, I was losing my mind checking WhatsApp while covered in flour. ShopDesk catches the allergy notes, quotes our exact tiered pricing, and drafts replies that sound just like me. It saves me 15 hours a week."
            </p>
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80" class="w-9 h-9 rounded-full object-cover" alt="Sarah J.">
              <div>
                <div class="font-bold text-xs text-main">Sarah Jenkins</div>
                <div class="text-[11px] text-muted">Owner, Sweet Crumbs Bakehouse</div>
              </div>
            </div>
          </div>

          <div class="card p-6 flex flex-col justify-between">
            <p class="text-xs text-muted leading-relaxed mb-6 italic">
              "We get dozens of Instagram DMs asking about trench sizes and return labels. ShopDesk immediately directs them to our return portal or recommends the right fit. Our response time dropped from 4 hours to 90 seconds."
            </p>
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" class="w-9 h-9 rounded-full object-cover" alt="Elena V.">
              <div>
                <div class="font-bold text-xs text-main">Elena Vance</div>
                <div class="text-[11px] text-muted">Founder, Aura Atelier SoHo</div>
              </div>
            </div>
          </div>

          <div class="card p-6 flex flex-col justify-between">
            <p class="text-xs text-muted leading-relaxed mb-6 italic">
              "Clients message at 11 PM asking for Saturday balayage slots. The AI accurately quotes our 4-hour chair time and price. The safety escalation rule even alerted me instantly when a client had a scalp issue. Truly a lifesaver."
            </p>
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" class="w-9 h-9 rounded-full object-cover" alt="Marcus R.">
              <div>
                <div class="font-bold text-xs text-main">Marcus Rivera</div>
                <div class="text-[11px] text-muted">Master Stylist, Glow & Co. Salon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           FINAL CTA BANNER
           ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div class="rounded-3xl gradient-brand p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to reclaim 10+ hours every single week?
          </h2>
          <p class="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-8">
            Experience the live AI demo now with no credit card, no sign-up, and zero setup required.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/demo" onclick="navigateTo('/demo'); return false;" class="btn bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8 py-3 rounded-xl shadow-lg">
              Launch Live Playground →
            </a>
            <a href="/app/dashboard" onclick="navigateTo('/app/dashboard'); return false;" class="btn bg-white/20 hover:bg-white/30 text-white font-medium px-8 py-3 rounded-xl border border-white/30">
              Open Demo Dashboard
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}
