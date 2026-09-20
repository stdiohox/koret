import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';
import { useParallax } from '@/hooks/useParallax';

export default function WhyKoret() {
  const driftRef = useParallax<HTMLDivElement>(0.07);

  return (
    <MotionSection id="why-koret" className="py-[80px]">
      <div ref={driftRef} className="mx-auto max-w-[700px] px-6 text-center">
        <ScrollReveal>
        <h2 className="text-[clamp(1.75rem,1.15rem+2.6vw,2.5rem)] font-semibold mb-6 leading-[1.14] tracking-[-0.02em]" style={{ color: 'var(--color-ink-charcoal)' }}>
          One Team. Real Context. Zero Guesswork.
        </h2>
        <p className="text-[16px]" style={{ color: 'var(--color-dock-slate)', lineHeight: 1.56 }}>
          Most automation vendors start with the tool. We start with your brand — how it talks, how it runs, what matters to your customers — then build the system around that. The result isn't just automation that works. It's automation that fits.
        </p>
        </ScrollReveal>
      </div>
    </MotionSection>
  );
}
