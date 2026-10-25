// ShopDesk AI - Animated Toast Notification System with Synthetic Web Audio Feedback
// Zero sound asset files needed: generates clean acoustic sound synthesis via Web Audio API!

class ToastManager {
  constructor() {
    this.container = null;
    this.audioCtx = null;
    this.init();
  }

  init() {
    let el = document.getElementById('toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-container';
      el.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(el);
    }
    this.container = el;
  }

  getAudioContext() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playSound(type = 'ping') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'incoming') {
        // Dual melodic chime (E5 -> B5)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'urgent') {
        // Urgent warning tone (F#5 -> C#5)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(739.99, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        // Crisp confirmation pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Audio context might be restricted before user interaction, silent fallback
    }
  }

  show({ title, message, type = 'info', duration = 4000, sound = 'pop' }) {
    if (sound) this.playSound(sound);

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border bg-surface transition-all transform translate-y-4 opacity-0 animate-slide-up ${
      type === 'urgent' ? 'border-coral-subtle bg-coral-subtle text-coral-text' :
      type === 'success' ? 'border-emerald-subtle bg-emerald-subtle text-emerald-text' :
      'border-subtle bg-surface text-main'
    }`;

    let iconName = 'Info';
    if (type === 'success') iconName = 'CheckCircle2';
    if (type === 'urgent') iconName = 'AlertTriangle';
    if (type === 'incoming') iconName = 'Sparkles';

    toast.innerHTML = `
      <div class="flex-shrink-0 mt-0.5">${getIcon(iconName, 'w-5 h-5')}</div>
      <div class="flex-1 text-sm">
        <div class="font-semibold text-main mb-0.5">${title}</div>
        <div class="text-xs text-muted leading-relaxed">${message}</div>
      </div>
      <button class="flex-shrink-0 text-muted hover:text-main p-1 rounded-md transition" onclick="this.parentElement.remove()">
        ${getIcon('XCircle', 'w-4 h-4')}
      </button>
    `;

    this.container.appendChild(toast);

    // Auto animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

const toast = new ToastManager();
