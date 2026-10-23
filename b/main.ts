// Variant B: the only script on the page. Everything it touches is already readable in the
// HTML; this file adds the staged hero chat, reveals, the tubelight nav, the two-step
// lead form and the A/B tracking events.
import './b.css';

const VARIANT = 'B';
// Apps Script web app URL (scripts/google-sheets). Without it the form shows an email
// fallback rather than pretending it sent.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
// Koret's WhatsApp number in international digits, e.g. 2348012345678. Until it is set,
// every WhatsApp button stays hidden; no number is ever guessed.
const WHATSAPP = ((import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? '').replace(/\D/g, '');
const CONTACT_EMAIL = 'koretconsult@outlook.com';
const loadedAt = Date.now();

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}
// Ad blockers often stop the pixel; tracking must never break the page.
function track(event: string, data: Record<string, string> = {}, custom = true) {
  try {
    window.fbq?.(custom ? 'trackCustom' : 'track', event, { variant: VARIANT, ...data });
  } catch { /* ignore */ }
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

// ---- Year --------------------------------------------------------------------------------
const year = $('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

// ---- CTA tracking ------------------------------------------------------------------------
$$('[data-cta]').forEach((a) => a.addEventListener('click', () => track('CTAClick', { location: a.dataset.cta ?? '' })));

// ---- WhatsApp ----------------------------------------------------------------------------
if (WHATSAPP) {
  $$<HTMLAnchorElement>('[data-whatsapp]').forEach((a) => {
    const where = a.dataset.whatsapp ?? 'page';
    const text = `Hi Koret, I'd like the free Lead Leak Check for my business. (ref B-${where})`;
    a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    if (!a.getAttribute('aria-label')) {
      const note = document.createElement('span');
      note.className = 'sr-only';
      note.textContent = ' (opens in a new tab)';
      a.append(note);
    }
    a.hidden = false;
    a.addEventListener('click', () => {
      track('WhatsAppClick', { location: where });
      track('Contact', { location: where }, false);
    });
  });
  $$('[data-whatsapp-inline]').forEach((el) => (el.hidden = false));
}

// ---- Tubelight nav ------------------------------------------------------------------------
// One lamp slides to the active link. Active follows the section in view (so it never goes
// stale while scrolling); a click sets it straight away and holds it while the page scrolls.
const tube = $('[data-tube]');
const lamp = $('[data-tube-lamp]');
const tubeLinks = $$<HTMLAnchorElement>('[data-tube-link]');
if (tube && lamp && tubeLinks.length) {
  let active: HTMLAnchorElement | null = null;
  let holdUntil = 0;

  const place = () => {
    if (!active) return lamp.classList.remove('on');
    lamp.style.width = `${active.offsetWidth}px`;
    lamp.style.transform = `translateX(${active.offsetLeft}px)`;
    lamp.classList.add('on');
  };
  const activate = (link: HTMLAnchorElement | null) => {
    if (link === active) return;
    active?.removeAttribute('aria-current');
    active = link;
    active?.setAttribute('aria-current', 'true');
    place();
  };

  tubeLinks.forEach((a) => a.addEventListener('click', () => {
    activate(a);
    holdUntil = Date.now() + 1200;
  }));

  const byId = new Map(tubeLinks.map((a) => [a.hash.slice(1), a]));
  if ('IntersectionObserver' in window) {
    // A section is "current" once it crosses the middle of the screen.
    const spy = new IntersectionObserver((entries) => {
      if (Date.now() < holdUntil) return;
      const hit = entries.filter((e) => e.isIntersecting).pop();
      if (hit) activate(byId.get(hit.target.id) ?? null);
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }
  activate(tubeLinks[0]);
  if ('ResizeObserver' in window) new ResizeObserver(place).observe(tube);
  document.fonts?.ready.then(place);

  // On phones the bar sits at the bottom; move it out of the way while the keyboard is up.
  // Stays away while focus is anywhere in a form: if it slid back when the submit button took
  // focus, it would land under the finger mid-tap and swallow the click.
  const typing = () => tube.classList.toggle('away', !!document.activeElement?.closest('form'));
  document.addEventListener('focusin', typing);
  document.addEventListener('focusout', () => setTimeout(typing, 0));
}

// ---- Hero background motion --------------------------------------------------------------
// The still photo is the default. The loop is only fetched when motion is allowed and the
// visitor hasn't asked to save data; it fades in once it can play, and pauses off screen.
const heroEl = $('.hero');
const video = $<HTMLVideoElement>('[data-hero-video]');
const toggle = $<HTMLButtonElement>('[data-motion-toggle]');
// Phones also keep the still: the loop is 422 KB on what is often a metered connection.
const saveData =
  (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true ||
  !window.matchMedia('(min-width: 900px)').matches;
if (heroEl && video && toggle && !reduceMotion) {
  let paused = false;
  let inView = true;
  const sync = () => {
    heroEl.classList.toggle('paused', paused);
    if (saveData) return;
    if (paused || !inView) video.pause();
    else video.play().catch(() => { /* autoplay refused: the still stays */ });
  };
  video.addEventListener('playing', () => video.classList.add('ready'), { once: true });
  // Save-Data and phones keep the still photo; the CSS glow can still be paused.
  if (!saveData) {
    window.addEventListener('load', () => {
      video.src = video.dataset.src ?? '';
      sync();
    }, { once: true });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }).observe(heroEl);
  }
  // WCAG 2.2.2: the looping background can be paused.
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    paused = !paused;
    const label = $('[data-motion-label]', toggle);
    if (label) label.textContent = paused ? 'Play background' : 'Pause background';
    sync();
  });
}

// ---- Hero prompt -> Lead Leak Check form -------------------------------------------------
// What the visitor types is carried into the form (and sent with the lead) so the first
// thing they wrote isn't lost.
let carried = '';
const prompt = $<HTMLFormElement>('[data-prompt]');
const promptInput = $<HTMLTextAreaElement>('#hero-prompt');
if (prompt && promptInput) {
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      prompt.requestSubmit();
    }
  });
  prompt.addEventListener('submit', (e) => {
    e.preventDefault();
    carried = promptInput.value.trim().slice(0, 400);
    track('HeroPrompt', { filled: carried ? 'yes' : 'no' });
    const note = $('[data-carried]');
    if (note) {
      note.hidden = !carried;
      note.innerHTML = '';
      if (carried) {
        const label = document.createElement('strong');
        label.textContent = 'About your business: ';
        note.append(label, document.createTextNode(carried));
      }
    }
    $('#check')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    $<HTMLInputElement>('#f-name')?.focus({ preventScroll: true });
  });
}

