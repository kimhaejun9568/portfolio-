import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { serializeMDX } from '@/lib/mdx'
import { generateMetadata } from '@/lib/seo'
import { MDXContent } from '@/components/mdx-components'

export const metadata = generateMetadata({
  title: '사용하는 도구들',
  description: '개발과 일상에서 사용하는 도구, 앱, 장비들을 소개합니다.',
  canonical: '/uses',
})

async function getUsesContent() {
  try {
    const filePath = path.join(process.cwd(), 'content/pages/uses.md')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const serialized = await serializeMDX(fileContents)
    return serialized
  } catch (error) {
    return null
  }
}

export default async function UsesPage() {
  const content = await getUsesContent()
  
  if (!content) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            사용하는 도구들
          </h1>
          <p className="text-lg text-muted-foreground">
            개발과 일상에서 사용하는 도구, 앱, 장비들을 소개합니다.
            생산성 향상과 더 나은 개발 경험을 위해 선택한 것들입니다.
          </p>
        </header>
        
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent source={content} />
        </article>
        
        <footer className="mt-8 pt-8 border-t text-sm text-muted-foreground">
          <p>
            이 페이지는 정기적으로 업데이트됩니다. 추천하고 싶은 도구가 있다면{' '}
            <a
              href="mailto:hello@juyesu.dev?subject=도구 추천"
              className="text-primary hover:underline"
            >
              이메일로 알려주세요
            </a>
            !
          </p>
        </footer>
      </div>
    </div>
  )
}
