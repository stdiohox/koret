import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="bg-[var(--color-pure-white)] py-[100px]">
      <motion.div
        className="mx-auto max-w-[1200px] flex flex-col items-center text-center px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center rounded-full px-4 py-1.5 mb-6"
          style={{ border: '1px solid var(--color-lavender-trace)' }}
        >
          <span
            className="text-[14px]"
            style={{ fontFamily: 'var(--font-aux-mono)', color: 'var(--color-logo-violet)', letterSpacing: '-0.04em' }}
          >
            Marketing + AI, Under One Roof
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-[900px] text-[48px] md:text-[72px] font-normal"
          style={{ fontFamily: 'var(--font-inter-display)', color: 'var(--color-charcoal-ink)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
        >
          Brands That Tell Stories. Systems That Scale Them.
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-[640px] mt-6 text-[16px]"
          style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-slate-mid)', lineHeight: 1.5, letterSpacing: '-0.16px' }}
        >
          Koret builds the brand strategy that makes people care — and the AI
          infrastructure that makes your business run itself. From campaigns
          to code, we bring your brand to limelight.
        </motion.p>

        <motion.div variants={item} className="flex gap-4 mt-10">
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
            Start Your Project
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[35px] px-6 py-[15px] text-[16px] font-normal"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-charcoal-ink)',
              fontFamily: 'var(--font-inter-display)',
              border: '1.5px solid var(--color-charcoal-ink)',
              boxShadow: 'var(--shadow-subtle-2)',
            }}
          >
            See What We Build
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
