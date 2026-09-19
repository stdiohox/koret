'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import MotionSection from './MotionSection';
import {
  Zap,
  Globe,
  GitBranch,
  Rocket,
  Sparkles,
  Lightbulb,
  Terminal,
  Layers,
  BarChart3,
} from 'lucide-react';

/* Navy surface tiers — see --color-navy-* in index.css.
   abyss   = section + terminal ground (darkest)
   card    = every card and nested box (one step up)
   navy    = active / selected states and icon chips
   hairline = default border; -strong is the hover border (via .navy-card-hover) */
const SURFACE_ABYSS = 'var(--color-navy-abyss)';
const SURFACE_CARD = 'var(--color-navy-card)';
const SURFACE_ACTIVE = 'var(--color-koret-navy)';
const HAIRLINE = 'var(--color-navy-hairline)';

export default function AIServicesGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const features = [
    { id: 0, title: 'Automation', desc: 'Custom workflows that eliminate repetitive tasks across sales, support, and operations.', icon: Zap, stat: 'Fully custom' },
    { id: 1, title: 'Website & Web App Dev', desc: 'Fast, conversion-focused sites and custom web apps built to your brand.', icon: Globe, stat: 'Full-stack' },
    { id: 2, title: 'Workflow Systems', desc: 'Connected pipelines between your tools so nothing falls through.', icon: GitBranch, stat: 'End-to-end' },
    { id: 3, title: 'Agentic AI Builds', desc: 'AI agents that handle real work: qualifying leads, answering customers, running processes.', icon: Rocket, stat: 'Always on' },
  ];

  const consultationItems = [
    { label: 'Stack Audit', detail: 'Review what you\'re already using' },
    { label: 'Roadmap', detail: 'Prioritized 90-day plan' },
    { label: 'ROI Modeling', detail: 'Where automation pays off first' },
    { label: 'Ongoing Advisory', detail: 'Monthly strategy check-ins' },
  ];

  const stack = [
    { name: 'n8n', abbr: '🔗' },
    { name: 'Zapier', abbr: '⚡' },
    { name: 'Slack', abbr: '💬' },
    { name: 'HubSpot', abbr: '🎯' },
    { name: 'Notion', abbr: '📝' },
    { name: 'OpenAI', abbr: '🤖' },
  ];

  const agentExample = `// One of the agents we build
const agent = new KoretAgent({
  role: "qualify inbound leads",
  channels: ["web chat", "email"],
  handoff: "book call when ready"
});

await agent.run();
// ✓ Responding to leads in seconds`;

  const stats = [
    { label: 'AI Services Offered', value: '5' },
    { label: 'Disciplines, One Team', value: '2' },
    { label: 'Handoff Friction', value: '0' },
    { label: 'Brand-Matched Builds', value: '100%' },
  ];

  const activeFeature = features[activeTab];

  return (
    <MotionSection
      id="ai-agency"
      className="w-full py-24 px-4 md:px-8 text-white font-sans antialiased overflow-hidden"
      style={{ backgroundColor: SURFACE_ABYSS }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border w-fit"
            style={{ backgroundColor: SURFACE_CARD, borderColor: SURFACE_ACTIVE }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wider text-zinc-300">
              AI & Automation
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
            The AI Layer Behind Your Brand
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            From one automation to a full agentic system — everything below is built to match your brand and run without you in the loop.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">

          {/* Interactive Services Selector */}
          <div
            className="md:col-span-2 md:row-span-2 group navy-card-hover relative overflow-hidden rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300"
            style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
          >
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg border text-zinc-300 text-xs font-semibold"
                style={{ backgroundColor: SURFACE_ACTIVE, borderColor: SURFACE_ACTIVE }}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Smart Infrastructure
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-2 text-white">Our AI Services</h3>
              <p className="text-sm text-zinc-400">
                Click to explore what we build
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeTab === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={cn(
                      'group/card relative overflow-hidden rounded-xl p-4 border transition-all duration-300 flex flex-col',
                      !isActive && 'navy-card-hover'
                    )}
                    style={{
                      backgroundColor: isActive ? SURFACE_ACTIVE : SURFACE_CARD,
                      borderColor: isActive ? SURFACE_ACTIVE : HAIRLINE,
                    }}
                  >
                    <Icon className={cn('w-5 h-5 mb-2 transition-colors', isActive ? 'text-white' : 'text-zinc-500')} />
                    <span className="text-xs font-bold text-white text-left">{feature.title}</span>
                    <span className="text-[10px] text-zinc-400 text-left mt-1 line-clamp-1">{feature.stat}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="relative z-10 mt-6 p-4 rounded-xl border"
              style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
            >
              <div className="flex-1">
                <p className="text-xs font-mono text-zinc-500 mb-1">Selected:</p>
                <p className="text-lg font-bold text-white">{activeFeature.title}</p>
                <p className="text-xs text-zinc-400 mt-1">{activeFeature.desc}</p>
              </div>
              <div className="text-2xl font-bold font-mono text-white mt-3">{activeFeature.stat}</div>
            </div>
          </div>

          {/* AI Consultation Card */}
          <div
            className="group navy-card-hover relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300"
            style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-2 border rounded-lg"
                  style={{ backgroundColor: SURFACE_ACTIVE, borderColor: SURFACE_ACTIVE }}
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-lg text-zinc-300 font-semibold"
                  style={{ backgroundColor: SURFACE_ACTIVE }}
                >
                  Included
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">AI Consultation</h3>
              <p className="text-xs text-zinc-400 mb-4">What's included</p>

              <div className="space-y-2">
                {consultationItems.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedItem(idx)}
                    className={cn(
                      'w-full text-left p-2 rounded-lg transition-all duration-200 border',
                      selectedItem !== idx && 'navy-card-hover'
                    )}
                    style={{
                      backgroundColor: selectedItem === idx ? SURFACE_ACTIVE : SURFACE_CARD,
                      borderColor: selectedItem === idx ? SURFACE_ACTIVE : HAIRLINE,
                    }}
                  >
                    <p className="text-[10px] text-zinc-400">{c.label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{c.detail}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Works With Your Stack */}
          <div
            className="group navy-card-hover relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300"
            style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
          >
            <div className="relative z-10">
              <div
                className="p-2 border rounded-lg w-fit mb-4"
                style={{ backgroundColor: SURFACE_ACTIVE, borderColor: SURFACE_ACTIVE }}
              >
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Works With Your Stack</h3>
              <p className="text-xs text-zinc-400 mb-4">Tools we build around</p>

              <div className="grid grid-cols-3 gap-2">
                {stack.map((s, idx) => (
                  <div
                    key={idx}
                    className="group/int navy-card-hover p-3 rounded-lg border transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer"
                    style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
                  >
                    <span className="text-xl group-hover/int:scale-125 transition-transform duration-200">{s.abbr}</span>
                    <p className="text-[9px] text-zinc-500 text-center">{s.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Example Agent */}
          <div
            className="md:col-span-2 group navy-card-hover relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300"
            style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="p-2 border rounded-lg"
                  style={{ backgroundColor: SURFACE_ACTIVE, borderColor: SURFACE_ACTIVE }}
                >
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">Example: A Lead-Qualifying Agent</h3>
              </div>

              <div
                className="border rounded-lg p-4 font-mono text-[12px] leading-relaxed overflow-auto max-h-32 scrollbar-hide"
                style={{ backgroundColor: SURFACE_ABYSS, borderColor: HAIRLINE }}
              >
                {agentExample.split('\n').map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-zinc-600 select-none w-6 text-right">{idx + 1}</span>
                    <span
                      className={cn(
                        line.includes('//') ? 'text-zinc-600' :
                        line.includes('✓') ? 'text-zinc-300' :
                        line.includes('const') || line.includes('await') ? 'text-zinc-200' :
                        'text-zinc-300'
                      )}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group navy-card-hover relative overflow-hidden rounded-xl border p-4 transition-all duration-300"
              style={{ backgroundColor: SURFACE_CARD, borderColor: HAIRLINE }}
            >
              <p className="text-xs text-zinc-400 relative z-10">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1 relative z-10">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
