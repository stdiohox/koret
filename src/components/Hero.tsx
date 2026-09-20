'use client';

import React from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { MeshGradient } from '@paper-design/shaders-react';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const openBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();

  const heroSectionRef = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(heroSectionRef, { margin: '200px' });
  const [webglSupported, setWebglSupported] = React.useState(true);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      if (menuRef.current.contains(target)) return;
      // The click that OPENS the menu keeps bubbling to document after React has already
      // committed the state change and attached this listener — so without exempting the
      // toggle, the menu opened and closed itself within the same click (measured: open at
      // +2ms, closed at +3ms). Ignore the button and its SVG children.
      if (openBtnRef.current?.contains(target)) return;
      setMenuOpen(false);
    }

    if (menuOpen) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        .koret-hero-poppins, .koret-hero-poppins * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section
        ref={heroSectionRef}
        className="koret-hero-poppins relative overflow-hidden bg-black w-full text-sm pb-44"
      >

        {/* Mesh gradient shader background — Koret palette in place of the reference's approximate hues */}
        <div className="absolute inset-0" aria-hidden="true">
          {webglSupported ? (
            <MeshGradient
              className="absolute inset-0 w-full h-full"
              colors={['#000000', '#00CCFF', '#03857A', '#00419B', '#FD7F00']}
              distortion={0.8}
              swirl={0.3}
              speed={reduceMotion || !isInView ? 0 : 0.3}
              style={{ backgroundColor: '#000000' }}
            />
          ) : (
            <>
              <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 700,
                  height: 700,
                  top: '-10%',
                  right: '5%',
                  background: 'radial-gradient(circle, rgba(0,204,255,0.45) 0%, rgba(0,204,255,0) 70%)',
                }}
                animate={
                  reduceMotion || !isInView
                    ? undefined
                    : { x: [0, 30, -20, 0], y: [0, -20, 25, 0], scale: [1, 1.06, 0.98, 1] }
                }
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 640,
                  height: 640,
                  bottom: '-15%',
                  left: '10%',
                  background: 'radial-gradient(circle, rgba(0,65,155,0.5) 0%, rgba(0,65,155,0) 70%)',
                }}
                animate={
                  reduceMotion || !isInView
                    ? undefined
                    : { x: [0, -25, 20, 0], y: [0, 25, -15, 0], scale: [1, 0.97, 1.05, 1] }
                }
                transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
        </div>

        <div className="relative z-10">
          <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
            <a href="/" aria-label="Koret home" className="flex items-center py-2">
              <img src="/logo/koret-wordmark-light.png" alt="Koret" className="h-7 w-auto" />
            </a>

            <div
              id="menu"
              ref={menuRef}
              className={[
                // fixed + 100dvh so the overlay covers the whole viewport (as `absolute` it sized to the
                // hero's content wrapper: 592px of an 844px screen, leaving a bare strip). z-50 lifts it
                // above sibling hero content — the "Marketing + AI" pill was painting over the Process link.
                'max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-[100dvh] max-md:bg-white/10 max-md:backdrop-blur-lg',
                'flex items-center gap-8 font-medium',
                'max-md:flex-col max-md:justify-center',
                menuOpen ? 'max-md:w-full' : 'max-md:w-0',
              ].join(' ')}
              aria-hidden={isDesktop ? false : !menuOpen}
              onClick={(e) => {
                // Tapping the overlay's empty area dismisses. The document-level
                // click-outside handler can't do this any more: the overlay now covers the
                // viewport, so every tap is technically "inside" it.
                if (e.target === e.currentTarget) setMenuOpen(false);
              }}
            >
              <a href="#ai-agency" onClick={() => setMenuOpen(false)} className="flex items-center justify-center py-3 max-md:w-full text-white/80 hover:text-white transition-colors">AI Agency</a>
              <a href="#process" onClick={() => setMenuOpen(false)} className="flex items-center justify-center py-3 max-md:w-full text-white/80 hover:text-white transition-colors">Process</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="flex items-center justify-center py-3 max-md:w-full text-white/80 hover:text-white transition-colors">FAQ</a>

              <button
                onClick={() => setMenuOpen(false)}
                className="md:hidden bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-md aspect-square font-medium transition backdrop-blur-sm"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <button
              className="hidden md:block px-6 py-3 rounded-full font-medium transition hover:opacity-90"
              style={{ backgroundColor: 'var(--color-koret-cyan)', color: '#ffffff' }}
            >
              Book a Consultation
            </button>

            <button
              id="open-menu"
              ref={openBtnRef}
              onClick={() => setMenuOpen(true)}
              className="md:hidden bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-md aspect-square font-medium transition backdrop-blur-sm"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </button>
          </nav>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div
              variants={item}
              className="flex items-center gap-2 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32 backdrop-blur-sm"
              style={{ border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <span className="text-white/90">Marketing + AI, Under One Roof</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8 text-white">
              Brands That Tell Stories. Systems That Scale Them.
            </motion.h1>

            <motion.p variants={item} className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2 text-white/70">
              Koret builds the brand strategy that makes people care — and the AI infrastructure that makes your business run itself. From campaigns to code, we bring your brand to limelight.
            </motion.p>

            <motion.div variants={item} className="mx-auto w-full flex items-center justify-center gap-3 mt-4">
              <motion.a
                href="https://www.instagram.com/koretconsult?stkn=c21yb3UxaTA4enpi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="px-6 py-3 rounded-full font-medium transition hover:opacity-90"
                style={{ backgroundColor: 'var(--color-koret-cyan)', color: '#ffffff' }}
              >
                Start Your Project
              </motion.a>
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-white hover:bg-white/10 transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <span>See What We Build</span>
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M1.25.5 4.75 4l-3.5 3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
