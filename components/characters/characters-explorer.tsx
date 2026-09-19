'use client'

import { useState } from 'react'
import { characters as allCharacters } from '@/lib/characters'
import type { Character } from '@/lib/characters'
import CharacterCard from './character-card'
import CharacterModal from './character-modal'

/** Groups, in the order they first appear in the source document
 *  ("List of characters Book 3.docx") — kept as the client's own
 *  organization rather than re-sorted alphabetically. */
const groupOrder: string[] = []
for (const c of allCharacters) {
  if (!groupOrder.includes(c.group)) groupOrder.push(c.group)
}

const groupedCharacters: { group: string; members: Character[] }[] = groupOrder.map((group) => ({
  group,
  members: allCharacters.filter((c) => c.group === group),
}))

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function CharactersExplorer() {
  const [selected, setSelected] = useState<Character | null>(null)

  return (
    <div>
      {/* Full cast, grouped by family / faction as in the client's character list */}
      <p className="label mb-14 text-center text-sm text-cream/50">
        <span className="text-gold">{allCharacters.length}</span> Characters across{' '}
        <span className="text-gold">{groupedCharacters.length}</span> Families &amp; Factions
      </p>

      {/* Static jump list — plain anchor links, not a search or filter */}
      <nav aria-label="Jump to family or faction" className="mx-auto mb-20 max-w-4xl">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {groupedCharacters.map(({ group }) => (
            <li key={group}>
              <a
                href={`#${slugify(group)}`}
                className="text-xs font-medium tracking-wide text-cream/45 uppercase transition-colors duration-300 hover:text-gold"
              >
                {group}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-24">
        {groupedCharacters.map(({ group, members }) => (
          <section key={group} id={slugify(group)} className="scroll-mt-28">
            <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-gold/15 pb-4">
              <h2 className="font-serif text-2xl text-balance text-cream md:text-3xl">{group}</h2>
              <span className="label shrink-0 text-xs text-cream/35">
                {members.length} {members.length === 1 ? 'Character' : 'Characters'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((character, index) => (
                <CharacterCard key={character.id} character={character} index={index} onSelect={setSelected} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <CharacterModal character={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
