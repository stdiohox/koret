import MotionSection from './MotionSection';
import { useParallax } from '@/hooks/useParallax';

export default function WhyKoret() {
  const driftRef = useParallax<HTMLDivElement>(0.07);

  return (
    <MotionSection id="why-koret" className="py-[80px]">
      <div ref={driftRef} className="mx-auto max-w-[700px] px-6 text-center">
        <h2 className="text-[40px] font-semibold mb-6" style={{ color: 'var(--color-ink-charcoal)', lineHeight: 1.2 }}>
          One Team. Real Context. Zero Guesswork.
        </h2>
        <p className="text-[16px]" style={{ color: 'var(--color-dock-slate)', lineHeight: 1.56 }}>
          Most automation vendors start with the tool. We start with your brand — how it talks, how it runs, what matters to your customers — then build the system around that. The result isn't just automation that works. It's automation that fits.
        </p>
      </div>
    </MotionSection>
  );
}
