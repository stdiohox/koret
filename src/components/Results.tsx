import { motion, useReducedMotion } from 'framer-motion';
import MotionSection from './MotionSection';

const stats = [
  { value: '[X]%', label: 'Increase in qualified leads' },
  { value: '[X]', label: 'Hours/week saved through automation' },
  { value: '[X]', label: 'AI workflows deployed' },
];

const container = (reduceMotion: boolean) => ({
  hidden: {},
  show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
});

const item = (reduceMotion: boolean) => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' } },
});

export default function Results() {
  const reduceMotion = !!useReducedMotion();

  return (
    <MotionSection id="results" className="bg-[var(--color-pure-white)] py-[100px]">
      <motion.div
        className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
        variants={container(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item(reduceMotion)}>
            <p
              className="text-[48px] font-normal mb-2"
              style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)', letterSpacing: '-1.44px' }}
            >
              {stat.value}
            </p>
            <p
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-aux-mono)', color: 'var(--color-slate-mid)', letterSpacing: '-0.04em' }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}
