// ShopDesk AI - Complaints & Escalations Hub

function renderComplaintsPage() {
  const complaints = appStore.state.complaints || [];

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Complaints & Escalations</h1>
            <span class="badge badge-complaint text-xs font-bold">${complaints.length} Under Review</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Automated safety net protecting your customer satisfaction and business reputation.</p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">SLA Target: <strong>60-minute resolution</strong></span>
        </div>
      </div>

      <!-- Complaints List Cards -->
      <div class="space-y-4">
        ${complaints.length === 0 ? `
          <div class="card p-12 text-center text-muted">
            <div class="w-12 h-12 rounded-2xl bg-emerald-subtle text-emerald-text mx-auto mb-3 flex items-center justify-center">
              ${getIcon('CheckCircle2', 'w-6 h-6')}
            </div>
            <div class="font-bold text-base text-main mb-1">Zero Open Complaints!</div>
            <p class="text-xs">All customer concerns have been resolved to satisfaction.</p>
          </div>
        ` : complaints.map(c => `
          <div class="card p-6 bg-surface border-l-4 ${
            c.severity === 'Critical' ? 'border-coral' : 'border-amber'
          } space-y-4 shadow-md">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-subtle">
              <div class="flex items-center gap-3">
                <span class="badge ${c.severity === 'Critical' ? 'badge-urgent-high' : 'badge-urgent-medium'} text-xs font-bold uppercase">
                  ${c.severity} Severity
                </span>
                <h3 class="font-display font-bold text-base text-main">${c.customerName}</h3>
                ${c.orderNumber ? `<span class="text-xs font-mono text-muted">Order ${c.orderNumber}</span>` : ''}
              </div>

              <!-- SLA Countdown -->
              <div class="flex items-center gap-2 text-xs font-semibold ${c.slaMinutesLeft < 20 ? 'text-coral' : 'text-amber-text'}">
                ${getIcon('Clock', 'w-4 h-4')}
                <span>SLA Timer: ${c.slaMinutesLeft} mins remaining</span>
              </div>
            </div>

            <!-- Reason Description -->
            <div class="p-3 rounded-xl bg-canvas border border-subtle text-xs">
              <span class="font-bold text-main">Escalation Trigger: </span>
              <span class="text-muted">${c.reason}</span>
            </div>

            <!-- Resolution Steps Checklist -->
            <div>
              <div class="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Resolution Checklist</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                ${c.resolutionSteps.map((step, idx) => `
                  <label class="flex items-center gap-2 p-2 rounded-lg border border-subtle bg-surface hover:bg-muted cursor-pointer transition">
                    <input 
                      type="checkbox" 
                      ${step.completed ? 'checked' : ''} 
                      onchange="toggleComplaintStep('${c.id}', ${idx})" 
                      class="rounded accent-indigo-600"
                    />
                    <span class="${step.completed ? 'line-through text-muted' : 'text-main font-medium'}">${step.step}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Footer Action -->
            <div class="pt-3 border-t border-subtle flex items-center justify-between">
              <span class="text-[11px] text-muted">Status: <strong class="text-main">${c.status}</strong></span>
              <button onclick="appStore.selectTicket('${c.ticketId}'); navigateTo('/app/inbox');" class="btn btn-secondary btn-sm flex items-center gap-1.5">
                <span>View Full Ticket Thread</span>
                ${getIcon('ArrowRight', 'w-3 h-3')}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleComplaintStep(complaintId, stepIndex) {
  const c = (appStore.state.complaints || []).find(item => item.id === complaintId);
  if (c && c.resolutionSteps[stepIndex]) {
    c.resolutionSteps[stepIndex].completed = !c.resolutionSteps[stepIndex].completed;
    toast.show({
      title: "Checklist Updated",
      message: `Step marked ${c.resolutionSteps[stepIndex].completed ? 'completed' : 'pending'}.`,
      type: "info",
      sound: "pop"
    });
    renderApp();
  }
}
