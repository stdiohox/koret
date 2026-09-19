import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MotionSection from './MotionSection';

const tracks = {
  'Brand & Marketing': [
    'Brand strategy & identity',
    'Content & campaign development',
    'Data-driven marketing execution',
  ],
  'AI & Automation': [
    'Automation',
    'Website & Web App Development',
    'Workflow Systems',
    'Agentic AI Builds',
    'AI Consultation',
  ],
} as const;

export default function ServicesTabs() {
  const [active, setActive] = useState<keyof typeof tracks>('Brand & Marketing');

  return (
    <MotionSection id="services" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex justify-center gap-2">
          {(Object.keys(tracks) as (keyof typeof tracks)[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative px-4 py-2 text-[15px] font-medium"
              style={{ color: 'var(--color-ink-charcoal)' }}
            >
              {active === tab && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 rounded-[48px]"
                  style={{ backgroundColor: 'var(--color-surface-ivory)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
              <span className="relative z-10">
                {tab}
                {tab === 'AI & Automation' && (
                  <span className="ml-2 text-[12px] font-medium" style={{ color: 'var(--color-ink-charcoal)' }}>
                    NEW
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-10 max-w-[640px] mx-auto space-y-4"
          >
            {tracks[active].map((item) => (
              <li key={item} className="text-[16px]" style={{ color: 'var(--color-ink-charcoal)' }}>
                {item}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </MotionSection>
  );
}
