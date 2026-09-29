import type { ReactNode } from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';
import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';
import { Badge } from './ui/badge';

// Clients are described by role and business type, not named, at the CEO's request.
const testimonials = [
  {
    quote:
      'Before Koret, our leads lived in spreadsheets and nobody knew who had been contacted. Now everything is in one place and the follow-ups happen on their own. It has taken so much stress off the team.',
    who: 'Founder',
    business: 'Finance education business',
  },
  {
    quote:
      'We were genuinely impressed. Koret understood what we do quickly, and the way they work made the whole project easy on our side. We finally have a website we are proud to send people to.',
    who: 'Director',
    business: 'Nonprofit organisation',
  },
  {
    quote:
      'Koret built our new school website and a portal where teachers and parents can monitor each student’s progress in one place. Keeping parents in the loop is so much easier now, and everyone has been impressed with it.',
    who: 'School Administrator',
    business: 'School',
  },
];

const cardStyle = { backgroundColor: 'var(--color-pure-white)', border: '1px solid var(--color-dock-hairline)' };

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{ backgroundColor: 'rgba(0, 65, 155, 0.06)', color: 'var(--color-koret-navy)' }}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function OutLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
      style={{ color: 'var(--color-koret-navy)' }}
    >
      {children}
      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

export default function RecentWork() {
  return (
    <MotionSection id="work" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-14">
          <Badge variant="outline">Our Work</Badge>
          <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
            Less Stress. Better Systems. Happy Clients.
          </h2>
          <p className="max-w-lg" style={{ color: 'var(--color-dock-slate)' }}>
            What our clients say — and one of the AI builds we've shipped.
          </p>
        </div>

        {/* Quotes run across the top and the video sits below at its own size, so adding a
            quote never stretches the video to match a taller column. */}
        <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <ScrollReveal key={t.business} className="h-full">
                <figure className="h-full rounded-2xl p-6 md:p-8 flex flex-col gap-6" style={cardStyle}>
                  <Quote size={28} color="var(--color-koret-cyan)" aria-hidden />
                  <blockquote className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-ink-charcoal)' }}>
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-auto text-sm">
                    <span className="font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>{t.who}</span>
                    <span style={{ color: 'var(--color-dock-slate)' }}> · {t.business}</span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
        </div>

        <div className="mt-6 mx-auto max-w-3xl">
          <ScrollReveal>
            <article className="rounded-2xl overflow-hidden flex flex-col sm:flex-row" style={cardStyle}>
              {/* preload="none": the reel is ~18MB, so nothing downloads until someone presses play. */}
              <div className="sm:w-[260px] shrink-0 bg-black">
                <video
                  className="w-full aspect-[4/5] sm:aspect-[6/11] object-cover"
                  src="/work/voice-agent.mp4"
                  poster="/work/voice-agent-poster.jpg"
                  controls
                  preload="none"
                  playsInline
                  aria-label="Video: the AI voice agent we built for a real estate company"
                />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center gap-4 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: '#03857A' }}>
                  Real estate
                </p>
                <h3 className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>
                  AI Voice Agent
                </h3>
                <p className="max-w-md md:text-base text-sm" style={{ color: 'var(--color-dock-slate)' }}>
                  An AI voice agent that picks up the phone for a real estate company — so every caller gets an answer,
                  even when the team can't get to it.
                </p>
                <div className="pt-2 flex flex-col gap-4">
                  <Tags items={['AI Voice Agent', 'Automation']} />
                  <OutLink href="https://www.instagram.com/reel/Ddt-jSzRB0U/">Watch on Instagram</OutLink>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </MotionSection>
  );
}
