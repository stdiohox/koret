import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

export default function FinalCTA() {
  const driftRef = useParallax<HTMLDivElement>(0.07);

  return (
    <section
      id="final-cta"
      className="py-[100px]"
      style={{
        background: 'linear-gradient(135deg, var(--color-canvas-cream) 0%, var(--color-canvas-cream) 55%, rgba(0,204,255,0.35) 100%)',
      }}
    >
      <div ref={driftRef} className="mx-auto max-w-[640px] px-6 text-center">
        <h2 className="text-[clamp(2rem,1.3rem+3vw,3rem)] font-semibold mb-4 leading-[1.1] tracking-[-0.025em]" style={{ color: 'var(--color-ink-charcoal)' }}>
          Ready to Build a Brand That Runs Itself?
        </h2>
        <p className="text-[16px] mb-8" style={{ color: 'var(--color-dock-slate)' }}>
          Tell us where you're stuck — marketing, tech, or both.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-[48px] px-6 py-3 text-[16px] font-medium"
          style={{ backgroundColor: 'var(--color-koret-cyan)', color: 'var(--color-ink-charcoal)' }}
        >
          Book a Consultation
        </motion.button>
      </div>
    </section>
  );
}
