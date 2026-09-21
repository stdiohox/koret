import { FlutedGlass } from '@paper-design/shaders-react';
import { Linkedin, MessageCircle, type LucideIcon } from 'lucide-react';

const columns = {
  Services: [
    { label: 'AI Automation', href: '#ai-agency' },
    { label: 'Business Consulting', href: '#business-consulting' },
    { label: 'Brand Building', href: '#brand-building' },
  ],
  Company: [
    { label: 'Why Koret', href: '#why-koret' },
    { label: 'Process', href: '#process' },
    { label: 'Results', href: '#results' },
  ],
  Contact: [{ label: 'Book a Free Consultation', href: '#final-cta' }],
};

// `slug` pulls the brand mark from Simple Icons; `Icon` is a lucide component, used for
// marks Simple Icons doesn't carry (it dropped LinkedIn on trademark request, so
// cdn.simpleicons.org/linkedin 404s) and for non-brand glyphs like Message.
// `url: null` renders the icon inert until a real link exists.
const socialLinks: {
  name: string;
  slug?: string;
  Icon?: LucideIcon;
  url: string | null;
}[] = [
  { name: 'Instagram', slug: 'instagram', url: 'https://www.instagram.com/koretconsult?stkn=c21yb3UxaTA4enpi' },
  { name: 'X (Twitter)', slug: 'x', url: null },
  { name: 'LinkedIn', Icon: Linkedin, url: null },
  { name: 'Facebook', slug: 'facebook', url: null },
  { name: 'TikTok', slug: 'tiktok', url: null },
  { name: 'Message', Icon: MessageCircle, url: null },
];

const NAVY = '#00419B';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" style={{ backgroundColor: 'var(--color-pure-white)' }}>
      {/* Stroke-outline wordmark. -webkit-text-stroke is the only cross-browser way to
          outline text without duplicating it; `color: transparent` hollows the fill. */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 overflow-hidden">
        <h2
          aria-hidden="true"
          className="select-none text-center font-bold leading-[0.85] tracking-[-0.03em] text-[clamp(3.5rem,17vw,13rem)]"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(0,65,155,0.4)',
          }}
        >
          KORET.
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="relative overflow-hidden rounded-[28px]" style={{ backgroundColor: NAVY }}>
          {/* FlutedGlass is an image filter — with no `image` it contributes its ribbed
              highlight/shadow pass over colorBack rather than distorting a photo, which is
              all this panel needs. `speed` is left unset (the presets default it to 0), so
              this is a static texture with no animation to gate on reduced motion. The
              navy sits on the panel itself too, so the panel is correct even if WebGL is
              unavailable and the canvas never paints. */}
          <FlutedGlass
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: 'none' }}
            colorBack={NAVY}
            colorHighlight="#4d8bff"
            colorShadow="#001a3d"
            shape="lines"
            distortionShape="prism"
            size={0.35}
            angle={12}
            distortion={0.45}
            shift={0}
            blur={0}
            edges={0.2}
            stretch={0.1}
            highlights={0.35}
            shadows={0.4}
            grainMixer={0.15}
            grainOverlay={0.08}
            scale={1}
            fit="cover"
          />

          <div className="relative z-10 flex flex-col gap-12 p-8 md:p-14 lg:flex-row lg:justify-between">
            <div>
              {/* The light wordmark, not the navy/cyan one — this panel is navy. */}
              <img src="/logo/koret-wordmark-light.png" alt="Koret" className="h-7 w-auto" />
              <p className="mt-4 text-[14px] text-white/80">Bringing your brand to limelight.</p>

              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map((s) => {
                  const Glyph = s.Icon;
                  // Flat, unbadged icons: the circle wrapper is gone, so the glyph itself
                  // is the whole control. shrink-0 keeps the CDN images from being squeezed
                  // narrower than the lucide components when the column is tight.
                  const icon = Glyph ? (
                    <Glyph className="w-6 h-6 shrink-0" style={{ color: 'var(--color-koret-cyan)' }} aria-hidden="true" />
                  ) : (
                    <img
                      // 00CCFF is --color-koret-cyan, the same tone as the lucide glyph above,
                      // so the row reads as one colour. (Keep in sync manually — the CDN needs
                      // a literal hex.)
                      src={`https://cdn.simpleicons.org/${s.slug}/00CCFF`}
                      alt={s.name}
                      className="w-6 h-6 shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden';
                      }}
                    />
                  );
                  return s.url ? (
                    <a key={s.slug} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="inline-flex items-center justify-center">
                      {icon}
                    </a>
                  ) : (
                    <span
                      key={s.slug}
                      className="inline-flex cursor-not-allowed items-center justify-center"
                      aria-label={`${s.name} (coming soon)`}
                      title="Coming soon"
                    >
                      {icon}
                    </span>
                  );
                })}
              </div>

              <p className="mt-8 text-[13px] text-white/80">© {year} Koret. All rights reserved.</p>
            </div>

            <div className="flex flex-wrap gap-12 md:gap-24 lg:flex-nowrap">
              {Object.entries(columns).map(([heading, links]) => (
                <div key={heading}>
                  <p className="mb-4 font-semibold text-white text-lg md:text-xl">{heading.toUpperCase()}</p>
                  <ul>
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="flex min-h-[44px] items-center text-sm font-medium text-white/70 transition-colors hover:text-white md:text-[15px]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
