'use client'

import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import type { BookId } from '@/lib/books'
import { BOOK_ORDER, accentWeights, sampleBookTransform, sampleCamera, sampleFogRgb, lerp } from '@/lib/book-scene-config'
import type { BookModelHandle } from './book-model'
import type { ParticleFieldHandle } from './particle-field'

const GLOW_WEIGHT_KEY: Record<BookId, 'green' | 'purple' | 'gold'> = {
  acclaimed: 'green',
  featured: 'purple',
  latest: 'gold',
}

interface ScrollDrivenRigProps {
  progress: MotionValue<number>
  bookRefs: Record<BookId, RefObject<BookModelHandle | null>>
  particleRef: RefObject<ParticleFieldHandle | null>
  parallaxEnabled: boolean
}

/** Non-visual "director" — the single per-frame read of scroll progress
 *  that drives every book's transform, the camera dolly/zoom, the scene
 *  fog color, and the particle crossfade. Everything else in the 3D scene
 *  is a pure function of the values this component writes each frame. */
export default function ScrollDrivenRig({ progress, bookRefs, particleRef, parallaxEnabled }: ScrollDrivenRigProps) {
  const fogColorRef = useRef(new THREE.Color())
  const hasLoggedError = useRef(false)

  useFrame((state) => {
    // A throw in here happens inside R3F's own rAF loop, entirely outside
    // React — no error boundary can catch it, and left unguarded it would
    // silently freeze every book/camera update forever (the loop itself
    // keeps running, but this callback's work never completes). Catching
    // it here guarantees a visible, one-time console error instead of a
    // permanently frozen/black scene.
    try {
      const t = progress.get()
      const weights = accentWeights(t)

      for (const id of BOOK_ORDER) {
        const handle = bookRefs[id].current
        if (!handle) continue
        const transform = sampleBookTransform(id, t)
        const glowWeight = weights[GLOW_WEIGHT_KEY[id]]
        handle.applyFrame(transform, glowWeight)
      }

      particleRef.current?.applyFrame(t)

      const cam = sampleCamera(t)
      const camera = state.camera as THREE.PerspectiveCamera
      const targetX = parallaxEnabled ? state.pointer.x * 0.35 : 0
      const targetY = parallaxEnabled ? state.pointer.y * 0.2 : 0
      camera.position.x = lerp(camera.position.x, targetX, 0.06)
      camera.position.y = lerp(camera.position.y, targetY, 0.06)
      camera.position.z = cam.z
      if (camera.fov !== cam.fov) {
        camera.fov = cam.fov
        camera.updateProjectionMatrix()
      }
      camera.lookAt(0, 0, 0)

      const [r, g, b] = sampleFogRgb(t)
      fogColorRef.current.setRGB(r / 255, g / 255, b / 255)
      if (state.scene.fog) {
        state.scene.fog.color.copy(fogColorRef.current)
      }
    } catch (error) {
      if (!hasLoggedError.current) {
        hasLoggedError.current = true
        console.error('[ScrollDrivenRig] frame update threw — scene will look frozen:', error)
      }
    }
  })

  return null
}
