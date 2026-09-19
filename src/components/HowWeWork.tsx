import { m, useReducedMotion } from 'framer-motion'
import { PROCESS_STEPS } from '../data/content'
import { Eyebrow, Section } from './Section'
import { Reveal } from './Reveal'

const EASE = [0.22, 1, 0.36, 1] as const

export function HowWeWork() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="how-we-work" tone="cloud" labelledBy="how-we-work-heading">
      <Reveal className="max-w-[720px]">
        <Eyebrow>How we work</Eyebrow>
        <h2
          id="how-we-work-heading"
          className="mt-4 text-heading font-bold text-black md:text-heading-lg"
        >
          Four steps, and you own what comes out.
        </h2>
      </Reveal>

      <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
        {PROCESS_STEPS.map((step, index) => {
          const isLast = index === PROCESS_STEPS.length - 1

          return (
            <li key={step.number} className="relative">
              <div className="flex items-center">
                <m.span
                  initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.38,
                    ease: EASE,
                    delay: index * 0.1,
                  }}
                  className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-white text-body-sm font-bold text-navy shadow-card"
                >
                  {step.number}
                </m.span>

                {/* Connecting hairline. Fills left-to-right as each step arrives.
                    Only drawn on the widest breakpoint, where the four steps
                    actually sit in one row. */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="ml-4 hidden h-px flex-1 bg-border lg:block"
                  >
                    <m.div
                      initial={reduceMotion ? undefined : { scaleX: 0 }}
                      whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                        delay: index * 0.1 + 0.15,
                      }}
                      className="h-px w-full origin-left bg-teal"
                    />
                  </div>
                )}
              </div>

              <Reveal delay={index * 0.1 + 0.05}>
                <h3 className="mt-6 text-subheading font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-body-sm text-text-muted">
                  {step.description}
                </p>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
