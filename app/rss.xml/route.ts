import { NextResponse } from 'next/server'
import RSS from 'rss'

export async function GET() {
  const baseUrl = 'https://haejunkim.vercel.app'

  const feed = new RSS({
    title: 'Haejun Kim',
    description: 'HCI Researcher specializing in Virtual Reality and Human-Computer Interaction',
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} Haejun Kim. All rights reserved.`,
    ttl: 60,
    image_url: `${baseUrl}/og.png`,
  })

  return new NextResponse(feed.xml(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}
