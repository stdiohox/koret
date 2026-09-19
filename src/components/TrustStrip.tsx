import { Section } from './Section'
import { Reveal } from './Reveal'

/**
 * TODO (Samuel): replace these six slots with real client logo files
 * (SVG preferred, ~120x32). Each needs its own descriptive alt text —
 * "Acme Logistics logo", not "client logo". Until then they render as
 * neutral placeholders rather than invented brands.
 */
const LOGO_SLOTS = [1, 2, 3, 4, 5, 6]

export function TrustStrip() {
  return (
    <Section tone="cloud" labelledBy="trust-heading" className="!py-12 md:!py-16">
      <Reveal>
        <h2
          id="trust-heading"
          className="text-center text-body-sm font-semibold uppercase tracking-[0.14em] text-text-muted"
        >
          Trusted by growing brands across industries
        </h2>

        <ul className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {LOGO_SLOTS.map((slot) => (
            <li key={slot} className="flex items-center justify-center">
              <div
                className="flex h-8 w-full max-w-[128px] items-center justify-center rounded-inputs border border-dashed border-border text-caption font-medium text-text-muted grayscale"
                aria-hidden="true"
              >
                Logo {slot}
              </div>
            </li>
          ))}
        </ul>
        <p className="sr-only">
          Client logos are pending. Six placeholder slots are reserved here.
        </p>
      </Reveal>
    </Section>
  )
}
