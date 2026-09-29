import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Clock, Compass, Sparkles, Users, Wallet, MessageSquare } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';
import { useScrollTilt } from '@/hooks/useScrollTilt';

const features = [
  { icon: MessageSquare, title: 'Leads wait hours for a reply', desc: 'We set up instant replies and follow-ups, so every enquiry hears back in seconds — even at 9pm on a Sunday.' },
  { icon: Clock, title: 'Your evenings go to admin', desc: 'Bookings, reminders, data entry and follow-ups run on their own. Most clients get 15–20+ hours a week back.' },
  { icon: Sparkles, title: 'Your brand looks smaller than your business', desc: 'We sharpen your positioning, look and website so people see a business they can trust at first glance.' },
  { icon: Compass, title: 'AI feels like hype, and you don’t know where to start', desc: 'We show you exactly what’s worth automating first, what it costs, and what it gives back.' },
  { icon: Users, title: 'You’re juggling too many freelancers', desc: 'One team handles the tech, the strategy and the brand. One point of contact, one plan.' },
  { icon: Wallet, title: 'Agency pricing feels like a blank cheque', desc: 'Every project is fixed-fee and quoted up front. Ongoing support is a simple monthly retainer.' },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });
  const { ref: tiltRef, rotateX, scale } = useScrollTilt<HTMLDivElement>();

  return (
    <MotionSection id="about" className="relative overflow-hidden pt-16 md:pt-20 pb-32 px-4 md:px-8">
      {/* Cyan top-right / navy bottom-left, the same wash the service sections use. */}
      <div ref={blobRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 600, height: 600, top: '-10%', right: '-5%',
            background: 'radial-gradient(circle, rgba(0,204,255,0.25) 0%, rgba(0,204,255,0) 70%)',
          }}
          animate={reduceMotion || !isInView ? undefined : { x: [0, 25, -15, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.98, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 560, height: 560, bottom: '-10%', left: '-8%',
            background: 'radial-gradient(circle, rgba(0,65,155,0.2) 0%, rgba(0,65,155,0) 70%)',
          }}
          animate={reduceMotion || !isInView ? undefined : { x: [0, -20, 15, 0], y: [0, 20, -10, 0], scale: [1, 0.97, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        ref={tiltRef}
        style={{ rotateX, scale, transformPerspective: 1000 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline">Sound Familiar?</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl text-balance" style={{ color: 'var(--color-ink-charcoal)' }}>
            You Started a Business, Not an Admin Job
          </h2>
          <p className="max-w-lg" style={{ color: 'var(--color-dock-slate)' }}>
            If any of these hit home, we can fix it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-20">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <div
                className="size-10 p-2 rounded flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-pure-white)', border: '1px solid rgba(0, 65, 155, 0.25)' }}
              >
                <Icon size={20} color="var(--color-koret-cyan)" />
              </div>
              <div className="mt-5 space-y-2">
                <h3 className="text-base font-medium" style={{ color: 'var(--color-ink-charcoal)' }}>{title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-dock-slate)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col md:flex-row items-center gap-16">
          <div
            className="shrink-0 w-full md:w-[380px] aspect-square rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-pure-white)', border: '1px solid var(--color-dock-hairline)' }}
          >
            <img src="/logo/koret-logo-full.png" alt="Koret" className="w-48 opacity-90" />
          </div>
          <div className="max-w-lg text-sm" style={{ color: 'var(--color-dock-slate)' }}>
            <h3 className="text-xl uppercase font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>What We Do</h3>
            <div className="w-24 h-[3px] rounded-full my-3" style={{ background: 'linear-gradient(to right, var(--color-koret-cyan), var(--color-koret-navy))' }} />
            <p className="mt-8">Three services, one team:</p>
            <p className="mt-4">
              <strong style={{ color: 'var(--color-ink-charcoal)' }}>AI Automation</strong> — replies, bookings, follow-ups and admin that run by themselves.
            </p>
            <p className="mt-3">
              <strong style={{ color: 'var(--color-ink-charcoal)' }}>Consulting</strong> — a clear plan for what to automate first, and what it will pay back.
            </p>
            <p className="mt-3">
              <strong style={{ color: 'var(--color-ink-charcoal)' }}>Brand Building</strong> — positioning, identity, website and content that make people trust you.
            </p>
            <p className="mt-6">Built for small and growing businesses, priced for them too.</p>
            <a href="#process">
              <Button className="mt-8 gap-2" size="lg">See How We Work</Button>
            </a>
          </div>
        </div>
      </motion.div>
    </MotionSection>
  );
}
