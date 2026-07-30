'use client'

import { Crown, Feather, Flame, Shield, Skull, Sparkles, Sword, User } from 'lucide-react'
import type { Character } from '@/lib/characters'

export type Accent = 'gold' | 'forest-green' | 'royal-purple'

const accentStyles: Record<
  Accent,
  {
    border: string
    borderHover: string
    bgHover: string
    text: string
    shadow: string
    glow: string
    waveC1: string
    waveC2: string
  }
> = {
  gold: {
    border: 'border-gold/25',
    borderHover: 'group-hover:border-gold/60',
    bgHover: 'group-hover:bg-gold/[0.06]',
    text: 'text-gold',
    shadow: 'group-hover:shadow-[0_28px_80px_-24px_rgba(201,169,97,0.45)]',
    glow: '0 0 32px -12px rgba(201,169,97,0.35)',
    waveC1: 'rgba(201,169,97,0.95)',
    waveC2: 'rgba(212,184,150,0.55)',
  },
  'forest-green': {
    border: 'border-forest-green-light/25',
    borderHover: 'group-hover:border-forest-green-light/60',
    bgHover: 'group-hover:bg-forest-green/[0.08]',
    text: 'text-forest-green-light',
    shadow: 'group-hover:shadow-[0_28px_80px_-24px_rgba(26,95,71,0.5)]',
    glow: '0 0 32px -12px rgba(95,143,126,0.4)',
    waveC1: 'rgba(95,143,126,0.95)',
    waveC2: 'rgba(26,95,71,0.55)',
  },
  'royal-purple': {
    border: 'border-royal-purple-light/25',
    borderHover: 'group-hover:border-royal-purple-light/60',
    bgHover: 'group-hover:bg-royal-purple/[0.08]',
    text: 'text-royal-purple-light',
    shadow: 'group-hover:shadow-[0_28px_80px_-24px_rgba(107,63,160,0.5)]',
    glow: '0 0 32px -12px rgba(151,121,189,0.4)',
    waveC1: 'rgba(151,121,189,0.95)',
    waveC2: 'rgba(107,63,160,0.55)',
  },
}

/** Deterministic fallback so any un-mapped role still reads consistently. */
function hashAccent(seed: string): Accent {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  const accents: Accent[] = ['gold', 'forest-green', 'royal-purple']
  return accents[hash % accents.length]
}

/**
 * Theme color follows the brief: green for hero/adventuring roles, purple for
 * magical/otherworldly roles, gold for royalty, places, and important figures.
 */
export function accentForCharacter(character: Pick<Character, 'role' | 'group' | 'race'>): Accent {
  const role = character.role

  if (
    role === 'Ranger & Scout' ||
    role === 'Military & Guard' ||
    role === 'Rogue & Shadow' ||
    role === 'Adventurer'
  )
    return 'forest-green'

  if (
    role === 'Mage & Magic' ||
    role === 'Priest & Faith' ||
    role === 'Dragon' ||
    role === 'Deity & Legend' ||
    role === 'Beast & Creature' ||
    character.race === 'Fey' ||
    character.race === 'Dragon'
  )
    return 'royal-purple'

  if (role === 'Royalty & Nobility' || role === 'Leadership & Council') return 'gold'

  return hashAccent(character.group)
}

function iconForRole(role: string) {
  const r = role.toLowerCase()
  if (r.includes('royalty') || r.includes('leadership')) return Crown
  if (r.includes('mage') || r.includes('deity') || r.includes('legend')) return Sparkles
  if (r.includes('military') || r.includes('rogue')) return Sword
  if (r.includes('ranger') || r.includes('adventurer')) return Feather
  if (r.includes('priest') || r.includes('faith')) return Shield
  if (r.includes('dragon') || r.includes('beast')) return Flame
  return User
}

interface CharacterCardProps {
  character: Character
  index: number
  onSelect: (character: Character) => void
}

export default function CharacterCard({ character, index, onSelect }: CharacterCardProps) {
  const accent = accentStyles[accentForCharacter(character)]
  const Icon = iconForRole(character.role)
  const deceased = character.deceased

  return (
    <button
      type="button"
      onClick={() => onSelect(character)}
      className={`character-card-enter character-card-wave group relative flex h-full w-full flex-col rounded-xl border bg-black/40 p-7 text-left backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1.5 ${accent.border} ${accent.borderHover} ${accent.bgHover} ${deceased ? 'opacity-75 saturate-50 hover:opacity-100 hover:saturate-75' : ''} ${accent.shadow}`}
      style={
        {
          animationDelay: `${(index % 8) * 40}ms`,
          '--wave-c1': accent.waveC1,
          '--wave-c2': accent.waveC2,
          boxShadow: accent.glow,
        } as React.CSSProperties
      }
    >
      {deceased && (
        <span className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full border border-cream/20 bg-black/60 px-2.5 py-1 text-[9px] font-medium tracking-widest text-cream/50 uppercase">
          <Skull className="h-3 w-3" strokeWidth={1.5} />
          Fallen
        </span>
      )}

      <div
        className={`mb-5 flex h-13 w-13 items-center justify-center rounded-full border bg-black/50 transition-transform duration-500 ease-out group-hover:scale-110 ${accent.border}`}
      >
        <Icon className={`h-5.5 w-5.5 ${accent.text}`} strokeWidth={1.5} />
      </div>

      <h3 className="font-serif text-2xl leading-snug tracking-tight text-cream text-balance">{character.name}</h3>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`label text-xs ${accent.text}`}>{character.role}</span>
        {character.race && (
          <>
            <span className="text-cream/20">&middot;</span>
            <span className="label text-xs text-cream/40">{character.race}</span>
          </>
        )}
      </div>

      <span
        className={`mt-3.5 inline-flex w-fit items-center rounded-full border px-3 py-1 font-sans text-[11px] font-medium tracking-widest uppercase ${accent.border} ${accent.text} bg-black/30`}
      >
        {character.group}
      </span>

      <p className="body mt-5 line-clamp-3 text-base text-cream/65">{character.description}</p>

      <span
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide uppercase ${accent.text} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      >
        View Details
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </button>
  )
}
