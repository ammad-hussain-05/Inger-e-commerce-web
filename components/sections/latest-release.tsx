'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Cog, ExternalLink, Feather } from 'lucide-react'
import { FaAmazon } from 'react-icons/fa'
import { SiAudible } from 'react-icons/si'

const ICON_STROKE_WIDTH = 1.5

const stats = [
  { label: 'Pages', value: '412', Icon: BookOpen },
  { label: 'Series', value: 'Book three', Icon: Cog },
  { label: 'Genre', value: 'Steampunk', Icon: Feather },
]

const retailers = [
  { label: 'Amazon', Icon: FaAmazon },
  { label: 'Barnes & Noble', Icon: ExternalLink },
  { label: 'Bookshop', Icon: ExternalLink },
  { label: 'Audible', Icon: SiAudible },
]

export default function LatestRelease() {
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
      id="latest"
      className="relative overflow-hidden bg-black bg-[url('/release-golden-background.png')] bg-cover bg-center bg-no-repeat px-6 py-24 md:px-8 md:py-32"
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 space-y-4">
          <p className="label text-gold">New Release</p>
          <div className="gold-accent-line" />
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
                src="/latest-book-1.png"
                alt="The Clockwork Rebellion — book cover"
                width={1272}
                height={1237}
                priority
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
              <p className="label mb-3 text-gold/70">Available Now</p>
              <h2 className="h2 text-balance mb-6">
                Calling The Lost Ones Homes
              </h2>
              <div className="h-px w-full bg-cream/10" />
            </div>

            <p className="body leading-relaxed text-cream/80">
            Destroying the terrible creature that inhabited the southernmost lands of Mardalla wasn’t the end of the problems for Thistle, Myst and Em, the kingdom’s newest nobles. Now comes the task of building a new duchy from scraps of nothing into something strong and enduring. And somehow, some way, letting those who had been scattered across the world since the last war a thousand years before know that there was a safe haven again. There was now a new place for the Elves to live together, protected by the Wild and the Wilderness. It was time to call the lost ones home.

            </p>

            <div className="h-px w-full bg-cream/10" />

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-sm border border-gold/25 bg-black/35 px-3 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-gold/5 md:px-4"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <stat.Icon
                      strokeWidth={ICON_STROKE_WIDTH}
                      className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-hover:scale-110 md:h-[22px] md:w-[22px] lg:h-6 lg:w-6"
                    />
                    <p className="label text-[10px] text-gold/60 md:text-xs">
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
              <button className="group inline-flex flex-1 items-center justify-center gap-2 bg-gold px-6 py-3.5 font-sans text-sm font-medium tracking-widest text-black uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_10px_30px_-8px_rgba(201,169,97,0.5)] active:translate-y-0">
                Pre-Order Now
                <ArrowRight
                  strokeWidth={ICON_STROKE_WIDTH}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </button>

              <button className="group inline-flex flex-1 items-center justify-center gap-2 border border-cream/30 bg-black/20 px-6 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase backdrop-blur-sm transition-all duration-300 ease-out hover:border-gold hover:bg-gold/5 hover:text-gold active:scale-[0.99]">
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
                    className="inline-flex items-center gap-2 rounded-sm border border-cream/15 bg-black/25 px-4 py-2 text-xs tracking-wide text-cream backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold/5 hover:text-gold"
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