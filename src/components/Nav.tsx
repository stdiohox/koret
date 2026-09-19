import { motion } from 'framer-motion';

export default function Nav() {
  const links = ['Services', 'AI Agency', 'Process', 'Results', 'FAQ'];
  return (
    <header
      className="sticky top-0 z-50 bg-[var(--color-pure-white)]"
      style={{ borderBottom: '1px solid var(--color-hairline)' }}
    >
      <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 py-[20px]">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-sm"
            style={{ background: 'conic-gradient(from 180deg, transparent, #855cf7)' }}
          />
          <span
            className="text-[20px] font-normal"
            style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
          >
            Koret
          </span>
        </div>

        <nav className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="#contact"
            className="text-[14px]"
            style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)' }}
          >
            Contact
          </a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[35px] px-6 py-[15px] text-[16px] font-normal"
            style={{
              backgroundColor: 'var(--color-charcoal-ink)',
              color: 'var(--color-pure-white)',
              fontFamily: 'var(--font-inter-display)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            Book a Consultation
          </motion.button>
        </div>
      </div>
    </header>
  );
}
