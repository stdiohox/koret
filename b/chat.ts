// Koret chat widget. Loaded on demand (dynamic import) the first time the launcher is
// pressed, so it costs nothing on page load. Talks to /api/chat (api/chat.ts), which
// streams NDJSON lines: {t:"text",d} | {t:"lead"} | {t:"done"} | {t:"error",m}.

type Turn = { role: 'user' | 'assistant'; content: string };
type Track = (event: string, data?: Record<string, string>, custom?: boolean) => void;

const STORE = 'koret-chat-v1';
const MAX_TURNS = 24;
const MAX_CHARS = 1200;
const GREETING =
  "Hi, I'm Koret's AI assistant. Ask me anything about how we help businesses answer every enquiry, or I can set up your free Lead Leak Check.";
const SUGGESTIONS = [
  'What does Koret do?',
  'How much does it cost?',
  'How does the Lead Leak Check work?',
  "I'd like a free audit",
];
const BUSY_TEXT =
  "Lots of people are chatting right now. Please try again in a minute, or use the Free Lead Leak Check form on this page.";
const FAIL_TEXT =
  "Sorry, I can't reply right now. You can use the Free Lead Leak Check form on this page or email koretconsult@outlook.com, and the team will get back to you within one business day.";

function load(): Turn[] {
  try {
    const raw = sessionStorage.getItem(STORE);
    const parsed = raw ? (JSON.parse(raw) as Turn[]) : [];
    return Array.isArray(parsed) ? parsed.filter((t) => t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string') : [];
  } catch {
    return [];
  }
}
function save(turns: Turn[]) {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(turns.slice(-MAX_TURNS)));
  } catch {
    /* storage unavailable: the chat still works for this page view */
  }
}

// Text -> DOM with bare URLs and the contact email turned into links. No innerHTML.
function renderText(el: HTMLElement, text: string) {
  el.textContent = '';
  const re = /(https?:\/\/[^\s)]+[^\s).,!?]|koretconsult@outlook\.com)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) el.append(text.slice(last, m.index));
    const a = document.createElement('a');
    const v = m[0];
    a.textContent = v;
    if (v.startsWith('http')) {
      a.href = v;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      a.href = `mailto:${v}`;
    }
    el.append(a);
    last = m.index! + v.length;
  }
  if (last < text.length) el.append(text.slice(last));
}

