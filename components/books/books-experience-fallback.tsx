import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import GenreBadge from '@/components/ui/genre-badge'
import { books, type BookId } from '@/lib/books'
import { ACCENT_CTA } from './book-overlay-sections'

const ORDER: BookId[] = ['acclaimed', 'featured', 'latest']

/** Static, non-WebGL rendition of the showcase for `prefers-reduced-motion`
 *  — same content and brand styling as the cinematic experience, laid out
 *  as plain stacked sections instead of a scroll-driven 3D scene. */
export default function BooksExperienceFallback() {
  return (
    <section className="relative px-6 py-32 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="label mb-4 text-gold">The World of Inger &amp; Alex Moore</p>
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gold/40" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
          <div className="h-px w-10 bg-gold/40" />
        </div>
        <h1 className="h1 text-balance">The Realm of Mardalla</h1>
        <p className="body mx-auto mt-6 max-w-xl text-cream/60">
          Three chronicles of magic, kingdoms, and forgotten legends.
        </p>
      </div>

      <div className="mx-auto mt-24 flex max-w-5xl flex-col gap-24">
        {ORDER.map((id) => {
          const book = books[id]
          return (
            <article key={id} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className="relative mx-auto aspect-[2/3] w-full max-w-sm">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} — book cover`}
                  fill
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="label mb-3 text-gold">{book.tagline}</p>
                <GenreBadge genre={book.genre} accent={book.accent} className="mb-4" />
                <h2 className="h3 text-balance">{book.title}</h2>
                <p className="label mt-2 text-cream/50">{book.series}</p>
                <p className="body mt-5 text-cream/75">{book.description}</p>
                <button
                  type="button"
                  className={`group mt-7 inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm font-medium tracking-widest text-cream uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 ${ACCENT_CTA[book.accent]}`}
                >
                  {book.ctaLabel}
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mx-auto mt-28 flex max-w-xl flex-col items-center text-center">
        <Image src="/inger-logo.png" alt="Inger & Alex Moore" width={64} height={64} className="mb-6 opacity-95" />
        <div className="mb-5 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gold/50" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
          <div className="h-px w-10 bg-gold/50" />
        </div>
        <p className="subtitle text-balance">Enter a world of magic, kingdoms, and forgotten legends.</p>
      </div>
    </section>
  )
}
