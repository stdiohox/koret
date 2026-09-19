import { Eyebrow, Section } from './Section'
import { Reveal } from './Reveal'

export function WhyKoret() {
  return (
    <Section id="why-koret" tone="white" labelledBy="why-koret-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow>Why Koret</Eyebrow>
          <h2
            id="why-koret-heading"
            className="mt-4 text-heading font-bold text-black md:text-heading-lg"
          >
            One Team. Two Disciplines.{' '}
            <span className="text-teal">Zero Handoff Friction.</span>
          </h2>
          <p className="mt-6 text-body text-text-muted md:text-subheading md:leading-[1.5]">
            The usual version of this costs you twice. An agency writes the
            positioning, a development shop builds the systems, and neither one
            ever reads the other's work. The brand promises something the
            software cannot do, and the software optimises for something the
            brand never said.
          </p>
          <p className="mt-4 text-body text-text-muted md:text-subheading md:leading-[1.5]">
            Koret runs both from the same room. The people writing your story
            sit with the people automating your operations, which means the
            demand we create is demand your systems can actually carry.
          </p>
        </Reveal>

        {/* One of exactly two hard-offset elements on the page. */}
        <Reveal delay={0.1}>
          <div className="rounded-cards border border-border bg-cloud p-8 shadow-cutout md:p-10">
            <p className="text-heading-sm font-semibold leading-[1.3] tracking-[-0.02em] text-black md:text-heading md:leading-[1.2]">
              “The strategy deck and the system architecture get drawn in the
              same week, by people who have to live with both.”
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span
                aria-hidden="true"
                className="inline-block size-2 rotate-45 bg-teal"
              />
              <p className="text-body-sm font-semibold text-text-muted">
                How every Koret engagement is scoped
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
