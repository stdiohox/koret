'use client';

import React from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { Badge } from './ui/badge';
import MotionSection from './MotionSection';

interface CardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
  rotate?: string;
  colors: { bg: string; text: string; border: string; pin: string };
}

const Pin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({ number, title, description, className, rotate, colors }: CardProps) => (
  <div className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}>
    <div className="bg-white p-2 rounded-[25px] shadow-[0px_10px_20px_0px_#D3D3D3] border border-neutral-100">
      <Pin className={`w-8 h-8 ${colors.pin} z-20 mb-6 mx-auto`} />
      <div className={`${colors.bg} border ${colors.border} rounded-[15px] p-[15px] h-full flex flex-col relative overflow-hidden`}>
        <span
          className={`${colors.text} text-4xl font-bold mb-5`}
          style={{ fontFamily: 'var(--font-inter-display)' }}
        >
          {number}
        </span>
        <h3 className="text-2xl font-semibold text-neutral-800 leading-none mb-[10px]">{title}</h3>
        <p className="text-neutral-500 text-sm/5 tracking-tight">{description}</p>
      </div>
    </div>
  </div>
);

const steps = [
  { title: 'Discover', description: 'We learn your brand, your bottlenecks, and your goals.', colors: { bg: 'bg-[rgba(0,204,255,0.10)]', text: 'text-[var(--color-koret-navy)]', border: 'border-[rgba(0,204,255,0.25)]', pin: 'text-[#00CCFF]' } },
  { title: 'Design', description: 'Strategy and system architecture, mapped together.', colors: { bg: 'bg-[rgba(0,65,155,0.08)]', text: 'text-[var(--color-koret-navy)]', border: 'border-[rgba(0,65,155,0.2)]', pin: 'text-[var(--color-koret-navy)]' } },
  { title: 'Build', description: 'Campaigns launch, workflows deploy, agents go live.', colors: { bg: 'bg-[rgba(3,133,122,0.08)]', text: 'text-[#03857A]', border: 'border-[rgba(3,133,122,0.2)]', pin: 'text-[#03857A]' } },
  { title: 'Scale', description: "We monitor, refine, and expand what's working.", colors: { bg: 'bg-[rgba(253,127,0,0.08)]', text: 'text-[var(--color-koret-navy)]', border: 'border-[rgba(253,127,0,0.22)]', pin: 'text-[#FD7F00]' } },
];

const positions = [
  { className: 'md:absolute md:top-0 md:left-[15%]', rotate: 'rotate-8' },
  { className: 'md:absolute md:top-[120px] md:right-[15%]', rotate: '-rotate-8' },
  { className: 'md:absolute md:top-[450px] md:left-[15%]', rotate: 'rotate-8' },
  { className: 'md:absolute md:top-[570px] md:right-[10%]', rotate: '-rotate-8' },
];

const height = 900;

export default function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  const pathD = "M 290 150 C 500 150, 550 270, 710 270 C 850 270, 500 350, 290 450 C 290 600, 550 720, 750 720";

  return (
    <MotionSection id="process">
      <LazyMotion features={domAnimation}>
        <div className="max-md:pt-10 max-md:pb-25 md:py-20 px-8 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[var(--color-canvas-cream)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[var(--color-canvas-cream)]" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <Badge variant="outline">Our Process</Badge>
              <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
                Simple to Start, Built to Scale
              </h2>
              <p style={{ color: 'var(--color-dock-slate)' }}>
                Four steps from first conversation to a system that runs itself.
              </p>
            </div>

            {/* md:h-[var(--md-height)] consumes the variable declared below. Without it the
                container is h-auto with only absolutely-positioned children at md+, so it
                collapses to 0 and the cards overflow into the next section. */}
            <div
              className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
              style={{ '--md-height': `${height}px` } as React.CSSProperties}
            >
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                <m.path
                  d={pathD}
                  stroke="currentColor"
                  className="text-neutral-300"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ strokeDashoffset: 0 }}
                  animate={reduceMotion ? undefined : { strokeDashoffset: -140 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              {steps.map((step, index) => (
                <Card
                  key={step.title}
                  number={`${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colors={step.colors}
                  rotate={positions[index].rotate}
                  className={positions[index].className}
                />
              ))}
            </div>
          </div>
        </div>
      </LazyMotion>
    </MotionSection>
  );
}
