import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { getPostBySlug, serializeMDX, getAdjacentPosts, getAllPosts } from '@/lib/mdx'
import { formatDate, getReadingTime } from '@/lib/utils'
import { generatePostMetadata, generateBlogJsonLd } from '@/lib/seo'
import { MDXContent } from '@/components/mdx-components'
import { Button } from '@/components/button'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {}
  }

  return generatePostMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
    url: `/blog/${params.slug}`,
  })
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const serializedContent = await serializeMDX(post.content)
  const { previous, next } = getAdjacentPosts(params.slug)
  const readingTime = getReadingTime(post.content)

  // JSON-LD structured data
  const jsonLd = generateBlogJsonLd({
    url: `https://juyesu.dev/blog/${params.slug}`,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    tags: post.frontmatter.tags,
    author: post.frontmatter.author,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="container py-8 md:py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              블로그로 돌아가기
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <Clock className="h-4 w-4 ml-2" />
            {readingTime}
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {post.frontmatter.title}
          </h1>
          
          {post.frontmatter.description && (
            <p className="text-xl text-muted-foreground">
              {post.frontmatter.description}
            </p>
          )}
          
          {post.frontmatter.tags && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent source={serializedContent} />
        </div>

        {/* Navigation */}
        {(previous || next) && (
          <nav className="mt-12 pt-8 border-t">
            <div className="grid gap-4 md:grid-cols-2">
              {previous && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    이전 글
                  </p>
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                  >
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {previous.frontmatter.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {previous.frontmatter.description}
                    </p>
                  </Link>
                </div>
              )}
              
              {next && (
                <div className="space-y-2 md:text-right">
                  <p className="text-sm text-muted-foreground flex items-center gap-1 md:justify-end">
                    다음 글
                    <ChevronRight className="h-4 w-4" />
                  </p>
                  <Link
                    href={`/blog/${next.slug}`}
                    className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                  >
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {next.frontmatter.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {next.frontmatter.description}
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Call to Action */}
        <div className="mt-12 pt-8 border-t text-center">
          <h3 className="text-lg font-medium mb-2">이 글이 도움이 되었나요?</h3>
          <p className="text-muted-foreground mb-4">
            피드백이나 질문이 있으시면 언제든 연락해주세요.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `"${post.frontmatter.title}" by @juyesu_dev`
                )}&url=${encodeURIComponent(`https://juyesu.dev/blog/${params.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter로 공유
              </a>
            </Button>
            <Button asChild>
              <a href="mailto:hello@juyesu.dev?subject=블로그 글 관련 문의">
                이메일 보내기
              </a>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
