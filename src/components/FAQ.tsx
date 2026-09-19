import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../data/content'
import { Eyebrow, Section } from './Section'
import { Reveal } from './Reveal'

/** Generated from the same array that renders the accordion, so the schema
 *  always describes what is actually on the page. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://koret.agency/#faq',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <Section id="faq" tone="cloud" labelledBy="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-heading"
            className="mt-4 text-heading font-bold text-black md:text-heading-lg"
          >
            Questions we get asked first.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="divide-y divide-border border-y border-border">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`

              return (
                <div key={faq.question}>
                  <dt>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-subheading font-semibold leading-[1.3] text-black">
                        {faq.question}
                      </span>
                      <m.span
                        aria-hidden="true"
                        animate={
                          reduceMotion ? undefined : { rotate: isOpen ? 45 : 0 }
                        }
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="mt-0.5 shrink-0 text-teal"
                      >
                        <Plus size={22} strokeWidth={2} />
                      </m.span>
                    </button>
                  </dt>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.dd
                        id={panelId}
                        aria-labelledby={buttonId}
                        initial={
                          reduceMotion ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[60ch] pb-6 pr-10 text-body text-text-muted">
                          {faq.answer}
                        </p>
                      </m.dd>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
