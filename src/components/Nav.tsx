import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'
import { Button } from './Button'
import { Wordmark } from './Wordmark'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_0_0_var(--color-border)]' : ''
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-3 focus:z-50 focus:rounded-inputs focus:bg-navy focus:px-4 focus:py-2 focus:text-body-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 md:px-10"
      >
        <a href="#top" className="flex items-center" aria-label="Koret — home">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                className="text-body-sm font-semibold text-black transition-colors duration-150 hover:text-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="#contact"
            className="text-body-sm font-semibold text-text-muted transition-colors duration-150 hover:text-black"
          >
            Client Log In
          </a>
          <Button href="#contact" className="text-body-sm px-5 py-2.5">
            Book a Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-inputs p-2 text-black lg:hidden"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white px-6 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-inputs py-3 text-subheading font-semibold text-black"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contact" className="mt-4 w-full">
            Book a Consultation
          </Button>
        </div>
      )}
    </header>
  )
}
