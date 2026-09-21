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
    question: 'Do you only do AI, or branding and strategy too?',
    answer:
      'All three, as one team — AI automation and workflow systems, business and operations consulting, and brand building (positioning, identity, website, content). No juggling three separate vendors.',
  },
  {
    id: 2,
    question: 'Do I need to be technical to work with your AI team?',
    answer: 'No. We handle the build; you tell us the outcome you want.',
  },
  {
    id: 3,
    question: 'Can you automate an existing workflow, or does it have to be new?',
    answer: 'Both. We regularly plug automation into tools businesses already use.',
  },
  {
    id: 4,
    question: 'What\'s an "agentic build"?',
    answer:
      "An AI agent that doesn't just answer questions — it takes action: qualifying a lead, booking a call, updating a record, following up.",
  },
  {
    id: 5,
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes — through consultation and managed automation support.',
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
          Frequently Asked Questions
        </h2>
        <p style={{ color: 'var(--color-dock-slate)' }}>
          Find answers to common questions about how we work.
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
