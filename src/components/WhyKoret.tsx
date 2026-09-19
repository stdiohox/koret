import MotionSection from './MotionSection';

export default function WhyKoret() {
  return (
    <MotionSection className="bg-[var(--color-pure-white)] py-[100px]">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <h2
          className="text-[32px] font-normal mb-6"
          style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)', letterSpacing: '-0.03em' }}
        >
          One Team. Two Disciplines. Zero Handoff Friction.
        </h2>
        <p
          className="text-[16px]"
          style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)' }}
        >
          Most agencies stop at the campaign. Most dev shops don't understand the brand. Koret does both — so the automation we build sounds like your brand, and the marketing we run is backed by systems that actually deliver.
        </p>
      </div>
    </MotionSection>
  );
}
