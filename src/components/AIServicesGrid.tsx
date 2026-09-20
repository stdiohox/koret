'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import MotionSection from './MotionSection';
import { Terminal, Layers, BarChart3 } from 'lucide-react';

export default function AIServicesGrid() {
  const [selectedItem, setSelectedItem] = useState(0);
  const reduceMotion = useReducedMotion();
  const blobRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blobRef, { margin: '200px' });

  const consultationItems = [
    { label: 'Stack Audit', detail: 'Review what you\'re already using' },
    { label: 'Roadmap', detail: 'Prioritized 90-day plan' },
    { label: 'ROI Modeling', detail: 'Where automation pays off first' },
    { label: 'Ongoing Advisory', detail: 'Monthly strategy check-ins' },
  ];

  // `slug` pulls the brand mark from Simple Icons (CC0) at render time; `src` points at a
  // logo file supplied for this build, for brands Simple Icons doesn't carry.
  const stack: { name: string; slug?: string; src?: string }[] = [
    { name: 'n8n', slug: 'n8n' },
    { name: 'Supabase', slug: 'supabase' },
    // Not in Simple Icons — supplied logo, chroma-keyed to transparency and resized to 128px.
    { name: 'Vapi', src: '/logo/vapi-mark.png' },
    { name: 'HubSpot', slug: 'hubspot' },
    { name: 'Notion', slug: 'notion' },
    { name: 'Claude', slug: 'claude' },
    { name: 'Airtable', slug: 'airtable' },
    { name: 'Google Sheets', slug: 'googlesheets' },
    { name: 'WhatsApp', slug: 'whatsapp' },
  ];

  const agentExample = `// One of the agents we build
const agent = new KoretAgent({
  role: "qualify inbound leads",
  channels: ["web chat", "email"],
  handoff: "book call when ready"
});

await agent.run();
// ✓ Responding to leads in seconds`;

  // Shared style tokens for this section's light-theme cards
  const cardBase = {
    backgroundColor: 'var(--color-pure-white)',
    border: '1px solid var(--color-dock-hairline)',
  };
  const chipLight = { backgroundColor: 'rgba(0, 65, 155, 0.06)' };

  return (
    <MotionSection className="relative overflow-hidden bg-white py-24 px-4 md:px-8 font-sans antialiased">

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
            Backed by Consultation, Not Just Code
          </h2>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-ink-charcoal)' }}>
            Every AI engagement starts with a stack audit and a roadmap — then we build inside the tools you already use.
          </p>
        </div>

        {/* AI Consultation + Works With Your Stack, side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                      src={s.src ?? `https://cdn.simpleicons.org/${s.slug}`}
                      alt={s.name}
                      className="w-6 h-6 group-hover/int:scale-125 transition-transform duration-200"
                      loading="lazy"
                      // Simple Icons drops brands on trademark request, so a slug can
                      // 404. Hide rather than render a broken image — the tile keeps its
                      // footprint and the name below still identifies it.
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

        </div>

        <div className="mt-4">
          {/* Example Agent — intentionally kept dark; a "light" code block reads as wrong regardless of the section theme */}
          <div className="group light-card-hover relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between transition-all duration-300" style={cardBase}>
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

      </div>
    </MotionSection>
  );
}
