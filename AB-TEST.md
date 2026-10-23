# Homepage A/B test

Two complete homepages, one URL. Half of new visitors to `www.koretconsult.com/` get each, and
every lead is tagged with the page it came from.

| | Variant A (control) | Variant B (challenger) |
|---|---|---|
| Source | `index.html` + `src/` (React) | `b/index.html`, `b/b.css`, `b/main.ts` (static HTML, one 2.4 KB script) |
| Promise | "More Customers. Less Admin. One Team." | "Every enquiry answered in seconds. Even at 9pm." |
| Offer | Free 30-min call | Free **Lead Leak Check** (+ the call) |
| Form | 5 fields + chips, at the bottom | 3 fields (name, WhatsApp, business); optional step 2 |
| Navigation | plain links; mobile hamburger | tubelight nav (lamp follows the section in view); fixed bottom icon bar on phones; CTA fixed in the top bar on every screen |
| WhatsApp | none | click-to-chat buttons (once `VITE_WHATSAPP_NUMBER` is set) |
| Hero | Mesh-gradient shader, centred headline | Lagos lagoon at blue hour with cyan light paths meeting at one junction (8 s loop on desktop, still on phones), blueprint frame, prompt box that carries into the form |
| Lighthouse mobile (local) | 36, LCP 6.9 s (live site) | 91, LCP 2.0 s (98 with the Pixel blocked); accessibility 100 |

## How the split works

`middleware.ts` (Vercel Routing Middleware) runs on `/` only:

1. A visitor with a `koret_ab` cookie keeps their variant.
2. A new visitor is assigned B with probability `AB_SPLIT_B` (default `0.5`), and the cookie is
   set for 30 days.
3. B is an internal **rewrite** to `/b/`, so the address bar, canonical and shared links stay `/`.
   No redirect, no cloaking: crawlers are split like people.

QA: `/?variant=a` or `/?variant=b` forces a variant and re-sets the cookie. `/b/` opens B directly.

Stop or pause the test: set `AB_SPLIT_B=0` in Vercel and redeploy (new visitors all get A;
existing B cookies expire within 30 days, or rename `COOKIE` in `middleware.ts` to reset everyone).

## What is measured

| Event (Meta Pixel) | A | B |
|---|---|---|
| `PageView` + custom `VariantView {variant}` | ✓ | ✓ |
| `Lead {variant}` (row saved in the sheet) | ✓ | ✓ (on step 1) |
| custom `CTAClick {location}`, `FormStart`, `LeadDetails` | – | ✓ |
| custom `WhatsAppClick {location}` + standard `Contact` | – | ✓ |

The Pixel loads the same way on both pages (async, in the head) so visit counts are comparable.

In the **Koret Enquiries** sheet every row gets a `Variant` column; B also writes `Lead ID`,
`Lead channels` and `Enquiries per week`. WhatsApp messages from B's buttons carry a
`(ref B-hero)` / `B-closing` / `B-offer` tag, so chats can be counted too.

**Primary metric:** qualified leads per 100 visitors, per variant (form leads + WhatsApp chats
with a B ref, minus spam and non-businesses).
**Guard metric:** lead → booked call rate. B asks for less, so it must not win on junk.
**Secondary:** CTA clicks by location, step-2 completion.

**Duration:** at least 14 days, ideally 28, and don't stop early. At a ~2% baseline, spotting a
doubling needs roughly 1,100 visitors per variant. Keep ad targeting and creative fixed while it runs.

## Launch checklist (in this order)

1. **Redeploy the Apps Script.** Paste the new `scripts/google-sheets/Code.gs`, then Deploy →
   Manage deployments → Edit → New version (same URL). Until this is done, B's leads are
   rejected (the old script requires an email) and B shows its error state with an email
   fallback, so nothing is silently lost, but the test must not start before this.
2. **Vercel env vars** (project `koret`, Production + Preview): `VITE_FORM_ENDPOINT` (already
   set), `VITE_WHATSAPP_NUMBER` = Koret's WhatsApp number in international digits, e.g.
   `2348012345678` (without it, B's WhatsApp buttons stay hidden), `AB_SPLIT_B` = `0.5`.
3. **Replace the image placeholders** in `b/index.html` (list below).
4. **Confirm the claims** listed below are true.
5. Merge `ab-variant-b` to `main`. Check `/?variant=a`, `/?variant=b`, and a test lead from each
   (it should land with `A` / `B` in the Variant column).

## Image placeholders in B

Each is a `<div class="ph" …>` with its size written on it. Swap it for an
`<img src width height alt loading="lazy">` (WebP/AVIF, ≤ 60 KB each) of the same ratio.

| Where | Size | What |
|---|---|---|
| How it works, right column | 1080 × 1350 (4:5) | Voice-agent video poster, or the video itself (re-encode to ≤ 2 MB, `preload="none"`, add captions) |
| Work → demo 1 | 1280 × 800 (16:10) | Screenshot of the real estate demo |
| Work → demo 2 | 1280 × 800 (16:10) | Screenshot of the school demo |
| Work → demo 3 | 1280 × 800 (16:10) | Screenshot of the bakery demo |
| Where the money goes → featured | about 1200 × 1040 (fills the left half; 16:10 below 1024px) | Phone lighting up at night with an unanswered WhatsApp enquiry |
| Where the money goes → card 1 | 800 × 500 (16:10) | Several chat apps with unread badges |
| Where the money goes → card 2 | 800 × 500 (16:10) | A quiet chat thread left on "seen" |
| Where the money goes → card 3 | 800 × 500 (16:10) | A missed-call notification on a phone |

## Claims on B that the team must confirm

- **The Lead Leak Check is a real offer.** Someone at Koret has to test each prospect's reply
  speed (WhatsApp, Instagram, website) and send back a short write-up.
- "We reply within one business day" and "We'll message you on WhatsApp": the reply has to come
  on WhatsApp.
- `areaServed: NG` in the schema, and the hero's industry list.
- The demos are linked publicly as "Working demos we built". They are Koret-branded with sample data.
