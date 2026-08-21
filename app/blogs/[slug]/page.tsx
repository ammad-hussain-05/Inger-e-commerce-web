'use client'

import { use, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Quote } from 'lucide-react'
import StickyHeader from '@/components/layout/sticky-header'
import Footer from '@/components/sections/footer'
import Newsletter from '@/components/sections/newsletter'
import AnimatedHeading from '@/components/blogs/animated-heading'
import { blogPosts, getBlogPost } from '@/lib/blogs'

/** Which body paragraph (0-indexed) is presented as a highlighted pull quote
 *  instead of a plain paragraph — same copy, elevated typographic treatment. */
const PULL_QUOTE_INDEX = 1

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = getBlogPost(slug)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBodyVisible, setIsBodyVisible] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBodyVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug)
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length]

  const leadFirstChar = post.excerpt.charAt(0)
  const leadRest = post.excerpt.slice(1)

  const revealStyle = (index: number) => ({
    transitionDelay: isBodyVisible ? `${index * 90}ms` : '0ms',
  })

  return (
    <div className="bg-black">
      <StickyHeader isScrolled={isScrolled} />
      <main className="overflow-hidden">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 md:px-8 md:pb-24">
            <Link
              href="/blogs"
              className="group mb-8 inline-flex items-center gap-2 text-shadow-cinematic label text-cream/70 transition-colors duration-300 hover:text-gold"
            >
              <ArrowLeft
                strokeWidth={1.5}
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              />
              All Articles
            </Link>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
              <p className="label text-shadow-cinematic text-gold">{post.category}</p>
            </div>

            <AnimatedHeading
              as="h1"
              hero
              text={post.title}
              className="text-shadow-cinematic text-balance font-serif font-normal leading-[0.95] tracking-tight text-cream text-[clamp(2.75rem,9vw,7rem)]"
            />

            <div className="mt-7 flex items-center gap-4 text-shadow-cinematic text-xs text-cream/50">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-cream/30" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section ref={bodyRef} className="relative px-6 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[43rem]">
            {/* Section-opening flourish, marking the shift from hero to reading */}
            <div
              className={`mb-14 flex items-center justify-center gap-3 transition-all duration-700 md:mb-20 ${
                isBodyVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="h-px w-10 bg-gold/40" />
              <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
              <div className="h-px w-10 bg-gold/40" />
            </div>

            {/* Lead paragraph, with a drop cap */}
            <p
              className={`font-serif text-2xl leading-[1.6] text-cream/95 transition-all duration-700 ease-out md:text-[1.85rem] ${
                isBodyVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={revealStyle(0)}
            >
              <span
                aria-hidden="true"
                className="float-left mr-3 mt-1 font-serif text-6xl leading-[0.8] text-gold md:text-7xl"
              >
                {leadFirstChar}
              </span>
              {leadRest}
            </p>

            <div className="gold-line my-14 md:my-16" />

            {/* Body copy — same paragraphs, elevated rhythm; one paragraph is
                presented as a highlighted pull quote rather than plain text. */}
            <div className="space-y-9 md:space-y-10">
              {post.body.map((paragraph, i) =>
                i === PULL_QUOTE_INDEX ? (
                  <blockquote
                    key={i}
                    className={`relative border-l-2 border-gold/50 py-1 pl-7 transition-all duration-700 ease-out md:pl-9 ${
                      isBodyVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                    style={revealStyle(i + 1)}
                  >
                    <Quote strokeWidth={1.5} className="mb-3 h-6 w-6 text-gold/40" />
                    <p className="font-serif text-xl leading-[1.7] text-cream italic text-balance md:text-2xl">
                      {paragraph}
                    </p>
                  </blockquote>
                ) : (
                  <p
                    key={i}
                    className={`font-sans text-lg leading-[1.9] text-cream/70 transition-all duration-700 ease-out ${
                      isBodyVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                    style={revealStyle(i + 1)}
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <div className="mt-20 border-t border-gold/15 pt-10 md:mt-24">
              <p className="label mb-4 text-gold/60">Continue Reading</p>
              <Link
                href={`/blogs/${nextPost.slug}`}
                className="group flex items-center justify-between gap-4"
              >
                <span className="font-serif text-2xl text-cream transition-colors duration-300 group-hover:text-gold md:text-3xl">
                  {nextPost.title}
                </span>
                <ArrowLeft
                  strokeWidth={1.5}
                  className="h-5 w-5 shrink-0 rotate-180 text-gold transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </main>
    </div>
  )
}
