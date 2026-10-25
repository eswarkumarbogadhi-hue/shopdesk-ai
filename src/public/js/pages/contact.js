// ShopDesk AI - Contact Page

function renderContactPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs font-bold uppercase tracking-wider text-primary">Get in Touch</span>
        <h1 class="font-display font-extrabold text-4xl text-main mt-2 mb-3">We’re here to help your shop thrive</h1>
        <p class="text-muted text-sm">Have a question about integrations, custom workflows, or enterprise setups? Drop us a line.</p>
      </div>

      <div class="contact-split-grid max-w-5xl mx-auto w-full">
        <!-- Contact Information -->
        <div class="card p-6 bg-surface space-y-6 w-full">
          <div>
            <h3 class="font-display font-bold text-base text-main mb-1">Direct Channels</h3>
            <p class="text-xs text-muted">Our support team responds in under 15 minutes.</p>
          </div>

          <div class="space-y-4 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary-subtle text-primary flex items-center justify-center">
                ${getIcon('Mail', 'w-4 h-4')}
              </div>
              <div>
                <div class="font-semibold text-main">Email Us</div>
                <div class="text-muted">support@shopdesk.ai</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-teal-subtle text-teal-text flex items-center justify-center">
                ${getIcon('MessageSquare', 'w-4 h-4')}
              </div>
              <div>
                <div class="font-semibold text-main">WhatsApp Concierge</div>
                <div class="text-muted">+1 (555) 349-8201</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-coral-subtle text-coral-text flex items-center justify-center">
                ${getIcon('Clock', 'w-4 h-4')}
              </div>
              <div>
                <div class="font-semibold text-main">Office Hours</div>
                <div class="text-muted">Monday - Saturday, 8am - 8pm EST</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Contact Form -->
        <div class="card p-6 sm:p-8 bg-surface w-full">
          <form onsubmit="event.preventDefault(); toast.show({ title: 'Message Sent!', message: 'Thank you for reaching out. We will reply to your email shortly.', type: 'success' });" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-muted mb-1">Your Name</label>
                <input type="text" required class="input" placeholder="Sarah Jenkins" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-muted mb-1">Business Name</label>
                <input type="text" required class="input" placeholder="Sweet Crumbs Bakehouse" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-muted mb-1">Email Address</label>
              <input type="email" required class="input" placeholder="sarah@sweetcrumbs.com" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-muted mb-1">How can we help?</label>
              <textarea required class="textarea h-28" placeholder="Tell us about your channels, volume, or questions..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary w-full py-2.5 text-xs font-bold shadow-md">
              <span>Send Message</span>
              ${getIcon('Send', 'w-4 h-4')}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}
