'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Zap, Globe, GitBranch, Rocket, Compass } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';
import { useParallax } from '@/hooks/useParallax';

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

// One observer per video: with all five cards mounted at once, `preload="none"` keeps the
// bytes off the wire until a card is near the viewport, and play/pause on visibility means
// at most the on-screen clips are decoding rather than all five at once.
function ServiceVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(videoRef, { margin: '100px' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      preload="none"
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
}

export default function ServiceDeepDive() {
  const reduceMotion = useReducedMotion();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });
  const washRef = useParallax<HTMLDivElement>(0.18);

  return (
    <MotionSection id="ai-agency" className="relative overflow-hidden py-24 px-4 md:px-8">

      {/* Brand-colour wash. Mirrored from AIServicesGrid's (cyan top-right / navy
          bottom-left) so the two adjacent sections don't read as the same graphic twice. */}
      <div ref={blobRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div ref={washRef} className="absolute inset-0">
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Our Services, In Depth</Badge>
          <h2 className="max-w-2xl text-[clamp(1.75rem,1.2rem+2.2vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.02em]" style={{ color: 'var(--color-ink-charcoal)' }}>
            Five Ways We Move Your Brand Forward
          </h2>
          <p style={{ color: 'var(--color-dock-slate)' }}>
            Here's how each one works.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {tabs.map((tab) => (
            <ScrollReveal key={tab.value}>
            <div
              className="card-lift rounded-2xl p-6 lg:p-16 grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10"
              style={{ backgroundColor: 'var(--color-surface-ivory)', border: '1px solid var(--color-dock-hairline)' }}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2" style={{ color: 'var(--color-dock-slate)' }}>
                  {tab.icon}
                  <span className="text-sm font-semibold">{tab.label}</span>
                </div>
                <Badge variant="outline" className="w-fit">{tab.content.badge}</Badge>
                <h3 className="text-[clamp(1.5rem,1.1rem+1.7vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-ink-charcoal)' }}>
                  {tab.content.title}
                </h3>
                <p className="lg:text-lg" style={{ color: 'var(--color-dock-slate)' }}>
                  {tab.content.description}
                </p>
                <Button className="mt-2.5 w-fit gap-2" size="lg">{tab.content.buttonText}</Button>
              </div>
              <div className="w-full aspect-square max-w-[320px] rounded-xl overflow-hidden">
                <ServiceVideo src={`/services/${tab.value}.mp4`} poster={`/services/${tab.value}-poster.jpg`} />
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
