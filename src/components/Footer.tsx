import { CONTACT_EMAIL, FOOTER_COLUMNS } from '../data/content'
import { Section } from './Section'
import { DiamondGlyph, Wordmark } from './Wordmark'

export function Footer() {
  return (
    <Section as="footer" tone="black" labelledBy="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
        <div>
          <Wordmark tone="dark" className="h-8" />

          {/* The one script-font moment on the page. Guthen Jacqueline is a paid
              marketplace font; Caveat stands in until the licensed file lands.
              Swap --font-script in src/index.css — nothing else changes. */}
          <p className="mt-5 flex items-center gap-3 font-script text-heading-sm leading-none text-cyan md:text-heading">
            <DiamondGlyph className="bg-orange" />
            Bringing your brand to limelight.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-block text-body font-semibold text-white underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-caption font-semibold uppercase tracking-[0.14em] text-text-on-dark-muted">
                {column.heading}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-sm text-white/80 transition-colors duration-150 hover:text-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-text-on-dark-muted">
          © {new Date().getFullYear()} Koret. All rights reserved.
        </p>
        <a
          href="#top"
          className="text-body-sm font-semibold text-white/80 transition-colors duration-150 hover:text-cyan"
        >
          Back to top
        </a>
      </div>
    </Section>
  )
}
