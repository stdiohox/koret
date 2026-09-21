import { motion } from 'framer-motion';
import MotionSection from './MotionSection';
import { useParallax } from '@/hooks/useParallax';
import { useScrollTilt } from '@/hooks/useScrollTilt';

const stats = [
  { value: '70%', label: 'Increase in qualified leads', color: 'var(--color-koret-cyan)' },
  { value: '20', label: 'Hours/week saved through automation', color: 'var(--color-ink-charcoal)' },
  { value: '15', label: 'AI workflows deployed', color: 'var(--color-koret-cyan)' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function Results() {
  const driftRef = useParallax<HTMLDivElement>(0.06);
  const { ref: tiltRef, rotateX, scale } = useScrollTilt<HTMLDivElement>();

  return (
    <MotionSection id="results" className="pt-0 pb-[80px]">
      {/* Plain wrapper: the inner motion.div animates transform via framer variants, so the
          GSAP parallax must not target the same element. */}
      <div ref={driftRef}>
      <motion.div ref={tiltRef} style={{ rotateX, scale, transformPerspective: 1000 }}>
      <motion.div
        className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="results-card p-6 rounded-[16px]"
            style={{
              backgroundColor: 'var(--color-surface-ivory)',
              border: '1px solid var(--color-dock-hairline)',
            }}
          >
            <p className="text-[clamp(2rem,1.4rem+2.6vw,2.75rem)] font-semibold mb-2 leading-[1.1] tracking-[-0.02em]" style={{ color: stat.color, lineHeight: 1.25 }}>
              {stat.value}
            </p>
            <p className="text-[14px] font-medium" style={{ color: 'var(--color-dock-slate)' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
      </motion.div>
      </div>
    </MotionSection>
  );
}
