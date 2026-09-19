import { CONTACT_EMAIL } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { Button } from './Button'

export function FinalCTA() {
  return (
    <Section id="contact" tone="navy-deep" labelledBy="final-cta-heading">
      <Reveal className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <h2
          id="final-cta-heading"
          className="text-heading font-bold text-white md:text-heading-lg"
        >
          Ready to Build a Brand That Runs Itself?
        </h2>
        <p className="mt-6 max-w-[560px] text-body text-text-on-dark-muted md:text-subheading md:leading-[1.5]">
          Thirty minutes, no deck. You leave with a straight answer on whether
          the thing you are describing is worth building — and roughly what it
          takes.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {/* The page's one rare accent button: black fill, orange hard offset.
              TODO: swap this mailto for a real form endpoint (Formspree, Resend,
              or your own API) once one exists. */}
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=Consultation%20request`}
            variant="accent"
          >
            Book a Consultation
          </Button>
          <Button href="#ai-services" variant="secondary-on-dark">
            See What We Build
          </Button>
        </div>

        <p className="mt-8 text-body-sm text-text-on-dark-muted">
          Or email us directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-cyan underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Reveal>
    </Section>
  )
}
