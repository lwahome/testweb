// ============================================================================
// LUCENT CHAT ASSISTANT — floating chat bubble on every page
// Talks to /api/chat (Vercel serverless function), which calls Claude.
// ============================================================================

(function () {
  const STORAGE_KEY = 'lucent-chat';
  const WELCOME = "Hi! I'm Lucent's assistant. Ask me about our websites, AI assistants or AI consultations.";

  let history = [];
  try {
    history = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    history = [];
  }

  function save() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-20))); } catch (e) { /* ignore */ }
  }

  // ---- Build the widget -----------------------------------------------------
  const launcher = document.createElement('button');
  launcher.className = 'chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Chat with Lucent');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = '<span aria-hidden="true">💬</span>';

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Lucent chat assistant');
  panel.hidden = true;
  panel.innerHTML = `
    <div class="chat-header">
      <div>
        <strong>Lucent Assistant</strong>
        <span>Usually replies instantly</span>
      </div>
      <button type="button" class="chat-close" aria-label="Close chat">✕</button>
    </div>
    <div class="chat-messages" aria-live="polite"></div>
    <form class="chat-form">
      <label for="chat-input" class="visually-hidden">Type your message</label>
      <input id="chat-input" type="text" maxlength="1000" autocomplete="off" placeholder="Type your question…" required>
      <button type="submit" class="chat-send" aria-label="Send">➤</button>
    </form>
    <p class="chat-note">AI assistant — answers may not be perfect. For quotes, <a href="https://wa.me/254745477472" target="_blank" rel="noopener noreferrer">WhatsApp Lucy</a>.</p>
  `;

  document.body.appendChild(panel);
  document.body.appendChild(launcher);

  const list = panel.querySelector('.chat-messages');
  const form = panel.querySelector('.chat-form');
  const input = panel.querySelector('#chat-input');
  const sendBtn = panel.querySelector('.chat-send');

  // Scroll after the browser has drawn the new message, so typing stays smooth.
  function scrollToBottom() {
    requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; });
  }

  // Let the browser show what's on screen before doing more work.
  const nextFrame = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));

  // Safety net: remove markdown symbols (e.g. **bold**) the chat can't display.
  function plain(text) {
    return String(text)
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/__(.+?)__/g, '$1')
      .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '$1 ($2)')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^\s*\*\s+/gm, '- ')
      .replace(/\*\*/g, '');
  }

  function addBubble(role, text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-msg chat-msg-' + role;
    bubble.textContent = role === 'assistant' ? plain(text) : text;
    list.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  addBubble('assistant', WELCOME);
  history.forEach(m => addBubble(m.role, m.content));

  function openChat() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    launcher.classList.add('open');
    input.focus();
    scrollToBottom();
  }

  function closeChat() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.classList.remove('open');
  }

  launcher.addEventListener('click', () => (panel.hidden ? openChat() : closeChat()));
  panel.querySelector('.chat-close').addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) closeChat(); });

  // ---- Sending messages -----------------------------------------------------
  let busy = false; // stops a second message being sent while waiting for a reply
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    busy = true;

    // Show the visitor's message straight away; do the rest after it appears.
    input.value = '';
    input.readOnly = true; // readOnly (not disabled) keeps focus, which is cheaper
    sendBtn.disabled = true;
    addBubble('user', text);
    const typing = addBubble('assistant', 'Typing…');
    typing.classList.add('chat-typing');
    await nextFrame();

    history.push({ role: 'user', content: text });
    save();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.code || ('HTTP_' + res.status));

      typing.classList.remove('chat-typing');
      typing.textContent = plain(data.reply);
      history.push({ role: 'assistant', content: data.reply });
      save();
    } catch (err) {
      typing.classList.remove('chat-typing');
      typing.classList.add('chat-error');
      typing.textContent = "Sorry, I can't answer right now. Please reach Lucy on WhatsApp at 0745 477 472.\n(code: " + (err.message || 'NETWORK') + ")";
      history.pop(); // let the visitor try the same question again
      save();
    } finally {
      busy = false;
      input.readOnly = false;
      sendBtn.disabled = false;
      if (document.activeElement !== input) input.focus();
      scrollToBottom();
    }
  });
})();
