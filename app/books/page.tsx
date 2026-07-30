'use client'

import { useEffect, useState } from 'react'
import StickyHeader from '@/components/layout/sticky-header'
import Footer from '@/components/sections/footer'
import BooksExperience from '@/components/books/books-experience'

export default function BooksPage() {
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
        <BooksExperience />
        <Footer />
      </main>
    </div>
  )
}
