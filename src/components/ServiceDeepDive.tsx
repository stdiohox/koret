'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Zap, Globe, GitBranch, Rocket, Compass } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';

const tabs = [
  {
    value: 'automation',
    icon: <Zap className="h-auto w-4 shrink-0" />,
    label: 'Automation',
    content: {
      badge: 'Save Hours Every Week',
      title: 'Stop doing by hand what a workflow can do for you.',
      description:
        "We map your repetitive tasks — lead follow-ups, data entry, status updates — and replace them with automations that run in the background. You keep the oversight, we remove the manual work.",
      buttonText: 'See Automation Examples',
    },
  },
  {
    value: 'web',
    icon: <Globe className="h-auto w-4 shrink-0" />,
    label: 'Website & Web Apps',
    content: {
      badge: 'Built to Convert',
      title: 'A site that works as hard as your sales team.',
      description:
        'Fast, on-brand websites and custom web apps, built with the same attention to conversion as your campaigns. No template feel — every build matches your brand system exactly.',
      buttonText: 'View Our Builds',
    },
  },
  {
    value: 'workflow',
    icon: <GitBranch className="h-auto w-4 shrink-0" />,
    label: 'Workflow Systems',
    content: {
      badge: 'Connected, Not Siloed',
      title: 'Your tools should talk to each other.',
      description:
        "We connect your CRM, forms, email, and chat into one pipeline, so a lead that comes in on one channel doesn't get lost before it reaches another. Fewer handoffs, fewer dropped threads.",
      buttonText: 'Map Your Workflow',
    },
  },
  {
    value: 'agentic',
    icon: <Rocket className="h-auto w-4 shrink-0" />,
    label: 'Agentic AI Builds',
    content: {
      badge: 'Always On',
      title: 'An agent that actually does the work, not just answers questions.',
      description:
        'We build AI agents that qualify leads, respond to customers, and take real action — booking calls, updating records, following up — without waiting on a human to press go.',
      buttonText: 'See an Agent in Action',
    },
  },
  {
    value: 'consultation',
    icon: <Compass className="h-auto w-4 shrink-0" />,
    label: 'AI Consultation',
    content: {
      badge: 'Where to Start',
      title: "Not sure where automation actually pays off? We'll show you.",
      description:
        'A stack audit, a prioritized roadmap, and ROI modeling — so you invest in the automation that moves the needle first, not just what sounds impressive.',
      buttonText: 'Book a Consultation',
    },
  },
];

export default function ServiceDeepDive() {
  const reduceMotion = useReducedMotion();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });

  return (
    <MotionSection id="ai-agency" className="relative overflow-hidden py-24 px-4 md:px-8">

      {/* Brand-colour wash. Mirrored from AIServicesGrid's (cyan top-right / navy
          bottom-left) so the two adjacent sections don't read as the same graphic twice. */}
      <div ref={blobRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 560,
            height: 560,
            top: '10%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(0,204,255,0.25) 0%, rgba(0,204,255,0) 70%)',
          }}
          animate={
            reduceMotion || !isInView
              ? undefined
              : { x: [0, 20, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.04, 0.97, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 520,
            height: 520,
            bottom: '5%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(0,65,155,0.2) 0%, rgba(0,65,155,0) 70%)',
          }}
          animate={
            reduceMotion || !isInView
              ? undefined
              : { x: [0, -20, 15, 0], y: [0, 15, -20, 0], scale: [1, 0.96, 1.05, 1] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Our Services, In Depth</Badge>
          <h2
            className="max-w-2xl text-3xl font-semibold md:text-4xl"
            style={{ color: 'var(--color-ink-charcoal)' }}
          >
            Five Ways We Move Your Brand Forward
          </h2>
          <p style={{ color: 'var(--color-dock-slate)' }}>
            Click a service below to see how it works — five ways, one system.
          </p>
        </div>

        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors text-[var(--color-dock-slate)] data-[state=active]:bg-[var(--color-surface-ivory)] data-[state=active]:text-[var(--color-ink-charcoal)]"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div
            className="mx-auto mt-8 max-w-screen-xl rounded-2xl p-6 lg:p-16"
            style={{ backgroundColor: 'var(--color-surface-ivory)', border: '1px solid var(--color-dock-hairline)' }}
          >
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
                    {tab.content.title}
                  </h3>
                  <p className="lg:text-lg" style={{ color: 'var(--color-dock-slate)' }}>
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                {/* Gradient stays on the wrapper so the panel degrades to the brand wash
                    while the video loads — or if the file is missing — rather than a void. */}
                <div
                  className="w-full aspect-square max-w-[320px] rounded-xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(0,204,255,0.15), rgba(0,65,155,0.1))' }}
                >
                  <video
                    src={`/services/${tab.value}.mp4`}
                    poster={`/services/${tab.value}-poster.jpg`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </MotionSection>
  );
}
