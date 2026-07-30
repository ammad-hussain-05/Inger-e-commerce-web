import type { BookId } from './books'

/** Cinematic scroll choreography for the /books showcase — every camera
 *  move, book transform, fog color, and particle-color weighting is
 *  authored here as data so `books-experience.tsx` and its children stay
 *  pure "sample this progress" consumers. Global scroll progress runs
 *  0 -> 1 across an 8-section (800vh) stage. */

export const SECTION_COUNT = 8
export const TOTAL_VH = SECTION_COUNT * 100

/** Named breakpoints, one per section boundary (eighths), plus a couple of
 *  intermediate "stagger" points used for the book handoffs. */
export const T = {
  start: 0,
  heroEnd: 1 / 8, // 0.125
  book1EnterEnd: 2 / 8, // 0.25
  book1HoldEnd: 3 / 8, // 0.375
  handoff1Mid: 3.5 / 8, // 0.4375
  handoff1End: 4 / 8, // 0.5
  book2HoldEnd: 5 / 8, // 0.625
  handoff2Mid: 5.5 / 8, // 0.6875
  handoff2End: 6 / 8, // 0.75
  book3HoldEnd: 7 / 8, // 0.875
  finaleEnd: 1,
} as const

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smoothstep = (edge0: number, edge1: number, x: number) => {
  if (edge0 === edge1) return x < edge0 ? 0 : 1
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** Trapezoid ramp: 0 before `inStart`, eases up to 1 by `peakStart`, holds
 *  at 1 until `peakEnd`, eases back down to 0 by `outEnd`. Used to weight
 *  each accent color's particle/fog presence across the timeline. */
export function trapezoid(t: number, inStart: number, peakStart: number, peakEnd: number, outEnd: number) {
  if (t <= inStart || t >= outEnd) return 0
  if (t < peakStart) return smoothstep(inStart, peakStart, t)
  if (t <= peakEnd) return 1
  return 1 - smoothstep(peakEnd, outEnd, t)
}

export interface BookKeyframe {
  t: number
  x: number
  y: number
  z: number
  rotY: number
  scale: number
  opacity: number
}

export interface BookTransform {
  x: number
  y: number
  z: number
  rotY: number
  scale: number
  opacity: number
}

function sampleTrack<K extends BookKeyframe>(frames: K[], t: number): BookTransform {
  const ct = clamp(t)
  const first = frames[0]
  const last = frames[frames.length - 1]
  if (ct <= first.t) return first
  if (ct >= last.t) return last
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i]
    const b = frames[i + 1]
    if (ct >= a.t && ct <= b.t) {
      const lt = smoothstep(a.t, b.t, ct)
      return {
        x: lerp(a.x, b.x, lt),
        y: lerp(a.y, b.y, lt),
        z: lerp(a.z, b.z, lt),
        rotY: lerp(a.rotY, b.rotY, lt),
        scale: lerp(a.scale, b.scale, lt),
        opacity: lerp(a.opacity, b.opacity, lt),
      }
    }
  }
  return last
}

/** Offstage resting states — dark, small, drifted down, fully transparent. */
const HIDDEN_LEFT: Omit<BookKeyframe, 't'> = { x: -2.4, y: 0.1, z: -3.4, rotY: -0.65, scale: 0.55, opacity: 0 }
const HIDDEN_RIGHT: Omit<BookKeyframe, 't'> = { x: 2.4, y: 0.1, z: -3.4, rotY: 0.65, scale: 0.55, opacity: 0 }
const HIDDEN_BEHIND: Omit<BookKeyframe, 't'> = { x: 0, y: -0.35, z: -6, rotY: 0.55, scale: 0.4, opacity: 0 }

/** Per-book keyframe tracks. Every book mounts once and lives for the whole
 *  scroll — "exit" and "finale re-entry" are just later keyframes on the
 *  same track, never a mount/unmount, so handoffs never pop. */
