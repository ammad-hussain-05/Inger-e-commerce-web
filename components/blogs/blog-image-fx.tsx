'use client'

import { useEffect, useRef, useState } from 'react'

interface BlogImageFXProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

const VERTEX_SRC = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const FRAGMENT_SRC = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uStrength;
  uniform float uTime;
  uniform vec2 uCoverScale;
  varying vec2 vUv;

  void main() {
    vec2 texUv = (vUv - 0.5) * uCoverScale + 0.5;

    float dist = distance(vUv, uMouse);
    float falloff = smoothstep(0.42, 0.0, dist);
    float ripple = sin(dist * 26.0 - uTime * 3.6);
    vec2 dir = vUv - uMouse;
    float len = length(dir) + 0.0001;
    dir /= len;
    vec2 offset = dir * ripple * falloff * uStrength * 0.028;

    gl_FragColor = texture2D(uTexture, texUv + offset);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** Featured image with a subtle mouse-follow WebGL ripple on hover — a light,
 *  hand-rolled effect (no added dependencies) that gracefully falls back to a
 *  plain image on touch devices, reduced-motion, or if WebGL is unavailable. */
export default function BlogImageFX({ src, alt, priority = false, className = '' }: BlogImageFXProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglActive, setWebglActive] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
      rootMargin: '200px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || isCoarsePointer) return

    const container = containerRef.current
    const canvas = canvasRef.current
    const imgEl = imgRef.current
    if (!container || !canvas || !imgEl) return

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true })
    if (!gl) return

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )
    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uStrength = gl.getUniformLocation(program, 'uStrength')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uCoverScale = gl.getUniformLocation(program, 'uCoverScale')

    let destroyed = false
    let rafId = 0
    let running = false
    let time = 0
    let coverScale: [number, number] = [1, 1]

    const mouse = { x: 0.5, y: 0.5 }
    const targetMouse = { x: 0.5, y: 0.5 }
    let strength = 0
    let targetStrength = 0

    const uploadTexture = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgEl)
      setWebglActive(true)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = container.clientWidth
      const height = container.clientHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)

      const canvasAspect = width / height
      const imageAspect = imgEl.naturalWidth / imgEl.naturalHeight || 1
      coverScale = imageAspect > canvasAspect ? [canvasAspect / imageAspect, 1] : [1, imageAspect / canvasAspect]
    }

    const draw = (delta: number) => {
      mouse.x += (targetMouse.x - mouse.x) * 0.14
      mouse.y += (targetMouse.y - mouse.y) * 0.14
      strength += (targetStrength - strength) * 0.08
      time += delta

      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uStrength, strength)
      gl.uniform1f(uTime, time)
      gl.uniform2f(uCoverScale, coverScale[0], coverScale[1])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let lastTimestamp: number | null = null
    const tick = (timestamp: number) => {
      if (destroyed) return
      const delta = lastTimestamp === null ? 0 : (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp
      draw(delta)

      const settled = strength < 0.001 && targetStrength === 0
      if (settled) {
        running = false
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (running || destroyed) return
      running = true
      lastTimestamp = null
      rafId = requestAnimationFrame(tick)
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouse.x = (e.clientX - rect.left) / rect.width
      targetMouse.y = 1 - (e.clientY - rect.top) / rect.height
      targetStrength = 1
      startLoop()
    }

    const handlePointerLeave = () => {
      targetStrength = 0
      startLoop()
    }

    const ready = () => {
      if (destroyed) return
      resize()
      uploadTexture()
      draw(0)
    }

    if (imgEl.complete && imgEl.naturalWidth > 0) {
      ready()
    } else {
      imgEl.addEventListener('load', ready, { once: true })
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw(0)
    })
    resizeObserver.observe(container)

    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
      imgEl.removeEventListener('load', ready)
      gl.deleteTexture(texture)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, src])

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden bg-charcoal ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] ${
          webglActive ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500 ${
          webglActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Gold sheen sweep on hover — always present, WebGL or not */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/25" />
    </div>
  )
}
