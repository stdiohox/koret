/**
 * Koret wordmark.
 *
 * TODO: replace with the official logo SVG. These are the PNGs from the brand
 * folder — they render correctly but will soften on high-DPI displays and at
 * large sizes. An SVG would also drop ~40KB per variant off the page weight.
 */

export function Wordmark({
  tone = 'light',
  className = '',
}: {
  /** 'light' = for light backgrounds (blue mark). 'dark' = for navy/black. */
  tone?: 'light' | 'dark'
  className?: string
}) {
  const src =
    tone === 'dark'
      ? '/assets/koret-wordmark-light.png'
      : '/assets/koret-wordmark-blue.png'

  return (
    <img
      src={src}
      alt="Koret"
      width={128}
      height={32}
      className={`h-7 w-auto ${className}`}
    />
  )
}

/**
 * The rotated-square glyph from the brand PDF's repeating ticker pattern.
 * Used as a bullet accent between the wordmark and the tagline.
 */
export function DiamondGlyph({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-1.5 rotate-45 ${className}`}
    />
  )
}