// ---- How it works: tabs ------------------------------------------------------------------
// WAI-ARIA tabs with automatic activation: arrow keys move and select, Home/End jump.
$$('[data-tabs]').forEach((root) => {
  const tabs = $$<HTMLButtonElement>('[role="tab"]', root);
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls') ?? '')?.classList.toggle('active', on);
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      select(t);
      track('ShowcaseTab', { tab: t.dataset.label ?? '' });
    });
    t.addEventListener('keydown', (e) => {
      const n = tabs.length;
      const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[next], true);
    });
  });
  select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0]);
});

// ---- Testimonial carousel ---------------------------------------------------------------
// Native scroll-snap does the moving (and swipe); the buttons, arrow keys and counter drive it.
$$('[data-carousel]').forEach((root) => {
  const track = $('[data-carousel-track]', root);
  const prev = $<HTMLButtonElement>('[data-carousel-prev]', root);
  const next = $<HTMLButtonElement>('[data-carousel-next]', root);
  const count = $('[data-carousel-count]', root);
  if (!track || !prev || !next) return;
  const slides = $$('.tcar-slide', track);
  const index = () => Math.round(track.scrollLeft / track.clientWidth);
  const go = (i: number) => {
    const n = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: n * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const sync = () => {
    const i = index();
    prev.disabled = i <= 0;
    next.disabled = i >= slides.length - 1;
    if (count) count.textContent = `${i + 1} / ${slides.length}`;
    slides.forEach((s, k) => s.toggleAttribute('inert', k !== i));
  };
  prev.addEventListener('click', () => go(index() - 1));
  next.addEventListener('click', () => go(index() + 1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
  });
  let t = 0;
  track.addEventListener('scroll', () => { window.clearTimeout(t); t = window.setTimeout(sync, 60); }, { passive: true });
  window.addEventListener('resize', () => go(index()));
  sync();
});

// ---- Process & price: service switcher -------------------------------------------------
// Prices live in each panel's data-price (and data-retainer); while empty, the dashed
// "price to confirm" chip shows. A set price animates in character by character.
function renderPrice(el: HTMLElement, value: string, animate: boolean) {
  if (!value) return;
  el.textContent = '';
  [...value].forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = animate && !reduceMotion ? 'ch in' : 'ch';
    s.style.animationDelay = `${i * 30}ms`;
    s.textContent = ch;
    el.append(s);
  });
  el.setAttribute('aria-label', value);
}
$$<HTMLElement>('[data-price], [data-retainer]').forEach((el) => renderPrice(el, el.dataset.price ?? el.dataset.retainer ?? '', false));

