'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { characters as allCharacters } from '@/lib/characters'

const ICON_STROKE_WIDTH = 1.5

interface MapEntry {
  id: string
  book: string
  title: string
  src: string
  alt: string
  /** Intrinsic pixel dimensions of the supplied artwork — used to size the frame without ever cropping. */
  width: number
  height: number
}

/** Source artwork supplied by the client in /public/changes/ — used as-is, never redrawn or regenerated. */
const maps: MapEntry[] = [
  {
    id: 'mardalla',
    book: 'Book Three',
    title: 'Mardalla',
    src: '/mardalla-map.png',
    alt: 'Map of Mardalla',
    width: 781,
    height: 614,
  },
  {
    id: 'blood-lock-elven',
    book: 'Book Two',
    title: 'Elven Diagram',
    src: '/blood-lock-elven-diagram.png',
    alt: 'Blood Lock Elven diagram',
    width: 1741,
    height: 2122,
  },
  {
    id: 'cornelius-duchy',
    book: 'Book Two',
    title: "Lord Cornelius' Lands",
    src: '/cornelius-duchy-map.png',
    alt: 'War Map of the Duchy of Lord Cornelius',
    width: 650,
    height: 190,
  },
]

const characterCount = allCharacters.length

export default function MapsCharacters() {
  const [isVisible, setIsVisible] = useState(false)
  const [lightbox, setLightbox] = useState<MapEntry | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!lightbox) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section
      ref={sectionRef}
      id="maps-characters"
      className="relative overflow-hidden bg-black px-6 py-28 md:px-8 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-charcoal/20 to-black" />
      <div className="pointer-events-none absolute top-0 left-1/4 h-[480px] w-[480px] rounded-full bg-gold/[0.04] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/5 h-[420px] w-[420px] rounded-full bg-gold/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className={`mx-auto mb-20 max-w-2xl text-center transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none md:mb-24 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="label mb-3 text-gold">Maps &amp; Characters</p>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="h-px w-6 bg-gold/40" />
            <div className="h-1 w-1 rotate-45 bg-gold/60" />
            <div className="h-px w-6 bg-gold/40" />
          </div>
          <h2 className="h2 text-balance">Explore the World</h2>
          <p className="body mt-6 text-cream/60">
            A deeper look into the characters and territories behind the books &mdash; the faces who carry the story
            and the lands that shape it.
          </p>
        </div>

        {/* Characters preview */}
        <div
          className={`mb-20 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none md:mb-28 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-black/50 px-8 py-12 backdrop-blur-sm md:px-16 md:py-16">
            {/* Ghost numeral accent */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 right-4 select-none font-serif text-[8rem] leading-none text-gold/[0.06] md:-top-10 md:right-10 md:text-[13rem]"
            >
              {characterCount}
            </span>

            <div className="relative grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
              <div className="md:col-span-8">
                <p className="label mb-4 text-xs text-gold/70">Characters</p>
                <h3 className="h3 max-w-lg text-balance">Meet the people who shape the world.</h3>
                <p className="body mt-5 max-w-lg text-cream/65">
                  From the Tri-Lords to the smallest village, explore the full cast of characters &mdash; their
                  roles, their relationships, and the stories they carry through the Chronicles.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
                <p className="label text-xs text-cream/40">
                  <span className="text-gold">{characterCount}</span> Characters &middot; Full Directory
                </p>
                <Link
                  href="/characters"
                  className="group inline-flex items-center gap-3 rounded-sm border border-gold/40 px-8 py-3.5 text-sm font-medium tracking-widest text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/5"
                >
                  Explore Characters
                  <ArrowRight
                    strokeWidth={ICON_STROKE_WIDTH}
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Maps */}
        <div>
          <div
            className={`mx-auto mb-12 max-w-xl text-center transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none md:mb-14 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="label mb-3 text-xs text-gold/70">Maps</p>
            <h3 className="h3 text-balance">Places, territories, and worlds behind the story.</h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
            {/* Mardalla — large featured landscape map */}
            <MapCard
              map={maps[0]}
              onView={setLightbox}
              isVisible={isVisible}
              delay={0}
              className="lg:col-span-7 lg:row-span-1"
            />

            {/* Elven diagram — tall portrait, spans full height on the right */}
            <MapCard
              map={maps[1]}
              onView={setLightbox}
              isVisible={isVisible}
              delay={150}
              className="lg:col-span-5 lg:row-span-2"
            />

            {/* Cornelius' Lands — wide banner beneath Mardalla */}
            <MapCard
              map={maps[2]}
              onView={setLightbox}
              isVisible={isVisible}
              delay={300}
              className="lg:col-span-7 lg:row-span-1"
            />
          </div>
        </div>
      </div>

      {/* Map lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" strokeWidth={ICON_STROKE_WIDTH} />
          </button>

          <div
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[72vh] w-full">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="90vw"
                quality={100}
              />
            </div>
            <div className="mt-6 text-center">
              <span className="label text-xs text-gold/70">{lightbox.book}</span>
              <h4 className="h4 mt-1 text-balance">{lightbox.title}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

interface MapCardProps {
  map: MapEntry
  onView: (map: MapEntry) => void
  isVisible: boolean
  delay: number
  className?: string
}

function MapCard({ map, onView, isVisible, delay, className = '' }: MapCardProps) {
  return (
    <article
      className={`group transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <button
        type="button"
        onClick={() => onView(map)}
        className="relative flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-charcoal/50 to-black/60 text-left transition-all duration-500 ease-out group-hover:border-gold/50 group-hover:shadow-[0_30px_80px_-24px_rgba(201,169,97,0.28)]"
      >
        <div className="relative min-h-[220px] flex-1 overflow-hidden bg-black/30 p-6 md:p-8">
          <div
            className="relative mx-auto h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ aspectRatio: `${map.width} / ${map.height}` }}
          >
            <Image
              src={map.src}
              alt={map.alt}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-gold/10 px-6 py-5 md:px-8">
          <div>
            <span className="label text-[11px] text-gold/60">{map.book}</span>
            <h4 className="font-serif text-xl text-cream mt-1 text-balance">{map.title}</h4>
          </div>

          <span className="label inline-flex shrink-0 items-center gap-1.5 text-xs text-gold/80 transition-all duration-300 group-hover:gap-2.5 group-hover:text-gold">
            View Map
            <ArrowUpRight strokeWidth={ICON_STROKE_WIDTH} className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </article>
  )
}
