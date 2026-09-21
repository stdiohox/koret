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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-white antialiased [font-synthesis:none]"
    >
      {/* Stroke-outline wordmark. The negative bottom margin tucks it behind the panel
          below (which carries z-10), so the letterforms are cropped by the panel edge
          exactly as in the reference. Navy stroke rather than the reference's black. */}
      <div className="relative z-0 flex w-full items-end justify-center pt-24 pb-0 md:pt-32">
        <h1
          aria-hidden="true"
          className="-mb-4 select-none text-[120px] font-semibold leading-[0.75] text-transparent opacity-50 [-webkit-text-stroke:1px_rgba(0,65,155,0.4)] sm:text-[160px] md:-mb-6 md:text-[210px]"
        >
          KORET.
        </h1>
      </div>

      {/* Navy panel. --color-primary is the reference's hook for the panel colour; Koret
          navy replaces its #1C76F8. The colour lives on the panel rather than in the
          shader (colorBack is transparent), so the panel is correct even where WebGL is
          unavailable and the canvas never paints. */}
      <div className="relative z-10 min-h-[400px] w-full [--color-primary:#00419B] bg-(--color-primary)">
        {/* Background shader. FlutedGlass is an image filter; with no `image` it lays its
            ribbed highlight/shadow pass over whatever sits behind. `speed` is left unset
            (presets default it to 0), so this is static — no motion to gate on
            prefers-reduced-motion, unlike the Hero's shader. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <FlutedGlass
            size={0.89}
            shape="lines"
            angle={0}
            distortionShape="prism"
            distortion={0.5}
            shift={0}
            blur={0}
            edges={0.25}
            stretch={0}
            scale={1.11}
            fit="cover"
            highlights={0.1}
            shadows={0.2}
            grainMixer={0.1}
            grainOverlay={0.1}
            colorBack="#00000000"
            colorHighlight="#FFFFFF"
            colorShadow="#000000"
            className="h-full w-full bg-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-16 px-6 py-16 md:px-12 md:py-24 lg:flex-row lg:gap-8 lg:px-24">
          {/* Left side */}
          <div className="flex w-full max-w-sm flex-col justify-between">
            <div className="flex flex-col">
              {/* The light wordmark, not the navy/cyan one — this panel is navy. */}
              <img src="/logo/koret-wordmark-light.png" alt="Koret" className="mb-4 h-8 w-auto shrink-0 self-start" />
              <h2 className="text-xl font-medium leading-tight text-white md:text-[22px]">
                Bringing your brand
                <br />
                to limelight.
              </h2>
            </div>

            <div className="mt-12 flex flex-col gap-3 pt-8 lg:mt-auto">
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => {
                  const Glyph = s.Icon;
                  // Flat, unbadged icons. shrink-0 keeps the CDN images from being squeezed
                  // narrower than the lucide components when the column is tight.
                  const icon = Glyph ? (
                    <Glyph className="h-6 w-6 shrink-0" style={{ color: 'var(--color-koret-cyan)' }} aria-hidden="true" />
                  ) : (
                    <img
                      // 00CCFF is --color-koret-cyan, the same tone as the lucide glyph above,
                      // so the row reads as one colour. (Keep in sync manually — the CDN needs
                      // a literal hex.)
                      src={`https://cdn.simpleicons.org/${s.slug}/00CCFF`}
                      alt={s.name}
                      className="h-6 w-6 shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden';
                      }}
                    />
                  );
                  return s.url ? (
                    <a
                      key={s.slug}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="inline-flex items-center justify-center transition-opacity hover:opacity-80"
                    >
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
              <p className="mt-1 text-xs font-light text-white/80 md:text-[13px]">
                © {year} Koret, All rights reserved
              </p>
            </div>
          </div>

          {/* Right side — links */}
          <div className="flex flex-wrap gap-12 md:gap-24 lg:flex-nowrap">
            {Object.entries(columns).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-5">
                <h3 className="text-lg font-semibold text-white md:text-xl">{heading}</h3>
                <ul className="flex flex-col gap-3 md:gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white md:text-[15px]"
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
    </footer>
  );
}
