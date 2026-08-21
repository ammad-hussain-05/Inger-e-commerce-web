'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

/** Pixels of clearance for the fixed header when scrolling to an in-page anchor. */
const HEADER_OFFSET = -110

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

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
    lenisRef.current = lenis

    let frameId: number
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    // In-page nav links (header logo, fullscreen menu, footer) use
    // href="#section" or href="/#section" anchors. Only intercept the ones
    // that target *this* page — a link like "/#about" clicked from another
    // route is left alone so Next.js can navigate home first; the
    // pathname-change effect below then finishes the scroll once landed.
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href*="#"]')
      if (!anchor) return

      const hrefAttr = anchor.getAttribute('href')
      if (!hrefAttr) return

      const hashIndex = hrefAttr.indexOf('#')
      if (hashIndex === -1) return

      const pathPart = hrefAttr.slice(0, hashIndex)
      const hash = hrefAttr.slice(hashIndex + 1)
      const isSamePage = pathPart === '' || pathPart === window.location.pathname
      if (!isSamePage) return

      if (!hash) {
        event.preventDefault()
        lenis.scrollTo(0)
        return
      }

      const target = document.getElementById(hash)
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target, { offset: HEADER_OFFSET })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Handles the cross-page case: e.g. clicking "About" while on /blogs
  // navigates to "/#about" — once that navigation lands here (pathname
  // changes) and the new page's sections have mounted, smoothly scroll to
  // the hash target instead of leaving the browser's instant jump in place.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.slice(1)
    const timeoutId = window.setTimeout(() => {
      const target = document.getElementById(id)
      if (!target) return

      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, { offset: HEADER_OFFSET })
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 80)

    return () => window.clearTimeout(timeoutId)
  }, [pathname])

  return <>{children}</>
}
