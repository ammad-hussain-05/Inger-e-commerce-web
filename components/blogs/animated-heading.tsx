'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedHeadingProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  /** Extra delay in ms before the reveal starts, for staggering multiple headings. */
  delay?: number
  /** Oversized editorial treatment: deeper 3D mask reveal, slower expo easing,
   *  and a subtle scroll-linked parallax drift once revealed. */
  hero?: boolean
}

/** Cinematic word-by-word reveal: each word is masked in an overflow-hidden
 *  sleeve and rises up out of it with a slight 3D tilt, blur-to-sharp focus,
 *  and a slow expo-out ease — triggered once the heading enters view. `hero`
 *  adds a continuous, gentle scroll parallax after the reveal completes, for
 *  a large oversized editorial heading. Falls back to an instant, static
 *  render for prefers-reduced-motion. */
export default function AnimatedHeading({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  hero = false,
}: AnimatedHeadingProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const observeRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const words = text.split(' ')

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(prefersReduced)
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = observeRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Hero only: once revealed, the whole heading drifts a few pixels against
  // scroll — a slow, continuous "dynamic movement" layer on top of the entrance.
  useEffect(() => {
    if (!hero || reduceMotion) return
    const el = parallaxRef.current
    if (!el) return

    let rafId = 0
    let ticking = false

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      if (rect.bottom < -400 || rect.top > vh + 400) return
      const centerOffset = vh / 2 - (rect.top + rect.height / 2)
      const progress = Math.max(-0.6, Math.min(0.6, centerOffset / vh))
      el.style.transform = `translate3d(0, ${(progress * 44).toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [hero, reduceMotion])

  const Tag = as
  const wordDelay = hero ? 100 : 80
  const duration = hero ? 1.2 : 0.8
  const easing = hero ? 'cubic-bezier(0.19,1,0.22,1)' : 'cubic-bezier(0.16,1,0.3,1)'

  return (
    <div ref={observeRef}>
      <div ref={parallaxRef} style={{ willChange: hero && !reduceMotion ? 'transform' : undefined }}>
        <Tag className={className}>
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden pb-[0.2em] align-bottom"
              style={{ perspective: hero ? '1400px' : undefined }}
            >
              <span
                className="inline-block"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? 'translateY(0) rotateX(0deg) scale(1)'
                          : hero
                            ? 'translateY(120%) rotateX(58deg) scale(1.05)'
                            : 'translateY(100%)',
                        transformOrigin: '50% 100%',
                        filter: isVisible ? 'blur(0px)' : hero ? 'blur(18px)' : 'blur(14px)',
                        transition: `opacity ${duration}s ${easing}, transform ${duration}s ${easing}, filter ${duration * 0.85}s ease-out`,
                        transitionDelay: `${delay + i * wordDelay}ms`,
                        willChange: 'transform, opacity, filter',
                      }
                }
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </Tag>
      </div>
    </div>
  )
}
