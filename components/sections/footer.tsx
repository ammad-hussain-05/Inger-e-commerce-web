'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

const ICON_STROKE_WIDTH = 1.5

// Drop the final footage in /public and point this at it, e.g. '/footer-background.mp4'.
// Left empty, no video renders and the footer falls back to the plain black background.
const BACKGROUND_VIDEO_SRC = 'https://www.pexels.com/download/video/37002788/'

const socialLinks = [
  { label: 'Instagram', href: '#', Icon: FaInstagram },
  { label: 'Facebook', href: '#', Icon: FaFacebook },
  { label: 'LinkedIn', href: '#', Icon: FaLinkedin },
  { label: 'X / Twitter', href: '#', Icon: FaXTwitter },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )

    if (footerRef.current) observer.observe(footerRef.current)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setEmail('')
    setIsLoading(false)

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="relative isolate overflow-hidden bg-black pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background video layer (lowest) */}
      {BACKGROUND_VIDEO_SRC && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src={BACKGROUND_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      {/* Dark overlay, above the video */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/65" />

      <div className="relative z-20 mx-auto max-w-6xl px-6 md:px-8">
        {/* Hero row */}
        <div
          className={`mb-20 transition-all duration-700 md:mb-28 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="label mb-6 text-gold">Let&apos;s Craft the Next Chapter</p>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="h1 max-w-2xl text-balance">Ready to build something unforgettable?</h2>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-gold/40 pb-2 label text-gold transition-colors duration-300 hover:border-gold md:self-end"
            >
              Start a Collaboration
              <ArrowUpRight
                strokeWidth={ICON_STROKE_WIDTH}
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className={`mx-auto mb-20 max-w-2xl transition-all delay-150 duration-700 md:mb-24 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h3 className="h3">Stay Connected</h3>
              <p className="body text-cream/70">
                Be the first to know about new releases, exclusive content, and behind-the-scenes updates.
              </p>
            </div>

            {isSubmitted ? (
              <div className="animate-fade-in space-y-2 rounded-sm border border-gold/50 bg-gold/10 p-6">
                <p className="label text-gold">Success!</p>
                <p className="text-cream">Thank you for joining. Check your email for confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-sm border border-gold/30 bg-black/40 px-6 py-3.5 font-sans text-sm text-cream placeholder-cream/40 backdrop-blur-sm transition-all duration-300 focus:border-gold/70 focus:bg-black/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {isLoading ? 'Joining...' : 'Join List'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="gold-line mb-16" />

        {/* Contact / Social */}
        <div
          className={`mb-12 grid gap-10 transition-all delay-300 duration-700 sm:grid-cols-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="space-y-3">
            <p className="label text-xs text-gold/60">Business Enquiry</p>
            <a
              href="mailto:hello@inger.com"
              className="group flex items-center gap-2 text-sm text-cream/80 transition-colors duration-300 hover:text-gold"
            >
              <Mail
                strokeWidth={ICON_STROKE_WIDTH}
                className="h-3.5 w-3.5 text-gold/50 transition-colors duration-300 group-hover:text-gold"
              />
              hello@inger.com
            </a>
            <a
              href="tel:+19824182099"
              className="group flex items-center gap-2 text-sm text-cream/80 transition-colors duration-300 hover:text-gold"
            >
              <Phone
                strokeWidth={ICON_STROKE_WIDTH}
                className="h-3.5 w-3.5 text-gold/50 transition-colors duration-300 group-hover:text-gold"
              />
              +1 982 418 2099
            </a>
          </div>

          <div className="space-y-3 sm:text-right">
            <p className="label text-xs text-gold/60">Social</p>
            <div className="flex gap-3 sm:justify-end">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-cream/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gold/10 pt-8 text-xs text-cream/40 sm:flex-row">
          <p>&copy;INGER&reg; {currentYear}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-gold">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Brand signature watermark (highest) */}
      <div
        className={`relative z-30 mt-16 flex items-center justify-center overflow-hidden px-4 transition-all delay-500 duration-1000 sm:mt-20 md:mt-24 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <span
          className="pointer-events-none w-full max-w-full text-center leading-none font-normal tracking-widest whitespace-nowrap uppercase select-none"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.25rem, 18vw, 200px)',
            backgroundImage: 'linear-gradient(180deg, rgba(250,248,246,0.9), rgba(201,169,97,0.55))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'rgba(201,169,97,0.75)',
          }}
        >
          Inger
        </span>
      </div>
    </footer>
  )
}
