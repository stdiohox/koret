import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "What's the difference between your marketing services and your AI services?", a: 'Marketing builds the story and drives attention. AI automation builds the systems that convert that attention into results — and keeps running after the campaign ends.' },
  { q: 'Do I need to be technical to work with your AI team?', a: 'No. We handle the build; you tell us the outcome you want.' },
  { q: 'Can you automate an existing workflow, or does it have to be new?', a: 'Both. We regularly plug automation into tools businesses already use.' },
  { q: 'What\'s an "agentic build"?', a: "An AI agent that doesn't just answer questions — it takes action: qualifying a lead, booking a call, updating a record, following up." },
  { q: 'Do you offer ongoing support after launch?', a: 'Yes — through consultation and managed automation support.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[var(--color-bone)] py-[100px]">
      <div className="mx-auto max-w-[900px] px-6">
        {faqs.map((item, i) => (
          <div key={item.q} style={{ borderBottom: '1px solid var(--color-hairline)' }}>
            <button
              className="w-full flex items-center justify-between py-6 text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span
                className="text-[20px] font-normal"
                style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
              >
                {item.q}
              </span>
              {open === i ? (
                <Minus size={18} color="var(--color-logo-violet)" />
              ) : (
                <Plus size={18} color="var(--color-slate-mid)" />
              )}
            </button>
            {open === i && (
              <p
                className="pb-6 text-[16px]"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)' }}
              >
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
