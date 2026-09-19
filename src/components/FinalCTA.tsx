import { motion, useReducedMotion } from 'framer-motion';
import MotionSection from './MotionSection';

export default function FinalCTA() {
  const reduceMotion = !!useReducedMotion();

  return (
    <MotionSection className="bg-[var(--color-pure-white)] py-[100px]">
      <div className="mx-auto max-w-[640px] px-6 text-center">
        <h2
          className="text-[48px] font-normal mb-4"
          style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)', letterSpacing: '-1.44px' }}
        >
          Ready to Build a Brand That Runs Itself?
        </h2>
        <p
          className="text-[16px] mb-8"
          style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)' }}
        >
          Tell us where you're stuck — marketing, tech, or both.
        </p>
        <motion.button
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="rounded-[35px] px-6 py-[15px] text-[16px] font-normal"
          style={{
            backgroundColor: 'var(--color-charcoal-ink)',
            color: 'var(--color-pure-white)',
            fontFamily: 'var(--font-inter-display)',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          Book a Consultation
        </motion.button>
      </div>
    </MotionSection>
  );
}
