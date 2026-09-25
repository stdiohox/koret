import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { useScrollTilt } from '@/hooks/useScrollTilt';

export default function FinalCTA() {
  const driftRef = useParallax<HTMLDivElement>(0.07);
  const { ref: tiltRef, rotateX, scale } = useScrollTilt<HTMLDivElement>();

  return (
    <section
      id="final-cta"
      className="py-[100px]"
      style={{
        background: 'linear-gradient(135deg, var(--color-canvas-cream) 0%, var(--color-canvas-cream) 55%, rgba(0,204,255,0.35) 100%)',
      }}
    >
      <div ref={driftRef} className="mx-auto max-w-[640px] px-6 text-center">
        <motion.div ref={tiltRef} style={{ rotateX, scale, transformPerspective: 1000 }}>
        <h2 className="text-[clamp(2rem,1.3rem+3vw,3rem)] font-semibold mb-4 leading-[1.1] tracking-[-0.025em]" style={{ color: 'var(--color-ink-charcoal)' }}>
          Ready to Build a Brand That Runs Itself?
        </h2>
        <p className="text-[16px] mb-8" style={{ color: 'var(--color-dock-slate)' }}>
          Tell us where you're stuck — marketing, tech, or both.
        </p>
        <motion.a
          href="#start-project"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block rounded-[48px] px-6 py-3 text-[16px] font-medium"
          style={{ backgroundColor: 'var(--color-koret-cyan)', color: '#ffffff' }}
        >
          Book a Free Consultation
        </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
