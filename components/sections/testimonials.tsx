'use client'

import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote: 'A masterclass in worldbuilding. The author weaves steampunk atmosphere with emotional depth that will leave you breathless.',
    author: 'Literary Journal Quarterly',
  },
  {
    id: 2,
    quote: 'Characters that feel lived-in, prose that sings, and a world you won&apos;t want to leave. Pure literary brilliance.',
    author: 'The Book Critic',
  },
  {
    id: 3,
    quote: 'Urban fantasy at its finest. This is the kind of writing that reminds you why you fell in love with reading.',
    author: 'Speculative Fiction Monthly',
  },
  {
    id: 4,
    quote: 'A stunning achievement. Every page crackles with intelligence and imagination.',
    author: 'Contemporary Fiction Review',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

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

  useEffect(() => {
    if (!isVisible) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isVisible])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gold/3 to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section label */}
        <div className="mb-20 text-center space-y-4">
          <p className="label text-gold">Acclaim</p>
          <h2 className="h3 text-balance">What Readers & Critics Say</h2>
          <div className="flex justify-center">
            <div className="gold-accent-line" />
          </div>
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          {/* Testimonials */}
          <div className="relative min-h-72 flex items-center justify-center overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full text-center transition-all duration-700 ${
                  index === currentIndex
                    ? 'opacity-100 translate-y-0'
                    : index < currentIndex
                      ? 'opacity-0 -translate-y-4 pointer-events-none'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                {/* Quote mark */}
                <svg
                  className="mx-auto mb-6 w-8 h-8 text-gold/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.021-3.7-5.5-4C5.5 2.25 6.521 3 6.521 5c0 1.378-.997 2.114.672 4.144M12 21c3 0 7-1 7-8V5c0-1.25-4.021-3.7-5.5-4C11.5 2.25 12.521 3 12.521 5c0 1.378-.997 2.114.672 4.144" />
                </svg>

                <p className="text-xl md:text-2xl font-serif text-cream mb-8 leading-relaxed">
                  {testimonial.quote}
                </p>

                <p className="label text-gold/60">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          {/* Divider line */}
          <div className="gold-line my-8" />

          {/* Navigation and indicators */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handlePrev}
              className="p-2 text-cream/40 hover:text-gold transition-colors border border-cream/20 hover:border-gold/50 rounded"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-1 bg-gold'
                      : 'w-2 h-2 bg-gold/30 hover:bg-gold/50'
                  } rounded-full`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 text-cream/40 hover:text-gold transition-colors border border-cream/20 hover:border-gold/50 rounded"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
