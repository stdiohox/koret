import { useState } from 'react';

const tracks = {
  'Brand & Marketing': [
    'Brand strategy & identity',
    'Content & campaign development',
    'Data-driven marketing execution',
  ],
  'AI & Automation': [
    'Automation',
    'Website & Web App Development',
    'Workflow Systems',
    'Agentic AI Builds',
    'AI Consultation',
  ],
} as const;

export default function ServicesTabs() {
  const [active, setActive] = useState<keyof typeof tracks>('Brand & Marketing');

  return (
    <section id="services" className="bg-[var(--color-pure-white)] py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex justify-center gap-10" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
          {(Object.keys(tracks) as (keyof typeof tracks)[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="pb-4 text-[16px] font-normal"
              style={{
                fontFamily: 'var(--font-inter-display)',
                color: active === tab ? 'var(--color-charcoal-ink)' : 'var(--color-slate-mid)',
                borderBottom: active === tab ? '2px solid var(--color-logo-violet)' : '2px solid transparent',
              }}
            >
              {tab}
              {tab === 'AI & Automation' && (
                <span
                  className="ml-2 text-[12px]"
                  style={{ color: 'var(--color-logo-violet)', fontFamily: 'var(--font-aux-mono)' }}
                >
                  NEW
                </span>
              )}
            </button>
          ))}
        </div>

        <ul className="mt-10 max-w-[640px] mx-auto space-y-4">
          {tracks[active].map((item) => (
            <li
              key={item}
              className="text-[16px]"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-charcoal-ink)' }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
