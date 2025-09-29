import { NextResponse } from 'next/server'
import RSS from 'rss'
import { getAllPosts } from '@/lib/mdx'

export async function GET() {
  const baseUrl = 'https://juyesu.dev'
  const posts = getAllPosts().slice(0, 20) // 최신 20개 포스트만

  const feed = new RSS({
    title: '주예수 블로그',
    description: '웹 개발과 사용자 경험에 관심이 많은 프론트엔드 개발자 주예수의 개인 블로그입니다.',
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    language: 'ko',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} 주예수. All rights reserved.`,
    managingEditor: 'hello@juyesu.dev (주예수)',
    webMaster: 'hello@juyesu.dev (주예수)',
    ttl: 60,
    image_url: `${baseUrl}/og.png`,
  })

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${baseUrl}/blog/${post.slug}`,
      guid: `${baseUrl}/blog/${post.slug}`,
      categories: post.frontmatter.tags || [],
      author: post.frontmatter.author || '주예수',
      date: new Date(post.frontmatter.date),
    })
  })

  return new NextResponse(feed.xml(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}
