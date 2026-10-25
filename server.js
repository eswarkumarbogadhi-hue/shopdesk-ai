// ShopDesk AI - Production Node.js Server
// Zero external npm dependencies required - runs natively on Node 24+

const http = require('http');
const fs = require('fs');
const path = require('path');
const { SITE_CONFIG } = require('./src/config/site.js');
const { store } = require('./src/db/store.js');
const { processMessageWithAI } = require('./src/ai/llm-service.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'src', 'public');

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Helper: parse incoming JSON body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper: JSON response
function sendJson(res, statusCode, data) {
  const jsonStr = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(jsonStr);
}

// Helper: Serve Static File
function serveStaticFile(res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client-side SPA routing
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

// Request Handler
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // ==========================================
  // API ROUTING
  // ==========================================
  try {
    // 1. Site Config
    if (pathname === '/api/config' && method === 'GET') {
      return sendJson(res, 200, SITE_CONFIG);
    }

    // 2. Businesses
    if (pathname === '/api/businesses' && method === 'GET') {
      return sendJson(res, 200, {
        activeId: store.activeBusinessId,
        active: store.getActiveBusiness(),
        all: store.getAllBusinesses()
      });
    }

    if (pathname === '/api/businesses/switch' && method === 'POST') {
      const body = await parseJsonBody(req);
      const switched = store.setActiveBusiness(body.businessId);
      if (!switched) {
        return sendJson(res, 400, { error: 'Invalid business ID' });
      }
      return sendJson(res, 200, { success: true, active: switched });
    }

    if (pathname.startsWith('/api/businesses/') && method === 'PATCH') {
      const bId = pathname.replace('/api/businesses/', '');
      const body = await parseJsonBody(req);
      const updated = store.updateBusiness(bId, body);
      return sendJson(res, 200, { success: true, business: updated });
    }

    // 3. AI Endpoints (Server-side real LLM / local engine)
    if (pathname === '/api/classify' && method === 'POST') {
      const body = await parseJsonBody(req);
      const business = store.getActiveBusiness();
      const result = await processMessageWithAI({
        rawMessage: body.message || '',
        business,
        channel: body.channel || 'whatsapp'
      });
      return sendJson(res, 200, {
        category: result.category,
        urgency: result.urgency,
        sentiment: result.sentiment,
        language: result.language,
        confidence: result.confidence,
        why_classification: result.why_classification
      });
    }

    if (pathname === '/api/extract' && method === 'POST') {
      const body = await parseJsonBody(req);
      const business = store.getActiveBusiness();
      const result = await processMessageWithAI({
        rawMessage: body.message || '',
        business
      });
      return sendJson(res, 200, {
        entities: result.entities,
        confidence: result.confidence
      });
    }

    if (pathname === '/api/draft-reply' && method === 'POST') {
      const body = await parseJsonBody(req);
      const business = store.getActiveBusiness();
      const result = await processMessageWithAI({
        rawMessage: body.message || '',
        business,
        customer: body.customer
      });
      return sendJson(res, 200, {
        suggested_reply: result.suggested_reply,
        needs_human: result.needs_human,
        needs_human_reason: result.needs_human_reason
      });
    }

    if (pathname === '/api/summarize' && method === 'POST') {
      const body = await parseJsonBody(req);
      const business = store.getActiveBusiness();
      const result = await processMessageWithAI({
        rawMessage: body.message || '',
        business
      });
      return sendJson(res, 200, {
        summary: result.summary,
        suggested_next_action: result.suggested_next_action
      });
    }

    // Unified AI Processing Endpoint for Live Demo Playground
    if (pathname === '/api/process-ticket' && method === 'POST') {
      const body = await parseJsonBody(req);
      const businessId = body.businessId || store.activeBusinessId;
      const business = store.businesses.find(b => b.id === businessId) || store.getActiveBusiness();
      const result = await processMessageWithAI({
        rawMessage: body.message || '',
        business,
        channel: body.channel || 'whatsapp',
        customer: body.customer
      });
      return sendJson(res, 200, result);
    }

    // 4. Tickets Endpoints
    if (pathname === '/api/tickets' && method === 'GET') {
      const status = urlObj.searchParams.get('status');
      const category = urlObj.searchParams.get('category');
      const urgency = urlObj.searchParams.get('urgency');
      const channel = urlObj.searchParams.get('channel');
      const needsHuman = urlObj.searchParams.get('needsHuman') === 'true';
      const search = urlObj.searchParams.get('search');
      const businessId = urlObj.searchParams.get('businessId');

      const tickets = store.getTickets(businessId, {
        status, category, urgency, channel, needsHuman, search
      });
      return sendJson(res, 200, tickets);
    }

    if (pathname.startsWith('/api/tickets/') && method === 'GET') {
      const id = pathname.replace('/api/tickets/', '');
      const ticket = store.getTicketById(id);
      if (!ticket) return sendJson(res, 404, { error: 'Ticket not found' });
      return sendJson(res, 200, ticket);
    }

    if (pathname.startsWith('/api/tickets/') && method === 'PATCH') {
      const id = pathname.replace('/api/tickets/', '');
      const body = await parseJsonBody(req);
      const updated = store.updateTicket(id, body);
      if (!updated) return sendJson(res, 404, { error: 'Ticket not found' });
      return sendJson(res, 200, updated);
    }

    // 5. Simulate Incoming Message (Demo Trigger)
    if (pathname === '/api/simulate-message' && method === 'POST') {
      const body = await parseJsonBody(req);
      const targetBiz = body.businessId || store.activeBusinessId;
      
      const simulationPool = [
        {
          biz: "bakery",
          channel: "whatsapp",
          sender: "Olivia Martinez",
          handle: "@olivia_m_atx",
          msg: "Hi Sarah!! Need 2 dozen mini cupcakes for my daughter's gymnastics team this Friday 3pm pls! One dozen nut-free chocolate, one dozen strawberry. Can you deliver to Austin Rec Center?"
        },
        {
          biz: "bakery",
          channel: "instagram",
          sender: "David Chen",
          handle: "@davidchen_foodie",
          msg: "Sarah the chocolate celebration cake was absolutely STUNNING yesterday!! Everyone asked where we got it from. Best baker in Austin hands down! 🔥🧁"
        },
        {
          biz: "bakery",
          channel: "gmail",
          sender: "Marcus Sterling",
          handle: "msterling@atxtech.com",
          msg: "Hi, our morning office delivery order #SC-9120 had a squished box and two cupcakes were crushed against the lid. We need a partial refund or replacement credit please."
        },
        {
          biz: "boutique",
          channel: "instagram",
          sender: "Chloe Laurent",
          handle: "@chloelaurent_ny",
          msg: "hello! ordered the linen trench in size M order #4991 last Wednesday. Tracking still hasn't updated beyond label printed, can you please check on this? 😡"
        },
        {
          biz: "boutique",
          channel: "whatsapp",
          sender: "Sofia Vergara-Fan",
          handle: "@sofia_style",
          msg: "Hola! ¿Tienen disponible el vestido de seda champagne en talla S para envío a Miami hoy mismo? Gracias!"
        },
        {
          biz: "salon",
          channel: "instagram",
          sender: "Ashley Vance",
          handle: "@ashleyvance_la",
          msg: "Hey Marcus!! Can I book a full balayage refresh & blowout for next Saturday at 11am with Tyler or you? Sending inspo pic!"
        }
      ];

      // Filter simulation pool by target business or pick random
      const bizPool = simulationPool.filter(s => s.biz === targetBiz);
      const picked = (bizPool.length ? bizPool : simulationPool)[Math.floor(Math.random() * (bizPool.length || simulationPool.length))];

      const newTicket = await store.addIncomingMessage({
        businessId: targetBiz,
        channel: body.channel || picked.channel,
        rawMessage: body.rawMessage || picked.msg,
        customerName: body.customerName || picked.sender,
        customerHandle: body.customerHandle || picked.handle
      });

      return sendJson(res, 201, {
        success: true,
        message: "New incoming message simulated successfully!",
        ticket: newTicket
      });
    }

    // 6. Orders
    if (pathname === '/api/orders' && method === 'GET') {
      const businessId = urlObj.searchParams.get('businessId');
      return sendJson(res, 200, store.getOrders(businessId));
    }

    if (pathname.startsWith('/api/orders/') && method === 'PATCH') {
      const id = pathname.replace('/api/orders/', '');
      const body = await parseJsonBody(req);
      const updated = store.updateOrderStatus(id, body.status);
      return sendJson(res, 200, updated);
    }

    // 7. Complaints
    if (pathname === '/api/complaints' && method === 'GET') {
      const businessId = urlObj.searchParams.get('businessId');
      return sendJson(res, 200, store.getComplaints(businessId));
    }

    if (pathname.startsWith('/api/complaints/') && method === 'PATCH') {
      const id = pathname.replace('/api/complaints/', '');
      const body = await parseJsonBody(req);
      const updated = store.updateComplaint(id, body);
      return sendJson(res, 200, updated);
    }

    // 8. Customers
    if (pathname === '/api/customers' && method === 'GET') {
      const businessId = urlObj.searchParams.get('businessId');
      return sendJson(res, 200, store.getCustomers(businessId));
    }

    // 9. Analytics
    if (pathname === '/api/analytics' && method === 'GET') {
      const businessId = urlObj.searchParams.get('businessId');
      return sendJson(res, 200, store.getAnalytics(businessId));
    }

    // 10. Team
    if (pathname === '/api/team' && method === 'GET') {
      const businessId = urlObj.searchParams.get('businessId');
      return sendJson(res, 200, store.getTeam(businessId));
    }

    // 11. Tone settings & live preview
    if (pathname === '/api/tone' && method === 'POST') {
      const body = await parseJsonBody(req);
      const b = store.getActiveBusiness();
      if (body.tone) {
        b.tone = { ...b.tone, ...body.tone };
      }
      return sendJson(res, 200, { success: true, tone: b.tone });
    }

    // 12. Knowledge base
    if (pathname === '/api/knowledge' && method === 'POST') {
      const body = await parseJsonBody(req);
      const b = store.getActiveBusiness();
      if (body.knowledgeBase) {
        b.knowledgeBase = { ...b.knowledgeBase, ...body.knowledgeBase };
      }
      return sendJson(res, 200, { success: true, knowledgeBase: b.knowledgeBase });
    }

    // 13. Automation Rules
    if (pathname === '/api/rules' && method === 'POST') {
      const body = await parseJsonBody(req);
      const b = store.getActiveBusiness();
      if (body.rules) {
        b.rules = { ...b.rules, ...body.rules };
      }
      return sendJson(res, 200, { success: true, rules: b.rules });
    }

    // 14. Reset Demo Data
    if (pathname === '/api/reset-data' && method === 'POST') {
      store.resetData();
      return sendJson(res, 200, { success: true, message: 'All demo data reset to pristine state!' });
    }

  } catch (apiErr) {
    console.error('[API Error]', apiErr);
    return sendJson(res, 500, { error: apiErr.message || 'Internal Server Error' });
  }

  // ==========================================
  // STATIC ASSETS & SPA ROUTING
  // ==========================================
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const requestedFile = path.join(PUBLIC_DIR, safePath);
  serveStaticFile(res, requestedFile);
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 ${SITE_CONFIG.name} is running live on:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   Active Business: ${store.getActiveBusiness().name}`);
  console.log(`   LLM Status: ${process.env.GEMINI_API_KEY ? 'Gemini 1.5 Flash (Active)' : process.env.OPENAI_API_KEY ? 'OpenAI GPT-4o-mini (Active)' : 'Offline Local Semantic Engine (Active)'}`);
  console.log(`======================================================\n`);
});
