interface MarqueeProps {
  words: string[]
  direction?: 'left' | 'right'
  speed?: number
}

const SEPARATOR = ' — '

function MarqueeGroup({ words, ariaHidden }: { words: string[]; ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {words.map((word, i) => {
        const outline = i % 2 === 1

        return (
          <span
            key={i}
            className="px-2.5 font-sans text-[clamp(0.75rem,1.6vw,1.125rem)] leading-none font-black tracking-[0.08em] whitespace-nowrap uppercase sm:px-3 md:px-4"
            style={
              outline
                ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--color-cream)',
                  }
                : { color: 'var(--color-cream)' }
            }
          >
            {word}
            {SEPARATOR}
          </span>
        )
      })}
    </div>
  )
}

export default function Marquee({ words, direction = 'left', speed = 30 }: MarqueeProps) {
  return (
    <div
      className="relative flex h-12 w-full items-center overflow-hidden border-y border-cream/10 bg-[#1d1d1d] sm:h-14 md:h-16"
      style={
        {
          '--marquee-duration': `${speed}s`,
          '--marquee-play-direction': direction === 'right' ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        <MarqueeGroup words={words} />
        <MarqueeGroup words={words} ariaHidden />
      </div>
    </div>
  )
}
