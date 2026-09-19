import MotionSection from './MotionSection';

export default function WhyKoret() {
  return (
    <MotionSection className="py-[80px]">
      <div className="mx-auto max-w-[700px] px-6 text-center">
        <h2 className="text-[40px] font-semibold mb-6" style={{ color: 'var(--color-ink-charcoal)', lineHeight: 1.2 }}>
          One Team. Two Disciplines. Zero Handoff Friction.
        </h2>
        <p className="text-[16px]" style={{ color: 'var(--color-dock-slate)', lineHeight: 1.56 }}>
          Most agencies stop at the campaign. Most dev shops don't understand the brand. Koret does both — so the automation we build sounds like your brand, and the marketing we run is backed by systems that actually deliver.
        </p>
      </div>
    </MotionSection>
  );
}
