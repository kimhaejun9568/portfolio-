import Link from 'next/link'
import { Suspense } from 'react'
import { Calendar, Clock, Search } from 'lucide-react'
import { getAllPosts, getAllTags } from '@/lib/mdx'
import { formatDate, getReadingTime } from '@/lib/utils'
import { generateMetadata } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { SearchFilter } from '@/components/search-filter'

export const metadata = generateMetadata({
  title: '블로그',
  description: '웹 개발, 프론트엔드, 그리고 기술에 대한 생각을 공유합니다.',
  canonical: '/blog',
})

interface BlogPageProps {
  searchParams: {
    search?: string
    tag?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const { search, tag } = searchParams
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  // 검색 및 태그 필터링
  let filteredPosts = allPosts

  if (search) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.description.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.frontmatter.tags?.includes(tag)
    )
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">블로그</h1>
        <p className="text-lg text-muted-foreground">
          웹 개발, 프론트엔드, 그리고 기술에 대한 생각을 공유합니다.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <Suspense fallback={<div>로딩 중...</div>}>
          <SearchFilter 
            tags={allTags}
            currentTag={tag}
            currentSearch={search}
          />
        </Suspense>
      </div>

      {/* Posts Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length}개의 글
          {search && ` • "${search}" 검색 결과`}
          {tag && ` • "${tag}" 태그`}
        </p>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.slug} 
              className="group hover:shadow-lg transition-all duration-200 animate-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.frontmatter.date)}
                  <Clock className="h-4 w-4 ml-2" />
                  {getReadingTime(post.content)}
                </div>
                <CardTitle className="text-xl">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="group-hover:text-primary transition-colors"
                  >
                    {post.frontmatter.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base">
                  {post.frontmatter.description}
                </CardDescription>
              </CardHeader>
              {post.frontmatter.tags && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((postTag) => (
                      <Link
                        key={postTag}
                        href={`/blog?tag=${postTag}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
                      >
                        #{postTag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground">
            다른 검색어나 태그를 시도해보세요.
          </p>
          {(search || tag) && (
            <Link
              href="/blog"
              className="inline-flex items-center mt-4 text-primary hover:underline"
            >
              모든 글 보기
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
