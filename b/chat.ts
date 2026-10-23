// Koret chat widget. Loaded on demand (dynamic import) the first time the launcher is
// pressed, so it costs nothing on page load. Answers come from the local knowledge base in
// kb.ts: no server, no AI service, no running cost. Visitors who want to be contacted are
// walked through a short details flow that posts to the same Apps Script endpoint as the form.

import { FALLBACK, LEAD_KEYS, LEAD_PHRASES, SYNONYMS, TOPICS, type Topic } from './kb';

type Turn = { role: 'user' | 'assistant' | 'note'; content: string };
type Track = (event: string, data?: Record<string, string>, custom?: boolean) => void;
type Step = 'name' | 'contact' | 'company' | 'need' | 'confirm';
const STEPS: Step[] = ['name', 'contact', 'company', 'need', 'confirm'];
type Lead = { name: string; phone: string; email: string; company: string; need: string };

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const STORE = 'koret-chat-v2';
const MAX_TURNS = 60;
const MAX_CHARS = 600;
const GREETING =
  "Hi, I'm Koret's assistant. Ask me about what we build, how pricing works or the free Lead Leak Check, or I can pass your details to the team.";
const SUGGESTIONS = ['What does Koret do?', 'How much does it cost?', 'How does the Lead Leak Check work?', 'Get my free audit'];
const SKIP = 'Skip';
const SEND = 'Send to the team';
const CANCEL = 'Cancel';
const FAIL_TEXT =
  "Sorry, that didn't go through. Please use the Free Lead Leak Check form on this page or email koretconsult@outlook.com, and the team will reply within one business day.";

