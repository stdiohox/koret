import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function useScrollTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.35'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.94, 1]);

  return { ref, rotateX, scale };
}
