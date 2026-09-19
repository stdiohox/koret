import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'secondary-on-dark' | 'accent'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-buttons font-semibold text-body px-7 py-3.5 transition-shadow duration-200 no-underline'

const VARIANTS: Record<Variant, string> = {
  /* Black on cyan measures 11:1 — comfortably past AA, so the brand's own
     black text stays on the primary CTA. */
  primary: 'bg-cyan text-black hover:shadow-[var(--glow-cyan)]',
  secondary:
    'bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy/5',
  'secondary-on-dark':
    'bg-transparent text-white border-[1.5px] border-white/45 hover:bg-white/10',
  /* Used exactly once, on the final CTA. The orange hard offset is a deliberate
     one-off, not a repeated pattern. */
  accent: 'bg-black text-white shadow-[var(--shadow-cutout-orange-onnavy)]',
}

type ButtonProps = {
  children: ReactNode
  href: string
  variant?: Variant
  className?: string
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <m.a
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </m.a>
  )
}
