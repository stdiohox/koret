# Koret design system

The page runs on **Koret's own brand palette**, with three reference systems blended onto it:
Lightdash's type and spacing backbone, Customer.io's dark/light section rhythm and glow-CTA
pattern, and Shade's hard-offset accent shadow.

Every token lives in one place: the `@theme` block in `src/index.css`. Tailwind v4 generates
utilities straight from it, so `--color-teal` is what makes `text-teal` work. Changing a token
changes the page; there is no second copy anywhere.

> **This replaces the previous violet Lightdash-clone build.** That version is preserved in
> `legacy/` (`index.html`, `styles.css`, `main.js`). The open question its BRAND.md recorded —
> "the Koret brand palette is not on this page, pick one of three ways out" — is now answered:
> the brand palette is the system, and violet is gone.

## Colour

### Brand (from the brand guide — unaltered)

| Token | Value | Role |
| --- | --- | --- |
| `--color-cyan` | `#00CCFF` | Primary interactive accent, CTA fill, focus glow |
| `--color-navy` | `#00419B` | Dark section background, secondary brand colour |
| `--color-black` | `#000000` | Primary text on light backgrounds |
| `--color-white` | `#FFFFFF` | Canvas |
| `--color-teal` | `#03857A` | Headline keyword, icons, eyebrows, hard-offset shadow |
| `--color-orange` | `#FD7F00` | Headline keyword, accent icons, accent button offset |

### Supporting neutrals (derived — not in the brand guide)

| Token | Value | Role |
| --- | --- | --- |
| `--color-navy-deep` | `#002D6E` | Final-CTA background, the deepest tier |
| `--color-cloud` | `#F4F8FB` | Alternate light band |
| `--color-cyan-whisper` | `#E8FBFF` | Soft accent wash (hero glow, "New" badge) |
| `--color-border` | `#E1E8F0` | Every hairline on light sections |
| `--color-text-muted` | `#4A5568` | Secondary body text on light |
| `--color-text-on-dark-muted` | `#A9C4E0` | Secondary text on navy |
| `--color-orange-ink` | `#B85C00` | **See the contrast note below** |

## The contrast work, and the one place the brand colour had to be adjusted

Measured against WCAG 2.2 AA:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Black on cyan (primary button) | **11.1:1** | Passes. The brief worried this might fail — it does not, comfortably. Black text stayed. |
| White on navy | 9.4:1 | Passes |
| `--color-text-on-dark-muted` on navy | 5.2:1 | Passes |
| `--color-text-muted` on white | 7.5:1 | Passes |
| Teal on white | 4.5:1 | Passes, normal text |
| **Orange `#FD7F00` on white** | **2.6:1** | **Fails** — misses AA text (4.5:1) and even the 3:1 bar for large text and icons |
| Orange on navy | 3.7:1 | Passes the 3:1 bar for large text and icons |
| Teal on navy | 2.1:1 | Fails |

Two consequences:

1. **`--color-orange-ink` (`#B85C00`, 4.6:1 on white) exists.** The brand orange is untouched and
   still used for fills, the accent-button offset, and icons on navy. But wherever orange has to be
   *text or an icon on a light background* — the "Scale" keyword in the hero, the AI-track
   checkmarks — it uses `--color-orange-ink`. Publishing `#FD7F00` as body-adjacent text on white
   would be an accessibility failure, not a style choice.
2. **On the navy AI-services section, cyan takes teal's turn in the icon alternation.** Teal is
   2.1:1 there and effectively invisible. Cyan is 5.0:1.

**Focus rings.** The brief asked for `--glow-cyan` as the focus-visible style. Cyan is only 1.9:1
against white, which fails the 3:1 that focus indicators require. So the ring is a 2px solid navy
outline *carrying the contrast* plus the cyan glow *carrying the brand*. On `.on-dark` sections the
outline flips to white.

## Type

**Onest** (Google Fonts, weights 400–800) carries everything. **Caveat 600** stands in for
**Guthen Jacqueline**, which is a paid marketplace font and was not sourced. It is one variable —
`--font-script` in `src/index.css` — and it is consumed in exactly one place: the footer tagline.

Weight discipline: 700–800 display and headings, 600 subheadings and nav, 400–500 body.

| Role | Size | Line height | Tracking |
| --- | --- | --- | --- |
| Display | 72px | 1.05 | -0.03em |
| Heading lg | 48px | 1.1 | -0.03em |
| Heading | 32px | 1.2 | -0.03em |
| Heading sm | 24px | 1.25 | -0.02em |
| Subheading | 20px | 1.3 | — |
| Body | 16px | 1.6 | — |
| Body sm | 14px | 1.6 | — |
| Caption | 12px | 1.5 | — |

The hero is the one responsive exception: **40px under 640px**, 48px from 768px, 72px from 1024px.

## Shape and elevation

- **12px** on cards, **8px** on inputs, **9999px** on buttons only. Never a pill card.
- `--shadow-card` and every shadow is tinted with navy rgba, never neutral grey.
- **`--shadow-cutout` appears on exactly two elements page-wide**, as specified: the "Agentic AI
  Builds" service card, and the final-CTA accent button. Nothing else.

### The two alpha adjustments

The hard-offset shadow is specified at low alpha, which is right on light backgrounds — and
invisible on dark ones. Both of the page's cutout elements happen to sit on dark sections, so both
have an on-dark variant. The originals are still declared and still correct for light grounds:

| Token | Alpha | Why |
| --- | --- | --- |
| `--shadow-cutout` | 0.18 | Spec value. Used on the Why Koret callout (light). |
| `--shadow-cutout-onnavy` | 0.55 | Teal at 0.18 on `#00419B` does not render. Verified by screenshot. |
| `--shadow-cutout-orange` | 0.25 | Spec value, kept for light grounds. |
| `--shadow-cutout-orange-onnavy` | 0.85 | At 0.25 on `#002D6E` it blends to a muddy brown and reads as a plain drop shadow rather than an orange offset. Verified by screenshot. |

## Motion

Framer Motion, every duration **under 400ms**. Section reveals are fade + 20px slide-up, staggered
0.1s across sibling cards. The timeline hairline fills left-to-right as each step arrives. The
primary CTA scales to 1.02 and intensifies its glow ring on hover.

All of it is wrapped in `LazyMotion` with the `domAnimation` feature set in `strict` mode, which
forbids the heavyweight `motion.*` components and keeps ~60KB of unused animation code out of the
bundle. Use `m.div`, not `motion.div`.

`prefers-reduced-motion` is honoured at two levels: `Reveal`/`Stagger`/`Button` check
`useReducedMotion()` and render plain, fully-visible tags; a CSS block collapses any remaining
transition. Verified — with reduced motion forced, zero elements render at opacity 0.

## Logo

`src/components/Wordmark.tsx` uses the real brand PNGs from `public/assets/` — the blue wordmark on
light backgrounds, the light wordmark on navy and black. **TODO: replace with the official SVG.**
The PNGs will soften on high-DPI displays and cost ~40KB each.

The rotated-square glyph from the brand PDF's ticker pattern is reconstructed in CSS as
`DiamondGlyph`, used as a bullet accent in the hero eyebrow and beside the footer tagline.
