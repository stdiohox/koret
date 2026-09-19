/* =========================================================
   KORET - landing page behaviour
   No scroll listeners anywhere: IntersectionObserver only.
   Every motion path collapses to a static, complete page under
   prefers-reduced-motion.
   ========================================================= */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- scroll reveal ---------- */
  const revealables = document.querySelectorAll('[data-reveal]');

  revealables.forEach((el) => {
    const d = el.getAttribute('data-reveal-delay');
    if (d) el.style.setProperty('--d', d);
  });

  if (reduced.matches || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-in'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );
    revealables.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- nav hairline once the page has moved ---------- */
  const nav = document.getElementById('nav');
  if (nav && 'IntersectionObserver' in window) {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);

    new IntersectionObserver(
      ([entry]) => nav.classList.toggle('is-stuck', !entry.isIntersecting),
      { threshold: 0 }
    ).observe(sentinel);
  }

  /* ---------- mobile menu ---------- */
  const burger = document.querySelector('.nav__burger');
  const menu = document.getElementById('mobile-menu');

  if (burger && menu) {
    const setMenu = (open) => {
      menu.hidden = !open;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      burger.innerHTML = `<span aria-hidden="true">${open ? '&#10005;' : '&#9776;'}</span>`;
    };

    burger.addEventListener('click', () => setMenu(menu.hidden));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); }
    });
  }

  /* ---------- tab toggle: audience switcher ----------
     Both panels stay in the DOM so the copy is still crawlable.          */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (tabs.length) {
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    };

    tabs.forEach((tab, i) => {
      tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
  }

  /* ---------- the K mosaic assembles itself once, on arrival ----------
     Storytelling: the mark builds tile by tile, which is the one place
     the page is allowed an ornamental gesture.                          */
  const mosaic = document.querySelector('.mosaic');
  if (mosaic) {
    if (reduced.matches || !('IntersectionObserver' in window)) {
      mosaic.classList.add('is-in');
    } else {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          mosaic.classList.add('is-in');
          obs.disconnect();
        },
        { threshold: 0.25 }
      );
      obs.observe(mosaic);
    }
  }

  /* ---------- brief form: validation, loading, success, error ---------- */
  const form = document.getElementById('brief-form');
  if (!form) return;

  const status = form.querySelector('[data-status]');
  const submit = form.querySelector('[data-submit]');
  const label = form.querySelector('[data-submit-label]');

  const showError = (input, show) => {
    const field = input.closest('.field');
    const error = form.querySelector(`[data-error-for="${input.id}"]`);
    field.classList.toggle('is-invalid', show);
    input.setAttribute('aria-invalid', String(show));
    if (error) error.hidden = !show;
  };

  const validate = (input) => {
    const value = input.value.trim();
    if (!value) return false;
    if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    return true;
  };

  form.querySelectorAll('input[required], textarea[required]').forEach((input) => {
    input.addEventListener('blur', () => showError(input, !validate(input)));
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('is-invalid')) {
        showError(input, !validate(input));
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = [...form.querySelectorAll('input[required], textarea[required]')];
    let firstBad = null;

    required.forEach((input) => {
      const ok = validate(input);
      showError(input, !ok);
      if (!ok && !firstBad) firstBad = input;
    });

    if (firstBad) {
      status.hidden = true;
      firstBad.focus();
      return;
    }

    submit.disabled = true;
    label.textContent = 'Sending';
    status.hidden = true;

    // TODO: point this at a real endpoint (Formspree, Resend, your own API).
    // The timeout only simulates the round trip so the states are visible.
    window.setTimeout(() => {
      submit.disabled = false;
      label.textContent = 'Book a strategy call';
      form.reset();
      status.hidden = false;
      status.textContent = 'Brief received. We reply with call times within two working days.';
    }, 900);
  });
})();
