import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { generateMetadata } from '@/lib/seo'
import { Button } from '@/components/button'

export const metadata = generateMetadata({
  title: '페이지를 찾을 수 없습니다',
  description: '요청하신 페이지를 찾을 수 없습니다. 다른 페이지를 확인해보세요.',
})

export default function NotFound() {
  return (
    <div className="container min-h-[60vh] flex items-center justify-center py-8 md:py-12">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
          <p className="text-muted-foreground">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            이전 페이지
          </Button>
        </div>
        
        <div className="pt-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            찾으시는 내용이 있으시다면:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <Link href="/blog" className="text-primary hover:underline">
              블로그 둘러보기
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/projects" className="text-primary hover:underline">
              프로젝트 보기
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a 
              href="mailto:hello@juyesu.dev" 
              className="text-primary hover:underline"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
