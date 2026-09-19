import { AI_SERVICES } from '../data/content'
import { Eyebrow, Section } from './Section'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function AIServices() {
  return (
    <Section id="ai-services" tone="navy" labelledBy="ai-services-heading">
      <Reveal className="max-w-[720px]">
        <Eyebrow tone="dark">AI &amp; Automation</Eyebrow>
        <h2
          id="ai-services-heading"
          className="mt-4 text-heading font-bold text-white md:text-heading-lg"
        >
          Five things we build, and what each one is actually for.
        </h2>
        <p className="mt-5 text-body text-text-on-dark-muted md:text-subheading md:leading-[1.5]">
          No pilots that never leave the sandbox. Every build ships with a way
          to see what it ran, what it cost, and every case it handed back to a
          person.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {AI_SERVICES.map((service, index) => {
          const Icon = service.icon
          /* Icons alternate between the two brand accents — but teal is only
             2.1:1 against navy, so on this section cyan takes teal's turn. */
          const accent = index % 2 === 0 ? 'text-cyan' : 'text-orange'

          return (
            <StaggerItem
              key={service.id}
              as="article"
              className={`flex flex-col rounded-cards bg-white p-8 ${
                service.highlight
                  ? 'shadow-[var(--shadow-cutout-onnavy)] md:col-span-2 lg:col-span-1'
                  : 'shadow-card'
              }`}
            >
              <Icon
                size={28}
                strokeWidth={1.75}
                aria-hidden="true"
                className={accent}
              />
              <h3 className="mt-5 text-subheading font-semibold text-black">
                {service.title}
              </h3>
              <p className="mt-3 text-body-sm text-text-muted">
                {service.description}
              </p>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
