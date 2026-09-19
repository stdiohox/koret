const stats = [
  { value: '[X]%', label: 'Increase in qualified leads' },
  { value: '[X]', label: 'Hours/week saved through automation' },
  { value: '[X]', label: 'AI workflows deployed' },
];

export default function Results() {
  return (
    <section id="results" className="bg-[var(--color-pure-white)] py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p
              className="text-[48px] font-normal mb-2"
              style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)', letterSpacing: '-1.44px' }}
            >
              {stat.value}
            </p>
            <p
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-aux-mono)', color: 'var(--color-slate-mid)', letterSpacing: '-0.04em' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
