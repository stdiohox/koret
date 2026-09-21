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
          One Team. Three Disciplines. Zero Handoffs.
        </h2>
        <p className="text-[16px]" style={{ color: 'var(--color-dock-slate)', lineHeight: 1.56 }}>
          Most businesses coordinate an automation agency, a consultant, and a branding agency separately — three vendors, three invoices, three people who've never spoken. Koret runs AI automation, business consulting, and brand building as one integrated team, so the systems we build, the strategy behind them, and the brand carrying it all actually agree with each other.
        </p>
        </ScrollReveal>
      </div>
    </MotionSection>
  );
}
