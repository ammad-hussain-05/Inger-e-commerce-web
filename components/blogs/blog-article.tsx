'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blogs'
import BlogImageFX from './blog-image-fx'

interface BlogArticleProps {
  post: BlogPost
  /** True for even-indexed rows — flips the image to the right on desktop. */
  reversed?: boolean
}

export default function BlogArticle({ post, reversed = false }: BlogArticleProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <Link
        href={`/blogs/${post.slug}`}
        className="group grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-16"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Image */}
        <div
          className={`relative md:col-span-7 ${reversed ? 'md:order-2' : 'md:order-1'}`}
        >
          <BlogImageFX
            src={post.image}
            alt={post.imageAlt}
            className="aspect-[4/5] w-full rounded-sm border border-gold/15 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] transition-colors duration-500 group-hover:border-gold/40 sm:aspect-[16/10] md:aspect-[4/3]"
          />

          {/* Oversized number, overlapping the image corner */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -left-2 select-none font-serif text-[5.5rem] leading-none text-gold/15 sm:-top-10 sm:text-[7rem] md:-top-12 md:text-[8.5rem]"
          >
            {post.number}
          </span>
        </div>

        {/* Content */}
        <div className={`md:col-span-5 ${reversed ? 'md:order-1' : 'md:order-2'}`}>
          <p className="font-sans text-[11px] font-medium tracking-[0.2em] text-cream/40 uppercase">
            {post.seriesLabel}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            <p className="label text-gold">{post.category}</p>
          </div>

          <h3 className="font-serif text-3xl leading-tight text-cream text-balance mt-5 transition-colors duration-300 group-hover:text-gold sm:text-4xl md:text-[2.75rem]">
            {post.title}
          </h3>

          <div className="gold-line my-6 max-w-[120px]" />

          <p className="body text-cream/65 text-base leading-relaxed sm:text-lg">{post.excerpt}</p>

          <div className="mt-8 flex items-center gap-3">
            <span className="text-shadow-none label text-gold border-b border-gold/40 pb-2 transition-colors duration-300 group-hover:border-gold">
              Read Article
            </span>
            <ArrowRight
              strokeWidth={1.5}
              className="h-4 w-4 text-gold transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            />
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-cream/35">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-cream/20" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
