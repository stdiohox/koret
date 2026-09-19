export default function LogoStrip() {
  const logos = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F', 'Client G'];
  return (
    <section className="bg-[var(--color-bone)] py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <p
          className="text-[14px] mb-10"
          style={{ fontFamily: 'var(--font-aux-mono)', color: 'var(--color-slate-mid)', letterSpacing: '-0.04em' }}
        >
          TRUSTED BY GROWING BRANDS
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo) => (
            <span
              key={logo}
              className="h-5 flex items-center text-[14px]"
              style={{ color: 'var(--color-slate-mid)', fontFamily: 'var(--font-inter)' }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
