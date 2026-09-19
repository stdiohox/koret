export default function Footer() {
  const columns = {
    Services: ['Brand & Marketing', 'AI & Automation'],
    Company: ['Why Koret', 'Process', 'Results'],
    Contact: ['Book a Consultation'],
  };

  return (
    <footer id="contact" className="bg-[var(--color-bone)]" style={{ borderTop: '1px solid var(--color-hairline)' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-[100px] grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-sm"
              style={{ background: 'conic-gradient(from 180deg, transparent, #855cf7)' }}
            />
            <span
              className="text-[20px] font-normal"
              style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
            >
              Koret
            </span>
          </div>
          <p
            className="text-[14px]"
            style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)' }}
          >
            Bringing your brand to limelight.
          </p>
        </div>
        {Object.entries(columns).map(([heading, links]) => (
          <div key={heading}>
            <p
              className="text-[14px] mb-4"
              style={{ fontFamily: 'var(--font-aux-mono)', color: 'var(--color-slate-mid)', letterSpacing: '-0.04em' }}
            >
              {heading.toUpperCase()}
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[14px]"
                    style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-charcoal-ink)' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
