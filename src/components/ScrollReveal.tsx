'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apple-style "depth emergence": content scales up slightly and fades in as it enters the
 * viewport, scrubbed against scroll position rather than toggled on/off at a threshold.
 *
 * Only `transform` and `opacity` are touched, so it stays GPU-composited. Under reduced
 * motion the element is set to its resting state immediately — never hidden, never stuck
 * mid-transition.
 *
 * Wrap content in this rather than attaching to an element that another system already
 * animates: a GSAP tween and a framer variant writing `transform` to the same node fight.
 */
export default function ScrollReveal({
  children,
  className,
  distance = 28,
  from = 0.97,
}: {
  children: ReactNode;
  className?: string;
  /** px of upward travel */
  distance?: number;
  /** starting scale */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0.35, y: distance, scale: from },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          // Begins as the element clears the fold, completes well before it centres —
          // the reveal should finish before the reader arrives, not while they read.
          start: 'top 88%',
          end: 'top 55%',
          scrub: 0.4,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion, distance, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
