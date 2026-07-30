'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import GenreBadge from '@/components/ui/genre-badge'

interface CarouselItem {
  image: string
  title: string
  /** Chronological book number (1, 2, 3…) shown above the title. */
  number: number
  genre: string
  pages: string
  alt?: string
}

interface ModernCarouselProps {
  heading: string
  items: CarouselItem[]
  /** Seconds for one full loop through all items. Slower = more elegant. */
  speed?: number
}

const VISIBLE_RANGE = 1
const FADE_RANGE = 1.35
const PEAK_SCALE = 1.18
const SIDE_SCALE = 0.8
const FADE_SCALE = 0.6
const TITLE_FADE_RANGE = 0.35

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

function circularOffset(index: number, position: number, count: number) {
  const raw = index - position
  return raw - count * Math.round(raw / count)
}

export default function ModernCarousel({ heading, items, speed = 32 }: ModernCarouselProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLDivElement | null)[]>([])
  const positionRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const count = items.length

  useLayoutEffect(() => {
    const perSecond = count / speed
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const applyStyles = () => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const offset = circularOffset(i, positionRef.current, count)
        const absOffset = Math.abs(offset)

        const titleEl = titleRefs.current[i]

        if (absOffset > FADE_RANGE) {
          el.style.opacity = '0'
          if (titleEl) titleEl.style.opacity = '0'
          return
        }

        const clamped = Math.min(absOffset, VISIBLE_RANGE)

        // Cinematic zoom: the centered book eases up past its resting size
        // (a gentle zoom-in) then eases back down as it slides toward the
        // sides, driven purely by the auto-advancing position — no hover.
        let scale: number
        if (absOffset <= VISIBLE_RANGE) {
          scale = PEAK_SCALE - smoothstep(clamped) * (PEAK_SCALE - SIDE_SCALE)
        } else {
          const fadeT = (absOffset - VISIBLE_RANGE) / (FADE_RANGE - VISIBLE_RANGE)
          scale = SIDE_SCALE - fadeT * (SIDE_SCALE - FADE_SCALE)
        }

        const translateXPercent = offset * 92
        const translateZ = -clamped * 110
        const rotateY = -offset * 20
        const opacity =
          absOffset <= VISIBLE_RANGE
            ? 1
            : Math.max(0, 1 - (absOffset - VISIBLE_RANGE) / (FADE_RANGE - VISIBLE_RANGE))
        const zIndex = Math.round(100 - absOffset * 10)

        el.style.transform = `translate(-50%, -50%) translateX(${translateXPercent}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(zIndex)

        // The title only ever belongs to whichever book is currently
        // nearest dead-center — it fades and lifts in/out as that changes.
        if (titleEl) {
          const titleT = Math.min(absOffset / TITLE_FADE_RANGE, 1)
          const titleVisibility = 1 - smoothstep(titleT)
          titleEl.style.opacity = String(titleVisibility)
          titleEl.style.transform = `translateY(${(1 - titleVisibility) * 10}px)`
        }
      })
    }

    const tick = (time: number) => {
      if (lastTimeRef.current !== null && !reduceMotion) {
        const delta = (time - lastTimeRef.current) / 1000
        positionRef.current = (positionRef.current + delta * perSecond) % count
      }
      lastTimeRef.current = time

      applyStyles()

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      lastTimeRef.current = null
    }
  }, [count, speed])

  return (
    <section className="relative overflow-hidden bg-black bg-[url('/carousel-background.png')] bg-cover bg-center bg-no-repeat px-6 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto mb-14 max-w-3xl text-center md:mb-20">
        <h2 className="h2 text-balance">{heading}</h2>
      </div>

      <div
        className="relative z-10 mx-auto h-[520px] max-w-[420px] overflow-hidden sm:h-[620px] sm:max-w-3xl md:h-[740px] md:max-w-5xl lg:h-[820px] lg:max-w-6xl"
        style={{ perspective: '1800px' }}
      >
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className="absolute top-1/2 left-1/2 flex w-[62vw] max-w-[240px] flex-col items-center sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt ?? `${item.title} — book cover`}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 300px, 62vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                ref={(el) => {
                  titleRefs.current[i] = el
                }}
                className="mt-5 flex flex-col items-center text-center md:mt-6"
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="mb-2 h-px w-8 bg-gold/60" />
                <p className="label mb-1.5 text-gold/70">Book {String(item.number).padStart(2, '0')}</p>
                <p className="font-serif text-lg text-cream sm:text-xl md:text-2xl">{item.title}</p>
                <GenreBadge genre={item.genre} accent="gold" className="mt-3" />
                <p className="label mt-2 text-cream/40">{item.pages} pages</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
