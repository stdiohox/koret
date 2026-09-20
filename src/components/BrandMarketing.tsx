import MotionSection from './MotionSection';

const services = [
  'Brand strategy & identity',
  'Content & campaign development',
  'Data-driven marketing execution',
];

export default function BrandMarketing() {
  return (
    <MotionSection id="services" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <h2 className="text-[32px] font-semibold mb-2" style={{ color: 'var(--color-ink-charcoal)' }}>
          Brand & Marketing
        </h2>
        <p className="text-[15px] mb-10" style={{ color: 'var(--color-dock-slate)' }}>
          The foundation Koret has always built on.
        </p>
        <ul className="max-w-[640px] mx-auto space-y-4 text-left">
          {services.map((item) => (
            <li key={item} className="text-[16px]" style={{ color: 'var(--color-ink-charcoal)' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
