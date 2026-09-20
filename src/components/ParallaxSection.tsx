'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const trigger = containerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: '0% 0%',
        end: '100% 0%',
        scrub: 0,
      },
    });

    const layers = [
      { selector: '[data-layer="1"]', yPercent: 70 },
      { selector: '[data-layer="2"]', yPercent: 55 },
      { selector: '[data-layer="3"]', yPercent: 40 },
      { selector: '[data-layer="4"]', yPercent: 10 },
    ];

    layers.forEach((l, idx) => {
      tl.to(trigger.querySelectorAll(l.selector), { yPercent: l.yPercent, ease: 'none' }, idx === 0 ? undefined : '<');
    });

    return () => {
      // Scoped to this timeline's own trigger. ScrollTrigger.getAll().kill() would also
      // destroy the FAQ's pin, which lives on the same page.
      tl.scrollTrigger?.kill();
      gsap.killTweensOf(trigger);
    };
  }, [reduceMotion]);

  return (
    <div ref={containerRef} className="relative h-[100vh] overflow-hidden" style={{ backgroundColor: 'var(--color-canvas-cream)' }}>
      <div
        data-layer="1"
        className="absolute rounded-full blur-3xl"
        style={{
          width: 700, height: 700, top: '-10%', left: '-10%',
          background: 'radial-gradient(circle, rgba(0,204,255,0.35) 0%, rgba(0,204,255,0) 70%)',
        }}
      />
      <div
        data-layer="2"
        className="absolute rounded-full blur-3xl"
        style={{
          width: 600, height: 600, bottom: '-10%', right: '-5%',
          background: 'radial-gradient(circle, rgba(0,65,155,0.3) 0%, rgba(0,65,155,0) 70%)',
        }}
      />
      <div data-layer="3" className="absolute inset-0 flex items-center justify-center px-6">
        <h2
          className="text-4xl md:text-6xl font-semibold text-center max-w-3xl"
          style={{ color: 'var(--color-ink-charcoal)' }}
        >
          Bringing Your Brand to Limelight.
        </h2>
      </div>
      <img
        data-layer="4"
        src="/logo/koret-logo-mark.png"
        alt=""
        className="absolute w-40 h-40 md:w-56 md:h-56 opacity-20"
        style={{ bottom: '8%', left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
}
