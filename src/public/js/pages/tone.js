// ShopDesk AI - Tone of Voice & Response Templates Page

let tonePreviewText = "";

function renderTonePage() {
  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse" };
  const tone = activeBiz.tone || {
    formality: 25,
    brevity: 40,
    emojiLevel: 75,
    greeting: "Hey there! 🧁",
    signoff: "Sweet wishes,\nSarah & the Sweet Crumbs team ✨",
    customInstructions: "Always mention nut-free safety procedures when allergies are flagged."
  };

  if (!tonePreviewText) {
    updateTonePreviewSample(tone);
  }

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-subtle">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-display font-extrabold text-2xl text-main">Tone of Voice & Templates</h1>
            <span class="badge badge-booking text-xs font-bold">Personal Brand Persona</span>
          </div>
          <p class="text-xs text-muted mt-0.5">Control how your AI speaks to your customers so it sounds unmistakably like you.</p>
        </div>

        <button onclick="saveToneSettings()" class="btn btn-primary btn-sm flex items-center gap-1.5 shadow-sm">
          ${getIcon('Check', 'w-3.5 h-3.5')}
          <span>Save Tone Settings</span>
        </button>
      </div>

      <!-- Two Column Layout: Sliders vs Live Preview -->
      <div class="tone-split-grid w-full items-start">
        <!-- Left: Tone Sliders (6 cols) -->
        <div class="card p-6 bg-surface space-y-6 w-full">
          <h3 class="font-display font-bold text-base text-main">Personality Sliders</h3>

          <!-- Formality Slider -->
          <div>
            <div class="flex items-center justify-between text-xs font-semibold mb-1">
              <span>Formality</span>
              <span id="formality-val" class="text-primary font-bold">${tone.formality < 40 ? 'Warm & Casual' : tone.formality > 70 ? 'Formal & Polished' : 'Balanced Warmth'} (${tone.formality}%)</span>
            </div>
            <input 
              id="slider-formality"
              type="range" min="0" max="100" value="${tone.formality}"
              class="w-full accent-indigo-600 cursor-pointer"
              oninput="handleToneSliderChange()"
            />
            <div class="flex justify-between text-[10px] text-muted mt-1">
              <span>Casual & Friendly ("Hey Sarah!")</span>
              <span>Formal & Polite ("Dear Ms. Smith")</span>
            </div>
          </div>

          <!-- Brevity Slider -->
          <div>
            <div class="flex items-center justify-between text-xs font-semibold mb-1">
              <span>Brevity / Length</span>
              <span id="brevity-val" class="text-teal font-bold">${tone.brevity < 40 ? 'Short & Direct' : 'Detailed & Comprehensive'} (${tone.brevity}%)</span>
            </div>
            <input 
              id="slider-brevity"
              type="range" min="0" max="100" value="${tone.brevity}"
              class="w-full accent-teal-600 cursor-pointer"
              oninput="handleToneSliderChange()"
            />
            <div class="flex justify-between text-[10px] text-muted mt-1">
              <span>Punchy (1-2 sentences)</span>
              <span>Elaborate with complete steps</span>
            </div>
          </div>

          <!-- Emoji Frequency Slider -->
          <div>
            <div class="flex items-center justify-between text-xs font-semibold mb-1">
              <span>Emoji Frequency</span>
              <span id="emoji-val" class="text-coral font-bold">${tone.emojiLevel > 60 ? 'Expressive ✨🧁' : tone.emojiLevel > 25 ? 'Subtle ✨' : 'None'} (${tone.emojiLevel}%)</span>
            </div>
            <input 
              id="slider-emoji"
              type="range" min="0" max="100" value="${tone.emojiLevel}"
              class="w-full accent-rose-500 cursor-pointer"
              oninput="handleToneSliderChange()"
            />
            <div class="flex justify-between text-[10px] text-muted mt-1">
              <span>Zero emojis (Corporate)</span>
              <span>Playful & expressive (3-5 emojis)</span>
            </div>
          </div>

          <!-- Custom Greetings and Signoffs -->
          <div class="pt-4 border-t border-subtle space-y-4">
            <div>
              <label class="block text-xs font-semibold text-muted mb-1">Default Greeting</label>
              <input type="text" id="tone-greeting" value="${tone.greeting || ''}" class="input text-xs" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-muted mb-1">Default Sign-off & Signature</label>
              <textarea id="tone-signoff" class="textarea text-xs h-20 leading-relaxed">${tone.signoff || ''}</textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-muted mb-1">Custom Business Rules for the AI</label>
              <textarea id="tone-custom-instructions" class="textarea text-xs h-20 leading-relaxed">${tone.customInstructions || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- Right: Live Preview Console (6 cols) -->
        <div class="card p-6 bg-surface space-y-4 sticky top-20 shadow-xl w-full">
          <div class="flex items-center justify-between pb-3 border-b border-subtle">
            <span class="font-display font-bold text-sm text-main flex items-center gap-2">
              ${getIcon('Sparkles', 'w-4 h-4 text-primary')} Real-Time Draft Preview
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-subtle text-emerald-text font-bold">Auto-Updating</span>
          </div>

          <div class="p-3 rounded-xl bg-canvas border border-subtle text-xs text-muted">
            <span class="font-bold text-main">Test Scenario: </span>
            Customer asking: <em>"Hey, do you do custom birthday cakes with nut-free options for Saturday?"</em>
          </div>

          <!-- Preview Body -->
          <div id="tone-live-preview" class="p-4 rounded-xl bg-surface border border-subtle text-xs text-main leading-relaxed whitespace-pre-line shadow-sm font-sans min-h-[160px]">
            ${tonePreviewText}
          </div>

          <!-- Canned Quick Snippets -->
          <div class="pt-3 border-t border-subtle">
            <div class="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Saved Canned Snippets</div>
            <div class="space-y-1.5 text-xs">
              <div class="p-2.5 rounded-lg bg-canvas border border-subtle flex items-center justify-between">
                <div>
                  <div class="font-semibold text-main">#allergy-safety</div>
                  <div class="text-[10px] text-muted">"We operate a dedicated allergen sterilization protocol between batches..."</div>
                </div>
                <button onclick="navigator.clipboard.writeText('We operate a dedicated allergen sterilization protocol between batches.'); toast.show({ title: 'Copied snippet', message: 'Ready to paste.', type: 'info' })" class="btn btn-secondary btn-sm text-[10px] py-0.5 px-2">Copy</button>
              </div>

              <div class="p-2.5 rounded-lg bg-canvas border border-subtle flex items-center justify-between">
                <div>
                  <div class="font-semibold text-main">#48h-custom-rule</div>
                  <div class="text-[10px] text-muted">"Custom tiered cakes require at least 48 to 72 hours advance notice..."</div>
                </div>
                <button onclick="navigator.clipboard.writeText('Custom tiered cakes require at least 48 to 72 hours advance notice.'); toast.show({ title: 'Copied snippet', message: 'Ready to paste.', type: 'info' })" class="btn btn-secondary btn-sm text-[10px] py-0.5 px-2">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleToneSliderChange() {
  const formality = parseInt(document.getElementById('slider-formality').value);
  const brevity = parseInt(document.getElementById('slider-brevity').value);
  const emojiLevel = parseInt(document.getElementById('slider-emoji').value);

  // Update labels
  document.getElementById('formality-val').innerText = `${formality < 40 ? 'Warm & Casual' : formality > 70 ? 'Formal & Polished' : 'Balanced'} (${formality}%)`;
  document.getElementById('brevity-val').innerText = `${brevity < 40 ? 'Short & Direct' : 'Detailed'} (${brevity}%)`;
  document.getElementById('emoji-val').innerText = `${emojiLevel > 60 ? 'Expressive ✨🧁' : emojiLevel > 25 ? 'Subtle ✨' : 'None'} (${emojiLevel}%)`;

  updateTonePreviewSample({ formality, brevity, emojiLevel });
}

function updateTonePreviewSample({ formality, brevity, emojiLevel }) {
  const useEmoji = emojiLevel > 25;
  const isFormal = formality > 60;
  const isShort = brevity < 40;

  const activeBiz = appStore.state.activeBusiness || { name: "Sweet Crumbs Bakehouse", owner: "Sarah" };

  let greeting = isFormal ? "Hello," : `Hey there!${useEmoji ? " 🧁" : ""}`;
  let body = "";

  if (isShort) {
    body = `Yes! We do custom 6" and 8" birthday cakes with a dedicated nut-free sterilization run ($6 surcharge). Saturday slots are still open.`;
  } else {
    body = `We would absolutely love to bake for your Saturday celebration!${useEmoji ? " ✨" : ""}\n\nOur custom birthday cakes start at $55 (6-inch, serves 8-10) and $85 (8-inch, serves 16-20). We also operate a strict allergen sterilization protocol between batches ($6 surcharge) to keep your celebration safe.${useEmoji ? " 🛡️" : ""}\n\nWould you like me to reserve a Saturday pickup slot for you?`;
  }

  let signoff = isFormal ? `Sincerely,\n${activeBiz.name} Client Services` : `Sweet wishes,\n${activeBiz.owner.split(' ')[0]} & the ${activeBiz.name.split(' ')[0]} team${useEmoji ? " ✨" : ""}`;

  tonePreviewText = `${greeting}\n\n${body}\n\n${signoff}`;
  const el = document.getElementById('tone-live-preview');
  if (el) el.innerText = tonePreviewText;
}

async function saveToneSettings() {
  const formality = parseInt(document.getElementById('slider-formality').value);
  const brevity = parseInt(document.getElementById('slider-brevity').value);
  const emojiLevel = parseInt(document.getElementById('slider-emoji').value);
  const greeting = document.getElementById('tone-greeting').value;
  const signoff = document.getElementById('tone-signoff').value;
  const customInstructions = document.getElementById('tone-custom-instructions').value;

  try {
    await fetch('/api/tone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tone: { formality, brevity, emojiLevel, greeting, signoff, customInstructions }
      })
    });
    if (appStore.state.activeBusiness) {
      appStore.state.activeBusiness.tone = { formality, brevity, emojiLevel, greeting, signoff, customInstructions };
    }
    toast.show({
      title: "Tone Settings Saved! ✨",
      message: "Future customer drafts will strictly reflect your updated voice parameters.",
      type: "success",
      sound: "pop"
    });
  } catch (err) {
    console.error('[Save Tone Failed]', err);
  }
}
