import { Zap, Globe, Workflow, Bot, Compass } from 'lucide-react';

const services = [
  { icon: Zap, title: 'Automation', desc: 'Custom workflows that eliminate repetitive tasks across sales, support, and operations.' },
  { icon: Globe, title: 'Website & Web App Development', desc: 'Fast, conversion-focused sites and custom web apps built to your brand.' },
  { icon: Workflow, title: 'Workflow Systems', desc: 'Connected pipelines between your tools so nothing falls through.' },
  { icon: Bot, title: 'Agentic AI Builds', desc: 'AI agents that handle real work: qualifying leads, answering customers, running processes.' },
  { icon: Compass, title: 'AI Consultation', desc: 'Strategic guidance on where automation actually moves the needle for your business.' },
];

export default function AIServicesGrid() {
  return (
    <section id="ai-agency" className="bg-[var(--color-bone)] py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="p-6 rounded-[14px] bg-[var(--color-pure-white)]"
            style={{ border: '1px solid var(--color-hairline)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ border: '1px solid var(--color-lavender-trace)' }}
            >
              <Icon size={18} color="var(--color-logo-violet)" />
            </div>
            <h3
              className="text-[24px] font-normal mb-2"
              style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
            >
              {title}
            </h3>
            <p
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)' }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
