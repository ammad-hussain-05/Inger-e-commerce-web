'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { Sparkles } from '@react-three/drei'
import { accentWeights, ACCENT_RGB } from '@/lib/book-scene-config'

export interface ParticleFieldHandle {
  /** Called once per frame by the scroll-driven rig — crossfades the three
   *  accent-colored dust layers based on which book scene is active. */
  applyFrame: (t: number) => void
}

interface ParticleFieldProps {
  count: number
}

function setLayerOpacity(points: THREE.Points | null, weight: number) {
  if (!points) return
  const attr = points.geometry.attributes.opacity as THREE.BufferAttribute | undefined
  if (!attr) return
  ;(attr.array as Float32Array).fill(weight)
  attr.needsUpdate = true
}

const rgbToCss = (rgb: readonly [number, number, number]) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`

const ParticleField = forwardRef<ParticleFieldHandle, ParticleFieldProps>(function ParticleField({ count }, ref) {
  const greenRef = useRef<THREE.Points>(null)
  const purpleRef = useRef<THREE.Points>(null)
  const goldRef = useRef<THREE.Points>(null)

  useImperativeHandle(ref, () => ({
    applyFrame(t) {
      const weights = accentWeights(t)
      setLayerOpacity(greenRef.current, weights.green)
      setLayerOpacity(purpleRef.current, weights.purple)
      setLayerOpacity(goldRef.current, weights.gold)
    },
  }))

  const layerCount = Math.max(20, Math.round(count / 2))

  return (
    <group>
      <Sparkles
        ref={greenRef}
        count={layerCount}
        scale={[7, 4.5, 6]}
        size={5}
        speed={0.25}
        noise={1.2}
        color={rgbToCss(ACCENT_RGB.forestGreen)}
        opacity={0}
      />
      <Sparkles
        ref={purpleRef}
        count={layerCount}
        scale={[7, 4.5, 6]}
        size={5}
        speed={0.25}
        noise={1.2}
        color={rgbToCss(ACCENT_RGB.royalPurple)}
        opacity={0}
      />
      <Sparkles
        ref={goldRef}
        count={layerCount}
        scale={[7, 5, 6]}
        size={4}
        speed={0.3}
        noise={1}
        color={rgbToCss(ACCENT_RGB.gold)}
        opacity={0}
      />
    </group>
  )
})

export default ParticleField
