'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-28 md:px-8 md:py-36 lg:py-40"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-charcoal/20 to-black" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section label */}
        <div className="mb-16 space-y-4 md:mb-20">
          <p className="label text-gold">Meet the Author</p>
          <div className="gold-accent-line" />
        </div>

        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Portrait */}
          <div
            className={`md:col-span-5 transition-all duration-700 ${
              isVisible ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-8 scale-[0.97] opacity-0'
            }`}
          >
            <div className="mx-auto w-full max-w-md md:mx-0">
              <div className="group relative">
                {/* Ambient glow */}
                <div className="absolute -inset-6 rounded-full bg-gold/10 blur-3xl transition-opacity duration-700 group-hover:opacity-90" />

                {/* Outer mat frame */}
                <div className="pointer-events-none absolute -inset-4 rounded-xl border border-gold/15 transition-colors duration-700 group-hover:border-gold/30" />

                {/* Gradient bezel */}
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-gold/40 via-gold/15 to-transparent" />

                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg border border-gold/40 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.85)] transition-all duration-700 group-hover:border-gold/70 group-hover:shadow-[0_30px_80px_-15px_rgba(201,169,97,0.3)]">
                  <Image
                    src="/author-portrait.png"
                    alt="Author Portrait"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Corner accents */}
                <div className="pointer-events-none absolute -top-3 -left-3 h-9 w-9 border-t-2 border-l-2 border-gold/50 transition-colors duration-500 group-hover:border-gold" />
                <div className="pointer-events-none absolute -right-3 -bottom-3 h-9 w-9 border-r-2 border-b-2 border-gold/50 transition-colors duration-500 group-hover:border-gold" />
              </div>

              {/* Decorative accent line */}
              <div className="mt-8 flex items-center justify-center gap-4 md:justify-start">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-gold/60" />
                <div className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                <div className="h-px max-w-[80px] flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-700 md:col-span-7 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div>
              <h2 className="h2 text-balance mb-2">
                Crafting Worlds Where Steel Meets Soul
              </h2>
              <div className="gold-line my-4" />
            </div>

            <div className="space-y-6">
              <p className="body text-cream/80">
                With a passion for intricate worldbuilding and morally complex characters, I create immersive narratives that blur the lines between past and future, science and magic. My work explores themes of power, rebellion, identity, and transformation through the lens of speculative fiction.
              </p>

              <p className="body text-cream/80">
                Every story begins with a question: What if the world you knew was built on a lie? Through steampunk aesthetics and urban fantasy realms, I invite readers to challenge assumptions and discover the extraordinary hidden within the mechanical and mundane.
              </p>

              <p className="body text-cream/80">
                When not writing, I&apos;m inspired by history, architecture, music, and the endless possibilities of human resilience and creativity.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 border-t border-b border-gold/20 py-6">
              <div>
                <p className="label mb-2 text-xs text-gold/60">Published Works</p>
                <p className="font-serif text-3xl text-cream">7</p>
              </div>
              <div>
                <p className="label mb-2 text-xs text-gold/60">Active Readers</p>
                <p className="font-serif text-3xl text-cream">50K+</p>
              </div>
            </div>

            <button className="btn-primary w-full sm:w-auto sm:px-12">
              Join Mailing List
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
