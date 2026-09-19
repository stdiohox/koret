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
    <MotionSection id="services" className="bg-[var(--color-pure-white)] py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex justify-center gap-10" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
          {(Object.keys(tracks) as (keyof typeof tracks)[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative pb-4 text-[16px] font-normal"
              style={{
                fontFamily: 'var(--font-inter-display)',
                color: active === tab ? 'var(--color-charcoal-ink)' : 'var(--color-slate-mid)',
              }}
            >
              {tab}
              {tab === 'AI & Automation' && (
                <span
                  className="ml-2 text-[12px]"
                  style={{ color: 'var(--color-lavender-trace)', fontFamily: 'var(--font-aux-mono)' }}
                >
                  NEW
                </span>
              )}
              {active === tab && (
                <motion.div
                  layoutId="active-tab-underline"
                  className="absolute left-0 right-0 bottom-0"
                  style={{ height: 2, backgroundColor: 'var(--color-logo-violet)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
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
              <li
                key={item}
                className="text-[16px]"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-charcoal-ink)' }}
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </MotionSection>
  );
}
