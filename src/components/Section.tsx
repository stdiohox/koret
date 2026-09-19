import type { ReactNode } from 'react'

type Tone = 'white' | 'cloud' | 'navy' | 'navy-deep' | 'black'

const TONE_CLASS: Record<Tone, string> = {
  white: 'bg-white text-black',
  cloud: 'bg-cloud text-black',
  navy: 'bg-navy text-white on-dark',
  'navy-deep': 'bg-navy-deep text-white on-dark',
  black: 'bg-black text-white on-dark',
}

type SectionProps = {
  id?: string
  tone?: Tone
  children: ReactNode
  className?: string
  /** Renders a <footer> instead of a <section>. */
  as?: 'section' | 'footer'
  labelledBy?: string
}

/**
 * The page's background rhythm: white → cloud → navy → white, per the
 * section order. `--section-gap-*` is 56px mobile / 96px desktop.
 */
export function Section({
  id,
  tone = 'white',
  children,
  className = '',
  as = 'section',
  labelledBy,
}: SectionProps) {
  const Tag = as
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`${TONE_CLASS[tone]} py-14 md:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-page px-6 md:px-10">{children}</div>
    </Tag>
  )
}

/** Small uppercase label that opens most sections. */
export function Eyebrow({
  children,
  tone = 'light',
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
}) {
  return (
    <p
      className={`text-caption font-semibold uppercase tracking-[0.14em] ${
        tone === 'dark' ? 'text-cyan' : 'text-teal'
      }`}
    >
      {children}
    </p>
  )
}
