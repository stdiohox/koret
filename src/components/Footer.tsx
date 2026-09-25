import React from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { MeshGradient } from '@paper-design/shaders-react';
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
  Contact: [{ label: 'Book a Free Consultation', href: '#start-project' }],
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
  { name: 'LinkedIn', Icon: Linkedin, url: 'https://www.linkedin.com/company/koret-consulting/' },
  { name: 'Facebook', slug: 'facebook', url: null },
  { name: 'TikTok', slug: 'tiktok', url: null },
  { name: 'Message', Icon: MessageCircle, url: null },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(panelRef, { margin: '200px' });
  const [webglSupported, setWebglSupported] = React.useState(true);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-white antialiased [font-synthesis:none]"
    >
      {/* Black panel. --color-primary is the reference's hook for the panel colour; black
          replaces its #1C76F8 so the footer closes the page on the same base the Hero
          opens it with. The black also sits on the panel itself, not only in the shader,
          so the panel is correct in the frames before the canvas first paints. */}
      <div
        ref={panelRef}
        className="relative z-10 min-h-[400px] w-full [--color-primary:#000000] bg-(--color-primary)"
      >
        {/* Same mesh gradient the Hero opens the page with — identical palette and
            settings, so the two dark bookends read as one treatment rather than two.
            Speed is gated on reduced motion and on the panel being near the viewport,
            so it costs nothing while the footer is off-screen. */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {webglSupported ? (
            <MeshGradient
              className="absolute inset-0 h-full w-full"
              colors={['#000000', '#00CCFF', '#03857A', '#00419B', '#FD7F00']}
              distortion={0.8}
              swirl={0.3}
              speed={reduceMotion || !isInView ? 0 : 0.3}
              style={{ backgroundColor: '#000000' }}
            />
          ) : (
            <>
              <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 700,
                  height: 700,
                  top: '-20%',
                  right: '5%',
                  background: 'radial-gradient(circle, rgba(0,204,255,0.45) 0%, rgba(0,204,255,0) 70%)',
                }}
                animate={
                  reduceMotion || !isInView
                    ? undefined
                    : { x: [0, 30, -20, 0], y: [0, -20, 25, 0], scale: [1, 1.06, 0.98, 1] }
                }
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 640,
                  height: 640,
                  bottom: '-25%',
                  left: '10%',
                  background: 'radial-gradient(circle, rgba(0,65,155,0.5) 0%, rgba(0,65,155,0) 70%)',
                }}
                animate={
                  reduceMotion || !isInView
                    ? undefined
                    : { x: [0, -25, 20, 0], y: [0, 25, -15, 0], scale: [1, 0.97, 1.05, 1] }
                }
                transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-16 px-6 py-16 md:px-12 md:py-24 lg:flex-row lg:gap-8 lg:px-24">
          {/* Left side */}
          <div className="flex w-full max-w-sm flex-col justify-between">
            <div className="flex flex-col">
              {/* The light wordmark, not the navy/cyan one — this panel is dark. */}
              <img src="/logo/koret-wordmark-light.png" alt="Koret" className="mb-4 h-8 w-auto shrink-0 self-start" />
              <h2 className="text-sm font-medium leading-tight text-white md:text-base">
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
                    <Glyph className="h-6 w-6 shrink-0" style={{ color: 'var(--color-pure-white)' }} aria-hidden="true" />
                  ) : (
                    <img
                      // FFFFFF matches the lucide glyph above, so the row reads as one
                      // colour. (Keep in sync manually — the CDN needs a literal hex.)
                      src={`https://cdn.simpleicons.org/${s.slug}/FFFFFF`}
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
                      key={s.name}
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
                      key={s.name}
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
