'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Cog, ExternalLink, Feather } from 'lucide-react'
import { FaAmazon } from 'react-icons/fa'
import { SiAudible } from 'react-icons/si'
import GenreBadge from '@/components/ui/genre-badge'
import { books } from '@/lib/books'

const ICON_STROKE_WIDTH = 1.5

const stats = [
  { label: 'Pages', value: books.acclaimed.pages, Icon: BookOpen },
  { label: 'Series', value: 'Book One', Icon: Cog },
  { label: 'Genre', value: books.acclaimed.genre, Icon: Feather },
]

const retailers = [
  { label: 'Amazon', Icon: FaAmazon },
  { label: 'Barnes & Noble', Icon: ExternalLink },
  { label: 'Bookshop', Icon: ExternalLink },
  { label: 'Audible', Icon: SiAudible },
]

export default function AcclaimedRelease() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="acclaimed"
      className="relative overflow-hidden bg-black bg-[url('/latest-green-background.png')] bg-cover bg-center bg-no-repeat px-6 py-24 md:px-8 md:py-32"
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 space-y-4">
          <p className="label text-forest-green">Award Winning</p>
          <div className="gold-accent-line bg-forest-green" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Book */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <div className="relative mx-auto w-full max-w-[390px] md:mx-0 md:max-w-[540px] lg:max-w-[620px]">
              <Image
                src="/acclaimed-released-book.png"
                alt="The Verdant Cipher — book cover"
                width={1272}
                height={1237}
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-7 transition-all duration-700 md:space-y-8 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div>
              <p className="label mb-3 text-forest-green/70">Critically Acclaimed</p>
              <GenreBadge genre={books.acclaimed.genre} accent="forest-green" className="mb-4" />
              <h2 className="h2 text-balance mb-6">
                Two Elves And A Halfling
              </h2>
              <div className="h-px w-full bg-cream/10" />
            </div>

            <p className="body leading-relaxed text-cream/80">
Even though the last Elven/Sidhe war ended a thousand years ago and decimated the lands of the world of Maldonere, the results of that hate-filled conflict still haunt the present. During that war the Sidhe released much evil upon the world, and the offspring of those vile creatures still ravage the lands to this day.
The Elves, Ranger Emerald Star and the Wild Mage Thistle—each the last of their family line—along with their Halfling friend the Rogue Myst Roottapper, set out to capture their destiny. But unbeknownst to them, amongst whisper and rumor, the Sidhe have returned and are set on finishing what they started a thousand years before.            </p>

            <div className="h-px w-full bg-cream/10" />

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-sm border border-forest-green/25 bg-black/35 px-3 py-4 backdrop-blur-sm transition-all duration-300 hover:border-forest-green/60 hover:bg-forest-green/5 md:px-4"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <stat.Icon
                      strokeWidth={ICON_STROKE_WIDTH}
                      className="h-5 w-5 shrink-0 text-forest-green transition-transform duration-300 group-hover:scale-110 md:h-[22px] md:w-[22px] lg:h-6 lg:w-6"
                    />
                    <p className="label text-[10px] text-forest-green/60 md:text-xs">
                      {stat.label}
                    </p>
                  </div>
                  <p className="font-serif text-lg text-cream md:text-xl">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="group inline-flex flex-1 items-center justify-center gap-2 bg-forest-green px-6 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-forest-green-light hover:shadow-[0_10px_30px_-8px_rgba(26,95,71,0.5)] active:translate-y-0">
                Buy Now
                <ArrowRight
                  strokeWidth={ICON_STROKE_WIDTH}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </button>

              <button className="group inline-flex flex-1 items-center justify-center gap-2 border border-cream/30 bg-black/20 px-6 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase backdrop-blur-sm transition-all duration-300 ease-out hover:border-forest-green hover:bg-forest-green/5 hover:text-forest-green active:scale-[0.99]">
                Read Sample
                <ArrowRight
                  strokeWidth={ICON_STROKE_WIDTH}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="pt-2">
              <p className="label mb-3 text-cream/40">Available at</p>
              <div className="flex flex-wrap gap-3">
                {retailers.map((retailer) => (
                  <a
                    key={retailer.label}
                    href="#"
                    className="inline-flex items-center gap-2 rounded-sm border border-cream/15 bg-black/25 px-4 py-2 text-xs tracking-wide text-cream backdrop-blur-sm transition-all duration-300 hover:border-forest-green hover:bg-forest-green/5 hover:text-forest-green"
                  >
                    <retailer.Icon className="h-4 w-4 shrink-0" />
                    {retailer.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
