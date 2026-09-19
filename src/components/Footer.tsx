export default function Footer() {
  const columns = {
    Services: ['Brand & Marketing', 'AI & Automation'],
    Company: ['Why Koret', 'Process', 'Results'],
    Contact: ['Book a Consultation'],
  };

  return (
    <footer id="contact" style={{ backgroundColor: 'var(--color-pure-white)', borderTop: '1px solid var(--color-dock-hairline)' }}>
      <div className="mx-auto max-w-[1200px] px-6 py-[80px] grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo/koret-logo-mark.png" alt="" className="w-6 h-6" />
            <span className="text-[18px] font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>
              Koret
            </span>
          </div>
          <p className="text-[14px]" style={{ color: 'var(--color-dock-slate)' }}>
            Bringing your brand to limelight.
          </p>
        </div>
        {Object.entries(columns).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[13px] font-semibold mb-4" style={{ color: 'var(--color-ink-charcoal)' }}>
              {heading.toUpperCase()}
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[14px]" style={{ color: 'var(--color-dock-slate)' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: 'var(--color-dock-hairline)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-6 text-[13px]" style={{ color: 'var(--color-dock-steel)' }}>
          © {new Date().getFullYear()} Koret. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
