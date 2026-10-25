// ShopDesk AI - Team Members & Roles Page

function renderTeamPage() {
  const team = appStore.state.team || [];

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Team & Escalation Roster</h1>
            <span class="badge badge-booking text-xs font-bold">${team.length} Members</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Assign staff members to kitchen orders, customer complaints, and VIP inquiries.</p>
        </div>

        <button onclick="toast.show({ title: 'Invite Sent', message: 'Staff invite link generated.', type: 'info' })" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-sm">
          ${getIcon('UserCheck', 'w-3.5 h-3.5')}
          <span>Invite Team Member</span>
        </button>
      </div>

      <!-- Team Members Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${team.map(m => `
          <div class="card p-6 bg-surface space-y-4 hover:shadow-md transition">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-subtle flex-shrink-0">
                <img src="${m.avatar}" class="w-full h-full object-cover" alt="${m.name}">
              </div>
              <div>
                <h3 class="font-display font-bold text-sm text-main">${m.name}</h3>
                <div class="text-xs text-primary font-medium">${m.role}</div>
                <div class="text-[11px] text-muted">${m.email}</div>
              </div>
            </div>

            <div class="pt-3 border-t border-subtle flex items-center justify-between text-xs text-muted">
              <span>Assigned Tickets: <strong class="text-main">${m.ticketsAssigned || 0}</strong></span>
              <span class="flex items-center gap-1 text-emerald-600 font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Active
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
