# 🧁 ShopDesk AI — The AI Support Desk for Small Businesses
**Live demo:** https://shopdesk-ai.onrender.com

> **"Turn messy customer messages across WhatsApp, Instagram, and Email into clean orders and happy replies in seconds."**

ShopDesk AI is an AI-powered, multi-channel support desk purpose-built for non-technical small business owners (home bakeries, indie boutiques, hair & beauty salons, cafés, and artisan repair shops). It aggregates chaotic messages, deciphers messy typos and emojis, extracts key order details and critical health/allergy flags, and drafts grounded replies in the owner's exact voice—strictly verified against the business's Knowledge Base.

---

## 🌟 Hackathon Highlights (Judged Criteria)

- **Real-World Value:** Eliminates 10–15 hours of manual, anxiety-inducing message typing per week for small shop owners.
- **Originality:** Purpose-built for non-technical owners on their phones between customers. Combines multi-channel message triage with visual fulfillment Kanban and safety tripwires.
- **Flawless 2-Minute Demo:** Switch instantly between 3 realistic seeded businesses (Home Bakery, Clothing Boutique, Hair Salon), test live messy messages in the Playground (no login needed), and trigger simulated live incoming messages with synthetic audio chimes!
- **Zero Hallucination Grounding Guarantee:** The AI strictly quotes prices and policies from the Knowledge Base. If details are missing, it asks a clarifying question or escalates.
- **Responsible Human-in-the-Loop:** High-risk messages (angry sentiment, refunds > $40, or safety/burn/allergy claims) automatically escalate with transparent *"Why this classification"* explanations.

---

## ⚡ Quick Start & Setup

### Requirements
- **Node.js:** v18+ (tested natively on Node v24)
- **Zero External Dependencies:** Built with zero npm bloat. Can run instantly out-of-the-box!

### 1. Run the Application
Clone the project and start the server:
```bash
git clone https://github.com/eswarkumarbogadhi-hue/shopdesk-ai.git
cd shopdesk-ai
node server.js
```
Open your browser at:
👉 **`http://localhost:3000`**

### 2. Environment Variables (Optional)
ShopDesk AI runs with a hyper-realistic, semantic local fallback engine so the **demo never breaks even offline**. If you wish to connect real cloud LLMs, simply set either environment variable:

```bash
# Optional: Google Gemini API (Recommended)
set GEMINI_API_KEY=your_gemini_api_key_here

# Optional: OpenAI API
set OPENAI_API_KEY=your_openai_key_here

# Optional: Port (Defaults to 3000)
set PORT=3000
```

---

## 🎬 The Flawless 2-Minute Live Demo Script

Use this exact 2-minute flow during your presentation for maximum impact:

| Timestamp | Screen | What to Show & Say |
| :--- | :--- | :--- |
| **0:00 - 0:25** | **Home (`/`)** | *"Small shop owners drown in messy WhatsApp DMs and Instagram messages while trying to run their business. Notice this animated hero widget: a raw message like '2 dozen choc cupcakes for sat 5pm pls one box nut free' instantly transforms into a structured order with allergy flags."* |
| **0:25 - 0:50** | **Live Playground (`/demo`)** | Click **"Live AI Playground"**. Click the preset **"Bakery Nut Allergy Rush"** and hit **"Analyze & Draft Reply"**. Point out: *(1)* Category: Order (96% confidence), *(2)* Strict Nut-Free allergy extraction banner, *(3)* Grounded draft quoting exact $74 catalog price, *(4)* Explainability card. |
| **0:50 - 1:15** | **Unified Inbox (`/app/inbox`)** | Click **"Open Demo Desk"**. Show the 3-pane layout. Press `J` and `K` on your keyboard to navigate between messages. Point out channel icons (WhatsApp, Instagram, Gmail). Click **"Approve & Send"** (or press `E`) to show sub-second message resolution. |
| **1:15 - 1:35** | **Safety Escalation (`/app/complaints`)** | Open ticket `TICK-GC-302` (Vanessa Hayes) or `TICK-SC-102`. Show how an angry customer or a scalp burn complaint triggered an **instant human escalation** because it exceeded the $40 refund limit or triggered safety keywords. Show the resolution checklist. |
| **1:35 - 1:50** | **Tone & Voice (`/app/tone`)** | Adjust the **Formality** and **Emoji** sliders. Watch the draft reply preview re-synthesize in real time from casual warmth with emojis to polished boutique prose. |
| **1:50 - 2:00** | **Business Switcher & Simulation** | Use the top switcher to flip from **Sweet Crumbs Bakehouse** to **Aura Atelier** (Boutique) or **Glow & Co.** (Salon). Hit the glowing **"Simulate Incoming Message"** button in the top bar to watch a live DM arrive with an acoustic chime! |

---

## 🏗️ Architecture & Pages Implemented

