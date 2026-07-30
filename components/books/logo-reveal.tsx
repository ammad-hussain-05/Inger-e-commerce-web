'use client'

import Image from 'next/image'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { FINALE_START } from '@/lib/book-scene-config'

interface LogoRevealProps {
  progress: MotionValue<number>
}

/** The closing beat — logo settles in above the three aligned books with
 *  the franchise tagline, bound to the finale window of the scroll. */
export default function LogoReveal({ progress }: LogoRevealProps) {
  const range: [number, number, number] = [FINALE_START, FINALE_START + 0.07, 1]
  const opacity = useTransform(progress, range, [0, 1, 1])
  const scale = useTransform(progress, range, [0.85, 1.04, 1])
  const y = useTransform(progress, range, [24, 0, 0])
  const pointerEvents = useTransform(opacity, (o) => (o > 0.15 ? 'auto' : 'none'))

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="pointer-events-none absolute inset-x-0 top-14 flex flex-col items-center px-6 text-center md:top-20"
    >
      <motion.div style={{ scale }} className="mb-6">
        <Image src="/inger-logo.png" alt="Inger & Alex Moore" width={72} height={72} className="opacity-95" />
      </motion.div>

      <div className="mb-5 flex items-center justify-center gap-2">
        <div className="h-px w-10 bg-gold/50" />
        <div className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
        <div className="h-px w-10 bg-gold/50" />
      </div>

      <p className="subtitle text-balance">Enter a world of magic, kingdoms, and forgotten legends.</p>
    </motion.div>
  )
}
