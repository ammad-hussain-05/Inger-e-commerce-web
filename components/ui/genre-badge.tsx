type Accent = 'gold' | 'forest-green' | 'royal-purple'

interface GenreBadgeProps {
  genre: string
  accent?: Accent
  className?: string
}

const accentStyles: Record<Accent, string> = {
  gold: 'border-gold/40 bg-gold/10 text-gold',
  'forest-green': 'border-forest-green/40 bg-forest-green/10 text-forest-green',
  'royal-purple': 'border-royal-purple/40 bg-royal-purple/10 text-royal-purple',
}

export default function GenreBadge({ genre, accent = 'gold', className = '' }: GenreBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 font-sans text-[10px] font-medium tracking-widest uppercase ${accentStyles[accent]} ${className}`}
    >
      {genre}
    </span>
  )
}
