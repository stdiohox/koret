'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Fingerprint, Megaphone, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import MotionSection from './MotionSection';

const tabs = [
  {
    value: 'identity',
    icon: <Fingerprint className="h-auto w-4 shrink-0" />,
    label: 'Brand Strategy & Identity',
    content: {
      badge: 'Where Every Brand Starts',
      title: 'A brand people recognize before they read a word.',
      description:
        'We define your positioning, voice, and visual identity — the groundwork every campaign and every build stands on.',
      buttonText: 'See Our Approach',
    },
  },
  {
    value: 'campaigns',
    icon: <Megaphone className="h-auto w-4 shrink-0" />,
    label: 'Content & Campaign Development',
    content: {
      badge: 'Stories That Spark Engagement',
      title: "Campaigns built to be noticed, not just seen.",
      description:
        'From concept to execution, we create content and campaigns that connect — and give your audience a reason to act.',
      buttonText: 'See Our Campaigns',
    },
  },
  {
    value: 'data',
    icon: <TrendingUp className="h-auto w-4 shrink-0" />,
    label: 'Data-Driven Marketing Execution',
    content: {
      badge: 'Decisions Backed by Numbers',
      title: 'Marketing that gets sharper the longer it runs.',
      description:
        "We track what's working, cut what isn't, and put budget behind what actually moves results — not guesswork.",
      buttonText: 'See Our Process',
    },
  },
];

const iconPanel: Record<string, React.ReactNode> = {
  identity: <Fingerprint size={64} color="var(--color-koret-navy)" />,
  campaigns: <Megaphone size={64} color="var(--color-koret-navy)" />,
  data: <TrendingUp size={64} color="var(--color-koret-navy)" />,
};

export default function BrandMarketing() {
  return (
    <MotionSection id="services" className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Brand & Marketing</Badge>
          <h2
            className="max-w-2xl text-3xl font-semibold md:text-4xl"
            style={{ color: 'var(--color-ink-charcoal)' }}
          >
            The Foundation We've Always Built On
          </h2>
          <p style={{ color: 'var(--color-dock-slate)' }}>
            Click a service below to see how it works.
          </p>
        </div>

        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors text-[var(--color-dock-slate)] data-[state=active]:bg-[var(--color-surface-ivory)] data-[state=active]:text-[var(--color-ink-charcoal)]"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div
            className="mx-auto mt-8 max-w-screen-xl rounded-2xl p-6 lg:p-16"
            style={{ backgroundColor: 'var(--color-surface-ivory)', border: '1px solid var(--color-dock-hairline)' }}
          >
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
                    {tab.content.title}
                  </h3>
                  <p className="lg:text-lg" style={{ color: 'var(--color-dock-slate)' }}>
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div
                  className="w-full aspect-square max-w-[320px] rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,204,255,0.15), rgba(0,65,155,0.1))' }}
                >
                  {iconPanel[tab.value]}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </MotionSection>
  );
}
