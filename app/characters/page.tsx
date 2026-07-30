'use client'

import { useEffect, useState } from 'react'
import StickyHeader from '@/components/layout/sticky-header'
import Footer from '@/components/sections/footer'
import CharactersExplorer from '@/components/characters/characters-explorer'
import { characters } from '@/lib/characters'

// Drop the final footage in /public and point this at it, e.g. '/characters-hero.mp4'.
// Falls back to the homepage hero footage until the client sends new video.
const HERO_VIDEO_SRC = 'https://www.pexels.com/download/video/35683206/'

export default function CharactersPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black">
      <StickyHeader isScrolled={isScrolled} />
      <main className="overflow-hidden">
        {/* Hero: full-bleed background video, kept at natural brightness — no
            dimming overlay — with a short fade at the base so it blends into
            the explorer section below. */}
        <section className="relative flex min-h-svh items-center justify-center overflow-hidden pt-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black to-transparent" />

          <div className="relative z-20 mx-auto max-w-3xl px-6 text-center md:px-8">
            <p className="label text-shadow-cinematic mb-4 text-gold">The World of Inger &amp; Alex Moore</p>
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-gold/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
              <div className="h-px w-8 bg-gold/50" />
            </div>
            <h1 className="h1 text-shadow-cinematic text-balance text-7xl md:text-8xl lg:text-9xl">
              Chronicles of the Realm
            </h1>
            <p className="body text-shadow-cinematic mx-auto mt-7 max-w-xl text-xl text-cream/85">
              From crowned rulers to fallen heroes, wander the halls of every kingdom, coven, and company that
              shapes this saga. {characters.length > 0 && `${characters.length} souls await.`}
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
            <div className="flex flex-col items-center gap-3 animate-bounce">
              <span className="label text-shadow-cinematic text-cream/70">Scroll</span>
              <svg className="h-5 w-5 text-cream/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Explorer */}
        <section className="relative px-6 pb-28 md:px-8 md:pb-36">
          <div className="mx-auto max-w-[1600px]">
            <CharactersExplorer />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
