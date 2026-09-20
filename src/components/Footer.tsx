const columns = {
  Services: [{ label: 'AI & Automation', href: '#ai-agency' }],
  Company: [
    { label: 'Why Koret', href: '#why-koret' },
    { label: 'Process', href: '#process' },
    { label: 'Results', href: '#results' },
  ],
  Contact: [{ label: 'Book a Consultation', href: '#final-cta' }],
};

// `url: null` renders the icon dimmed and inert until a real profile link exists.
const socialLinks: { name: string; slug: string; url: string | null }[] = [
  { name: 'Instagram', slug: 'instagram', url: 'https://www.instagram.com/koretconsult?stkn=c21yb3UxaTA4enpi' },
  { name: 'X (Twitter)', slug: 'x', url: null },
  // LinkedIn is omitted deliberately: Simple Icons has dropped it from the set (trademark
  // request), so cdn.simpleicons.org/linkedin 404s and would render as a blank gap in this
  // row. Restore this line once the mark is self-hosted or sourced from another set:
  // { name: 'LinkedIn', slug: 'linkedin', url: null },
  { name: 'Facebook', slug: 'facebook', url: null },
  { name: 'TikTok', slug: 'tiktok', url: null },
];

export default function Footer() {
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
          <p className="text-[14px] mb-4" style={{ color: 'var(--color-dock-slate)' }}>
            Bringing your brand to limelight.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => {
              const icon = (
                <img
                  // 777c86 is --color-dock-slate, the same tone as this footer's link and
                  // copyright text. (Keep in sync manually — the CDN needs a literal hex.)
                  src={`https://cdn.simpleicons.org/${s.slug}/777c86`}
                  alt={s.name}
                  className="w-5 h-5"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden';
                  }}
                />
              );
              return s.url ? (
                <a key={s.slug} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  {icon}
                </a>
              ) : (
                <span
                  key={s.slug}
                  className="cursor-not-allowed"
                  aria-label={`${s.name} (coming soon)`}
                  title="Coming soon"
                >
                  {icon}
                </span>
              );
            })}
          </div>
        </div>
        {Object.entries(columns).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[13px] font-semibold mb-4" style={{ color: 'var(--color-ink-charcoal)' }}>
              {heading.toUpperCase()}
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14px]" style={{ color: 'var(--color-dock-slate)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: 'var(--color-dock-hairline)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-6 text-[13px]" style={{ color: 'var(--color-dock-slate)' }}>
          © {new Date().getFullYear()} Koret. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
