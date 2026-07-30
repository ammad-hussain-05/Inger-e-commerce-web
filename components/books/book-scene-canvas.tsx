'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import { books, type BookId } from '@/lib/books'
import { ACCENT_RGB, BOOK_ORDER, QUALITY_TIERS, type Breakpoint } from '@/lib/book-scene-config'
import BookModel, { type BookModelHandle } from './book-model'
import ParticleField, { type ParticleFieldHandle } from './particle-field'
import ScrollDrivenRig from './scroll-driven-rig'

const ACCENT_RGB_BY_ID: Record<BookId, readonly [number, number, number]> = {
  acclaimed: ACCENT_RGB.forestGreen,
  featured: ACCENT_RGB.royalPurple,
  latest: ACCENT_RGB.gold,
}

const cssRgb = (rgb: readonly [number, number, number]) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`

interface BookSceneCanvasProps {
  progress: MotionValue<number>
  breakpoint: Breakpoint
}

/** The entire WebGL tree for the /books cinematic showcase. Dynamically
 *  imported with `ssr: false` from `books-experience.tsx` since three.js
 *  requires `window`/a GPU context. */
export default function BookSceneCanvas({ progress, breakpoint }: BookSceneCanvasProps) {
  const quality = QUALITY_TIERS[breakpoint]

  const acclaimedRef = useRef<BookModelHandle>(null)
  const featuredRef = useRef<BookModelHandle>(null)
  const latestRef = useRef<BookModelHandle>(null)
  const particleRef = useRef<ParticleFieldHandle>(null)

  const bookRefs = useMemo(
    () => ({ acclaimed: acclaimedRef, featured: featuredRef, latest: latestRef }),
    []
  )

  return (
    <Canvas
      dpr={quality.dpr}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 40 }}
      performance={{ min: 0.5 }}
      onCreated={(state) => {
        // Diagnostic: confirms the WebGL context actually initializes. If
        // this never logs, the problem is Canvas/WebGL setup, not the
        // scene content below.
        console.info('[BookSceneCanvas] WebGL context ready', state.gl.getContextAttributes())
      }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <fogExp2 attach="fog" args={['#0a0a0a', 0.07]} />

      {/* TEMPORARY diagnostic — always visible, ignores scroll/opacity/
          Suspense entirely. If this cube isn't visible, the problem is the
          Canvas/camera pipeline itself, not the books. Remove once the
          books are confirmed visible. */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* Modern three.js uses physically-based light units (no legacy mode
          to fall back to), so these are calibrated well above the old
          "intensity 1" defaults — otherwise the scene renders essentially
          black even with objects correctly in view. */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} color="#fff3e0" />
      <pointLight position={[-3, 1, 2]} intensity={18} color={cssRgb(ACCENT_RGB.forestGreen)} distance={10} decay={2} />
      <pointLight position={[3, 1, 2]} intensity={18} color={cssRgb(ACCENT_RGB.royalPurple)} distance={10} decay={2} />
      <pointLight position={[0, 2, 3]} intensity={14} color={cssRgb(ACCENT_RGB.gold)} distance={10} decay={2} />

      <Suspense fallback={null}>
        {BOOK_ORDER.map((id, index) => (
          <BookModel
            key={id}
            ref={bookRefs[id]}
            coverImage={books[id].coverImage}
            accentRgb={ACCENT_RGB_BY_ID[id]}
            floatSeed={index}
          />
        ))}
        <ParticleField ref={particleRef} count={quality.particleCount} />
      </Suspense>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.45}
        scale={12}
        blur={2.4}
        far={2.2}
        resolution={quality.shadowResolution}
        color="#000000"
      />

      <ScrollDrivenRig
        progress={progress}
        bookRefs={bookRefs}
        particleRef={particleRef}
        parallaxEnabled={quality.parallax}
      />
    </Canvas>
  )
}
