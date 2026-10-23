// A/B split for the homepage (Vercel Routing Middleware; runs before the CDN cache).
//
// Every visitor to `/` is assigned A (the current site, index.html) or B (the rebuild,
// b/index.html) once, and the choice is kept in a cookie for 30 days so a returning
// visitor sees the same page. B is served by an internal rewrite, so the address bar,
// canonical and shared links stay `/` for both — Google's guidance for A/B tests.
//
// Controls:
//   AB_SPLIT_B   env var, 0–1, share of NEW visitors sent to B (default 0.5).
//                Set it to 0 to stop the test without a code change (existing cookies
//                still apply until they expire; set 0 and also rename COOKIE to reset).
//   ?variant=a / ?variant=b   force a variant (and re-set the cookie) for QA.
import { next, rewrite } from '@vercel/functions';

export const config = { matcher: ['/', '/index.html'] };

const COOKIE = 'koret_ab';
const MAX_AGE = 60 * 60 * 24 * 30;

function splitB(): number {
  const raw = Number(process.env.AB_SPLIT_B ?? '0.5');
  return Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : 0.5;
}

export default function middleware(request: Request): Response {
  const url = new URL(request.url);
  const forced = url.searchParams.get('variant')?.toUpperCase();
  const current = /(?:^|;\s*)koret_ab=(A|B)(?:;|$)/.exec(request.headers.get('cookie') ?? '')?.[1];

  const variant =
    forced === 'A' || forced === 'B' ? forced : current ?? (Math.random() < splitB() ? 'B' : 'A');

  // `/` returns different HTML per cookie, so no shared cache may store one for everyone.
  const headers = new Headers({ vary: 'cookie' });
  if (variant !== current) {
    const secure = url.protocol === 'https:' ? '; Secure' : '';
    headers.append('set-cookie', `${COOKIE}=${variant}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`);
  }

  return variant === 'B' ? rewrite(new URL('/b/', url), { headers }) : next({ headers });
}
