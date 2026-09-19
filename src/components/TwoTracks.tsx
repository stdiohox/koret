import { Check } from 'lucide-react'
import { TRACKS } from '../data/content'
import { Eyebrow, Section } from './Section'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function TwoTracks() {
  return (
    <Section id="services" tone="white" labelledBy="services-heading">
      <Reveal className="max-w-[720px]">
        <Eyebrow>What we do</Eyebrow>
        <h2
          id="services-heading"
          className="mt-4 text-heading font-bold text-black md:text-heading-lg"
        >
          Two tracks. One team.
        </h2>
        <p className="mt-5 text-body text-text-muted md:text-subheading md:leading-[1.5]">
          Most companies buy these separately and spend the first month of every
          project explaining one to the other. Here they share a room.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
        {TRACKS.map((track) => (
          <StaggerItem
            key={track.id}
            as="article"
            className="flex flex-col rounded-cards border border-border bg-white p-8 shadow-card"
          >
            <div className="flex items-center gap-3">
              <Eyebrow>{track.eyebrow}</Eyebrow>
              {track.isNew && (
                <span className="rounded-buttons bg-cyan-whisper px-2.5 py-1 text-caption font-semibold uppercase tracking-[0.1em] text-navy">
                  New
                </span>
              )}
            </div>

            <h3 className="mt-4 text-heading-sm font-semibold text-black">
              {track.title}
            </h3>
            <p className="mt-3 text-body-sm text-text-muted">
              {track.description}
            </p>

            <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-7">
              {track.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    aria-hidden="true"
                    className={`mt-0.5 shrink-0 ${
                      track.isNew ? 'text-orange-ink' : 'text-teal'
                    }`}
                  />
                  <span className="text-body-sm font-medium text-black">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