### Public Site
1. **Home (`/`):** Hero, product mockup, interactive transformation demo, trust bar, 3-step stepper, feature grid, before/after comparison, testimonials, pricing teaser, FAQ, CTA.
2. **Features (`/features`):** Deep dive into aggregation, extraction, grounding, and escalation.
3. **How It Works (`/how-it-works`):** Interactive 4-stage stepper.
4. **Pricing (`/pricing`):** Starter ($29), Growth ($79), Scale ($199), annual 20% discount toggle, full comparison matrix.
5. **Live Demo Playground (`/demo`):** Unauthenticated sandbox to test arbitrary customer messages with live AI.
6. **About & Impact (`/about`):** Mission, empowerment, Responsible AI Charter.
7. **Contact (`/contact`):** Interactive inquiry form and direct channels.
8. **Auth (`/login`, `/signup`, `/not-found`):** 1-click role logins for Sarah (Bakery), Elena (Boutique), and Marcus (Salon).

### Authenticated App
9. **Onboarding Wizard (`/app/onboarding`):** 3-step setup in under 2 minutes.
10. **Dashboard (`/app/dashboard`):** Snapshot, urgent banner, hours saved counter, response time, AI vs human split, orders preview.
11. **Unified Inbox (`/app/inbox`):** Three-pane layout (filters / list / conversation thread) with AI summaries, editable extracted details card, grounded reply with 1-click Approve / Edit / Regenerate, explainability, internal notes, and activity timeline.
12. **Orders (`/app/orders`):** Extracted orders in Table view and visual Kanban board (New, Confirmed, Preparing, Ready, Delivered) with allergy tags.
13. **Complaints & Escalations (`/app/complaints`):** Severity ratings, live SLA countdown timers, escalation reasons, resolution steps checklist.
14. **Customers (`/app/customers`):** CRM profiles, lifetime spend, VIP tags, interaction history.
15. **Tone & Templates (`/app/tone`):** Formality, brevity, and emoji sliders with real-time live preview generator.
16. **Knowledge Base (`/app/knowledge`):** Verified FAQs, catalog prices, opening hours, and policies (AI Ground Truth).
17. **Automation Rules (`/app/rules`):** Confidence thresholds (88%), refund limits ($40), restricted keywords tripwires.
18. **Analytics (`/app/analytics`):** Real-time metrics, category breakdown, volume by channel, CSAT (94.2%), AI acceptance rate (88.4%).
19. **Team (`/app/team`):** Staff roster, workload assignments, active statuses.
20. **Integrations (`/app/integrations`):** WhatsApp, Instagram, Gmail, and Website Widget with embed script generator.
21. **Settings (`/app/settings`):** Profile, acoustic audio toggles, JSON data export, and demo reset.
22. **Help Center (`/app/help`):** Searchable articles and keyboard navigation shortcuts.

---

## 🎨 Design System & Accessibility

- **Palette:** Deep indigo-to-teal primary gradient (`#4f46e5` to `#0d9488`), warm coral accent for urgent items (`#f43f5e`), soft neutral slate surfaces.
- **Typography:** Display headings (`Plus Jakarta Sans`) paired with crisp UI sans (`Inter`).
- **Cards & Micro-interactions:** Rounded-2xl cards, layered shadows, glassmorphic headers (`backdrop-blur-md`), hover states, and smooth slide-up transitions.
- **Audio Synthesis:** Synthetic acoustic sound effects generated on-the-fly via the Web Audio API (zero audio media assets required).
- **Responsive:** Mobile bottom navigation bar for fast one-thumb operation on phones, collapsible sidebar on desktops.
- **Command Palette:** Press `Ctrl+K` or `Cmd+K` anywhere to search tickets, simulate messages, or switch businesses.
- **Keyboard Navigation:** `J`/`K` for tickets, `E` to approve, `S` to simulate.
- **Dark & Light Mode:** Seamless toggle with persistent localStorage preference.

---

## 🛠️ Renaming the Product

To rename the product, simply edit **`src/config/site.js`**:
```javascript
const SITE_CONFIG = {
  name: "ShopDesk AI", // Change here to rename everywhere
  tagline: "Turn messy customer messages into clean orders...",
  ...
};
```
All navigation headers, footers, page titles, and metadata update automatically.

---

## 📋 Assumptions Made

1. **Standalone Portability:** Built using Node.js's built-in standard modules and native modern browser APIs so that the application has zero external network or build tool dependencies, guaranteeing that it launches instantly in any developer environment.
2. **Deterministic Fallback Engine:** Real LLM endpoints (`/api/classify`, `/api/extract`, `/api/draft-reply`, `/api/summarize`) support real cloud keys (`GEMINI_API_KEY` or `OPENAI_API_KEY`) and automatically fall back to an ultra-realistic local semantic parser if no key is present or if offline.
3. **Seed Data Realism:** 3 complete business verticals were seeded with 25+ authentic, typo-laden, multi-language messages to test edge cases (allergies, missing tracking, courier damages, foreign languages).
