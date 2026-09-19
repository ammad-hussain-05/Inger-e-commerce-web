import type { BookId } from '@/lib/books'
import { getBlogPostsByBook } from '@/lib/blogs'
import BookBlogSection from './book-blog-section'

/** Chronological book order — matches the sequence used everywhere else
 *  on the site (homepage sections, the /books showcase, the carousel). */
const BOOK_ORDER: BookId[] = ['acclaimed', 'featured', 'latest']

export default function BlogsList() {
  return (
    <div>
      {BOOK_ORDER.map((bookId) => (
        <BookBlogSection key={bookId} bookId={bookId} posts={getBlogPostsByBook(bookId)} />
      ))}
    </div>
  )
}