export const BOOK_TRACKS: Record<BookId, BookKeyframe[]> = {
  acclaimed: [
    { t: T.start, ...HIDDEN_BEHIND },
    { t: T.heroEnd, ...HIDDEN_BEHIND },
    { t: T.book1EnterEnd, x: 0, y: 0, z: 0, rotY: -0.15, scale: 1, opacity: 1 },
    { t: T.book1HoldEnd, x: 0, y: 0.05, z: 0.15, rotY: -0.1, scale: 1.02, opacity: 1 },
    { t: T.handoff1End, ...HIDDEN_LEFT },
    { t: T.book2HoldEnd, ...HIDDEN_LEFT },
    { t: T.handoff2End, ...HIDDEN_LEFT },
    { t: T.book3HoldEnd, ...HIDDEN_LEFT },
    { t: T.finaleEnd, x: -1.6, y: 0, z: 1.2, rotY: -0.12, scale: 0.62, opacity: 1 },
  ],
  featured: [
    { t: T.start, ...HIDDEN_BEHIND },
    { t: T.book1HoldEnd, ...HIDDEN_BEHIND },
    { t: T.handoff1Mid, x: 0, y: 0, z: -1.5, rotY: 0.3, scale: 0.75, opacity: 0.6 },
    { t: T.handoff1End, x: 0, y: 0, z: 0, rotY: 0.1, scale: 1.05, opacity: 1 },
    { t: T.book2HoldEnd, x: 0, y: 0.05, z: 0.3, rotY: 0.15, scale: 1.1, opacity: 1 },
    { t: T.handoff2Mid, ...HIDDEN_RIGHT },
    { t: T.handoff2End, ...HIDDEN_RIGHT },
    { t: T.book3HoldEnd, ...HIDDEN_RIGHT },
    { t: T.finaleEnd, x: 0, y: 0, z: 1.2, rotY: 0, scale: 0.66, opacity: 1 },
  ],
  latest: [
    { t: T.start, ...HIDDEN_BEHIND },
    { t: T.book2HoldEnd, ...HIDDEN_BEHIND },
    { t: T.handoff2Mid, x: 0, y: 0, z: -1.5, rotY: -0.3, scale: 0.75, opacity: 0.6 },
    { t: T.handoff2End, x: 0, y: 0, z: 0, rotY: -0.1, scale: 1, opacity: 1 },
    { t: T.book3HoldEnd, x: 0, y: 0.05, z: 0.6, rotY: -0.05, scale: 1.15, opacity: 1 },
    { t: T.finaleEnd, x: 1.6, y: 0, z: 1.2, rotY: 0.12, scale: 0.62, opacity: 1 },
  ],
}

export function sampleBookTransform(id: BookId, t: number): BookTransform {
  return sampleTrack(BOOK_TRACKS[id], t)
}

export interface CameraKeyframe {
  t: number
  z: number
  fov: number
}

export const CAMERA_TRACK: CameraKeyframe[] = [
  { t: T.start, z: 7, fov: 45 },
  { t: T.heroEnd, z: 6.4, fov: 46 },
  { t: T.book1EnterEnd, z: 5.6, fov: 47 },
  { t: T.book1HoldEnd, z: 5.3, fov: 47 },
  { t: T.handoff1End, z: 5.6, fov: 47 },
  { t: T.book2HoldEnd, z: 4.9, fov: 48 },
  { t: T.handoff2End, z: 5.4, fov: 47 },
  { t: T.book3HoldEnd, z: 4.6, fov: 44 },
  { t: T.finaleEnd, z: 6.8, fov: 42 },
]

