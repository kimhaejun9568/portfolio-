import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
  cover?: string
  draft?: boolean
  author?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

export interface SerializedPost {
  slug: string
  frontmatter: PostFrontmatter
  serializedContent: any
  readingTime: string
}

const contentDirectory = path.join(process.cwd(), 'content')

/**
 * Get all MDX files from a directory
 */
export function getMDXFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }

  return fs.readdirSync(fullPath).filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
}

/**
 * Read and parse an MDX file
 */
export function readMDXFile(filePath: string): { frontmatter: PostFrontmatter; content: string } {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  return {
    frontmatter: data as PostFrontmatter,
    content,
  }
}

/**
 * Get all posts from the posts directory
 */
export function getAllPosts(): Post[] {
  const files = getMDXFiles('posts')
  
  const posts = files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    const filePath = path.join(contentDirectory, 'posts', file)
    const { frontmatter, content } = readMDXFile(filePath)
    
    return {
      slug,
      frontmatter,
      content,
    }
  })

  // Filter out drafts in production
  const filteredPosts = process.env.NODE_ENV === 'production'
    ? posts.filter(post => !post.frontmatter.draft)
    : posts

  // Sort by date (newest first)
  return filteredPosts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const filePath = path.join(contentDirectory, 'posts', `${slug}.mdx`)
    
    // Try .mdx first, then .md
    let actualPath = filePath
    if (!fs.existsSync(filePath)) {
      actualPath = path.join(contentDirectory, 'posts', `${slug}.md`)
      if (!fs.existsSync(actualPath)) {
        return null
      }
    }

    const { frontmatter, content } = readMDXFile(actualPath)
    
    // Don't return drafts in production
    if (process.env.NODE_ENV === 'production' && frontmatter.draft) {
      return null
    }

    return {
      slug,
      frontmatter,
      content,
    }
  } catch (error) {
    return null
  }
}

/**
 * Serialize MDX content for rendering
 */
export async function serializeMDX(content: string): Promise<any> {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
              ariaLabel: 'Link to section',
            },
          },
        ],
        rehypeKatex as any,
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
          },
        ],
      ],
    },
  })

  return mdxSource
}

/**
 * Get reading time for content
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return `${readingTime}분`
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = posts.flatMap(post => post.frontmatter.tags || [])
  return Array.from(new Set(tags)).sort()
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.frontmatter.tags?.includes(tag))
}

/**
 * Get recent posts (limited number)
 */
export function getRecentPosts(limit: number = 5): Post[] {
  const posts = getAllPosts()
  return posts.slice(0, limit)
}

/**
 * Get adjacent posts (previous and next)
 */
export function getAdjacentPosts(currentSlug: string): { previous: Post | null; next: Post | null } {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex(post => post.slug === currentSlug)
  
  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  const previous = currentIndex > 0 ? posts[currentIndex - 1] : null
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  return { previous, next }
}

/**
 * Generate table of contents from content
 */
export function generateTOC(content: string): { id: string; title: string; level: number }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: { id: string; title: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    toc.push({ id, title, level })
  }

  return toc
}
