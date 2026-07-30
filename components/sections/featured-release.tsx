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
  { label: 'Pages', value: books.featured.pages, Icon: BookOpen },
  { label: 'Series', value: 'Book Two', Icon: Cog },
  { label: 'Genre', value: books.featured.genre, Icon: Feather },
]

const retailers = [
  { label: 'Amazon', Icon: FaAmazon },
  { label: 'Barnes & Noble', Icon: ExternalLink },
  { label: 'Bookshop', Icon: ExternalLink },
  { label: 'Audible', Icon: SiAudible },
]

export default function FeaturedRelease() {
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
      id="featured"
      className="relative overflow-hidden bg-black bg-[url('/release-purple-background.png')] bg-cover bg-center bg-no-repeat px-6 py-24 md:px-8 md:py-32"
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 space-y-4">
          <p className="label text-royal-purple">Fan Favorite</p>
          <div className="gold-accent-line bg-royal-purple" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Content */}
          <div
            className={`order-2 space-y-7 transition-all duration-700 md:order-1 md:space-y-8 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <div>
              <p className="label mb-3 text-royal-purple/70">Reader Favorite</p>
              <GenreBadge genre={books.featured.genre} accent="royal-purple" className="mb-4" />
              <h2 className="h2 text-balance mb-6">
                Rallying Cry

              </h2>
              <div className="h-px w-full bg-cream/10" />
            </div>

            <p className="body leading-relaxed text-cream/80">
              The evil Sidhe were warned to stay away from Mardalla, home of the Elves Ranger Emerald Star and Mage Thistle, and Halfling Myst Roottapper. But the Sidhe didn't listen. It is now up to the three heroes to explain again to the Sidhe why this just isn't their day. From the mountain stronghold of the Ironforge Dwarves down to the southern duchy of Lord Cornelius, the rallying cry has gone forth, but will it be enough?
            </p>

            <div className="h-px w-full bg-cream/10" />

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-sm border border-royal-purple/25 bg-black/35 px-3 py-4 backdrop-blur-sm transition-all duration-300 hover:border-royal-purple/60 hover:bg-royal-purple/5 md:px-4"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <stat.Icon
                      strokeWidth={ICON_STROKE_WIDTH}
                      className="h-5 w-5 shrink-0 text-royal-purple transition-transform duration-300 group-hover:scale-110 md:h-[22px] md:w-[22px] lg:h-6 lg:w-6"
                    />
                    <p className="label text-[10px] text-royal-purple/60 md:text-xs">
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
              <button className="group inline-flex flex-1 items-center justify-center gap-2 bg-royal-purple px-6 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-royal-purple-light hover:shadow-[0_10px_30px_-8px_rgba(107,63,160,0.5)] active:translate-y-0">
                Buy Now
                <ArrowRight
                  strokeWidth={ICON_STROKE_WIDTH}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </button>

              <button className="group inline-flex flex-1 items-center justify-center gap-2 border border-cream/30 bg-black/20 px-6 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase backdrop-blur-sm transition-all duration-300 ease-out hover:border-royal-purple hover:bg-royal-purple/5 hover:text-royal-purple active:scale-[0.99]">
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
                    className="inline-flex items-center gap-2 rounded-sm border border-cream/15 bg-black/25 px-4 py-2 text-xs tracking-wide text-cream backdrop-blur-sm transition-all duration-300 hover:border-royal-purple hover:bg-royal-purple/5 hover:text-royal-purple"
                  >
                    <retailer.Icon className="h-4 w-4 shrink-0" />
                    {retailer.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Book */}
          <div
            className={`order-1 relative transition-all duration-700 md:order-2 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="relative mx-auto w-full max-w-[340px] md:mx-0 md:max-w-[440px] lg:max-w-[420px]">
              <Image
                src="/fan-favourite.png"
                alt="The Ember Accord — book cover"
                width={1272}
                height={1137}
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