export function sampleCamera(t: number): { z: number; fov: number } {
  const ct = clamp(t)
  const frames = CAMERA_TRACK
  const first = frames[0]
  const last = frames[frames.length - 1]
  if (ct <= first.t) return { z: first.z, fov: first.fov }
  if (ct >= last.t) return { z: last.z, fov: last.fov }
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i]
    const b = frames[i + 1]
    if (ct >= a.t && ct <= b.t) {
      const lt = smoothstep(a.t, b.t, ct)
      return { z: lerp(a.z, b.z, lt), fov: lerp(a.fov, b.fov, lt) }
    }
  }
  return { z: last.z, fov: last.fov }
}

/** RGB triplets matching the live CSS theme tokens (see app/globals.css
 *  `@theme inline`) — kept as a fallback/default so the 3D lighting and fog
 *  can render before the first `getComputedStyle` read resolves them. */
export const ACCENT_RGB = {
  black: [10, 10, 10] as const,
  forestGreen: [26, 95, 71] as const,
  royalPurple: [107, 63, 160] as const,
  gold: [201, 169, 97] as const,
}

const FOG_STOPS: { t: number; rgb: readonly [number, number, number] }[] = [
  { t: T.start, rgb: ACCENT_RGB.black },
  { t: T.heroEnd, rgb: ACCENT_RGB.black },
  { t: T.book1HoldEnd, rgb: ACCENT_RGB.forestGreen },
  { t: T.handoff1End, rgb: ACCENT_RGB.black },
  { t: T.book2HoldEnd, rgb: ACCENT_RGB.royalPurple },
  { t: T.handoff2End, rgb: ACCENT_RGB.black },
  { t: T.book3HoldEnd, rgb: ACCENT_RGB.gold },
  { t: T.finaleEnd, rgb: ACCENT_RGB.black },
]

export function sampleFogRgb(t: number): [number, number, number] {
  const ct = clamp(t)
  const frames = FOG_STOPS
  if (ct <= frames[0].t) return [...frames[0].rgb]
  const last = frames[frames.length - 1]
  if (ct >= last.t) return [...last.rgb]
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i]
    const b = frames[i + 1]
    if (ct >= a.t && ct <= b.t) {
      const lt = smoothstep(a.t, b.t, ct)
      return [lerp(a.rgb[0], b.rgb[0], lt), lerp(a.rgb[1], b.rgb[1], lt), lerp(a.rgb[2], b.rgb[2], lt)]
    }
  }
  return [...last.rgb]
}

/** Per-accent particle-color presence weight (0-1) across the timeline —
 *  each color ramps up while "its" book is on stage and fades for the
 *  others. Gold gets an extra finale boost for the closing reveal. */
export function accentWeights(t: number) {
  const green = trapezoid(t, T.heroEnd, T.book1EnterEnd, T.book1HoldEnd, T.handoff1End)
  const purple = trapezoid(t, T.book1HoldEnd, T.handoff1End, T.book2HoldEnd, T.handoff2End)
  let gold = trapezoid(t, T.handoff2End - 0.05, T.handoff2End, T.book3HoldEnd, T.finaleEnd + 0.001)
  const finaleBoost = smoothstep(T.book3HoldEnd, T.finaleEnd, t)
  gold = clamp(gold + finaleBoost * 0.6)
  return { green, purple, gold }
}

export const BOOK_ORDER: BookId[] = ['acclaimed', 'featured', 'latest']

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return 'desktop'
  if (width >= 640) return 'tablet'
  return 'mobile'
}

export const QUALITY_TIERS: Record<
  Breakpoint,
  { particleCount: number; dpr: [number, number]; shadowResolution: number; parallax: boolean }
> = {
  mobile: { particleCount: 60, dpr: [1, 1.25], shadowResolution: 256, parallax: false },
  tablet: { particleCount: 150, dpr: [1, 1.5], shadowResolution: 512, parallax: false },
  desktop: { particleCount: 300, dpr: [1, 1.75], shadowResolution: 1024, parallax: true },
}

/** Global progress at which the finale composition begins — shared by the
 *  3D rig and the HTML logo/tagline overlay so they stay in lockstep. */
export const FINALE_START = T.book3HoldEnd
