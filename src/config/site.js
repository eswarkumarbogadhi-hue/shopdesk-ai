// Site & Brand Configuration
// Change app name, branding, and metadata here to rename the application everywhere!

const SITE_CONFIG = {
  name: "ShopDesk AI",
  shortName: "ShopDesk",
  tagline: "Turn messy customer messages into clean orders and happy replies in seconds.",
  description: "The AI-powered inbox for busy shop owners. Auto-sorts WhatsApp, Instagram, Email, and Web chat into clear tickets, extracts order details, and drafts grounded replies in your voice.",
  version: "1.0.0",
  author: "ShopDesk AI Team",
  company: "ShopDesk Technologies Inc.",
  supportEmail: "support@shopdesk.ai",
  salesEmail: "hello@shopdesk.ai",
  
  // Theme branding
  branding: {
    primaryGradient: "from-indigo-600 via-teal-600 to-emerald-500",
    primaryColor: "#4f46e5", // Indigo 600
    tealColor: "#0d9488",    // Teal 600
    accentColor: "#f43f5e",  // Rose/Coral 500
    warningColor: "#f59e0b", // Amber 500
    successColor: "#10b981", // Emerald 500
  },

  // Navigation Links
  publicNav: [
    { label: "Features", path: "/features" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Pricing", path: "/pricing" },
    { label: "Live Demo", path: "/demo", badge: "Live AI" },
    { label: "About", path: "/about" },
  ],

  appNav: [
    { label: "Dashboard", path: "/app/dashboard", icon: "LayoutDashboard" },
    { label: "Unified Inbox", path: "/app/inbox", icon: "Inbox", badgeKey: "urgentCount" },
    { label: "Orders", path: "/app/orders", icon: "ShoppingBag", badgeKey: "ordersCount" },
    { label: "Complaints", path: "/app/complaints", icon: "AlertTriangle", badgeKey: "complaintsCount" },
    { label: "Customers", path: "/app/customers", icon: "Users" },
    { label: "Tone & Voice", path: "/app/tone", icon: "Sliders" },
    { label: "Knowledge Base", path: "/app/knowledge", icon: "BookOpen" },
    { label: "Automation Rules", path: "/app/rules", icon: "ShieldCheck" },
    { label: "Analytics", path: "/app/analytics", icon: "BarChart3" },
    { label: "Team", path: "/app/team", icon: "UserCheck" },
    { label: "Integrations", path: "/app/integrations", icon: "Layers" },
    { label: "Settings", path: "/app/settings", icon: "Settings" },
    { label: "Help Center", path: "/app/help", icon: "HelpCircle" },
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SITE_CONFIG };
}
