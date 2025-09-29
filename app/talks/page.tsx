import Link from 'next/link'
import { Calendar, MapPin, Users, ExternalLink, FileText } from 'lucide-react'
import { generateMetadata } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'

export const metadata = generateMetadata({
  title: '발표',
  description: '컨퍼런스와 밋업에서 진행한 발표들을 소개합니다.',
  canonical: '/talks',
})

const talks = [
  {
    title: 'Next.js 14의 새로운 기능들',
    description: 'App Router, Server Components, 그리고 성능 최적화에 대해 다룹니다.',
    event: 'Frontend Korea',
    location: '서울 강남구',
    date: '2024-03-15',
    attendees: 150,
    slides: 'https://slides.com/juyesu/nextjs-14-features',
    video: 'https://youtube.com/watch?v=example1',
    tags: ['Next.js', 'React', 'Performance'],
  },
  {
    title: '웹 접근성, 모두를 위한 웹 만들기',
    description: 'WCAG 가이드라인과 실무에서 적용 가능한 웹 접근성 개선 방법을 소개합니다.',
    event: 'A11y Korea Meetup',
    location: '온라인',
    date: '2023-12-08',
    attendees: 200,
    slides: 'https://slides.com/juyesu/web-accessibility',
    tags: ['Accessibility', 'WCAG', 'UX'],
  },
  {
    title: 'TypeScript로 더 안전한 React 개발하기',
    description: 'TypeScript의 고급 타입 기능을 활용한 React 컴포넌트 개발 노하우를 공유합니다.',
    event: 'React Seoul Meetup',
    location: '서울 서초구',
    date: '2023-09-20',
    attendees: 80,
    slides: 'https://slides.com/juyesu/typescript-react',
    video: 'https://youtube.com/watch?v=example2',
    tags: ['TypeScript', 'React', 'Type Safety'],
  },
  {
    title: '프론트엔드 성능 최적화 실전 가이드',
    description: 'Core Web Vitals 개선과 사용자 경험 향상을 위한 실무 중심의 성능 최적화 기법을 다룹니다.',
    event: 'Web Performance Seoul',
    location: '서울 마포구',
    date: '2023-06-12',
    attendees: 120,
    slides: 'https://slides.com/juyesu/frontend-performance',
    tags: ['Performance', 'Web Vitals', 'UX'],
  },
]

export default function TalksPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">발표</h1>
        <p className="text-lg text-muted-foreground">
          컨퍼런스와 밋업에서 진행한 발표들을 소개합니다. 
          프론트엔드 개발 경험과 학습한 내용을 커뮤니티와 공유하고 있습니다.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{talks.length}</div>
            <div className="text-sm text-muted-foreground">총 발표</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {talks.reduce((sum, talk) => sum + talk.attendees, 0)}
            </div>
            <div className="text-sm text-muted-foreground">참가자 수</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {talks.filter(talk => talk.video).length}
            </div>
            <div className="text-sm text-muted-foreground">녹화 영상</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {new Set(talks.flatMap(talk => talk.tags)).size}
            </div>
            <div className="text-sm text-muted-foreground">주제 수</div>
          </CardContent>
        </Card>
      </div>

      {/* Talks List */}
      <div className="space-y-6">
        {talks.map((talk, index) => (
          <Card 
            key={talk.title} 
            className="hover:shadow-lg transition-all duration-200 animate-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-xl">
                    {talk.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {talk.description}
                  </CardDescription>
                </div>
              </div>
              
              {/* Event Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(talk.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {talk.event} • {talk.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {talk.attendees}명 참석
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {talk.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={talk.slides}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    슬라이드
                  </a>
                </Button>
                {talk.video && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={talk.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      영상 보기
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center p-8 rounded-lg bg-muted/50">
        <h3 className="text-lg font-medium mb-2">발표 요청</h3>
        <p className="text-muted-foreground mb-4">
          컨퍼런스나 밋업에서 발표를 원하신다면 언제든 연락해주세요.
        </p>
        <Button asChild>
          <a href="mailto:hello@juyesu.dev?subject=발표 요청">
            이메일로 문의하기
          </a>
        </Button>
      </div>
    </div>
  )
}
