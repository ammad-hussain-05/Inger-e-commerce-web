'use client'

import { useEffect, useState } from 'react'
import StickyHeader from '@/components/layout/sticky-header'
import Footer from '@/components/sections/footer'
import Newsletter from '@/components/sections/newsletter'
import BlogsList from '@/components/blogs/blogs-list'
import AnimatedHeading from '@/components/blogs/animated-heading'

export default function BlogsPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black">
      <StickyHeader isScrolled={isScrolled} />
      <main className="overflow-hidden">
        {/* Hero / Intro */}
        <section className="relative overflow-hidden px-6 pt-40 pb-24 md:px-8 md:pt-48 md:pb-32">
          <div className="pointer-events-none absolute inset-0 bg-[url('/blog-background.png')] bg-cover bg-center opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gold/50" />
              <p className="label text-gold">Blogs</p>
            </div>

            <AnimatedHeading
              as="h1"
              hero
              text="Stories Behind the Stories"
              className="text-balance font-serif font-normal leading-[0.92] tracking-tight text-cream text-[clamp(3.25rem,13vw,10rem)]"
            />

            <p className="body mt-10 max-w-2xl text-cream/65 text-lg md:text-xl">
              Notes, reflections, and behind-the-scenes craft from the writing of the Maldonere Chronicles —
              worldbuilding, character, magic, and the long road from a blank page to a bound book.
            </p>
          </div>
        </section>

        {/* Article list */}
        <section className="relative px-6 pb-28 md:px-8 md:pb-36">
          <BlogsList />
        </section>

        <Newsletter />
        <Footer />
      </main>
    </div>
  )
}
