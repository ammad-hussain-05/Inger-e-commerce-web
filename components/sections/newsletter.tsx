'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react'

const ICON_STROKE_WIDTH = 1.5

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const renderedAtRef = useRef<number>(0)

  useEffect(() => {
    renderedAtRef.current = Date.now()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company: honeypot, ts: renderedAtRef.current }),
      })

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setErrorMessage('Something went wrong. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative overflow-hidden bg-black px-6 pt-28 pb-16 md:px-8 md:pt-36 md:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-charcoal/15 to-black" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.045] blur-[140px]" />

      <div
        className={`relative z-10 mx-auto max-w-2xl text-center transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="label mb-4 text-gold">Stay Connected</p>
        <div className="mb-7 flex items-center justify-center gap-2">
          <div className="h-px w-6 bg-gold/40" />
          <div className="h-1 w-1 rotate-45 bg-gold/60" />
          <div className="h-px w-6 bg-gold/40" />
        </div>
        <h2 className="h2 text-balance">Stay Connected</h2>
        <p className="body mt-6 text-cream/60">
          Be the first to know about new releases, exclusive content, and behind-the-scenes updates.
        </p>

        <div className="mt-12">
          {status === 'success' ? (
            <div className="animate-fade-in mx-auto flex max-w-md items-center justify-center gap-3 rounded-sm border border-gold/40 bg-gold/[0.06] px-6 py-5">
              <Check strokeWidth={ICON_STROKE_WIDTH} className="h-5 w-5 shrink-0 text-gold" />
              <p className="text-cream">Thank you &mdash; you&apos;re on the list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    autoComplete="email"
                    aria-label="Email address"
                    disabled={status === 'loading'}
                    className="w-full rounded-sm border border-gold/25 bg-black/40 px-6 py-4 font-sans text-sm text-cream placeholder-cream/40 backdrop-blur-sm transition-all duration-300 focus:border-gold focus:bg-black/60 focus:shadow-[0_0_0_3px_rgba(201,169,97,0.15)] focus:outline-none disabled:opacity-60"
                  />
                </div>

                {/* Honeypot — hidden from real visitors, left unset only by bots */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-sm border border-gold bg-gold px-8 py-4 text-sm font-medium tracking-widest text-black uppercase transition-all duration-300 ease-out hover:bg-transparent hover:text-gold disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gold disabled:hover:text-black"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={ICON_STROKE_WIDTH} />
                      Joining
                    </>
                  ) : (
                    <>
                      Join the List
                      <ArrowRight
                        strokeWidth={ICON_STROKE_WIDTH}
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="animate-fade-in mt-4 flex items-center justify-center gap-2 text-sm text-rose-300/80">
                  <AlertCircle strokeWidth={ICON_STROKE_WIDTH} className="h-4 w-4 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <p className="label mt-5 text-[10px] text-cream/25">
                No spam, ever. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
