const steps = [
  { label: '01', title: 'Discover', desc: 'We learn your brand, your bottlenecks, and your goals.' },
  { label: '02', title: 'Design', desc: 'Strategy and system architecture, mapped together.' },
  { label: '03', title: 'Build', desc: 'Campaigns launch, workflows deploy, agents go live.' },
  { label: '04', title: 'Scale', desc: 'We monitor, refine, and expand what\'s working.' },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="bg-[var(--color-bone)] py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.label}>
              <p
                className="text-[14px] mb-3"
                style={{ fontFamily: 'var(--font-aux-mono)', color: 'var(--color-slate-mid)', letterSpacing: '-0.04em' }}
              >
                {step.label}
              </p>
              <h3
                className="text-[24px] font-normal mb-2"
                style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[14px]"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)' }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center" style={{ borderTop: '1px solid var(--color-hairline)' }}>
          {steps.map((step) => (
            <div key={step.label} className="flex-1 flex justify-start -mt-[5px]">
              <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: 'var(--color-charcoal-ink)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
