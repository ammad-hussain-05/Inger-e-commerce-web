'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Feather } from 'lucide-react'

const ICON_STROKE_WIDTH = 1.5

const blogPosts = [
  {
    id: 1,
    title: 'Building Believable Steampunk Worlds',
    excerpt: 'How I approach worldbuilding to create steampunk settings that feel authentic, lived-in, and emotionally resonant.',
    date: 'March 15, 2024',
    readTime: '8 min read',
    image: '/blog-1.png',
  },
  {
    id: 2,
    title: 'The Art of Character Complexity',
    excerpt: 'Crafting characters with contradictions, flaws, and growth. Why moral ambiguity makes the best stories.',
    date: 'March 8, 2024',
    readTime: '6 min read',
    image: '/blog-2.png',
  },
  {
    id: 3,
    title: 'Urban Fantasy and Modern Magic Systems',
    excerpt: 'Exploring how to integrate magic seamlessly into contemporary settings without breaking believability.',
    date: 'February 28, 2024',
    readTime: '10 min read',
    image: '/blog-3.png',
  },
  {
    id: 4,
    title: 'Research and Inspiration: Finding Story Gold',
    excerpt: 'Where writers find inspiration, the importance of research, and how to transform real history into fiction.',
    date: 'February 18, 2024',
    readTime: '7 min read',
    image: '/blog-4.png',
  },
]

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative overflow-hidden bg-black bg-[url('/blog-background.png')] bg-cover bg-center bg-no-repeat px-6 py-28 md:px-8 md:py-36"
    >
      {/* Background overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-8 md:mb-20 md:flex-row md:items-start md:justify-between md:gap-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="label mb-3 text-gold">Notes &amp; Essays</p>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-px w-6 bg-gold/40" />
              <div className="h-1 w-1 rotate-45 bg-gold/60" />
              <div className="h-px w-6 bg-gold/40" />
            </div>
            <h2 className="h2 max-w-sm text-balance md:max-w-md">Insights from the Craft</h2>
            <div className="gold-accent-line mt-6" />
          </div>

          <div
            className={`flex max-w-sm gap-5 transition-all delay-150 duration-700 md:pt-2 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="w-px shrink-0 self-stretch bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
            <p className="body text-sm text-cream/60 md:text-base">
              Thoughts, reflections, and behind-the-scenes insights on storytelling, worldbuilding, and the art of creating unforgettable narratives.
            </p>
          </div>
        </div>

        {/* Blog grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
              }}
            >
              <a
                href="#"
                className="flex h-full flex-col overflow-hidden rounded-xl border border-gold/20 bg-black/60 transition-all duration-500 ease-out group-hover:border-gold/50 group-hover:shadow-[0_20px_60px_-20px_rgba(201,169,97,0.3)] sm:flex-row"
              >
                {/* Image panel */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden bg-charcoal sm:h-auto sm:w-[38%] md:w-2/5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 40vw, (min-width: 640px) 38vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="label text-xs text-gold/70">{post.date}</span>
                    <span className="label text-xs text-cream/50">{post.readTime}</span>
                  </div>

                  <h3 className="h4 mb-3 text-balance transition-colors duration-300 group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="body mb-6 flex-1 text-cream/70">{post.excerpt}</p>

                  <div>
                    <div className="gold-accent-line mb-4 w-12" />
                    <span className="label inline-flex items-center gap-2 text-gold transition-all duration-300 group-hover:gap-3">
                      Read Article
                      <ArrowRight
                        strokeWidth={ICON_STROKE_WIDTH}
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div
          className={`mt-16 text-center transition-all delay-300 duration-700 md:mt-20 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <a
            href="#"
            className="label inline-flex items-center gap-3 rounded-sm border border-gold/40 px-8 py-3.5 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/5"
          >
            <Feather strokeWidth={ICON_STROKE_WIDTH} className="h-4 w-4" />
            Explore All Articles
          </a>
        </div>
      </div>
    </section>
  )
}
