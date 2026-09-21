import { Stethoscope, Scale, ShoppingBag, Dumbbell, UserSearch, Wrench } from 'lucide-react';
import MotionSection from './MotionSection';

const industries = [
  { icon: Stethoscope, label: 'Healthcare & Dental', gradient: { from: '#00CCFF', to: '#00419B' } },
  { icon: Scale, label: 'Law & Professional Services', gradient: { from: '#00419B', to: '#03857A' } },
  { icon: ShoppingBag, label: 'E-Commerce & DTC', gradient: { from: '#03857A', to: '#FD7F00' } },
  { icon: Dumbbell, label: 'Fitness & Coaching', gradient: { from: '#FD7F00', to: '#00CCFF' } },
  { icon: UserSearch, label: 'Recruitment & Staffing', gradient: { from: '#00CCFF', to: '#03857A' } },
  { icon: Wrench, label: 'Home Services & Trades', gradient: { from: '#00419B', to: '#FD7F00' } },
];

export default function TargetIndustries() {
  return (
    <MotionSection className="py-16 px-4 md:px-8">
      {/* The reduced-motion stop matches how the rest of the site treats ambient
          motion (the blob washes gate on useReducedMotion); an infinite marquee is
          the one piece here that would otherwise never hold still. */}
      <style>{`
        @keyframes koret-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .koret-marquee-track { animation: none !important; }
        }
      `}</style>
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>
          Who We Work With
        </h2>
        <p className="mt-2 max-w-lg mx-auto text-sm" style={{ color: 'var(--color-dock-slate)' }}>
          Service-based, appointment-driven businesses — where manual work is easiest to see, and automation pays off fastest.
        </p>
      </div>

      <div
        className="w-full overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div
          className="koret-marquee-track flex w-max items-center gap-4 py-4"
          style={{ animation: 'koret-marquee 40s linear infinite' }}
        >
          {[...industries, ...industries].map(({ icon: Icon, label, gradient }, i) => (
            <div
              key={i}
              className="group relative h-28 w-44 shrink-0 flex flex-col items-center justify-center gap-2 rounded-lg overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface-ivory)', border: '1px solid var(--color-dock-hairline)' }}
            >
              <div
                className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-15 group-hover:scale-100"
                style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
              />
              <Icon size={28} color="var(--color-koret-navy)" className="relative" />
              <span className="relative text-xs font-medium text-center px-2" style={{ color: 'var(--color-ink-charcoal)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
