'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import MotionSection from './MotionSection';
import {
  Zap,
  Globe,
  GitBranch,
  Rocket,
  Lightbulb,
  Terminal,
  Layers,
  BarChart3,
} from 'lucide-react';

export default function AIServicesGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const reduceMotion = useReducedMotion();
  const blobRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });

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
    { name: 'n8n', slug: 'n8n' },
    { name: 'Supabase', slug: 'supabase' },
    { name: 'Slack', slug: 'slack' },
    { name: 'HubSpot', slug: 'hubspot' },
    { name: 'Notion', slug: 'notion' },
    { name: 'Claude', slug: 'claude' },
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

  // Shared style tokens for this section's light-theme cards
  const cardBase = {
    backgroundColor: 'var(--color-pure-white)',
    border: '1px solid var(--color-dock-hairline)',
  };
  const chipLight = { backgroundColor: 'rgba(0, 65, 155, 0.06)' };

  return (
    <MotionSection id="ai-agency" className="relative overflow-hidden bg-white py-24 px-4 md:px-8 font-sans antialiased">

      {/* Soft brand-color gradient wash — same recipe as the earlier Hero blob treatment */}
      <div ref={blobRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 600,
            height: 600,
            top: '-15%',
            right: '0%',
            background: 'radial-gradient(circle, rgba(0,204,255,0.3) 0%, rgba(0,204,255,0) 70%)',
          }}
          animate={
            reduceMotion || !isInView
              ? undefined
              : { x: [0, 25, -15, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.98, 1] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 560,
            height: 560,
            bottom: '-15%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(0,65,155,0.25) 0%, rgba(0,65,155,0) 70%)',
          }}
          animate={
            reduceMotion || !isInView
              ? undefined
              : { x: [0, -20, 15, 0], y: [0, 20, -10, 0], scale: [1, 0.97, 1.04, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--color-ink-charcoal)' }}>
            The AI Layer Behind Your Brand
          </h2>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-ink-charcoal)' }}>
            From one automation to a full agentic system — everything below is built to match your brand and run without you in the loop.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">

          {/* Interactive Services Selector */}
          <div
            className="md:col-span-2 md:row-span-2 group light-card-hover relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between transition-all duration-300"
            style={cardBase}
          >
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg text-xs font-semibold"
                style={{ ...chipLight, color: 'var(--color-ink-charcoal)' }}
              >
                <Lightbulb className="w-3.5 h-3.5" style={{ color: 'var(--color-ink-charcoal)' }} />
                Smart Infrastructure
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-ink-charcoal)' }}>
                Our AI Services
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-ink-charcoal)' }}>
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
                    className="group/card relative overflow-hidden rounded-xl p-4 transition-all duration-300 flex flex-col text-left"
                    style={
                      isActive
                        ? { backgroundColor: 'rgba(0, 204, 255, 0.12)', border: '1px solid rgba(0, 204, 255, 0.35)', boxShadow: '0 0 32px rgba(0, 204, 255, 0.2)' }
                        : { backgroundColor: 'var(--color-canvas-cream)', border: '1px solid var(--color-dock-hairline)' }
                    }
                  >
                    <Icon
                      className="w-5 h-5 mb-2 transition-colors"
                      style={{ color: isActive ? 'var(--color-ink-charcoal)' : 'var(--color-dock-slate)' }}
                    />
                    <span
                      className="text-xs font-bold text-left"
                      style={{ color: 'var(--color-ink-charcoal)' }}
                    >
                      {feature.title}
                    </span>
                    <span
                      className="text-[10px] text-left mt-1 line-clamp-1"
                      style={{ color: 'var(--color-dock-slate)' }}
                    >
                      {feature.stat}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="relative z-10 mt-6 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--color-canvas-cream)', border: '1px solid var(--color-dock-hairline)' }}
            >
              <div className="flex-1">
                <p className="text-xs font-mono mb-1" style={{ color: 'var(--color-dock-slate)' }}>Selected:</p>
                <p className="text-lg font-bold" style={{ color: 'var(--color-ink-charcoal)' }}>{activeFeature.title}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-ink-charcoal)' }}>{activeFeature.desc}</p>
              </div>
              <div className="text-2xl font-bold mt-3" style={{ color: 'var(--color-ink-charcoal)' }}>
                {activeFeature.stat}
              </div>
            </div>
          </div>

          {/* AI Consultation Card */}
          <div className="group light-card-hover relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between transition-all duration-300" style={cardBase}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg" style={chipLight}>
                  <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-ink-charcoal)' }} />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-lg font-semibold"
                  style={{ ...chipLight, color: 'var(--color-ink-charcoal)' }}
                >
                  Included
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink-charcoal)' }}>AI Consultation</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-ink-charcoal)' }}>What's included</p>

              <div className="space-y-2">
                {consultationItems.map((c, idx) => {
                  const isSelected = selectedItem === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedItem(idx)}
                      className="w-full text-left p-2 rounded-lg transition-all duration-200"
                      style={
                        isSelected
                          ? { backgroundColor: 'rgba(0, 204, 255, 0.12)', border: '1px solid rgba(0, 204, 255, 0.35)', boxShadow: '0 0 32px rgba(0, 204, 255, 0.2)' }
                          : { backgroundColor: 'var(--color-canvas-cream)', border: '1px solid var(--color-dock-hairline)' }
                      }
                    >
                      <p className="text-[10px]" style={{ color: 'var(--color-dock-slate)' }}>
                        {c.label}
                      </p>
                      <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-ink-charcoal)' }}>
                        {c.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Works With Your Stack */}
          <div className="group light-card-hover relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between transition-all duration-300" style={cardBase}>
            <div className="relative z-10">
              <div className="p-2 rounded-lg w-fit mb-4" style={chipLight}>
                <Layers className="w-5 h-5" style={{ color: 'var(--color-ink-charcoal)' }} />
              </div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink-charcoal)' }}>Works With Your Stack</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-ink-charcoal)' }}>Tools we build around</p>

              <div className="grid grid-cols-3 gap-2">
                {stack.map((s, idx) => (
                  <div
                    key={idx}
                    className="group/int p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer"
                    style={{ backgroundColor: 'var(--color-canvas-cream)', border: '1px solid var(--color-dock-hairline)' }}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${s.slug}`}
                      alt={s.name}
                      className="w-6 h-6 group-hover/int:scale-125 transition-transform duration-200"
                      loading="lazy"
                      // Simple Icons drops brands on trademark request (Slack is currently
                      // one), so a slug can 404. Hide rather than render a broken image —
                      // the tile keeps its footprint and the name below still identifies it.
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden';
                      }}
                    />
                    <p className="text-[9px] text-center" style={{ color: 'var(--color-dock-slate)' }}>{s.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Example Agent — intentionally kept dark; a "light" code block reads as wrong regardless of the section theme */}
          <div className="md:col-span-2 group light-card-hover relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between transition-all duration-300" style={cardBase}>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg" style={chipLight}>
                  <Terminal className="w-5 h-5" style={{ color: 'var(--color-ink-charcoal)' }} />
                </div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-ink-charcoal)' }}>Example: A Lead-Qualifying Agent</h3>
              </div>

              <div className="bg-black border border-zinc-800 rounded-lg p-4 font-mono text-[12px] leading-relaxed overflow-auto max-h-32 scrollbar-hide">
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
            <div key={idx} className="group light-card-hover relative overflow-hidden rounded-xl p-4 transition-all duration-300" style={cardBase}>
              <p className="text-xs relative z-10" style={{ color: 'var(--color-dock-slate)' }}>{stat.label}</p>
              <p className="text-xl font-bold mt-1 relative z-10" style={{ color: 'var(--color-ink-charcoal)' }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
