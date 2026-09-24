# Koret landing page

Single-page marketing site for Koret — the brand-marketing practice and the new AI/automation
vertical presented as one offering.

Vite + React 18 + TypeScript, Tailwind CSS v4, Framer Motion, lucide-react. No backend.

```
index.html          head, meta, OG, Organization + Service JSON-LD
src/
  index.css         the whole design system: @theme tokens, base styles, focus rings
  App.tsx           section order
  data/content.ts   every string on the page, and the FAQ array the schema is built from
  components/       one file per section, plus Section / Reveal / Button / Wordmark
public/
  assets/           brand logo PNGs
  robots.txt        crawl surface
  sitemap.xml       single URL — update lastmod on material edits
legacy/             the previous violet static build, kept for reference
BRAND.md            tokens, the contrast findings, and where the spec was adjusted
SEO.md              keyword map, what is implemented, launch checklist
```

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # serve dist/
```

## What replaced what

This supersedes the previous build, which cloned the Lightdash reference on a violet palette and
deliberately used none of Koret's brand colours. That version is in `legacy/` and is no longer
wired to anything. Its open question — *"the Koret brand palette is not on this page, pick one of
three ways out"* — is answered here: the brand palette **is** the system now.

Carried forward from it: the six service descriptions, the two-audience framing, the footer link
structure, `robots.txt`, `sitemap.xml` and the logo files. **Not** carried forward: the invented
client names, the mock case-study figures and the invented testimonial.

## Before this goes live

1. **Results are placeholders.** Three `[X]` values in `src/data/content.ts`. Replace with verified
   figures or delete the rows. The page states on its face that they are placeholders, so shipping
   as-is is honest but pointless.
2. **Client logos are placeholders.** Six dashed slots in `src/components/TrustStrip.tsx`. Each
   real logo needs its own descriptive `alt` — "Acme Logistics logo", not "client logo".
3. **Read the five FAQ answers.** Every one is a promise about how Koret operates — the confidence
   threshold, escalation to a person, the audit log, the no-obligation consultation. Correct
   anything that is not true. The `FAQPage` schema is generated from that same array, so fixing the
   copy fixes the schema automatically.
4. **Domain.** `https://koret.agency/` is a placeholder in the canonical, OG tags, all seven schema
   `@id` values, `robots.txt` and `sitemap.xml`.
5. **Contact.** `koretconsult@outlook.com`, set in `src/components/ContactForm.tsx` and the `index.html` schema.
6. **Enquiry form → Google Sheet.** Set `VITE_FORM_ENDPOINT` to the Apps Script web app URL; setup in
   `scripts/google-sheets/README.md`. Until it is set, the form falls back to opening a pre-filled email.
7. **OG image.** `og:image` points at `/assets/og-image.png`, which does not exist yet. Needs a real
   1200×630.
8. **Logo.** Real brand PNGs are in use. An SVG would be sharper and ~40KB lighter per variant.

## Accessibility

Verified, not assumed — the numbers and the two places the brief's colour spec had to be adjusted
for contrast are in `BRAND.md`. Summary: black-on-cyan passes at 11:1; brand orange fails on white
and so has a darkened `--color-orange-ink` variant for text and icons on light grounds; the focus
ring is navy-plus-cyan-glow rather than cyan alone, because cyan alone is 1.9:1 on white.

The FAQ accordion is a native `<button>` with `aria-expanded` and `aria-controls`, confirmed
toggling correctly under keyboard focus. There is a skip link, one `h1`, one `h2` per section, and
no image without `alt`.

## Checked at build time

No horizontal overflow at 390px, 820px or 1440px; every scroll reveal completes; with
`prefers-reduced-motion` forced, nothing is left at opacity 0.
