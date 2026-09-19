import { motion } from 'framer-motion';
import MotionSection from './MotionSection';

const steps = [
  { label: '01', title: 'Discover', desc: 'We learn your brand, your bottlenecks, and your goals.' },
  { label: '02', title: 'Design', desc: 'Strategy and system architecture, mapped together.' },
  { label: '03', title: 'Build', desc: 'Campaigns launch, workflows deploy, agents go live.' },
  { label: '04', title: 'Scale', desc: 'We monitor, refine, and expand what\'s working.' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function ProcessTimeline() {
  return (
    <MotionSection id="process" className="py-[80px]">
      <motion.div
        className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-4 gap-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {steps.map((step) => (
          <motion.div key={step.label} variants={item}>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center mb-4 text-[12px] font-semibold"
              style={{ border: '1.5px solid var(--color-koret-navy)', color: 'var(--color-koret-navy)' }}
            >
              {step.label.replace('0', '')}
            </div>
            <h3 className="text-[20px] font-semibold mb-2" style={{ color: 'var(--color-ink-charcoal)' }}>
              {step.title}
            </h3>
            <p className="text-[15px]" style={{ color: 'var(--color-dock-slate)' }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}
