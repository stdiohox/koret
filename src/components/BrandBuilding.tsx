'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Palette, Megaphone } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';
import { useScrollTilt } from '@/hooks/useScrollTilt';

const items = [
  {
    value: 'identity',
    icon: <Fingerprint className="h-auto w-4 shrink-0" color="var(--color-koret-cyan)" />,
    label: 'Positioning & Identity',
    content: {
      badge: 'Stand Out On Purpose',
      title: 'Look and sound like a brand twice your size.',
      description: 'We define how your business is positioned against competitors and build the identity system — name, voice, visual language — that carries it.',
      buttonText: 'See Our Approach',
    },
  },
  {
    value: 'design',
    icon: <Palette className="h-auto w-4 shrink-0" color="var(--color-koret-cyan)" />,
    label: 'Visual Identity & Website',
    content: {
      badge: 'Designed, Not Templated',
      title: 'A brand system and website built to match, not bolted together.',
      description: 'From logo to full visual system to the site that carries it — designed as one coherent brand, not assembled from disconnected pieces.',
      buttonText: 'See Our Work',
    },
  },
  {
    value: 'content',
    icon: <Megaphone className="h-auto w-4 shrink-0" color="var(--color-koret-cyan)" />,
    label: 'AI-Assisted Content Engine',
    content: {
      badge: 'Consistent, Without a Full-Time Team',
      title: 'Content and reputation management that runs without a content team.',
      description: 'Social, email, and review/reputation management, kept consistent and on-brand — powered by AI, overseen by us.',
      buttonText: 'See What We Publish',
    },
  },
];

export default function BrandBuilding() {
  const { ref: tiltRef, rotateX, scale } = useScrollTilt<HTMLDivElement>();
  return (
    <MotionSection id="brand-building" className="py-24 px-4 md:px-8">
      <motion.div
        ref={tiltRef}
        style={{ rotateX, scale, transformPerspective: 1000 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Brand Building</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
            The Brand Behind the Systems
          </h2>
          <p style={{ color: 'var(--color-dock-slate)' }}>
            Automation runs the business. This is what makes people trust it.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {items.map((item) => (
            // Same scroll-reveal treatment every other section's cards use, so this one
            // doesn't read as the only block that snaps in.
            <ScrollReveal key={item.label}>
              <div
                className="rounded-2xl p-6 lg:p-16 grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10"
                style={{ backgroundColor: 'var(--color-surface-ivory)', border: '1px solid var(--color-dock-hairline)' }}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2" style={{ color: 'var(--color-dock-slate)' }}>
                    {item.icon}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <Badge variant="outline" className="w-fit">{item.content.badge}</Badge>
                  <h3 className="text-3xl font-semibold lg:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
                    {item.content.title}
                  </h3>
                  <p className="lg:text-lg" style={{ color: 'var(--color-dock-slate)' }}>
                    {item.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">{item.content.buttonText}</Button>
                </div>
                {/* Same media treatment as the ServiceDeepDive cards — 4/3, rounded-2xl,
                    hover zoom, and the eased teal scrim — so the two sections read as one
                    system rather than two. The scrim's stops are the 0-75% curve: eleven
                    stops rather than three, because a 3-stop version creases visibly where
                    its slope changes. */}
                <div className="w-full aspect-[4/3] max-w-[320px] rounded-2xl overflow-hidden relative group">
                  <img
                    src={`/branding/${item.value}-poster.jpg`}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top,
                        rgba(0,204,255,0.55) 0%, rgba(0,204,255,0.406) 14%, rgba(0,204,255,0.298) 25.5%,
                        rgba(0,204,255,0.210) 35%, rgba(0,204,255,0.153) 42%, rgba(0,204,255,0.107) 49%,
                        rgba(0,204,255,0.069) 55%, rgba(0,204,255,0.041) 60.5%, rgba(0,204,255,0.023) 66%,
                        rgba(0,204,255,0.012) 70.5%, rgba(0,204,255,0) 75%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top,
                        rgba(0,204,255,0.70) 0%, rgba(0,204,255,0.517) 14%, rgba(0,204,255,0.379) 25.5%,
                        rgba(0,204,255,0.267) 35%, rgba(0,204,255,0.195) 42%, rgba(0,204,255,0.136) 49%,
                        rgba(0,204,255,0.088) 55%, rgba(0,204,255,0.053) 60.5%, rgba(0,204,255,0.029) 66%,
                        rgba(0,204,255,0.015) 70.5%, rgba(0,204,255,0) 75%)`,
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </MotionSection>
  );
}
