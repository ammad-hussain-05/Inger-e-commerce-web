'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, useScroll } from 'framer-motion'
import { getBreakpoint, TOTAL_VH, type Breakpoint } from '@/lib/book-scene-config'
import BookOverlaySections from './book-overlay-sections'
import LogoReveal from './logo-reveal'
import BooksExperienceFallback from './books-experience-fallback'
import CanvasErrorBoundary from './canvas-error-boundary'

// three.js needs `window`/WebGL, so the whole canvas tree is client-only —
// loading falls back to a plain black frame while the bundle streams in.
const BookSceneCanvas = dynamic(() => import('./book-scene-canvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" aria-hidden />,
})

export default function BooksExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop')
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (prefersReducedMotion) {
    return <BooksExperienceFallback />
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${TOTAL_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <CanvasErrorBoundary
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-black px-6 text-center">
              <p className="label text-cream/50">
                The 3D scene couldn&apos;t load — open the browser console for details.
              </p>
            </div>
          }
        >
          <BookSceneCanvas progress={scrollYProgress} breakpoint={breakpoint} />
        </CanvasErrorBoundary>

        <div className="pointer-events-none absolute inset-0 z-20">
          <BookOverlaySections progress={scrollYProgress} />
          <LogoReveal progress={scrollYProgress} />
        </div>

        {/* Cinematic vignette — keeps overlay text readable over the WebGL scene */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  )
}
