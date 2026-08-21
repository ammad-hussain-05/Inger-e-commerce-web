import { blogPosts } from '@/lib/blogs'
import BlogArticle from './blog-article'

export default function BlogsList() {
  return (
    <div className="mx-auto max-w-6xl">
      {blogPosts.map((post, index) => (
        <div key={post.slug}>
          <BlogArticle post={post} reversed={index % 2 === 1} />
          {index < blogPosts.length - 1 && (
            <div className="my-16 flex items-center justify-center gap-4 md:my-24">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
              <div className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
