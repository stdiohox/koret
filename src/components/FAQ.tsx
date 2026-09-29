'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from './ui/badge';

// Registered at module scope, not in an effect: useGSAP runs inside a layout effect, which
// fires BEFORE useEffect — so registering there left ScrollTrigger unregistered at the
// moment the timeline was built, and the `scrollTrigger` config was silently dropped (no
// pin-spacer, timeline just played on a clock). Verified in-browser both ways.
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const data: FAQItem[] = [
  {
    id: 1,
    question: 'How much does it cost?',
    answer:
      'Every project is fixed-fee, and you get the price in writing before any work starts — so there are no surprise bills. Ongoing support is a simple monthly retainer.',
  },
  {
    id: 2,
    question: "I'm not sure what I need. Can you still help?",
    answer:
      "Yes — that's what the free 30-minute call is for. Tell us what's eating your time or holding you back, and we'll tell you what's worth fixing first. You leave with a clear next step, whether or not we work together.",
  },
  {
    id: 3,
    question: 'Do I need to be technical?',
    answer: 'Not at all. You tell us the result you want; we handle the build and explain everything in plain English.',
  },
  {
    id: 4,
    question: 'Will this work with the tools I already use?',
    answer:
      'Almost always. We connect to what you already have — your email, calendar, WhatsApp, forms, spreadsheets and CRM — instead of making you start over.',
  },
  {
    id: 5,
    question: 'Do you only do AI, or branding too?',
    answer:
      'Both, as one team: AI automation, consulting, and brand building (positioning, logo and visual identity, website, content). One plan, one point of contact.',
  },
  {
    id: 6,
    question: 'What happens after launch?',
    answer:
      "We don't disappear. We keep an eye on how everything is performing, fix anything that needs fixing, and suggest what to improve next.",
  },
];

// Scroll distance the pin is held for. ScrollTrigger's default pinSpacing adds this on
// top of the element's own height when it builds the pin-spacer, so the container itself
// must NOT also reserve it — it just needs its natural content height.
const pinDistance = data.length * 200;

export default function FAQ() {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || data.length === 0 || reduceMotion) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${pinDistance}`,
        scrub: 0.3,
        pin: true,
        markers: false,
      },
    });

    data.forEach((item, index) => {
      tl.add(() => {
        setOpenItem(item.id.toString());
      }, index * 2);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      id="faq"
      className={cn('max-w-4xl mx-auto text-center px-4', reduceMotion ? 'py-24' : 'py-16')}
    >
      <div className="flex flex-col items-center gap-4 mb-10">
        <Badge variant="outline">Common Questions</Badge>
        <h2 className="text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
          Questions We Get Asked Most
        </h2>
        <p style={{ color: 'var(--color-dock-slate)' }}>
          Straight answers. If yours isn't here, ask us on the free call.
        </p>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ''}
        onValueChange={(value) => setOpenItem(value || null)}
      >
        {data.map((item) => {
          const isOpen = openItem === item.id.toString();
          return (
            <Accordion.Item value={item.id.toString()} key={item.id} className="mb-6">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4 cursor-pointer">
                  <div
                    className="relative flex items-center space-x-2 rounded-xl p-3 transition-colors"
                    style={{
                      backgroundColor: isOpen ? 'var(--color-surface-ivory)' : 'var(--color-canvas-cream)',
                      border: isOpen ? '1px solid var(--color-dock-hairline)' : '1px solid transparent',
                      color: 'var(--color-ink-charcoal)',
                    }}
                  >
                    <span className="font-medium text-left">{item.question}</span>
                  </div>
                  <span style={{ color: 'var(--color-koret-cyan)' }}>
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content asChild forceMount>
                <motion.div
                  initial="collapsed"
                  animate={isOpen ? 'open' : 'collapsed'}
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="flex justify-end ml-7 mt-4 md:ml-16">
                    <div
                      className="relative max-w-md rounded-2xl px-4 py-2 text-lg text-left"
                      style={{
                        backgroundColor: 'var(--color-surface-ivory)',
                        border: '1px solid var(--color-dock-hairline)',
                        color: 'var(--color-ink-charcoal)',
                      }}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
