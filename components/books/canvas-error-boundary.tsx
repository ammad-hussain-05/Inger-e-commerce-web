'use client'

import { Component, type ReactNode } from 'react'

interface CanvasErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface CanvasErrorBoundaryState {
  hasError: boolean
}

/** Catches render-phase crashes in the 3D scene tree (e.g. a bad texture,
 *  a null ref accessed too early) so a bug shows up as a visible, logged
 *  fallback instead of a silent black canvas. Note: this only catches
 *  React render/commit errors — an exception thrown inside a `useFrame`
 *  callback runs outside React entirely and can't be caught here, which is
 *  why `scroll-driven-rig.tsx` also guards its own frame loop. */
export default class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('[BooksExperience] 3D scene crashed during render:', error, info)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
