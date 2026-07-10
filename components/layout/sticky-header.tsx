'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import FullscreenMenu from './fullscreen-menu'

interface StickyHeaderProps {
  isScrolled: boolean
}

export default function StickyHeader({ isScrolled }: StickyHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 border-b border-gold/20 backdrop-blur-md'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="relative h-20 md:h-24 max-w-[1800px] mx-auto px-6 md:px-10 flex items-center justify-center">
          <Link href="#" className="inline-flex items-center" aria-label="Inger & Alex Moore">
            <Image
              src="/inger-logo-R2.png"
              alt="Inger & Alex Moore"
              width={400}
              height={300}
              priority
              className="h-22 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-24 md:h-26 lg:h-30"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="fullscreen-menu"
            aria-label="Open menu"
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-cream hover:text-gold transition-colors duration-300"
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
