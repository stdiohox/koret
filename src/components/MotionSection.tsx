import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

export default function MotionSection({ children, ...props }: HTMLMotionProps<'section'>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
