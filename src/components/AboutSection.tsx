import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Clock, Compass, Sparkles, Users, Wallet, Target } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';

const features = [
  { icon: Clock, title: 'Reclaim 15–20+ Hours a Week', desc: 'We automate the repetitive work — follow-ups, data entry, scheduling — so your week isn\'t spent on it.' },
  { icon: Compass, title: 'An AI-Fluent Strategic Partner', desc: 'Outside, informed guidance on where automation and process change actually move the needle.' },
  { icon: Sparkles, title: 'Look Like a Bigger Business', desc: 'Positioning, identity, and content that make a small team read as an established, credible brand.' },
  { icon: Users, title: 'One Team, One Point of Contact', desc: 'No coordinating three vendors who\'ve never spoken. One strategy, one relationship.' },
  { icon: Wallet, title: 'Fixed-Fee Projects, Simple Retainers', desc: 'Priced around the value delivered, not hours worked — implementation plus ongoing optimization.' },
  { icon: Target, title: 'Built for SMBs, Not Enterprises', desc: 'Playbooks and pricing designed for owner-operated businesses, not enterprise budgets.' },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });

  return (
    <MotionSection id="about" className="relative overflow-hidden py-32 px-4 md:px-8">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline">About Koret</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-2xl" style={{ color: 'var(--color-ink-charcoal)' }}>
            The Integrated Growth Partner for SMBs
          </h2>
          <p className="max-w-lg" style={{ color: 'var(--color-dock-slate)' }}>
            One team, three disciplines, no coordinating separate vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-20">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <div
                className="size-10 p-2 rounded flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 65, 155, 0.1)', border: '1px solid rgba(0, 65, 155, 0.25)' }}
              >
                <Icon size={20} color="var(--color-koret-navy)" />
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
            <p className="mt-8">
              Koret runs three integrated service lines under one roof — AI automation, business consulting, and brand building — so you're not coordinating three separate vendors who've never spoken.
            </p>
            <p className="mt-6">
              We audit your workflows and build the AI systems that save real hours, offer strategic guidance on where automation and process change create the most leverage, and build the brand and content that turns those efficiency gains into visible growth.
            </p>
            <p className="mt-6">One team, one strategy, one point of contact — that's the whole idea.</p>
            <a href="#process">
              <Button className="mt-8 gap-2" size="lg">See How We Work</Button>
            </a>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
