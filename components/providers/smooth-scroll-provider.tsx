'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/** Pixels of clearance for the fixed header when scrolling to an in-page anchor. */
const HEADER_OFFSET = -110

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Respect the OS-level reduced-motion preference by leaving native
    // (instant/browser-default) scrolling untouched — no Lenis instance,
    // no wheel interception, no RAF loop.
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let frameId: number
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    // In-page nav links (header logo, fullscreen menu) use plain
    // href="#section" anchors — intercept those so they get the same
    // smooth inertia scroll instead of an instant native jump.
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      if (href === '#') {
        event.preventDefault()
        lenis.scrollTo(0)
        return
      }

      const target = document.getElementById(href.slice(1))
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target, { offset: HEADER_OFFSET })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
