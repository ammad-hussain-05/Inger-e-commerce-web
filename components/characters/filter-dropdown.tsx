'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

/** Premium glass-panel dropdown standing in for a native <select> — same value/onChange contract. */
export default function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const isActive = value !== 'All'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className={`group flex items-center gap-2.5 rounded-full border bg-black/40 py-3 pr-4 pl-5 font-sans text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] ${
          isOpen
            ? 'border-gold/70 bg-black/60 shadow-[0_0_28px_-8px_rgba(201,169,97,0.45)]'
            : 'border-gold/25 hover:border-gold/50 hover:bg-black/55 hover:shadow-[0_0_20px_-10px_rgba(201,169,97,0.35)]'
        }`}
      >
        <span className={isActive ? 'text-gold' : 'text-cream/80'}>{isActive ? value : label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-gold/60 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180 text-gold' : ''}`}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -14, scale: 0.92, rotateX: -12, filter: 'blur(8px)' }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.95, rotateX: -6, filter: 'blur(5px)' }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 340, damping: 28, mass: 0.85 }
            }
            style={{ transformOrigin: 'top center', transformPerspective: 800 }}
            className="absolute top-full left-0 z-30 mt-2.5 overflow-hidden rounded-xl border border-gold/25 bg-charcoal/95 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.75)] backdrop-blur-xl"
          >
            {/* Glass top sheen for a tactile game-panel surface */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/25 to-transparent" />

            <div
              role="listbox"
              aria-label={label}
              data-lenis-prevent
              className="fantasy-scrollbar max-h-[26rem] min-w-full overflow-y-auto overscroll-contain p-1.5"
              style={{ width: 'max-content', maxWidth: '22rem' }}
            >
              <div className="flex items-center gap-2 px-3.5 pt-2.5 pb-2">
                <div className="h-1 w-1 rotate-45 bg-gold/60" />
                <p className="label text-[10px] text-gold/60">{label}</p>
              </div>
              <div className="mx-1.5 mb-1 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

              <ul className="py-1">
                {options.map((option, index) => {
                  const selected = option === value
                  const delay = prefersReducedMotion ? 0 : 0.04 + Math.min(index, 9) * 0.018

                  return (
                    <motion.li
                      key={option}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.24, delay, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          onChange(option)
                          setIsOpen(false)
                        }}
                        className={`group/option relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg py-3 pr-3.5 pl-4 text-left text-sm transition-all duration-200 ${
                          selected ? 'bg-gold/10 text-gold' : 'text-cream/75 hover:translate-x-0.5 hover:bg-gold/10 hover:text-gold'
                        }`}
                      >
                        <span
                          className={`absolute top-0 left-0 h-full w-0.5 scale-y-0 bg-gold transition-transform duration-200 ease-out ${
                            selected ? 'scale-y-100' : 'group-hover/option:scale-y-100'
                          }`}
                        />
                        <span className={option === 'All' ? 'uppercase tracking-wide' : ''}>
                          {option === 'All' ? label : option}
                        </span>
                        {selected && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
