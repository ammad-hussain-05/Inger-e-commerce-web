'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Skull, X } from 'lucide-react'
import type { Character } from '@/lib/characters'
import { accentForCharacter, type Accent } from './character-card'

interface CharacterModalProps {
  character: Character | null
  onClose: () => void
}

const accentTextClass: Record<Accent, string> = {
  gold: 'text-gold',
  'forest-green': 'text-forest-green-light',
  'royal-purple': 'text-royal-purple-light',
}

const accentBorderClass: Record<Accent, string> = {
  gold: 'border-gold/40',
  'forest-green': 'border-forest-green-light/40',
  'royal-purple': 'border-royal-purple-light/40',
}

const accentGlowClass: Record<Accent, string> = {
  gold: 'bg-gold/45',
  'forest-green': 'bg-forest-green-light/45',
  'royal-purple': 'bg-royal-purple-light/45',
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!character) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [character, onClose])

  const accent = character ? accentForCharacter(character) : 'gold'

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={character.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md md:p-8"
          style={{ perspective: prefersReducedMotion ? undefined : 1000 }}
          onClick={onClose}
        >
          {/* Blurred glowing color wave, expanding softly behind the card */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-[110px] md:h-[560px] md:w-[560px] ${accentGlowClass[accent]}`}
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 70, scale: 0.72, rotateX: -55, rotateY: 6 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 30, scale: 0.85, rotateX: 32, rotateY: -4 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }
            }
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
            className={`relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border bg-charcoal/95 p-9 shadow-2xl md:p-12 ${accentBorderClass[accent]}`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close character details"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {character.deceased && (
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-black/40 px-3 py-1 text-[10px] font-medium tracking-widest text-cream/50 uppercase">
                <Skull className="h-3.5 w-3.5" strokeWidth={1.5} />
                Fallen
              </span>
            )}

            <h2 className="h3 pr-10 text-balance">{character.name}</h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2">
              <span className={`label text-sm ${accentTextClass[accent]}`}>{character.role}</span>
              {character.race && (
                <>
                  <span className="text-cream/20">&middot;</span>
                  <span className="label text-sm text-cream/40">{character.race}</span>
                </>
              )}
            </div>

            <span
              className={`mt-5 inline-flex w-fit items-center rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium tracking-widest uppercase ${accentBorderClass[accent]} ${accentTextClass[accent]} bg-black/30`}
            >
              {character.group}
            </span>

            <div className="gold-line my-7" />

            <p className="body text-lg text-cream/80 whitespace-pre-line">{character.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
