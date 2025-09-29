import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import { generateMetadata } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'

export const metadata = generateMetadata({
  title: '프로젝트',
  description: '제가 진행했던 다양한 개발 프로젝트들을 소개합니다.',
  canonical: '/projects',
})

const projects = [
  {
    title: 'Personal Portfolio Website',
    description: 'Next.js 14와 TypeScript를 활용한 개인 포트폴리오 웹사이트입니다. 모던한 디자인과 SEO 최적화, 다크모드를 지원합니다.',
    image: '/images/projects/portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    githubUrl: 'https://github.com/juyesu/portfolio',
    liveUrl: 'https://juyesu.dev',
    date: '2024-01',
    featured: true,
  },
  {
    title: 'React Component Library',
    description: '재사용 가능한 React 컴포넌트 라이브러리입니다. Storybook을 통한 문서화와 테스트가 포함되어 있습니다.',
    image: '/images/projects/component-library.jpg',
    tags: ['React', 'TypeScript', 'Storybook', 'Jest'],
    githubUrl: 'https://github.com/juyesu/react-components',
    liveUrl: 'https://components.juyesu.dev',
    date: '2023-12',
    featured: true,
  },
  {
    title: 'E-commerce Dashboard',
    description: '관리자를 위한 실시간 전자상거래 대시보드입니다. 차트와 데이터 시각화를 통해 비즈니스 인사이트를 제공합니다.',
    image: '/images/projects/dashboard.jpg',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Chart.js'],
    githubUrl: 'https://github.com/juyesu/ecommerce-dashboard',
    date: '2023-10',
    featured: false,
  },
  {
    title: 'Weather App',
    description: '실시간 날씨 정보를 제공하는 모바일 친화적인 웹 애플리케이션입니다. PWA 기능을 지원합니다.',
    image: '/images/projects/weather-app.jpg',
    tags: ['React', 'PWA', 'Weather API', 'Styled Components'],
    githubUrl: 'https://github.com/juyesu/weather-app',
    liveUrl: 'https://weather.juyesu.dev',
    date: '2023-08',
    featured: false,
  },
  {
    title: 'Task Management Tool',
    description: '팀 협업을 위한 칸반 보드 스타일의 작업 관리 도구입니다. 드래그 앤 드롭과 실시간 동기화를 지원합니다.',
    image: '/images/projects/task-manager.jpg',
    tags: ['React', 'Redux', 'Socket.io', 'Express.js'],
    githubUrl: 'https://github.com/juyesu/task-manager',
    date: '2023-06',
    featured: false,
  },
  {
    title: 'Blog Template',
    description: '개발자를 위한 미니멀한 블로그 템플릿입니다. MDX 지원과 코드 하이라이팅 기능이 포함되어 있습니다.',
    image: '/images/projects/blog-template.jpg',
    tags: ['Gatsby', 'GraphQL', 'MDX', 'Prism.js'],
    githubUrl: 'https://github.com/juyesu/blog-template',
    liveUrl: 'https://blog-template.juyesu.dev',
    date: '2023-04',
    featured: false,
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">프로젝트</h1>
        <p className="text-lg text-muted-foreground">
          제가 진행했던 다양한 개발 프로젝트들을 소개합니다. 
          각 프로젝트는 실제 문제를 해결하고 새로운 기술을 학습하는 과정에서 탄생했습니다.
        </p>
      </div>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">주요 프로젝트</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-200 animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} 스크린샷`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {project.date}
                  </div>
                </div>
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      코드
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" asChild className="flex-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        데모
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">기타 프로젝트</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className="group hover:shadow-lg transition-all duration-200 animate-in-delay-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={project.image}
                  alt={`${project.title} 스크린샷`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {project.date}
                  </div>
                </div>
                <CardDescription className="text-sm line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github className="h-3 w-3" />
                      코드
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        데모
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
