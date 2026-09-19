import type { ReactNode } from 'react'
import { m, useReducedMotion, type Variants } from 'framer-motion'

/**
 * Fade + 20px slide-up as the element scrolls into view. Every duration on the
 * page stays under 400ms — this should feel snappy, not sluggish.
 */
const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article' | 'header'
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = m[as]

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.38, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Wraps a group of siblings so each child reveals 0.1s after the one before it.
 * Pair with <StaggerItem>.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
}

export function Stagger({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = m[as]

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = m[as]

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  )
}
