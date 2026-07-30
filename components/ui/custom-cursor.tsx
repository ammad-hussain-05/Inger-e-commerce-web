'use client'

import { useEffect, useRef } from 'react'

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'

const DOT_LERP = 0.35
const RING_LERP = 0.15

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Touch devices have no persistent pointer, and reduced-motion users
    // asked for less on-screen movement — leave the native cursor alone.
    if (isTouchDevice || prefersReducedMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('custom-cursor-active')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let ringX = mouseX
    let ringY = mouseY
    let frameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handlePointerOver = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest(HOVER_SELECTOR)) {
        ring.classList.add('is-hovering')
      }
    }

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as Element | null
      const related = e.relatedTarget as Element | null
      if (target?.closest(HOVER_SELECTOR) && !related?.closest(HOVER_SELECTOR)) {
        ring.classList.remove('is-hovering')
      }
    }

    const handleMouseDown = () => ring.classList.add('is-pressing')
    const handleMouseUp = () => ring.classList.remove('is-pressing')
    const handleLeaveWindow = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const handleEnterWindow = () => {
      dot.style.opacity = '1'
      ring.style.opacity = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleLeaveWindow)
    document.addEventListener('mouseenter', handleEnterWindow)

    const tick = () => {
      dotX += (mouseX - dotX) * DOT_LERP
      dotY += (mouseY - dotY) * DOT_LERP
      ringX += (mouseX - ringX) * RING_LERP
      ringY += (mouseY - ringY) * RING_LERP

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleLeaveWindow)
      document.removeEventListener('mouseenter', handleEnterWindow)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  )
}
