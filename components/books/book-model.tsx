'use client'

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import gsap from 'gsap'
import type { BookTransform } from '@/lib/book-scene-config'

/** Every book plane is scaled to this height; its width is then derived
 *  from the source image's own aspect ratio (the three cover assets are
 *  not all the same shape) so artwork is never stretched. */
const TARGET_HEIGHT = 2.1

export interface BookModelHandle {
  /** Called once per frame by the scroll-driven rig — applies the
   *  scroll-authored transform plus this book's own idle-float offset. */
  applyFrame: (transform: BookTransform, glowWeight: number) => void
}

interface BookModelProps {
  coverImage: string
  accentRgb: readonly [number, number, number]
  /** Desyncs the idle float/rotation rhythm between the three books, same
   *  intent as the old CSS `book-float-a/b/c` stagger. */
  floatSeed: number
}

function makeRadialGlowTexture(rgb: readonly [number, number, number]) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  const [r, g, b] = rgb
  gradient.addColorStop(0, `rgba(${r},${g},${b},0.85)`)
  gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.35)`)
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const BookModel = forwardRef<BookModelHandle, BookModelProps>(function BookModel(
  { coverImage, accentRgb, floatSeed },
  ref
) {
  const groupRef = useRef<THREE.Group>(null)
  const frontMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const backMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const glowMeshRef = useRef<THREE.Mesh>(null)
  const bobRef = useRef({ y: 0, rotZ: 0 })

  // encodeURI guards against the space/special-character filenames some of
  // the source cover assets ship with (three.js's ImageLoader sets this
  // directly as an <img>.src, so it must already be a well-formed URL).
  const texture = useTexture(encodeURI(coverImage))
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true
  }, [texture])

  // Source covers aren't all the same aspect ratio — size the plane from
  // the actual loaded image so none of the three is stretched.
  const sourceImage = texture.image as HTMLImageElement
  const aspect = sourceImage.width / sourceImage.height
  const bookHeight = TARGET_HEIGHT
  const bookWidth = TARGET_HEIGHT * aspect

  const glowTexture = useMemo(() => makeRadialGlowTexture(accentRgb), [accentRgb])
  useEffect(() => () => glowTexture.dispose(), [glowTexture])

  const backColor = useMemo(() => {
    const [r, g, b] = accentRgb
    return new THREE.Color(r / 255, g / 255, b / 255).multiplyScalar(0.3)
  }, [accentRgb])

  // Continuous idle "alive" float — independent of scroll, so the book
  // never feels frozen even while the reader pauses mid-scene. Each book
  // gets its own duration/delay so the trio never bobs in lockstep.
  useEffect(() => {
    const duration = 6.5 + floatSeed * 1.05
    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: floatSeed * 1.3 })
    tl.to(bobRef.current, {
      y: 0.09 - floatSeed * 0.02,
      rotZ: 0.015,
      duration,
      ease: 'sine.inOut',
    })
    return () => {
      tl.kill()
    }
  }, [floatSeed])

  useImperativeHandle(ref, () => ({
    applyFrame(transform, glowWeight) {
      const group = groupRef.current
      if (!group) return
      group.position.set(transform.x, transform.y + bobRef.current.y, transform.z)
      group.rotation.y = transform.rotY
      group.rotation.z = bobRef.current.rotZ
      group.scale.setScalar(transform.scale)
      group.visible = transform.opacity > 0.005

      if (frontMatRef.current) frontMatRef.current.opacity = transform.opacity
      if (backMatRef.current) backMatRef.current.opacity = transform.opacity * 0.9
      if (glowMatRef.current) {
        glowMatRef.current.opacity = transform.opacity * (0.35 + glowWeight * 0.55)
      }
      glowMeshRef.current?.scale.setScalar(1.7 + glowWeight * 0.5)
    },
  }))

  return (
    <group ref={groupRef} visible={false}>
      {/* Ambient magical glow, additive-blended, sits behind the book */}
      <mesh name="glow-plane" ref={glowMeshRef} position={[0, 0, -0.2]}>
        <planeGeometry args={[bookWidth * 1.7, bookHeight * 1.7]} />
        <meshBasicMaterial
          ref={glowMatRef}
          map={glowTexture}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Back cover — hints thickness when the book rotates */}
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[bookWidth * 0.97, bookHeight * 0.97]} />
        <meshBasicMaterial ref={backMatRef} color={backColor} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Front cover — the pre-rendered cover artwork. Unlit on purpose:
          this is a flat illustrated image (its own lighting/shading is
          already baked in by the artist), so it must render at its true
          brightness regardless of the scene's light rig. */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[bookWidth, bookHeight]} />
        <meshBasicMaterial ref={frontMatRef} map={texture} transparent alphaTest={0.02} opacity={0} side={THREE.FrontSide} />
      </mesh>
    </group>
  )
})

export default BookModel