const plans = $('[data-plans]');
if (plans) {
  const panels = $$<HTMLElement>('[data-plan]');
  plans.addEventListener('change', (e) => {
    const value = (e.target as HTMLInputElement).value;
    panels.forEach((p) => {
      const on = p.dataset.plan === value;
      p.hidden = !on;
      p.classList.toggle('enter', on);
      const price = $<HTMLElement>('[data-price]', p);
      if (on && price) renderPrice(price, price.dataset.price ?? '', true);
    });
    track('PricingTab', { plan: value });
  });
}

// ---- Lead Leak Check panel: rotating mosaic ---------------------------------------------
// Steps through the four checks every 2.6 s. Pauses on hover/focus, when off screen and via
// the Pause button (WCAG 2.2.2); never auto-plays under reduced motion.
const lc = $('[data-lc]');
if (lc) {
  const tiles = $$('[data-lc-tile]', lc);
  const caps = $$('[data-lc-cap]', lc);
  const dots = $$<HTMLButtonElement>('[data-lc-dot]', lc);
  const pauseBtn = $<HTMLButtonElement>('[data-lc-pause]', lc);
  let i = 0;
  let timer = 0;
  let userPaused = reduceMotion;
  let hovering = false;
  let visible = false;
  const show = (n: number) => {
    i = (n + tiles.length) % tiles.length;
    tiles.forEach((t, k) => t.classList.toggle('active', k === i));
    caps.forEach((c, k) => (c.hidden = k !== i));
    dots.forEach((d, k) => (k === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
  };
  const sync = () => {
    window.clearInterval(timer);
    if (!userPaused && !hovering && visible) timer = window.setInterval(() => show(i + 1), 2600);
  };
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); sync(); }));
  lc.addEventListener('mouseenter', () => { hovering = true; sync(); });
  lc.addEventListener('mouseleave', () => { hovering = false; sync(); });
  lc.addEventListener('focusin', () => { hovering = true; sync(); });
  lc.addEventListener('focusout', () => { hovering = false; sync(); });
  if (pauseBtn && !reduceMotion) {
    pauseBtn.hidden = false;
    pauseBtn.addEventListener('click', () => {
      userPaused = !userPaused;
      const label = $('[data-lc-pause-label]', pauseBtn);
      if (label) label.textContent = userPaused ? 'Play' : 'Pause';
      sync();
    });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }).observe(lc);
  }
  show(0);
}

// ---- Reveals and the hero chat -----------------------------------------------------------
// Only staged when motion is allowed and IntersectionObserver exists; otherwise everything
// simply stays visible (the CSS hides nothing without the `stage` class).
if (!reduceMotion && 'IntersectionObserver' in window) {
  // The sample chat plays its messages in once it scrolls into view.
  const chat = $('[data-chat]');
  if (chat) {
    chat.classList.add('stage');
    const chatIo = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      chatIo.disconnect();
      $$('li', chat).forEach((li, i) => window.setTimeout(() => li.classList.add('on'), 200 + i * 550));
    }, { threshold: 0.35 });
    chatIo.observe(chat);
  }

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    }),
    { rootMargin: '0px 0px -10% 0px' },
  );
  $$('[data-reveal]').forEach((el) => {
    el.classList.add('stage');
    io.observe(el);
  });
}

// ---- Lead form ---------------------------------------------------------------------------
type Payload = Record<string, string | number>;

async function send(payload: Payload): Promise<boolean> {
  if (!ENDPOINT) return false;
  try {
    // text/plain keeps this a "simple" CORS request: Apps Script cannot answer a preflight.
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, variant: VARIANT }),
    });
    // Apps Script returns 200 with an HTML page when it fails outside the script's own
    // try/catch, so only an explicit { ok: true } counts as saved.
    const data = await res.json().catch(() => null);
    return res.ok && data?.ok === true;
  } catch {
    return false;
  }
}

function newLeadId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

const form = $<HTMLFormElement>('#lead-form');
const details = $<HTMLFormElement>('#details-form');
const final = $('[data-final]');

