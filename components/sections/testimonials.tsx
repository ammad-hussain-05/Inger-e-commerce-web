'use client'

import { useEffect, useRef, useState } from 'react'

export default function Testimonials() {
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
      id="testimonials"
      className={`relative py-32 px-8 overflow-hidden transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gold/3 to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section label */}
        <div className="text-center space-y-4">
          <p className="label text-gold">Acclaim</p>
          <h2 className="h3 text-balance">What Readers &amp; Critics Say</h2>
          <div className="flex justify-center">
            <div className="gold-accent-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
