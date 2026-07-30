'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'

type Accent = 'gold' | 'forest-green' | 'royal-purple'

interface CharacterQuote {
  id: number
  quote: string
  character: string
  role: string
  book?: string
  accent: Accent
}

/** Placeholder data — add new entries here as the client sends more quotes. */
const characterQuotes: CharacterQuote[] = [
  {
    id: 1,
    quote: "Family isn't the blood you're born from — it's the ground you choose to defend together.",
    character: 'Emerald Star',
    role: 'Elven Ranger',
    book: 'Two Elves and a Halfling',
    accent: 'forest-green',
  },
  {
    id: 2,
    quote: 'Magic bends to will, and will bends to no one.',
    character: 'Thistle',
    role: 'Wild Mage',
    book: 'Rallying Cry',
    accent: 'royal-purple',
  },
  {
    id: 3,
    quote: "A Halfling's pockets are small, but a Halfling's loyalty has no bottom.",
    character: 'Myst Roottapper',
    role: 'Halfling Rogue',
    book: 'Two Elves and a Halfling',
    accent: 'gold',
  },
  {
    id: 4,
    quote: 'Every stronghold falls in time. What we build in each other does not.',
    character: 'Lord Cornelius',
    role: 'Duke of the Southern Reach',
    book: 'Rallying Cry',
    accent: 'gold',
  },
]

const accentStyles: Record<
  Accent,
  { text: string; border: string; borderHover: string; bgHover: string; icon: string; shadow: string }
> = {
  gold: {
    text: 'text-gold',
    border: 'border-gold/20',
    borderHover: 'group-hover:border-gold/50',
    bgHover: 'group-hover:bg-gold/5',
    icon: 'text-gold/30',
    shadow: 'group-hover:shadow-[0_20px_60px_-20px_rgba(201,169,97,0.3)]',
  },
  'forest-green': {
    text: 'text-forest-green',
    border: 'border-forest-green/20',
    borderHover: 'group-hover:border-forest-green/50',
    bgHover: 'group-hover:bg-forest-green/5',
    icon: 'text-forest-green/30',
    shadow: 'group-hover:shadow-[0_20px_60px_-20px_rgba(26,95,71,0.3)]',
  },
  'royal-purple': {
    text: 'text-royal-purple',
    border: 'border-royal-purple/20',
    borderHover: 'group-hover:border-royal-purple/50',
    bgHover: 'group-hover:bg-royal-purple/5',
    icon: 'text-royal-purple/30',
    shadow: 'group-hover:shadow-[0_20px_60px_-20px_rgba(107,63,160,0.3)]',
  },
}

export default function CharacterQuotes() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="character-quotes"
      className="relative overflow-hidden px-6 py-28 md:px-8 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-charcoal/20 to-black" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-[420px] w-[420px] rounded-full bg-gold/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 md:mb-20 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="label mb-3 text-gold">Words From the Story</p>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="h-px w-6 bg-gold/40" />
            <div className="h-1 w-1 rotate-45 bg-gold/60" />
            <div className="h-px w-6 bg-gold/40" />
          </div>
          <h2 className="h2 text-balance">Mottos They Live By</h2>
          <p className="body mt-6 text-cream/60">
            Quotes and family mottos straight from the characters who carry these stories forward.
          </p>
        </div>

        {/* Quote grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
          {characterQuotes.map((entry, index) => {
            const accent = accentStyles[entry.accent]

            return (
              <article
                key={entry.id}
                className={`group transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
                }}
              >
                <div
                  className={`flex h-full flex-col rounded-xl border ${accent.border} bg-black/40 p-8 backdrop-blur-sm transition-all duration-500 ease-out ${accent.borderHover} ${accent.bgHover} hover:-translate-y-1 ${accent.shadow}`}
                >
                  <Quote
                    strokeWidth={1.5}
                    className={`mb-6 h-8 w-8 shrink-0 ${accent.icon} transition-transform duration-300 ease-out group-hover:scale-110`}
                  />

                  <p className="font-serif text-xl text-balance leading-relaxed text-cream">
                    &ldquo;{entry.quote}&rdquo;
                  </p>

                  <div className="mt-8 border-t border-cream/10 pt-6">
                    <p className={`font-serif text-lg ${accent.text}`}>{entry.character}</p>
                    <p className="label mt-1 text-cream/40">{entry.role}</p>
                    {entry.book && (
                      <p className="label mt-3 text-[10px] tracking-widest text-cream/30">{entry.book}</p>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
