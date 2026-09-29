import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { motion } from 'framer-motion';
import { useScrollTilt } from '@/hooks/useScrollTilt';

export default function WhyKoret() {
  const driftRef = useParallax<HTMLDivElement>(0.07);
  const { ref: tiltRef, rotateX, scale } = useScrollTilt<HTMLDivElement>();

  return (
    <MotionSection id="why-koret" className="py-[80px]">
      <div ref={driftRef} className="mx-auto max-w-[700px] px-6 text-center">
        <motion.div ref={tiltRef} style={{ rotateX, scale, transformPerspective: 1000 }}>
        <ScrollReveal>
        <h2 className="text-[clamp(1.75rem,1.15rem+2.6vw,2.5rem)] font-semibold mb-6 leading-[1.14] tracking-[-0.02em]" style={{ color: 'var(--color-ink-charcoal)' }}>
          Why One Team Beats Three
        </h2>
        <p className="text-[16px]" style={{ color: 'var(--color-dock-slate)', lineHeight: 1.56 }}>
          When your website, your automations and your brand come from different people, nothing quite fits — and you end up as the go-between. With Koret, the same team plans it, builds it and makes it look good. You get one plan, one price and one person to call.
        </p>
        </ScrollReveal>
        </motion.div>
      </div>
    </MotionSection>
  );
}
