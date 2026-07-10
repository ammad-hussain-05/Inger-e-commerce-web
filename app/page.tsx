'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/sections/hero'
import LatestRelease from '@/components/sections/latest-release'
import FeaturedRelease from '@/components/sections/featured-release'
import AcclaimedRelease from '@/components/sections/acclaimed-release'
import Marquee from '@/components/ui/marquee'
import ModernCarousel from '@/components/ui/modern-carousel'
import About from '@/components/sections/about'
import Testimonials from '@/components/sections/testimonials'
import Blog from '@/components/sections/blog'
import Footer from '@/components/sections/footer'
import StickyHeader from '@/components/layout/sticky-header'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black">
      <StickyHeader isScrolled={isScrolled} />
      <main className="overflow-hidden">
        <Hero />
        <LatestRelease />
        <Marquee
          words={['Immersive', 'Cinematic', 'Steampunk', 'Fantasy', 'Adventure', 'Epic Storytelling']}
          direction="left"
          speed={30}
        />
        <FeaturedRelease />
        <Marquee
          words={['Immersive', 'Cinematic', 'Steampunk', 'Fantasy', 'Adventure', 'Epic Storytelling']}
          direction="right"
          speed={30}
        />
        <AcclaimedRelease />
        <Marquee
          words={['Immersive', 'Cinematic', 'Steampunk', 'Fantasy', 'Adventure', 'Epic Storytelling']}
          direction="left"
          speed={30}
        />
        <ModernCarousel
          heading="Tales Our Readers Are Loving Right Now"
          items={[
            { image: '/acclaimed-released-book.png', title: 'Acclaimed Release' },
            { image: '/latest-release-book.png', title: 'Latest Release' },
            { image: '/featured-release-book.png', title: 'Featured Release' },
          ]}
        />
        <About />
        <Testimonials />
        <Blog />
        <Footer />
      </main>
    </div>
  )
}
