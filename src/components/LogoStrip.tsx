import MotionSection from './MotionSection';

const logos = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F', 'Client G'];

export default function LogoStrip() {
  return (
    <MotionSection className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <p className="text-[13px] mb-10 font-medium tracking-[0.077em] uppercase" style={{ color: 'var(--color-dock-steel)' }}>
          Trusted by growing brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo) => (
            <span key={logo} className="h-5 flex items-center text-[14px]" style={{ color: 'var(--color-dock-slate)' }}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
