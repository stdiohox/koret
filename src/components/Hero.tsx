import { m, useReducedMotion } from 'framer-motion'
import { Button } from './Button'
import { DiamondGlyph } from './Wordmark'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.38, ease: EASE, delay },
        }

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white pb-16 pt-16 md:pb-24 md:pt-24"
    >
      {/* Soft cyan wash behind the headline. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[820px] max-w-[130%] -translate-x-1/2 rounded-full bg-cyan-whisper blur-[90px]"
      />

      <div className="relative mx-auto flex w-full max-w-page flex-col items-center px-6 text-center md:px-10">
        <m.p
          {...rise(0)}
          className="inline-flex items-center gap-2.5 rounded-buttons border border-border bg-white px-4 py-2 text-caption font-semibold uppercase tracking-[0.12em] text-navy"
        >
          <DiamondGlyph className="bg-orange" />
          Marketing + AI, Under One Roof
        </m.p>

        <m.h1
          {...rise(0.08)}
          id="hero-heading"
          className="mt-7 max-w-[900px] text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-black md:text-heading-lg lg:text-display"
        >
          Brands That <span className="text-teal">Tell Stories</span>. Systems
          That <span className="text-orange-ink">Scale</span> Them.
        </m.h1>

        <m.p
          {...rise(0.16)}
          className="mt-6 max-w-[640px] text-body text-text-muted md:text-subheading md:leading-[1.5]"
        >
          Koret builds the brand strategy that makes people care — and the AI
          infrastructure that makes your business run itself. From campaigns to
          code, we bring your brand to limelight.
        </m.p>

        <m.div
          {...rise(0.24)}
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button href="#contact" className="w-full sm:w-auto">
            Start Your Project
          </Button>
          <Button
            href="#ai-services"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            See What We Build
          </Button>
        </m.div>
      </div>
    </section>
  )
}
