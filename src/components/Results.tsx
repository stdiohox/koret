import { RESULTS } from '../data/content'
import { Eyebrow, Section } from './Section'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function Results() {
  return (
    <Section id="results" tone="white" labelledBy="results-heading">
      <Reveal className="max-w-[720px]">
        <Eyebrow>Results</Eyebrow>
        <h2
          id="results-heading"
          className="mt-4 text-heading font-bold text-black md:text-heading-lg"
        >
          Campaigns that earned their spend. Systems that earned their keep.
        </h2>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-3 md:mt-16 md:gap-8">
        {RESULTS.map((result) => (
          <StaggerItem
            key={result.label}
            className="rounded-cards border border-border bg-white p-8 shadow-card"
          >
            <p className="text-heading font-bold tracking-[-0.03em] text-navy md:text-heading-lg">
              {result.value}
            </p>
            <p className="mt-3 text-body-sm text-text-muted">{result.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <p className="mt-8 text-body-sm text-text-muted">
          <span className="font-semibold text-black">
            Placeholder figures.
          </span>{' '}
          Each <code className="font-mono text-orange-ink">[X]</code> is waiting
          on a verified number from a real engagement — see{' '}
          <code className="font-mono">src/data/content.ts</code>.
        </p>
      </Reveal>
    </Section>
  )
}
