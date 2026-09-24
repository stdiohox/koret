import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock, Mail, MessageSquare, Loader2 } from 'lucide-react';
import MotionSection from './MotionSection';
import { Badge } from './ui/badge';

// Set VITE_FORM_ENDPOINT to the Google Apps Script web app URL (setup in
// scripts/google-sheets/README.md) and each enquiry lands as a row in the Koret sheet.
// Without it the form still works: it opens a pre-filled email instead, so no enquiry
// is lost while there is no endpoint.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const CONTACT_EMAIL = 'koretconsult@outlook.com';

const services = ['AI Automation', 'Business Consulting', 'Brand Building', 'Not sure yet'];
const budgets = ['Under $2k', '$2k–$5k', '$5k–$10k', '$10k+'];

const nextSteps = [
  { icon: MessageSquare, title: 'Tell us where you’re stuck', text: 'A few lines is enough — marketing, tech, or both.' },
  { icon: Clock, title: 'We reply within one business day', text: 'With a couple of questions, not a sales script.' },
  { icon: Check, title: 'A free 30-minute consultation', text: 'Leave with a clear next step, whether or not we work together.' },
];

type Fields = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<keyof Fields | 'services', string>>;

const empty: Fields = { name: '', email: '', company: '', message: '' };

function validate(f: Fields, picked: string[]): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please tell us your name.';
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (picked.length === 0) e.services = 'Pick at least one — “Not sure yet” is fine.';
  if (f.message.trim().length < 10) e.message = 'A sentence or two helps us prepare.';
  return e;
}

