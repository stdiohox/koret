import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Stethoscope, Scale, ShoppingBag, Dumbbell, UserSearch, Wrench } from 'lucide-react';
import MotionSection from './MotionSection';
import { useScrollTilt } from '@/hooks/useScrollTilt';

const industries = [
  { icon: Stethoscope, label: 'Healthcare & Dental', gradient: { from: '#00CCFF', to: '#00419B' } },
  { icon: Scale, label: 'Law & Professional Services', gradient: { from: '#00419B', to: '#03857A' } },
  { icon: ShoppingBag, label: 'E-Commerce & DTC', gradient: { from: '#03857A', to: '#FD7F00' } },
  { icon: Dumbbell, label: 'Fitness & Coaching', gradient: { from: '#FD7F00', to: '#00CCFF' } },
  { icon: UserSearch, label: 'Recruitment & Staffing', gradient: { from: '#00CCFF', to: '#03857A' } },
  { icon: Wrench, label: 'Home Services & Trades', gradient: { from: '#00419B', to: '#FD7F00' } },
];

export default function TargetIndustries() {
  const reduceMotion = useReducedMotion();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });
  const { ref: tiltRef, rotateX, scale } = useScrollTilt<HTMLDivElement>();

  return (
    <MotionSection id="industries" className="relative overflow-hidden py-16 px-4 md:px-8">
      {/* The reduced-motion stop matches how the rest of the site treats ambient
          motion (the blob washes gate on useReducedMotion); an infinite marquee is
          the one piece here that would otherwise never hold still. */}
      <style>{`
        @keyframes koret-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .koret-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Teal top-left / orange bottom-right: mirrored against the cyan-and-navy
          wash above so two adjacent sections don't read as the same graphic twice. */}
      <div ref={blobRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 450, height: 450, top: '-20%', left: '-5%',
            background: 'radial-gradient(circle, rgba(3,133,122,0.2) 0%, rgba(3,133,122,0) 70%)',
          }}
          animate={reduceMotion || !isInView ? undefined : { x: [0, 20, -10, 0], y: [0, -10, 15, 0], scale: [1, 1.04, 0.97, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 420, height: 420, bottom: '-25%', right: '-5%',
            background: 'radial-gradient(circle, rgba(253,127,0,0.15) 0%, rgba(253,127,0,0) 70%)',
          }}
          animate={reduceMotion || !isInView ? undefined : { x: [0, -15, 10, 0], y: [0, 15, -10, 0], scale: [1, 0.96, 1.03, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>
          Who We Work With
        </h2>
        <p className="mt-2 max-w-lg mx-auto text-sm" style={{ color: 'var(--color-dock-slate)' }}>
          Service-based, appointment-driven businesses — where manual work is easiest to see, and automation pays off fastest.
        </p>
      </div>

      <motion.div
        ref={tiltRef}
        className="relative z-10 w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          rotateX, scale, transformPerspective: 1000,
        }}
      >
        <div
          className="koret-marquee-track flex w-max items-center gap-4 py-4"
          style={{ animation: 'koret-marquee 40s linear infinite' }}
        >
          {[...industries, ...industries].map(({ icon: Icon, label, gradient }, i) => (
            <div
              key={i}
              className="group relative h-28 w-44 shrink-0 flex flex-col items-center justify-center gap-2 rounded-lg overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface-ivory)', border: '1px solid var(--color-dock-hairline)' }}
            >
              <div
                className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-15 group-hover:scale-100"
                style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
              />
              <Icon size={28} color="var(--color-koret-cyan)" className="relative" />
              <span className="relative text-xs font-medium text-center px-2" style={{ color: 'var(--color-ink-charcoal)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </MotionSection>
  );
}