if (form && details && final) {
  const leadId = newLeadId();
  let started = false;
  let firstName = '';

  form.addEventListener('input', () => {
    if (!started) {
      started = true;
      track('FormStart');
    }
  });

  const setError = (input: HTMLInputElement, msg: string) => {
    const err = $(`#${input.id}-err`);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) {
      err.textContent = msg;
      err.hidden = !msg;
    }
  };

  // Clearing a field's error also drops it from the summary, so the list never names a
  // field that has already been fixed.
  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.getAttribute('aria-invalid') !== 'true') return;
    setError(t, '');
    const summary = $('[data-error-summary]', form);
    summary?.querySelector(`a[href="#${t.id}"]`)?.closest('li')?.remove();
    if (summary && !summary.querySelector('li')) summary.hidden = true;
  });

  let sending = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $<HTMLInputElement>('#f-name', form)!;
    const phone = $<HTMLInputElement>('#f-phone', form)!;
    const company = $<HTMLInputElement>('#f-company', form)!;
    const honeypot = $<HTMLInputElement>('#f-trap', form)!;
    const summary = $('[data-error-summary]', form)!;
    const fail = $('[data-fail]', form)!;
    const button = $<HTMLButtonElement>('[data-submit]', form)!;

    const digits = phone.value.replace(/\D/g, '');
    const errors: [HTMLInputElement, string][] = [];
    if (!name.value.trim()) errors.push([name, 'Please tell us your name.']);
    if (digits.length < 10 || digits.length > 15) errors.push([phone, 'Enter your WhatsApp number, e.g. 0801 234 5678.']);
    if (!company.value.trim()) errors.push([company, 'Please add your business name.']);

    [name, phone, company].forEach((i) => setError(i, ''));
    errors.forEach(([i, m]) => setError(i, m));
    fail.hidden = true;

    if (sending) return;
    if (errors.length) {
      summary.innerHTML = `<p>Please fix ${errors.length === 1 ? 'this' : `these ${errors.length}`}:</p><ul>${errors
        .map(([i, m]) => `<li><a href="#${i.id}">${m}</a></li>`)
        .join('')}</ul>`;
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;

    // aria-disabled rather than disabled: disabling the focused button would drop focus.
    sending = true;
    button.setAttribute('aria-disabled', 'true');
    button.textContent = 'Sending…';
    const ok = await send({
      kind: 'lead',
      leadId,
      name: name.value.trim(),
      phone: phone.value.trim(),
      company: company.value.trim(),
      services: 'Lead Leak Check',
      email: '',
      message: carried,
      website: honeypot.value,
      elapsed: Date.now() - loadedAt,
    });
    sending = false;
    button.removeAttribute('aria-disabled');
    button.textContent = 'Get my free check';

    if (!ok) {
      const body = `Name: ${name.value}\nWhatsApp: ${phone.value}\nBusiness: ${company.value}\n\nI'd like the free Lead Leak Check.`;
      const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Lead Leak Check: ${company.value}`)}&body=${encodeURIComponent(body)}`;
      fail.innerHTML = `That didn't go through. Please try again, or <a href="${mail}">send it by email</a> instead; your details will be filled in.`;
      fail.hidden = false;
      return;
    }

    track('Lead', {}, false);
    firstName = name.value.trim().split(/\s+/)[0];
    const thanks = $('[data-thanks]', details);
    if (thanks && firstName) thanks.textContent = `Thanks, ${firstName}. You're in. We'll message you on WhatsApp.`;
    form.hidden = true;
    details.hidden = false;
    details.focus();
  });

  const finish = () => {
    details.hidden = true;
    final.hidden = false;
    $('[data-final-title]', final)?.focus();
  };

  const email = $<HTMLInputElement>('#f-email', details)!;
  const emailErr = $('#f-email-err', details)!;
  email.addEventListener('input', () => {
    if (email.getAttribute('aria-invalid') !== 'true') return;
    email.setAttribute('aria-invalid', 'false');
    emailErr.hidden = true;
  });
  let sendingDetails = false;

  $('[data-skip]', details)?.addEventListener('click', finish);

  details.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sendingDetails) return;
    const value = email.value.trim();
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      emailErr.textContent = 'That email looks incomplete. Fix it or leave it blank.';
      emailErr.hidden = false;
      email.setAttribute('aria-invalid', 'true');
      email.focus();
      return;
    }
    const pick = (group: string) =>
      $$<HTMLInputElement>(`[data-group="${group}"] input:checked`, details).map((i) => i.value).join(', ');

    // Best effort: the lead is already saved, so a failure here doesn't block the thank-you.
    sendingDetails = true;
    const submit = $<HTMLButtonElement>('button[type="submit"]', details)!;
    submit.setAttribute('aria-disabled', 'true');
    submit.textContent = 'Sending…';
    await send({
      kind: 'details',
      leadId,
      channels: pick('channels'),
      volume: $<HTMLSelectElement>('#f-volume', details)!.value,
      services: pick('services'),
      email: value,
      message: $<HTMLTextAreaElement>('#f-message', details)!.value.trim(),
    });
    track('LeadDetails');
    finish();
  });
}
