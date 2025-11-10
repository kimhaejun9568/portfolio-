'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'


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
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            이전 페이지
          </button>
        </div>
        
        <div className="pt-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            찾으시는 내용이 있으시다면:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <Link href="/publications" className="text-primary hover:underline">
              Publications
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/experience" className="text-primary hover:underline">
              Experience
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/about" className="text-primary hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
