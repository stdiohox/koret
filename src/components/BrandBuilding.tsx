'use client';

import type { ReactNode } from 'react';
import { Fingerprint, Palette, Megaphone } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';

const items = [
  {
    icon: <Fingerprint className="h-auto w-4 shrink-0" />,
    label: 'Positioning & Identity',
    content: {
      badge: 'Stand Out On Purpose',
      title: 'Look and sound like a brand twice your size.',
      description: 'We define how your business is positioned against competitors and build the identity system — name, voice, visual language — that carries it.',
      buttonText: 'See Our Approach',
    },
  },
  {
    icon: <Palette className="h-auto w-4 shrink-0" />,
    label: 'Visual Identity & Website',
    content: {
      badge: 'Designed, Not Templated',
      title: 'A brand system and website built to match, not bolted together.',
      description: 'From logo to full visual system to the site that carries it — designed as one coherent brand, not assembled from disconnected pieces.',
      buttonText: 'See Our Work',
    },
  },
  {
    icon: <Megaphone className="h-auto w-4 shrink-0" />,
    label: 'AI-Assisted Content Engine',
    content: {
      badge: 'Consistent, Without a Full-Time Team',
      title: 'Content and reputation management that runs without a content team.',
      description: 'Social, email, and review/reputation management, kept consistent and on-brand — powered by AI, overseen by us.',
      buttonText: 'See What We Publish',
    },
  },
];

const iconPanel: Record<string, ReactNode> = {
  'Positioning & Identity': <Fingerprint size={64} color="var(--color-koret-navy)" />,
  'Visual Identity & Website': <Palette size={64} color="var(--color-koret-navy)" />,
  'AI-Assisted Content Engine': <Megaphone size={64} color="var(--color-koret-navy)" />,
};

export default function BrandBuilding() {
  return (
    <MotionSection id="brand-building" className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
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
                <div
                  className="w-full aspect-square max-w-[320px] rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,204,255,0.15), rgba(0,65,155,0.1))' }}
                >
                  {iconPanel[item.label]}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
