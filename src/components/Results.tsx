import { motion } from 'framer-motion';
import MotionSection from './MotionSection';

const stats = [
  { value: '[X]%', label: 'Increase in qualified leads', color: 'var(--color-koret-cyan)' },
  { value: '[X]', label: 'Hours/week saved through automation', color: 'var(--color-ink-charcoal)' },
  { value: '[X]', label: 'AI workflows deployed', color: 'var(--color-koret-cyan)' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function Results() {
  return (
    <MotionSection id="results" className="py-[80px]">
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
            className="p-6 rounded-[16px]"
            style={{
              backgroundColor: 'var(--color-surface-ivory)',
              border: '1px solid var(--color-dock-hairline)',
            }}
          >
            <p className="text-[40px] font-semibold mb-2" style={{ color: stat.color, lineHeight: 1.25 }}>
              {stat.value}
            </p>
            <p className="text-[14px] font-medium" style={{ color: 'var(--color-dock-slate)' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}