export function openChat(launcher: HTMLButtonElement, track: Track) {
  let panel = document.getElementById('koret-chat') as HTMLElement | null;
  if (panel) {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    panel.querySelector<HTMLTextAreaElement>('textarea')?.focus();
    return;
  }

  const turns = load();
  let busy = false;

  panel = document.createElement('section');
  panel.id = 'koret-chat';
  panel.className = 'kc';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'kc-title');
  panel.innerHTML = `
    <header class="kc-head">
      <span class="kc-avatar" aria-hidden="true">K</span>
      <div class="kc-who">
        <h2 id="kc-title">Koret assistant</h2>
        <p><span class="kc-dot" aria-hidden="true"></span>AI assistant · replies in seconds</p>
      </div>
      <button type="button" class="kc-close" aria-label="Close chat">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </header>
    <div class="kc-log" role="log" aria-live="polite" aria-relevant="additions"></div>
    <div class="kc-suggest" aria-label="Suggested questions"></div>
    <form class="kc-form" novalidate>
      <label for="kc-input" class="sr-only">Message</label>
      <textarea id="kc-input" rows="1" maxlength="${MAX_CHARS}" placeholder="Type your question…"></textarea>
      <button type="submit" class="kc-send" aria-label="Send message">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </form>
    <p class="kc-note">AI can make mistakes. The Koret team confirms everything in writing.</p>`;
  document.body.append(panel);

  const log = panel.querySelector<HTMLElement>('.kc-log')!;
  const suggest = panel.querySelector<HTMLElement>('.kc-suggest')!;
  const form = panel.querySelector<HTMLFormElement>('.kc-form')!;
  const input = panel.querySelector<HTMLTextAreaElement>('textarea')!;
  const sendBtn = panel.querySelector<HTMLButtonElement>('.kc-send')!;

  const bubble = (role: 'user' | 'assistant' | 'note', text: string) => {
    const b = document.createElement('div');
    b.className = `kc-msg kc-${role}`;
    renderText(b, text);
    log.append(b);
    log.scrollTop = log.scrollHeight;
    return b;
  };
  const typing = () => {
    const t = document.createElement('div');
    t.className = 'kc-msg kc-assistant kc-typing';
    t.setAttribute('aria-label', 'Assistant is typing');
    t.innerHTML = '<i></i><i></i><i></i>';
    log.append(t);
    log.scrollTop = log.scrollHeight;
    return t;
  };

  bubble('assistant', GREETING);
  turns.forEach((t) => bubble(t.role, t.content));
  if (turns.length === 0) {
    for (const q of SUGGESTIONS) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'kc-chip';
      chip.textContent = q;
      chip.addEventListener('click', () => void ask(q));
      suggest.append(chip);
    }
  }

  const setBusy = (on: boolean) => {
    busy = on;
    sendBtn.setAttribute('aria-disabled', String(on));
    panel!.classList.toggle('kc-busy', on);
  };

  async function ask(text: string) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || busy) return;
    if (turns.length >= MAX_TURNS - 1) {
      bubble('note', 'This chat has reached its limit. Please use the Free Lead Leak Check form on this page and the team will pick it up from there.');
      return;
    }
    suggest.remove();
    turns.push({ role: 'user', content });
    save(turns);
    bubble('user', content);
    input.value = '';
    input.style.height = '';
    setBusy(true);
    track('ChatMessage', { n: String(turns.length) });

    const dots = typing();
    let reply = '';
    let out: HTMLElement | null = null;
    let failed = false;
    let busyServer = false;
    let frame = 0;
    // Paint at most once per frame while the reply streams in.
    const paint = () => {
      frame = 0;
      if (!out) {
        dots.remove();
        out = bubble('assistant', '');
      }
      renderText(out, reply);
      log.scrollTop = log.scrollHeight;
    };
    const handle = (line: string) => {
      let ev: { t: string; d?: string; m?: string };
      try {
        ev = JSON.parse(line) as typeof ev;
      } catch {
        return; // skip a malformed line rather than abandoning the reply
      }
      if (ev.t === 'text' && ev.d) {
        reply += ev.d;
        if (!frame) frame = requestAnimationFrame(paint);
      } else if (ev.t === 'lead') {
        bubble('note', 'Your details are with the Koret team. They will reply within one business day.');
        track('Lead', { source: 'chat' }, false);
      } else if (ev.t === 'error') {
        failed = true;
        if (ev.m === 'busy') busyServer = true;
      }
    };
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: turns }),
      });
      if (res.status === 429) busyServer = true;
      if (!res.ok || !res.body) throw new Error(String(res.status));
      reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      for (;;) {
        const { value, done } = await reader.read();
        buf += decoder.decode(value, { stream: !done });
        let nl: number;
        while ((nl = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (line) handle(line);
        }
        if (done) break;
      }
      if (buf.trim()) handle(buf.trim());
    } catch {
      failed = true;
    } finally {
      reader?.cancel().catch(() => {});
    }
    if (frame) cancelAnimationFrame(frame);
    if (reply) paint();
    dots.remove();
    const answer = reply.trim();
    if (answer) {
      turns.push({ role: 'assistant', content: answer });
      save(turns);
      if (failed) bubble('note', 'That reply was cut short. If you need more, use the form on this page or email koretconsult@outlook.com.');
    } else {
      turns.pop(); // nothing came back: let the visitor resend the same question
      save(turns);
      bubble('assistant', busyServer ? BUSY_TEXT : FAIL_TEXT);
    }
    setBusy(false);
    input.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    void ask(input.value);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
  input.addEventListener('input', () => {
    input.style.height = '';
    input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
  });

  const close = () => {
    panel!.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  };
  panel.querySelector('.kc-close')!.addEventListener('click', close);
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  launcher.setAttribute('aria-expanded', 'true');
  launcher.setAttribute('aria-controls', 'koret-chat');
  input.focus();
}
