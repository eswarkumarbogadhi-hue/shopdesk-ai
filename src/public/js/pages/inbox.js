// ShopDesk AI - Unified Inbox & Detailed Ticket Management (Three-Pane Architecture)

let editingDraftMode = false;
let escalateModalOpen = false;

function renderInboxPage() {
  const filteredTickets = appStore.getFilteredTickets();
  const activeTicket = appStore.state.selectedTicket || filteredTickets[0] || null;
  const currentFilter = appStore.state.activeFilter;
  const team = appStore.state.team || [];

  return `
    <div class="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-canvas animate-fade-in">
      <!-- Three Pane Desktop Layout -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- ==========================================
             PANE 1: FILTERS & CATEGORIES (Left, 220px)
             ========================================== -->
        <aside class="w-56 border-r border-subtle bg-surface flex flex-col flex-shrink-0 p-3 space-y-4 overflow-y-auto hidden md:flex">
          <div>
            <div class="text-[11px] font-bold text-muted uppercase tracking-wider px-2 mb-2">Inbox Queues</div>
            <div class="space-y-0.5 text-xs font-medium">
              <button 
                onclick="appStore.setFilter({ status: 'all', category: 'all', urgency: 'all', needsHuman: false });" 
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition ${
                  currentFilter.status === 'all' && currentFilter.category === 'all' && !currentFilter.needsHuman ? 'bg-primary text-white font-semibold' : 'text-main hover:bg-muted'
                }"
              >
                <div class="flex items-center gap-2">
                  ${getIcon('Inbox', 'w-3.5 h-3.5')}
                  <span>All Messages</span>
                </div>
                <span class="text-[10px] opacity-75">${appStore.state.tickets.length}</span>
              </button>

              <button 
                onclick="appStore.setFilter({ urgency: 'high', category: 'all', needsHuman: false, status: 'all' });" 
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition ${
                  currentFilter.urgency === 'high' ? 'bg-coral text-white font-semibold' : 'text-coral-text hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }"
              >
                <div class="flex items-center gap-2">
                  ${getIcon('AlertTriangle', 'w-3.5 h-3.5')}
                  <span>Urgent Action</span>
                </div>
                <span class="text-[10px] font-bold">${appStore.state.stats.urgentCount}</span>
              </button>

              <button 
                onclick="appStore.setFilter({ needsHuman: true, urgency: 'all', category: 'all', status: 'all' });" 
                class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition ${
                  currentFilter.needsHuman ? 'bg-amber text-white font-semibold' : 'text-amber-text hover:bg-amber-50 dark:hover:bg-amber-950/30'
                }"
              >
                <div class="flex items-center gap-2">
                  ${getIcon('ShieldCheck', 'w-3.5 h-3.5')}
                  <span>Human Escalated</span>
                </div>
                <span class="text-[10px] opacity-75">${appStore.state.tickets.filter(t => t.needsHuman).length}</span>
              </button>
            </div>
          </div>

          <!-- Filter by AI Category -->
          <div>
            <div class="text-[11px] font-bold text-muted uppercase tracking-wider px-2 mb-2">AI Categories</div>
            <div class="space-y-0.5 text-xs font-medium">
              ${['order', 'complaint', 'enquiry', 'booking', 'refund', 'feedback', 'spam'].map(cat => {
                const count = appStore.state.tickets.filter(t => t.category === cat).length;
                const isCatActive = currentFilter.category === cat;
                return `
                  <button 
                    onclick="appStore.setFilter({ category: '${cat}', urgency: 'all', needsHuman: false });" 
                    class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl capitalize transition ${
                      isCatActive ? 'bg-primary-subtle text-primary font-bold' : 'text-muted hover:text-main hover:bg-muted'
                    }"
                  >
                    <span>${cat}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isCatActive ? 'bg-primary text-white font-bold' : 'bg-muted text-muted'}">${count}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Channels Filter -->
          <div>
            <div class="text-[11px] font-bold text-muted uppercase tracking-wider px-2 mb-2">Channels</div>
            <div class="space-y-0.5 text-xs font-medium">
              ${['whatsapp', 'instagram', 'gmail', 'webchat'].map(ch => {
                const count = appStore.state.tickets.filter(t => t.channel === ch).length;
                const isChActive = currentFilter.channel === ch;
                return `
                  <button 
                    onclick="appStore.setFilter({ channel: '${isChActive ? 'all' : ch}' });" 
                    class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl capitalize transition ${
                      isChActive ? 'bg-muted text-main font-bold' : 'text-muted hover:text-main hover:bg-muted'
                    }"
                  >
                    <div class="flex items-center gap-2">
                      ${getChannelIcon(ch, 'w-3.5 h-3.5')}
                      <span>${ch}</span>
                    </div>
                    <span class="text-[10px] text-muted">${count}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Shortcuts Hint -->
          <div class="mt-auto p-2.5 rounded-xl bg-canvas border border-subtle text-[11px] text-muted space-y-1">
            <div class="font-bold text-main">Keyboard Shortcuts</div>
            <div><kbd class="font-mono">J</kbd> / <kbd class="font-mono">K</kbd> : Next / Prev</div>
            <div><kbd class="font-mono">E</kbd> : Approve & Send</div>
            <div><kbd class="font-mono">S</kbd> : Simulate DM</div>
          </div>
        </aside>

        <!-- ==========================================
             PANE 2: TICKET LIST (Middle, 340px)
             ========================================== -->
        <section class="w-full md:w-80 lg:w-96 border-r border-subtle bg-surface flex flex-col flex-shrink-0">
          <!-- Search & Filter Bar -->
          <div class="p-3 border-b border-subtle space-y-2">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search messages, names, order #..." 
                value="${currentFilter.search || ''}"
                oninput="appStore.setFilter({ search: this.value })"
                class="input text-xs pl-8 py-1.5"
              />
              <span class="absolute left-2.5 top-2 text-muted">
                ${getIcon('Search', 'w-3.5 h-3.5')}
              </span>
            </div>

            <div class="flex items-center justify-between text-[11px] text-muted px-1">
              <span>Showing ${filteredTickets.length} messages</span>
              <button onclick="appStore.setFilter({ status: 'all', category: 'all', urgency: 'all', channel: 'all', needsHuman: false, search: '' })" class="text-primary hover:underline font-medium">
                Reset filters
              </button>
            </div>
          </div>

          <!-- List Items -->
          <div class="flex-1 overflow-y-auto divide-y divide-subtle">
            ${filteredTickets.length === 0 ? `
              <div class="p-8 text-center text-muted">
                <div class="w-10 h-10 rounded-xl bg-canvas border border-subtle mx-auto mb-2 flex items-center justify-center">
                  ${getIcon('Inbox', 'w-5 h-5 text-muted')}
                </div>
                <div class="font-semibold text-xs text-main mb-1">No matching messages</div>
                <p class="text-[11px]">Try clearing search or filters.</p>
              </div>
            ` : filteredTickets.map(t => {
              const isSelected = activeTicket && activeTicket.id === t.id;
              const timeString = new Date(t.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return `
                <div 
                  onclick="appStore.selectTicket('${t.id}')"
                  class="p-3.5 cursor-pointer transition ${
                    isSelected ? 'bg-primary-subtle/40 border-l-4 border-primary' : 'hover:bg-muted text-main'
                  }"
                >
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <div class="flex items-center gap-1.5 min-w-0">
                      ${getChannelIcon(t.channel, 'w-3.5 h-3.5')}
                      <span class="font-semibold text-xs text-main truncate">${t.customer.name}</span>
                      ${t.customer.tag === 'VIP' ? `<span class="px-1.5 py-0.2 rounded bg-amber-subtle text-amber-text text-[9px] font-bold">VIP</span>` : ''}
                    </div>
                    <span class="text-[10px] text-muted flex-shrink-0">${timeString}</span>
                  </div>

                  <!-- Message snippet -->
                  <div class="text-xs text-muted line-clamp-2 leading-relaxed mb-2 font-mono text-[11px]">
                    "${t.rawMessage}"
                  </div>

                  <!-- Chips Row -->
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="badge badge-${t.category} text-[10px] font-bold">
                      ${t.category}
                    </span>
                    ${t.urgency === 'high' ? `
                      <span class="badge badge-urgent-high text-[10px]">Urgent</span>
                    ` : ''}
                    ${t.needsHuman ? `
                      <span class="px-1.5 py-0.2 rounded bg-coral-subtle text-coral-text font-bold text-[9px]">⚠️ Needs Human</span>
                    ` : ''}
                    ${t.status === 'resolved' ? `
                      <span class="text-[10px] text-emerald-500 font-bold ml-auto flex items-center gap-0.5">
                        ${getIcon('Check', 'w-3 h-3')} Resolved
                      </span>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- ==========================================
             PANE 3: TICKET DETAIL (Right, flex-1)
             ========================================== -->
        <main class="flex-1 bg-surface flex flex-col overflow-hidden hidden md:flex">
          ${activeTicket ? renderTicketDetailContent(activeTicket, team) : `
            <div class="flex-1 flex items-center justify-center text-center p-8 text-muted">
              Select a message from the list to review the thread and approve AI drafts.
            </div>
          `}
        </main>
      </div>

      <!-- Escalate Modal (If Triggered) -->
      ${escalateModalOpen ? renderEscalateModal(activeTicket) : ''}
    </div>
  `;
}

function renderTicketDetailContent(t, team) {
  const isEditing = editingDraftMode;

  return `
    <!-- Detail Top Bar -->
    <div class="p-4 border-b border-subtle flex items-center justify-between bg-surface">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-10 h-10 rounded-full overflow-hidden border border-subtle flex-shrink-0">
          <img src="${t.customer.avatar}" alt="${t.customer.name}" class="w-full h-full object-cover">
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h2 class="font-display font-bold text-sm text-main truncate">${t.customer.name}</h2>
            <span class="text-xs text-muted">${t.customer.handle}</span>
            <span class="badge badge-${t.category} text-[10px] font-bold uppercase">${t.category}</span>
          </div>
          <div class="text-[11px] text-muted flex items-center gap-2 mt-0.5">
            <span>Channel: ${t.channel.toUpperCase()}</span>
            <span>•</span>
            <span>Customer LTV: <strong>$${(t.customer.lifetimeSpend || 0).toFixed(2)}</strong></span>
            <span>•</span>
            <span>Language: <strong>${t.language.toUpperCase()}</strong></span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex items-center gap-2">
        <button onclick="openEscalateModal()" class="btn btn-secondary btn-sm text-coral-text hover:bg-rose-50 flex items-center gap-1.5" title="Escalate to human review">
          ${getIcon('AlertTriangle', 'w-3.5 h-3.5')}
          <span>Escalate</span>
        </button>
        <button onclick="appStore.approveDraft('${t.id}')" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-sm">
          ${getIcon('CheckCircle2', 'w-3.5 h-3.5 text-white')}
          <span>Approve & Send (E)</span>
        </button>
      </div>
    </div>

    <!-- Scrollable Detail Body -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      
      <!-- 1. AI Summary & Explainability Banner -->
      <div class="p-4 rounded-2xl bg-canvas border border-subtle">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="p-1 rounded-lg bg-primary text-white">${getIcon('Sparkles', 'w-3 h-3')}</span>
            <span class="font-bold text-xs text-main uppercase tracking-wider">AI Intent & Explainability</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-[11px] text-muted">Confidence:</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-subtle text-emerald-text font-bold text-xs">
              ${Math.round(t.aiConfidence * 100)}%
            </span>
          </div>
        </div>
        <p class="text-xs text-main font-medium mb-1.5">${t.summary || "Customer inquiry received."}</p>
        <p class="text-[11px] text-muted leading-relaxed italic">${t.whyClassification || "Analyzed keywords and customer intent."}</p>
      </div>

      <!-- 2. Human Escalation Notice if flagged -->
      ${t.needsHuman ? `
        <div class="p-4 rounded-2xl bg-coral-subtle border border-rose-300 text-coral-text space-y-1">
          <div class="font-bold text-xs flex items-center gap-2">
            ${getIcon('AlertTriangle', 'w-4 h-4')}
            <span>High-Risk Case: Human Review Triggered</span>
          </div>
          <p class="text-xs leading-relaxed">${t.needsHumanReason}</p>
          <div class="text-[11px] font-semibold text-rose-800 dark:text-rose-300 pt-1">
            Suggested Staff Action: ${t.suggestedAction}
          </div>
        </div>
      ` : ''}

      <!-- 3. Conversation Thread -->
      <div>
        <div class="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Customer Message</div>
        <div class="p-4 rounded-2xl bg-surface border border-subtle shadow-sm flex items-start gap-3">
          <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
            <img src="${t.customer.avatar}" class="w-full h-full object-cover" alt="${t.customer.name}">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <span class="font-semibold text-xs text-main">${t.customer.name}</span>
              <span class="text-[10px] text-muted">${new Date(t.receivedAt).toLocaleTimeString()}</span>
            </div>
            <div class="p-3 rounded-xl bg-canvas text-xs text-main leading-relaxed font-mono">
              "${t.rawMessage}"
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Extracted Entities Card (Editable) -->
      <div class="card p-4 bg-surface">
        <div class="flex items-center justify-between mb-3">
          <span class="font-bold text-xs text-main uppercase tracking-wider flex items-center gap-1.5">
            ${getIcon('ShoppingBag', 'w-3.5 h-3.5 text-emerald')} Extracted Details & Flags
          </span>
          <span class="text-[11px] text-muted">Auto-parsed into orders</span>
        </div>

        ${t.entities?.allergies ? `
          <div class="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-700 dark:text-rose-300 text-xs font-bold mb-3 flex items-center gap-2">
            <span>🛡️ CRITICAL HEALTH ALERT:</span>
            <span>${t.entities.allergies}</span>
          </div>
        ` : ''}

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-2.5 rounded-xl bg-canvas border border-subtle">
            <div class="text-muted text-[11px] mb-0.5">Requested Items</div>
            <div class="font-semibold text-main">${t.entities?.items ? t.entities.items.join(', ') : 'None listed'}</div>
          </div>
          <div class="p-2.5 rounded-xl bg-canvas border border-subtle">
            <div class="text-muted text-[11px] mb-0.5">Target Pickup/Delivery</div>
            <div class="font-semibold text-main">${t.entities?.pickupDate || t.entities?.dates || 'Not specified'}</div>
          </div>
          <div class="p-2.5 rounded-xl bg-canvas border border-subtle">
            <div class="text-muted text-[11px] mb-0.5">Order / Tracking Number</div>
            <div class="font-semibold text-main font-mono">${t.entities?.orderNumber || t.entities?.order_number || 'N/A'}</div>
          </div>
          <div class="p-2.5 rounded-xl bg-canvas border border-subtle">
            <div class="text-muted text-[11px] mb-0.5">Estimated Value</div>
            <div class="font-bold text-emerald-600">${t.entities?.orderTotal ? `$${t.entities.orderTotal.toFixed(2)}` : 'Enquiry / Consultation'}</div>
          </div>
        </div>
      </div>

      <!-- 5. Suggested Reply Card (The Core Magic!) -->
      <div class="card p-5 bg-gradient-to-br from-surface to-primary-subtle/10 border-primary/30 shadow-md">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold uppercase">AI Draft</span>
            <span class="text-xs text-muted">Grounded in Knowledge Base</span>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="appStore.regenerateDraft('${t.id}', 'friendly')" class="btn btn-secondary btn-sm text-[11px] py-1" title="Regenerate draft in friendly tone">
              ${getIcon('RefreshCw', 'w-3 h-3')} Regenerate
            </button>
            <button onclick="toggleEditDraftMode()" class="btn btn-secondary btn-sm text-[11px] py-1">
              ${getIcon('Edit3', 'w-3 h-3')} ${isEditing ? 'Cancel Edit' : 'Edit Draft'}
            </button>
          </div>
        </div>

        ${isEditing ? `
          <div class="space-y-3">
            <textarea id="edit-draft-textarea" class="textarea text-xs h-36 leading-relaxed font-sans">${t.suggestedReply || ''}</textarea>
            <div class="flex justify-end gap-2">
              <button onclick="toggleEditDraftMode(false)" class="btn btn-secondary btn-sm">Cancel</button>
              <button onclick="saveEditedDraft('${t.id}')" class="btn btn-primary btn-sm">Save Changes</button>
            </div>
          </div>
        ` : `
          <div class="p-3.5 rounded-xl bg-surface border border-subtle text-xs text-main leading-relaxed whitespace-pre-line shadow-sm mb-4 font-sans">
            ${t.suggestedReply || 'No reply generated for spam message.'}
          </div>

          <div class="flex items-center justify-between">
            <span class="text-[11px] text-muted">
              Sends via <strong>${t.channel.toUpperCase()}</strong> directly to ${t.customer.name}
            </span>
            <button onclick="appStore.approveDraft('${t.id}')" class="btn btn-primary text-xs font-bold px-6 py-2 shadow-md flex items-center gap-2">
              ${getIcon('Send', 'w-3.5 h-3.5')}
              <span>Approve & Send Reply</span>
            </button>
          </div>
        `}
      </div>

      <!-- 6. Staff Notes & Activity Timeline -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Internal Staff Notes -->
        <div class="card p-4 bg-surface">
          <div class="font-bold text-xs text-main uppercase tracking-wider mb-2 flex items-center gap-1.5">
            ${getIcon('Edit3', 'w-3.5 h-3.5 text-muted')} Internal Staff Notes
          </div>
          <p class="text-xs text-muted mb-3 leading-relaxed whitespace-pre-line">
            ${t.staffNotes || 'No notes added yet. Keep track of customer preferences here.'}
          </p>
          <div class="flex gap-2">
            <input type="text" id="internal-note-input" placeholder="Add note (e.g. VIP client preferences)..." class="input text-xs py-1.5" />
            <button onclick="submitInternalNote('${t.id}')" class="btn btn-secondary btn-sm whitespace-nowrap">Save</button>
          </div>
        </div>

        <!-- Activity Timeline -->
        <div class="card p-4 bg-surface">
          <div class="font-bold text-xs text-main uppercase tracking-wider mb-2 flex items-center gap-1.5">
            ${getIcon('Clock', 'w-3.5 h-3.5 text-muted')} Activity Log
          </div>
          <div class="space-y-2 text-xs max-h-36 overflow-y-auto pr-1">
            ${(t.history || []).map(h => `
              <div class="flex items-start justify-between text-[11px] pb-1 border-b border-subtle last:border-0">
                <span class="text-main">${h.action}</span>
                <span class="text-muted text-[10px] ml-2 flex-shrink-0">${new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleEditDraftMode(forceState = null) {
  editingDraftMode = forceState !== null ? forceState : !editingDraftMode;
  renderApp();
}

function saveEditedDraft(ticketId) {
  const el = document.getElementById('edit-draft-textarea');
  if (el) {
    appStore.updateDraft(ticketId, el.value);
    editingDraftMode = false;
  }
}

function submitInternalNote(ticketId) {
  const el = document.getElementById('internal-note-input');
  if (el && el.value.trim()) {
    appStore.addInternalNote(ticketId, el.value);
    el.value = '';
  }
}

function openEscalateModal() {
  escalateModalOpen = true;
  renderApp();
}

function renderEscalateModal(ticket) {
  return `
    <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div class="card max-w-md w-full p-6 bg-surface shadow-2xl animate-slide-up" onclick="event.stopPropagation()">
        <div class="flex items-center gap-2 text-coral mb-3">
          ${getIcon('AlertTriangle', 'w-5 h-5')}
          <h3 class="font-display font-bold text-base text-main">Escalate Ticket to Human Review</h3>
        </div>
        <p class="text-xs text-muted mb-4">
          Flag this ticket for immediate owner intervention. This will pause automated drafting and assign high urgency.
        </p>

        <label class="block text-xs font-semibold text-muted mb-1">Escalation Reason</label>
        <select id="escalate-reason-select" class="select text-xs mb-4">
          <option value="Customer dissatisfied / Angry tone">Customer dissatisfied / Angry tone</option>
          <option value="Damage claim requiring courier insurance">Damage claim requiring courier insurance</option>
          <option value="Refund amount exceeds $40 auto-approval limit">Refund amount exceeds $40 limit</option>
          <option value="Special customized sizing / allergic request">Special allergen or custom sizing request</option>
          <option value="Legal or chargeback dispute threat">Legal or chargeback dispute threat</option>
        </select>

        <div class="flex justify-end gap-2">
          <button onclick="escalateModalOpen = false; renderApp();" class="btn btn-secondary text-xs">
            Cancel
          </button>
          <button onclick="confirmEscalation('${ticket.id}')" class="btn btn-coral text-xs font-bold">
            Confirm Escalation
          </button>
        </div>
      </div>
    </div>
  `;
}

function confirmEscalation(ticketId) {
  const select = document.getElementById('escalate-reason-select');
  const reason = select ? select.value : "Manual owner escalation";
  appStore.escalateTicket(ticketId, reason);
  escalateModalOpen = false;
}
