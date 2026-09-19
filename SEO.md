# Koret homepage: SEO map

One page, one primary intent: **someone looking to hire an AI automation agency, or a marketing
agency that can also build the systems.** Everything on the page supports that intent rather than
competing with it.

## Keyword map

| Priority | Keyword theme | Where it lands |
| --- | --- | --- |
| Primary | AI automation agency | Title, meta description, FAQ 1, AI services H2 |
| Primary | marketing + AI agency | Hero eyebrow, hero subhead, Why Koret H2 |
| Secondary | agentic AI builds / AI agent development | Service card + `Service` node, FAQ 4 |
| Secondary | workflow automation | Service card + `Service` node, footer link |
| Secondary | business process automation | Service card, footer link, track list |
| Secondary | web app development | Service card + `Service` node, footer link |
| Secondary | website development | Service card, footer link |
| Secondary | AI consulting | Service card + `Service` node, FAQ 5, footer link |
| Supporting | brand strategy, paid media, campaign | Brand track list, footer |

Do not add a second page targeting "AI automation agency" without a canonical decision. That is the
cannibalisation risk here.

## What is implemented

**Head** (`index.html`)
- Title: `Koret — Marketing & AI Automation Agency`
- Meta description as specified in the brief
- Self-referencing canonical, `max-image-preview:large`, full Open Graph set, Twitter summary card

**Structured data** — one `@graph` in the head so entities cross-reference rather than duplicate:
- `Organization` with logo, slogan and contact point
- `WebSite`
- **five `Service` nodes**, one per AI offering, each `provider`-linked back to the Organization

**`FAQPage` is back.** It is rendered by `src/components/FAQ.tsx` and **generated from the same
`FAQS` array that renders the accordion**, so the schema cannot drift from what is on the page.
This is the fix for what the previous build lost when the FAQ came off.

One caveat: it is injected by React, so it needs JS execution to be seen. Google renders JS, and
the page content itself is React-rendered anyway, so nothing is lost relative to the rest of the
page. If you later move to SSR or a static prerender, this becomes moot.

**Heading structure.** One `h1` (hero). One `h2` per section, several visually hidden where the
section leads with a different element. `h3` per card, step and FAQ question. Nothing is a heading
purely for size. Verified: exactly one `h1`.

**Crawl surface.** `public/robots.txt` allows everything and points at `public/sitemap.xml`. Both
are copied to `dist/` on build. Update `lastmod` whenever the copy changes materially.

**Internal anchors.** Every footer link uses a descriptive anchor — "Business process automation",
not "Learn more".

**Images.** Every image has descriptive `alt`. Verified: zero images without it. The only images on
the page are the two wordmark variants; there is nothing below the fold heavy enough to need lazy
loading yet, which is why no `loading="lazy"` appears — add it with the client logos and the OG
image.

## Before launch

1. Replace `https://koret.agency/` with the real domain in `index.html` (canonical, OG URL, image
   URL, and all seven schema `@id` values), `public/robots.txt`, `public/sitemap.xml`, and the
   `@id` in `src/components/FAQ.tsx`.
2. Create the OG image. `og:image` currently points at `/assets/og-image.png`, which does not exist.
3. Verify in Google's Rich Results Test and the Schema.org validator.
4. **Read the five FAQ answers.** Each is a claim about how Koret operates. Correct anything untrue
   — the schema follows the copy automatically, so there is only one place to edit.
5. Replace the three `[X]` result placeholders, or delete the section. Do not ship invented numbers.
6. Run PageSpeed Insights. Known LCP risk: Onest and Caveat load from Google Fonts via `@import` in
   `src/index.css`. Self-hosting via `@fontsource/onest` is the single biggest win available, and
   `@import` in particular blocks later than a `<link rel="preconnect">` would.
7. Add `Article` schema when the blog starts. Do not reuse `FAQPage` on other pages.

## Deliberately not done

- No keyword stuffing. "AI automation agency" appears where a person would actually say it.
- No thin service pages. Five near-identical pages would compete with this one. Split them out only
  when each can carry genuinely different content.
- **No schema for content that is not on the page**: no `Review`, no `AggregateRating`, no
  `Product`, and no `AggregateRating` faked from the placeholder stats.