function Field({ label, optional, error, htmlFor, children }: { label: string; optional?: boolean; error?: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium" style={{ color: 'var(--color-ink-charcoal)' }}>
        {label}
        {optional && <span className="ml-1 font-normal" style={{ color: 'var(--color-dock-slate)' }}>(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[13px]" style={{ color: '#c2410c' }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  'w-full rounded-xl border bg-white px-4 text-[15px] text-[var(--color-ink-charcoal)] placeholder:text-[var(--color-dock-steel)] transition-[border-color,box-shadow] duration-200 outline-none focus:border-[var(--color-koret-cyan)] focus:shadow-[0_0_0_4px_rgba(0,204,255,0.15)] focus-visible:outline-none';

const inputBorder = (bad?: string) => (bad ? 'border-[#c2410c]' : 'border-[var(--color-dock-hairline)] hover:border-[var(--color-dock-faint)]');

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200"
      style={
        selected
          ? { backgroundColor: 'rgba(0,204,255,0.1)', borderColor: 'var(--color-koret-cyan)', color: 'var(--color-koret-navy)' }
          : { backgroundColor: '#fff', borderColor: 'var(--color-dock-hairline)', color: 'var(--color-dock-slate)' }
      }
    >
      {selected && <Check size={14} strokeWidth={2.5} aria-hidden />}
      {children}
    </button>
  );
}

export default function ContactForm() {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [fields, setFields] = useState<Fields>(empty);
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  // Spam trap: a field people never see, so anything in it came from a bot.
  const [honeypot, setHoneypot] = useState('');

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const toggleService = (s: string) => {
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
    if (errors.services) setErrors((er) => ({ ...er, services: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields, picked);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    const payload = { ...fields, services: picked.join(', '), budget: budget ?? 'Not specified' };

    if (!ENDPOINT) {
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.company && `Company: ${payload.company}`,
        `Interested in: ${payload.services}`,
        `Budget: ${payload.budget}`,
        '',
        payload.message,
      ].filter((l) => l !== '' && l !== undefined).join('\n');
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Project enquiry — ${payload.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      // text/plain keeps this a "simple" CORS request: the Google Apps Script web app
      // (scripts/google-sheets/Code.gs) can't answer a preflight, so application/json
      // would be blocked before it ever reached the sheet. The body is still JSON.
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...payload, website: honeypot }),
      });
      // Apps Script answers 200 even when the script throws, so trust its own flag.
      const data = await res.json().catch(() => null);
      setStatus(res.ok && data?.ok !== false ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  }

  const reset = () => {
    setFields(empty);
    setPicked([]);
    setBudget(null);
    setStatus('idle');
  };

  const fid = (k: string) => `${id}-${k}`;
  const describedBy = (k: keyof Errors) => (errors[k] ? `${fid(k)}-error` : undefined);

  return (
    <MotionSection id="start-project" className="relative overflow-hidden py-24 px-4 md:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(60% 50% at 85% 20%, rgba(0,204,255,0.12) 0%, rgba(0,204,255,0) 70%), radial-gradient(50% 45% at 5% 90%, rgba(0,65,155,0.08) 0%, rgba(0,65,155,0) 70%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        {/* Left: pitch + what happens next */}
        <div className="flex flex-col">
          <Badge variant="outline" className="w-max">Start a Project</Badge>
          <h2 className="mt-5 text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em]" style={{ color: 'var(--color-ink-charcoal)' }}>
            Let’s build what your business needs next.
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed" style={{ color: 'var(--color-dock-slate)' }}>
            Automation, strategy, or a brand that finally matches the business behind it — tell us a little, and we’ll come back with a plan.
          </p>

          <ol className="mt-10 flex flex-col gap-6">
            {nextSteps.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white" style={{ borderColor: 'var(--color-dock-hairline)' }}>
                  <Icon size={18} color="var(--color-koret-cyan)" aria-hidden />
                </span>
                <div className="pb-1">
                  <p className="text-[15px] font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>{title}</p>
                  <p className="mt-1 text-sm" style={{ color: 'var(--color-dock-slate)' }}>{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-10 inline-flex w-max items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-koret-navy)' }}
          >
            <Mail size={16} aria-hidden />
            Prefer email? {CONTACT_EMAIL}
          </a>
        </div>

        {/* Right: the form card */}
        <div
          className="relative rounded-3xl border bg-white p-6 sm:p-8 md:p-10"
          style={{ borderColor: 'var(--color-dock-hairline)', boxShadow: '0 1px 2px rgba(18,23,34,0.04), 0 24px 48px -24px rgba(18,23,34,0.12)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                role="status"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(0,204,255,0.12)' }}>
                  <Check size={26} strokeWidth={2.5} color="var(--color-koret-cyan)" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>
                  {ENDPOINT ? 'Thanks — we’ve got it.' : 'Almost there.'}
                </h3>
                <p className="mt-2 max-w-sm text-[15px]" style={{ color: 'var(--color-dock-slate)' }}>
                  {ENDPOINT
                    ? `We’ll reply to ${fields.email} within one business day.`
                    : 'Your email app should have opened with everything filled in — just hit send.'}
                </p>
                <button type="button" onClick={reset} className="mt-8 text-sm font-medium underline-offset-4 hover:underline" style={{ color: 'var(--color-koret-navy)' }}>
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Name" htmlFor={fid('name')} error={errors.name}>
                    <input id={fid('name')} name="name" autoComplete="name" placeholder="Jane Doe" value={fields.name} onChange={set('name')}
                      aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={`${inputBase} ${inputBorder(errors.name)} h-12`} />
                  </Field>
                  <Field label="Email" htmlFor={fid('email')} error={errors.email}>
                    <input id={fid('email')} name="email" type="email" autoComplete="email" inputMode="email" placeholder="jane@company.com" value={fields.email} onChange={set('email')}
                      aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className={`${inputBase} ${inputBorder(errors.email)} h-12`} />
                  </Field>
                </div>

                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor={fid('website')}>Website</label>
                  <input id={fid('website')} name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <Field label="Company" optional htmlFor={fid('company')}>
                  <input id={fid('company')} name="company" autoComplete="organization" placeholder="Your business name" value={fields.company} onChange={set('company')}
                    className={`${inputBase} ${inputBorder()} h-12`} />
                </Field>

                <fieldset className="flex flex-col gap-3" aria-describedby={describedBy('services')}>
                  <legend className="mb-3 text-sm font-medium" style={{ color: 'var(--color-ink-charcoal)' }}>What can we help with?</legend>
                  <div id={fid('services')} tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                    {services.map((s) => (
                      <Chip key={s} selected={picked.includes(s)} onClick={() => toggleService(s)}>{s}</Chip>
                    ))}
                  </div>
                  {errors.services && <p id={`${fid('services')}-error`} className="text-[13px]" style={{ color: '#c2410c' }}>{errors.services}</p>}
                </fieldset>

                <fieldset className="flex flex-col gap-3">
                  <legend className="mb-3 text-sm font-medium" style={{ color: 'var(--color-ink-charcoal)' }}>
                    Budget <span className="font-normal" style={{ color: 'var(--color-dock-slate)' }}>(optional)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <Chip key={b} selected={budget === b} onClick={() => setBudget(budget === b ? null : b)}>{b}</Chip>
                    ))}
                  </div>
                </fieldset>

                <Field label="Tell us about your project" htmlFor={fid('message')} error={errors.message}>
                  <textarea id={fid('message')} name="message" rows={5} placeholder="What are you trying to fix, build, or grow?" value={fields.message} onChange={set('message')}
                    aria-invalid={!!errors.message} aria-describedby={describedBy('message')} className={`${inputBase} ${inputBorder(errors.message)} resize-y py-3 leading-relaxed min-h-[132px]`} />
                </Field>

                {status === 'failed' && (
                  <p role="alert" className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(194,65,12,0.08)', color: '#c2410c' }}>
                    Something went wrong sending that. Please try again, or email us at {CONTACT_EMAIL}.
                  </p>
                )}

                <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px]" style={{ color: 'var(--color-dock-slate)' }}>
                    No spam, no obligation. We only use this to reply.
                  </p>
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                    style={{ backgroundColor: 'var(--color-koret-cyan)', color: '#ffffff' }}
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden /> Sending…
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionSection>
  );
}
