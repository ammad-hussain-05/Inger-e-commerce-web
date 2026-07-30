'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import GenreBadge from '@/components/ui/genre-badge'
import { books, type BookAccent } from '@/lib/books'
import { T } from '@/lib/book-scene-config'

export const ACCENT_CTA: Record<BookAccent, string> = {
  'forest-green': 'bg-forest-green hover:bg-forest-green-light',
  'royal-purple': 'bg-royal-purple hover:bg-royal-purple-light',
  gold: 'bg-gold hover:bg-gold-light',
}

interface FadeRangeProps {
  progress: MotionValue<number>
  range: [number, number, number, number]
  children: React.ReactNode
  className?: string
}

/** One scroll-bound "title card" — fades/rises/unblurs in over `range`
 *  and reverses out, driven entirely by MotionValues (no React state, so
 *  this never re-renders while scrolling). */
function ScrollCard({ progress, range, children, className = '' }: FadeRangeProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [28, 0, 0, -16])
  const blur = useTransform(progress, range, [8, 0, 0, 6])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  const pointerEvents = useTransform(opacity, (o) => (o > 0.15 ? 'auto' : 'none'))

  return (
    <motion.div
      style={{ opacity, y, filter, pointerEvents }}
      className={`pointer-events-none absolute inset-x-0 flex flex-col items-center px-6 text-center md:px-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface BookOverlaySectionsProps {
  progress: MotionValue<number>
}

export default function BookOverlaySections({ progress }: BookOverlaySectionsProps) {
  const acclaimed = books.acclaimed
  const featured = books.featured
  const latest = books.latest

  return (
    <>
      {/* Hero */}
      <ScrollCard progress={progress} range={[0, 0, T.heroEnd, T.book1EnterEnd]} className="top-0 h-full justify-center">
        <p className="label mb-4 text-gold">The World of Inger &amp; Alex Moore</p>
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gold/40" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
          <div className="h-px w-10 bg-gold/40" />
        </div>
        <h1 className="h1 text-balance">The Realm of Mardalla</h1>
        <p className="body mx-auto mt-6 max-w-xl text-cream/60">
          Three chronicles await beyond the veil. Scroll to step into the realm.
        </p>
        <p className="label mt-14 flex items-center justify-center gap-2 text-cream/40">
          <Sparkles className="h-3.5 w-3.5 text-gold/50" strokeWidth={1.5} />
          Scroll to begin the journey
        </p>
      </ScrollCard>

      {/* Book One — Two Elves and a Halfling Walk Into a Bar */}
      <ScrollCard
        progress={progress}
        range={[T.heroEnd + 0.06, T.book1EnterEnd, T.book1HoldEnd, T.handoff1End]}
        className="bottom-0 justify-end pb-20 md:pb-28"
      >
        <p className="label mb-3 text-forest-green-light">{acclaimed.tagline}</p>
        <GenreBadge genre={acclaimed.genre} accent={acclaimed.accent} className="mb-4" />
        <h2 className="h3 text-balance">{acclaimed.title}</h2>
        <p className="label mt-2 text-cream/50">{acclaimed.series}</p>
        <p className="body mx-auto mt-5 max-w-2xl text-cream/75">{acclaimed.description}</p>
        <button
          type="button"
          className={`group mt-7 inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 ${ACCENT_CTA[acclaimed.accent]}`}
        >
          {acclaimed.ctaLabel}
          <ArrowRight strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </button>
      </ScrollCard>

      {/* Book Two — Rallying Cry */}
      <ScrollCard
        progress={progress}
        range={[T.handoff1End - 0.06, T.handoff1End, T.book2HoldEnd, T.handoff2End]}
        className="bottom-0 justify-end pb-20 md:pb-28"
      >
        <p className="label mb-3 text-royal-purple-light">{featured.tagline}</p>
        <GenreBadge genre={featured.genre} accent={featured.accent} className="mb-4" />
        <h2 className="h3 text-balance">{featured.title}</h2>
        <p className="label mt-2 text-cream/50">{featured.series}</p>
        <p className="body mx-auto mt-5 max-w-2xl text-cream/75">{featured.description}</p>
        <button
          type="button"
          className={`group mt-7 inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 ${ACCENT_CTA[featured.accent]}`}
        >
          {featured.ctaLabel}
          <ArrowRight strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </button>
      </ScrollCard>

      {/* Book Three — Calling the Lost Ones Home */}
      <ScrollCard
        progress={progress}
        range={[T.handoff2End - 0.06, T.handoff2End, T.book3HoldEnd - 0.03, T.book3HoldEnd + 0.05]}
        className="bottom-0 justify-end pb-20 md:pb-28"
      >
        <p className="label mb-3 text-gold">{latest.tagline}</p>
        <GenreBadge genre={latest.genre} accent={latest.accent} className="mb-4" />
        <h2 className="h3 text-balance">{latest.title}</h2>
        <p className="label mt-2 text-cream/50">{latest.series}</p>
        <p className="body mx-auto mt-5 max-w-2xl text-cream/75">{latest.description}</p>
        <button
          type="button"
          className={`group mt-7 inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 ${ACCENT_CTA[latest.accent]}`}
        >
          {latest.ctaLabel}
          <ArrowRight strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </button>
      </ScrollCard>
    </>
  )
}
