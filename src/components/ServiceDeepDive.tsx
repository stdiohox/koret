'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Zap, Globe, GitBranch, Rocket, Compass, ArrowRight } from 'lucide-react';
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
        <div className="flex flex-col gap-16">
          <div className="lg:max-w-sm">
            <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6" style={{ color: 'var(--color-ink-charcoal)' }}>
              Five Ways We Move Your Brand Forward
            </h2>
            <p className="mb-8 lg:text-lg" style={{ color: 'var(--color-dock-slate)' }}>
              Here's how each one works — automation, web and app builds, workflow systems, agentic AI, and consultation, all under one team.
            </p>
            <a
              href="#final-cta"
              className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
              style={{ color: 'var(--color-ink-charcoal)' }}
            >
              Book a Consultation
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {tabs.map((tab) => (
              // h-full on both wrapper and card so the reveal wrapper doesn't stop the
              // cards in a row from matching heights — same pattern as AIServicesGrid.
              <ScrollReveal key={tab.value} className="h-full">
                <div
                  className="h-full flex flex-col overflow-clip rounded-xl"
                  style={{ border: '1px solid var(--color-dock-hairline)', backgroundColor: 'var(--color-pure-white)' }}
                >
                  {/* min-h-0 is load-bearing, not tidying. This wrapper is a flex item of
                      the card's flex-col, so it carries `min-height: auto`, whose automatic
                      minimum is the content-based minimum — the poster's intrinsic 1080x1920
                      scaled to the wrapper's width. At 622px wide that floor is 1106px, and
                      it outvoted `aspect-square`'s preferred 622px: measured height was
                      1105.77px on all five cards, ratio 0.563 (= 1080/1920) rather than 1:1.
                      Removing the floor lets the aspect-ratio win at every width, with no
                      hardcoded pixel height to keep in sync with the breakpoints. */}
                  <div className="aspect-square w-full min-h-0 relative">
                    <ServiceVideo src={`/services/${tab.value}.mp4`} poster={`/services/${tab.value}-poster.jpg`} />
                    {/* Navy scrim, heaviest at the bottom edge. The five clips are lit and
                        colour-graded differently; this pulls them onto a common base so the
                        row doesn't read as five unrelated stock assets. */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,65,155,0.55) 0%, rgba(0,65,155,0.05) 45%, rgba(0,65,155,0) 70%)',
                      }}
                    />
                  </div>
                  <div className="px-6 py-8 md:px-8 md:py-10">
                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl" style={{ color: 'var(--color-ink-charcoal)' }}>
                      {tab.content.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-dock-slate)' }}>
                      {tab.content.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
