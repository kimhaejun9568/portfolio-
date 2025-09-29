import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function for conditionally joining classNames with Tailwind CSS class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Date(date).toLocaleDateString('ko-KR', {
    ...defaultOptions,
    ...options,
  })
}

/**
 * Get relative time from a date (e.g., "2 days ago")
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInMs = now.getTime() - targetDate.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      return `${diffInMinutes}분 전`
    }
    return `${diffInHours}시간 전`
  }

  if (diffInDays === 1) return '어제'
  if (diffInDays <= 7) return `${diffInDays}일 전`
  if (diffInDays <= 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks}주 전`
  }
  if (diffInDays <= 365) {
    const months = Math.floor(diffInDays / 30)
    return `${months}개월 전`
  }

  const years = Math.floor(diffInDays / 365)
  return `${years}년 전`
}

/**
 * Generate a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Get reading time estimate from text content
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200 // Average reading speed
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return `${readingTime}분`
}

/**
 * Sort array of posts by date (newest first)
 */
export function sortPostsByDate<T extends { date: string }>(posts: T[]): T[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag<T extends { tags?: string[] }>(posts: T[], tag: string): T[] {
  return posts.filter(post => post.tags?.includes(tag))
}

/**
 * Get unique tags from posts
 */
export function getUniqueTags<T extends { tags?: string[] }>(posts: T[]): string[] {
  const tags = posts.flatMap(post => post.tags || [])
  return [...new Set(tags)].sort()
}

/**
 * Search posts by title and content
 */
export function searchPosts<T extends { title: string; content?: string }>(
  posts: T[],
  query: string
): T[] {
  const lowercaseQuery = query.toLowerCase()
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content?.toLowerCase().includes(lowercaseQuery)
  )
}
