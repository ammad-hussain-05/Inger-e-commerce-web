'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import GenreBadge from '@/components/ui/genre-badge'
import { books, type BookId } from '@/lib/books'
import type { BlogPost } from '@/lib/blogs'
import BlogArticle from './blog-article'

interface BookBlogSectionProps {
  bookId: BookId
  posts: BlogPost[]
}

const accentText: Record<BookId, string> = {
  acclaimed: 'text-forest-green',
  featured: 'text-royal-purple',
  latest: 'text-gold',
}

const accentLine: Record<BookId, string> = {
  acclaimed: 'bg-forest-green/50',
  featured: 'bg-royal-purple/50',
  latest: 'bg-gold/50',
}

/** Book section header + its two articles, grouped for the /blogs journal.
 *  The book's own cover art is the section's hero background, per the
 *  client's requirement that each book get its own dedicated blog section. */
export default function BookBlogSection({ bookId, posts }: BookBlogSectionProps) {
  const book = books[bookId]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} id={`book-${bookId}`} className="scroll-mt-24">
      {/* Book hero — original cover art as the section's background visual */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={book.coverImage}
            alt={`${book.title} — book cover`}
            fill
            className="object-cover object-top opacity-[0.16]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/88 to-black" />
        </div>

        <div
          className={`relative z-10 mx-auto max-w-4xl px-6 py-24 text-center transition-all duration-700 md:px-8 md:py-32 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className={`label mb-3 ${accentText[bookId]}`}>{book.series}</p>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className={`h-px w-8 ${accentLine[bookId]}`} />
            <div className={`h-1.5 w-1.5 rotate-45 ${accentLine[bookId]}`} />
            <div className={`h-px w-8 ${accentLine[bookId]}`} />
          </div>
          <h2 className="h1 text-balance">{book.title}</h2>
          <GenreBadge genre={book.genre} accent={book.accent} className="mx-auto mt-6" />
          <p className="body mx-auto mt-7 max-w-2xl text-cream/60">{book.description}</p>
        </div>
      </div>

      {/* This book's articles */}
      <div className="px-6 pb-28 md:px-8 md:pb-36">
        <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
          {posts.map((post, index) => (
            <BlogArticle key={post.slug} post={post} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  )
}
