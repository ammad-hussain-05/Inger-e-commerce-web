
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Books', href: '#books' },
  { label: 'Characters', href: '/characters' },
  { label: 'Contact', href: '#footer' },
]

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const overlayTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
        delayChildren: prefersReducedMotion ? 0 : 0.25,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="fullscreen-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          className="fixed inset-0 z-50 overflow-y-auto bg-black"
        >
          <motion.button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -45 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed top-6 right-6 md:top-10 md:right-10 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <X size={22} strokeWidth={1.5} />
          </motion.button>

          <div className="grid min-h-full md:grid-cols-2">
            {/* Left: nav */}
            <div className="flex flex-col justify-center px-6 py-28 sm:px-10 md:px-16 md:py-20 lg:px-24">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
                className="mb-10 space-y-1 md:mb-14"
              >
                <p className="label text-gold/80">Inger &amp; Alex Moore</p>
                <p className="label text-cream/40">Steampunk &amp; Urban Fantasy</p>
              </motion.div>

              <motion.nav
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                aria-label="Primary"
              >
                <ul className="space-y-2 md:space-y-3">
                  {links.map((link) => (
                    <motion.li key={link.label} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group inline-block font-serif text-5xl leading-tight text-cream transition-colors duration-300 hover:text-gold sm:text-6xl lg:text-7xl"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              <motion.div variants={itemVariants} initial="hidden" animate="visible" exit="hidden" className="mt-12 md:mt-16">
                <Link href="#footer" onClick={onClose} className="btn-primary inline-block">
                  Join List
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.4 }}
                className="mt-16 text-xs text-cream/30 md:mt-20"
              >
                &copy; {new Date().getFullYear()} Inger &amp; Alex Moore
              </motion.p>
            </div>

            {/* Right: video */}
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="relative h-[40vh] border-t border-cream/10 md:h-auto md:border-t-0 md:border-l"
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
<video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="absolute inset-0 h-full w-full object-cover"
>
  <source src="/header-nav-video.mp4" type="video/mp4" />
</video>
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
