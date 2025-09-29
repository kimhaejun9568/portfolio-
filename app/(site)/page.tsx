import { getRecentPosts } from '@/lib/mdx'
import HomeClient from './home-client'

export default function HomePage() {
  const recentPosts = getRecentPosts(3)

  return <HomeClient recentPosts={recentPosts} />
}