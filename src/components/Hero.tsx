export default function Hero() {
  return (
    <section className="bg-[var(--color-pure-white)] py-[100px]">
      <div className="mx-auto max-w-[1200px] flex flex-col items-center text-center px-6">

        {/* Announcement Pill */}
        <div
          className="inline-flex items-center rounded-full px-4 py-1.5 mb-6"
          style={{ border: '1px solid var(--color-lavender-trace)' }}
        >
          <span
            className="text-[14px]"
            style={{
              fontFamily: 'var(--font-aux-mono)',
              color: 'var(--color-logo-violet)',
              letterSpacing: '-0.04em',
            }}
          >
            Marketing + AI, Under One Roof
          </span>
        </div>

        {/* Hero Headline */}
        <h1
          className="max-w-[900px] text-[48px] md:text-[72px] font-normal"
          style={{
            fontFamily: 'var(--font-inter-display)',
            color: 'var(--color-charcoal-ink)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Brands That Tell Stories. Systems That Scale Them.
        </h1>

        {/* Subhead */}
        <p
          className="max-w-[640px] mt-6 text-[16px]"
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'var(--color-slate-mid)',
            lineHeight: 1.5,
            letterSpacing: '-0.16px',
          }}
        >
          Koret builds the brand strategy that makes people care — and the AI
          infrastructure that makes your business run itself. From campaigns
          to code, we bring your brand to limelight.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">
          <button
            className="rounded-[35px] px-6 py-[15px] text-[16px] font-normal"
            style={{
              backgroundColor: 'var(--color-charcoal-ink)',
              color: 'var(--color-pure-white)',
              fontFamily: 'var(--font-inter-display)',
              boxShadow: 'rgb(241, 241, 241) 8px 8px 0px 0px',
            }}
          >
            Start Your Project
          </button>

          <button
            className="rounded-[35px] px-6 py-[15px] text-[16px] font-normal"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-charcoal-ink)',
              fontFamily: 'var(--font-inter-display)',
              border: '1.5px solid var(--color-charcoal-ink)',
              boxShadow: 'rgba(226, 226, 227, 0.5) 10px 10px 0px -2px',
            }}
          >
            See What We Build
          </button>
        </div>

      </div>
    </section>
  );
}
