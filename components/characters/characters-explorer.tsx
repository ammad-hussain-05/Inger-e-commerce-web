'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { characters as allCharacters, characterGroups, characterRoles } from '@/lib/characters'
import type { Character } from '@/lib/characters'
import CharacterCard from './character-card'
import CharacterModal from './character-modal'
import FilterDropdown from './filter-dropdown'

const PAGE_SIZE = 24
const ALL = 'All'
type StatusFilter = 'All' | 'Alive' | 'Deceased'

export default function CharactersExplorer() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState(ALL)
  const [role, setRole] = useState(ALL)
  const [status, setStatus] = useState<StatusFilter>('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState<Character | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return allCharacters.filter((c) => {
      if (group !== ALL && c.group !== group) return false
      if (role !== ALL && c.role !== role) return false
      if (status === 'Alive' && c.deceased) return false
      if (status === 'Deceased' && !c.deceased) return false
      if (!q) return true

      return (
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.race?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [query, group, role, status])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [query, group, role, status])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length
  const hasActiveFilters = query !== '' || group !== ALL || role !== ALL || status !== 'All'

  const clearFilters = () => {
    setQuery('')
    setGroup(ALL)
    setRole(ALL)
    setStatus('All')
  }

  return (
    <div>
      {/* Search + filters */}
      <div className="mx-auto mb-12 max-w-4xl space-y-5">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-gold/50"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, group, or description..."
            className="w-full rounded-full border border-gold/30 bg-black/40 py-4.5 pr-14 pl-14 font-sans text-base text-cream placeholder-cream/40 backdrop-blur-sm transition-all duration-300 focus:border-gold/70 focus:bg-black/60 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-6 -translate-y-1/2 text-cream/40 transition-colors duration-300 hover:text-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <FilterDropdown label="Group / Faction" value={group} options={[ALL, ...characterGroups]} onChange={setGroup} />
          <FilterDropdown label="Role / Type" value={role} options={[ALL, ...characterRoles]} onChange={setRole} />
          <FilterDropdown
            label="Status"
            value={status}
            options={['All', 'Alive', 'Deceased']}
            onChange={(v) => setStatus(v as StatusFilter)}
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-4 py-2.5 text-xs font-medium tracking-wide text-cream/50 uppercase transition-colors duration-300 hover:border-gold/50 hover:text-gold"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Live count */}
      <p className="label mb-10 text-center text-sm text-cream/50">
        Showing <span className="text-gold">{visible.length}</span> of{' '}
        <span className="text-gold">{filtered.length}</span> Characters
        {filtered.length !== allCharacters.length && (
          <span className="text-cream/30"> &middot; {allCharacters.length} total</span>
        )}
      </p>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((character, index) => (
            <CharacterCard key={character.id} character={character} index={index} onSelect={setSelected} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md py-20 text-center">
          <p className="font-serif text-3xl text-cream/60">No characters found</p>
          <p className="body mt-3 text-cream/40">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="btn-primary"
          >
            Load More Characters
          </button>
        </div>
      )}

      <CharacterModal character={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
