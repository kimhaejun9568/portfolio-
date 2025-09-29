'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Clock, ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { formatDate, getReadingTime } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import type { Post } from '@/lib/mdx'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/juyesu',
    icon: Github,
    label: 'GitHub 프로필',
  },
  {
    name: 'LinkedIn', 
    href: 'https://linkedin.com/in/juyesu',
    icon: Linkedin,
    label: 'LinkedIn 프로필',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/juyesu_dev',
    icon: Twitter,
    label: 'Twitter 팔로우',
  },
  {
    name: 'Email',
    href: 'mailto:hello@juyesu.dev',
    icon: Mail,
    label: '이메일 보내기',
  },
]

const featuredProjects = [
  {
    title: 'Portfolio Website',
    description: 'Next.js 14와 TypeScript로 구현한 개인 포트폴리오 웹사이트입니다.',
    href: 'https://github.com/juyesu/portfolio',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'React Component Library',
    description: '재사용 가능한 React 컴포넌트 라이브러리를 개발했습니다.',
    href: 'https://github.com/juyesu/react-components',
    tags: ['React', 'Storybook', 'TypeScript'],
  },
  {
    title: 'E-commerce Dashboard',
    description: '관리자를 위한 실시간 대시보드를 구현했습니다.',
    href: 'https://github.com/juyesu/ecommerce-dashboard',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
  },
]

interface HomeClientProps {
  recentPosts: Post[]
}

export default function HomeClient({ recentPosts }: HomeClientProps) {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="animate-in">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                안녕하세요,{' '}
                <span className="text-primary">주예수</span>입니다
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl animate-in-delay-1">
                웹 개발과 사용자 경험에 관심이 많은{' '}
                <strong className="text-foreground">프론트엔드 개발자</strong>입니다.
                좋은 코드와 아름다운 인터페이스를 만들기 위해 노력하고 있습니다.
              </p>
              
              {/* Social Links */}
              <div className="mt-6 flex flex-wrap gap-3 animate-in-delay-2">
                {socialLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2"
                      aria-label={link.label}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 animate-in-delay-3">
            <div className="relative">
              <div className="aspect-square w-64 mx-auto md:w-80 lg:w-96">
                <Image
                  src="/images/avatar.jpg"
                  alt="주예수 프로필 사진"
                  fill
                  className="rounded-full object-cover border-4 border-muted"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">최근 글</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              모든 글 보기
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, index) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-shadow animate-in-delay-1" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.frontmatter.date)}
                  <Clock className="h-4 w-4 ml-2" />
                  {getReadingTime(post.content)}
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.frontmatter.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.frontmatter.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {post.frontmatter.tags && (
                  <div className="flex flex-wrap gap-1">
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">주요 프로젝트</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects" className="flex items-center gap-2">
              모든 프로젝트 보기
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Card key={project.title} className="group hover:shadow-lg transition-shadow animate-in-delay-2" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="group-hover:text-primary transition-colors">
                    {project.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    코드 보기
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
