import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { cn } from '@/lib/utils'

// 커스텀 컴포넌트들
const components = {
  // 기본 HTML 요소들
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
    if (href?.startsWith('http') || href?.startsWith('mailto:')) {
      return (
        <a
          href={href}
          className={cn(
            'font-medium text-primary underline underline-offset-4 hover:no-underline',
            className
          )}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        />
      )
    }
    return (
      <Link
        href={href || '#'}
        className={cn(
          'font-medium text-primary underline underline-offset-4 hover:no-underline',
          className
        )}
        {...props}
      />
    )
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted px-4 py-4',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      {...props}
    />
  ),
  // 커스텀 컴포넌트들
  Image,
  // 숏코드들 - 임시로 기본 스타일 적용
  Note: ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 my-6 dark:bg-blue-950/20">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-blue-700 dark:text-blue-300">노트</span>
      </div>
      <div className="text-blue-700 dark:text-blue-300">{children}</div>
    </div>
  ),
  Warning: ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 my-6 dark:bg-yellow-950/20">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-yellow-700 dark:text-yellow-300">경고</span>
      </div>
      <div className="text-yellow-700 dark:text-yellow-300">{children}</div>
    </div>
  ),
  Error: ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 my-6 dark:bg-red-950/20">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-red-700 dark:text-red-300">오류</span>
      </div>
      <div className="text-red-700 dark:text-red-300">{children}</div>
    </div>
  ),
  Success: ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 my-6 dark:bg-green-950/20">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-green-700 dark:text-green-300">성공</span>
      </div>
      <div className="text-green-700 dark:text-green-300">{children}</div>
    </div>
  ),
}

interface MDXProps {
  source: MDXRemoteSerializeResult
}

export function MDXContent({ source }: MDXProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  )
}

export { components as mdxComponents }
