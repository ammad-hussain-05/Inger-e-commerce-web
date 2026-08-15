'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'

type Accent = 'gold' | 'forest-green' | 'royal-purple'

interface FamilyMotto {
  id: number
  family: string
  motto: string
  accent: Accent
}

/** Source of truth: /public/changes/Mottos They Live By.docx — exact family order and wording. */
const familyMottos: FamilyMotto[] = [
  { id: 1, family: 'Star Family', motto: 'Honor, Loyalty, Eternity', accent: 'gold' },
  { id: 2, family: 'Thistle Family', motto: 'No Kill Like Overkill', accent: 'forest-green' },
  { id: 3, family: 'Roottapper Family', motto: 'Home and Hearth Weather All Storms', accent: 'royal-purple' },
  { id: 4, family: 'Darinae Family', motto: 'Strength of Will is All', accent: 'gold' },
  { id: 5, family: 'Carinae Family', motto: 'We are Nature Unbound', accent: 'forest-green' },
  { id: 6, family: 'Almeric Family', motto: "The Warrior's Greatest Weapon is Diplomacy", accent: 'royal-purple' },
  { id: 7, family: 'Halamaken Family', motto: 'We are the Songs, We are the Story', accent: 'gold' },
  { id: 8, family: 'Lakotani Family', motto: 'One Arrow is Good, Twenty-four is Better', accent: 'forest-green' },
  { id: 9, family: 'Loreleia Family', motto: 'We are the Shield of our People', accent: 'royal-purple' },
  { id: 10, family: 'Rowaen Family', motto: 'We Protect All of Nature', accent: 'gold' },
  { id: 11, family: 'Shabyn Family', motto: 'We are Stronger than the Waves', accent: 'forest-green' },
  { id: 12, family: 'Solerin Family', motto: 'We are the Light of Nature', accent: 'royal-purple' },
  { id: 13, family: 'Telerikke Family', motto: 'The Earth is our Treasure to Guard', accent: 'gold' },
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
            The words each family carries into every generation, every battle, every home.
          </p>
        </div>

        {/* Family motto grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {familyMottos.map((entry, index) => {
            const accent = accentStyles[entry.accent]

            return (
              <article
                key={entry.id}
                className={`group transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
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
                    &ldquo;{entry.motto}&rdquo;
                  </p>

                  <div className="mt-8 border-t border-cream/10 pt-6">
                    <p className={`label ${accent.text}`}>{entry.family}</p>
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
