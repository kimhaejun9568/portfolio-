import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { serializeMDX } from '@/lib/mdx'
import { generateMetadata } from '@/lib/seo'
import { MDXContent } from '@/components/mdx-components'

export const metadata = generateMetadata({
  title: '지금',
  description: '현재 하고 있는 일들과 관심사를 공유합니다.',
  canonical: '/now',
})

async function getNowContent() {
  try {
    const filePath = path.join(process.cwd(), 'content/pages/now.md')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const serialized = await serializeMDX(fileContents)
    return serialized
  } catch (error) {
    return null
  }
}

export default async function NowPage() {
  const content = await getNowContent()
  
  if (!content) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            지금 하고 있는 일들
          </h1>
          <p className="text-lg text-muted-foreground">
            현재 진행 중인 프로젝트와 학습하고 있는 것들, 그리고 관심사를 공유합니다.
            <br />
            <span className="text-sm">
              마지막 업데이트: {new Date().toLocaleDateString('ko-KR')}
            </span>
          </p>
        </header>
        
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent source={content} />
        </article>
        
        <footer className="mt-8 pt-8 border-t text-sm text-muted-foreground">
          <p>
            이 페이지는{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              /now 페이지 운동
            </a>
            에서 영감을 받았습니다.
          </p>
        </footer>
      </div>
    </div>
  )
}