// Words too common to identify a topic on their own.
const WEAK = new Set(['what', 'do', 'help', 'work', 'about', 'business', 'more', 'new', 'just', 'type', 'who', 'where', 'say', 'back', 'live', 'time', 'call', 'chat', 'free', 'check', 'after', 'long', 'site', 'web', 'review', 'start', 'tool', 'tools', 'system', 'data']);

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9@+.\s-]/g, ' ')
    .replace(/[.-](?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function stem(w: string): string {
  const s = SYNONYMS[w];
  if (s) return s;
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function tokens(text: string): Set<string> {
  const out = new Set<string>();
  for (const w of norm(text).split(' ')) {
    if (!w) continue;
    out.add(w);
    out.add(stem(w));
  }
  return out;
}

function keyScore(keys: string[], toks: Set<string>): number {
  let score = 0;
  for (const k of keys) {
    const hit = toks.has(k) || toks.has(stem(k)) || (k.length >= 6 && [...toks].some((t) => t.startsWith(k)));
    if (hit) score += WEAK.has(k) ? 0.3 : 1;
  }
  return score;
}

const phraseScore = (phrases: string[] | undefined, text: string) =>
  (phrases ?? []).reduce((n, p) => n + (` ${text} `.includes(` ${norm(p)} `) ? 3 : 0), 0);

// Best topic for a message, plus whether it reads as "please contact me".
function match(input: string): { topic: Topic | null; score: number; lead: boolean } {
  const text = norm(input);
  const toks = tokens(input);
  let topic: Topic | null = null;
  let score = 0;
  for (const t of TOPICS) {
    const s = keyScore(t.keys, toks) + phraseScore(t.phrases, text);
    if (s > score) {
      score = s;
      topic = t;
    }
  }
  const leadScore = phraseScore(LEAD_PHRASES, text) + keyScore(LEAD_KEYS, toks) * 1.5;
  return { topic: score >= 1 ? topic : null, score, lead: leadScore >= 1.5 && leadScore >= score };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CANCEL_RE = /^(cancel|stop|quit|exit|never ?mind|no thanks?|not now|forget it)$/;

function readContact(raw: string): { phone: string; email: string } | null {
  const v = raw.trim();
  const email = (v.match(/[^\s@,;()<>]+@[^\s@,;()<>]+\.[^\s@,;()<>]{2,}/)?.[0] ?? '').replace(/[.!?:]+$/, '');
  const phoneRaw = v.replace(email, '').match(/\+?[\d\s().-]{7,}/)?.[0] ?? '';
  const digits = phoneRaw.replace(/\D/g, '');
  const phone = digits.length >= 7 && digits.length <= 15 ? phoneRaw.trim() : '';
  if (email && !EMAIL_RE.test(email)) return null;
  return email || phone ? { phone, email } : null;
}

function newLeadId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function load(): { turns: Turn[]; sent: boolean; step: Step | null; lead: Lead | null } {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORE) || 'null') as { turns?: Turn[]; sent?: boolean; step?: Step; lead?: Lead } | null;
    const turns = Array.isArray(parsed?.turns)
      ? parsed.turns.filter((t) => t && ['user', 'assistant', 'note'].includes(t.role) && typeof t.content === 'string')
      : [];
    const step = parsed?.step && STEPS.includes(parsed.step) ? parsed.step : null;
    const l = parsed?.lead;
    const lead = l && ['name', 'phone', 'email', 'company', 'need'].every((k) => typeof l[k as keyof Lead] === 'string') ? l : null;
    return { turns, sent: parsed?.sent === true, step: step && lead ? step : null, lead };
  } catch {
    return { turns: [], sent: false, step: null, lead: null };
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

  const stored = load();
  const turns = stored.turns;
  let sent = stored.sent;
  let busy = false;
  let step: Step | null = stored.step;
  let lead: Lead = stored.lead ?? { name: '', phone: '', email: '', company: '', need: '' };
  const openedAt = Date.now();
  const leadId = newLeadId();

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
        <p><span class="kc-dot" aria-hidden="true"></span>Automated assistant · instant answers</p>
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
    <p class="kc-note">Automated answers. The Koret team confirms prices and plans in writing.</p>`;
  document.body.append(panel);

  const log = panel.querySelector<HTMLElement>('.kc-log')!;
  const suggest = panel.querySelector<HTMLElement>('.kc-suggest')!;
  const form = panel.querySelector<HTMLFormElement>('.kc-form')!;
  const input = panel.querySelector<HTMLTextAreaElement>('textarea')!;
  const sendBtn = panel.querySelector<HTMLButtonElement>('.kc-send')!;

  const save = () => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ turns: turns.slice(-MAX_TURNS), sent, step, lead }));
    } catch {
      /* storage unavailable: the chat still works for this page view */
    }
  };
  const bubble = (role: Turn['role'], text: string) => {
    const b = document.createElement('div');
    b.className = `kc-msg kc-${role}`;
    renderText(b, text);
    log.append(b);
    log.scrollTop = log.scrollHeight;
  };
  const say = (role: Turn['role'], text: string) => {
    turns.push({ role, content: text });
    save();
    bubble(role, text);
  };
  const chips = (list: string[]) => {
    suggest.textContent = '';
    for (const q of list) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'kc-chip';
      chip.textContent = q;
      chip.addEventListener('click', () => void ask(q));
      suggest.append(chip);
    }
  };
  const setBusy = (on: boolean) => {
    busy = on;
    sendBtn.setAttribute('aria-disabled', String(on));
    panel!.classList.toggle('kc-busy', on);
  };
  // A short "typing" pause so instant answers read as replies, not page jumps.
  const reply = async (text: string, next: string[] = []) => {
    const t = document.createElement('div');
    t.className = 'kc-msg kc-assistant kc-typing';
    t.setAttribute('aria-label', 'Assistant is typing');
    t.innerHTML = '<i></i><i></i><i></i>';
    log.append(t);
    log.scrollTop = log.scrollHeight;
    await new Promise((r) => setTimeout(r, Math.min(350 + text.length * 2, 900)));
    t.remove();
    say('assistant', text);
    chips(next);
  };

  const PROMPTS: Record<Step, () => [string, string[]]> = {
    name: () => ["Great, I'll pass your details to the team. What's your name?", [CANCEL]],
    contact: () => [
      `Thanks, ${lead.name.split(' ')[0]}. What's the best WhatsApp number or email to reach you on?`,
      [CANCEL],
    ],
    company: () => ["What's your business called? (Or tap Skip.)", [SKIP, CANCEL]],
    need: () => [
      'In a sentence, what would you like help with? For example, replying to enquiries faster, a new website, or a free Lead Leak Check. (Or tap Skip.)',
      [SKIP, CANCEL],
    ],
    confirm: () => [
      [
        "Here's what I'll send to the team:",
        `Name: ${lead.name}`,
        lead.phone ? `WhatsApp: ${lead.phone}` : '',
        lead.email ? `Email: ${lead.email}` : '',
        lead.company ? `Business: ${lead.company}` : '',
        lead.need ? `Looking for: ${lead.need}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      [SEND, 'Start again', CANCEL],
    ],
  };
  const goto = async (s: Step) => {
    step = s;
    save();
    const [text, next] = PROMPTS[s]();
    input.placeholder = s === 'contact' ? 'WhatsApp number or email' : s === 'name' ? 'Your name' : 'Type your answer…';
    await reply(text, next);
  };
  const leave = () => {
    step = null;
    lead = { name: '', phone: '', email: '', company: '', need: '' };
    input.placeholder = 'Type your question…';
  };

  async function submit() {
    const transcript = turns
      .filter((t) => t.role !== 'note')
      .slice(-12)
      .map((t) => `${t.role === 'user' ? 'Visitor' : 'Bot'}: ${t.content}`)
      .join('\n');
    let ok = false;
    if (ENDPOINT) {
      try {
        // text/plain keeps this a "simple" CORS request: Apps Script cannot answer a preflight.
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          signal: AbortSignal.timeout(15000),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            kind: 'lead',
            leadId,
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            company: lead.company,
            services: 'Website chat',
            message: `${lead.need || '(not given)'}\n\n--- Chat ---\n${transcript}`.slice(0, 4000),
            variant: 'B',
            elapsed: Date.now() - openedAt,
            website: '',
          }),
        });
        const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
        ok = res.ok && data?.ok === true;
      } catch {
        ok = false;
      }
    }
    if (ok) {
      const via = lead.phone ? ' on WhatsApp' : ' by email';
      sent = true;
      leave();
      save();
      track('Lead', { source: 'chat' }, false);
      await reply(
        `Done. Your details are with the Koret team and they'll reply within one business day${via}. Anything else I can answer meanwhile?`,
        ['How does it work?', 'Show me the demos'],
      );
    } else {
      await reply(FAIL_TEXT, ['Try again', CANCEL]);
    }
  }

  // One message while collecting details. Returns false if it wasn't an answer to the step.
  async function handleStep(text: string): Promise<boolean> {
    const t = norm(text);
    if (CANCEL_RE.test(t)) {
      leave();
      await reply('No problem, nothing was sent. What else would you like to know?', ['What does Koret do?', 'How much does it cost?']);
      return true;
    }
    // A question mid-flow gets answered, then the current step is asked again.
    if (step !== 'confirm' && step !== 'need' && /\?\s*$/.test(text)) {
      const m = match(text);
      if (m.topic && m.score >= 2) {
        await reply(m.topic.answer);
        await goto(step!);
        return true;
      }
    }
    switch (step) {
      case 'name': {
        const name = text.replace(/[’‘]/g, "'").replace(/^(my name is|i am|i'm|im|it's|its|this is)\s+/i, '').trim();
        if (name.length < 2 || name.length > 80 || /\d{4,}|@/.test(name)) {
          await reply('Sorry, what name should the team use?', [CANCEL]);
          return true;
        }
        lead.name = name;
        await goto('contact');
        return true;
      }
      case 'contact': {
        const c = readContact(text);
        if (!c) {
          await reply("That doesn't look like a phone number or email. Could you check it? For example +44 7700 900123 or name@company.com.", [CANCEL]);
          return true;
        }
        lead.phone = c.phone;
        lead.email = c.email;
        await goto('company');
        return true;
      }
      case 'company':
        lead.company = t === 'skip' ? '' : text.slice(0, 120);
        await goto('need');
        return true;
      case 'need':
        lead.need = t === 'skip' ? '' : text.slice(0, 500);
        await goto('confirm');
        return true;
      case 'confirm':
        if (text === SEND || text === 'Try again' || /^(yes|yep|yeah|yes please|send|send it|ok|okay|sure|confirm|correct|go ahead|thats right)$/.test(t)) {
          await submit();
        } else if (text === 'Start again' || /^(no|edit|change|wrong|start again|restart)\b/.test(t)) {
          lead = { name: '', phone: '', email: '', company: '', need: '' };
          await goto('name');
        } else {
          await reply('Shall I send these details to the team?', [SEND, 'Start again', CANCEL]);
        }
        return true;
    }
    return false;
  }

  async function ask(raw: string) {
    const text = raw.trim().slice(0, MAX_CHARS);
    if (!text || busy) return;
    setBusy(true);
    suggest.textContent = '';
    say('user', text);
    input.value = '';
    input.style.height = '';
    track('ChatMessage', { n: String(turns.filter((t) => t.role === 'user').length) });
    try {
      if (step && (await handleStep(text))) return;
      const m = match(text);
      if (m.lead) {
        if (sent) {
          await reply("Your details are already with the team, and they'll reply within one business day. Anything else you'd like to know?", ['How does it work?', 'Show me the demos']);
        } else {
          await goto('name');
        }
      } else if (m.topic) {
        await reply(m.topic.answer, m.topic.follow);
      } else {
        await reply(FALLBACK.answer, FALLBACK.follow);
      }
    } finally {
      setBusy(false);
      input.focus();
    }
  }

  bubble('assistant', GREETING);
  turns.forEach((t) => bubble(t.role, t.content));
  chips(step ? PROMPTS[step]()[1] : turns.length ? ['How much does it cost?', 'Get my free audit'] : SUGGESTIONS);

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
