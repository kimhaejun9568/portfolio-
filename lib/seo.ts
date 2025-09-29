import { Metadata } from 'next'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    type?: string
    url?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player'
    site?: string
    creator?: string
    title?: string
    description?: string
    images?: string[]
  }
  jsonLd?: object
}

const defaultSEO = {
  title: '주예수 - 프론트엔드 개발자',
  description: '웹 개발과 사용자 경험에 관심이 많은 프론트엔드 개발자 주예수의 개인 블로그입니다.',
  url: 'https://juyesu.dev',
  siteName: '주예수 블로그',
  author: '주예수',
  keywords: ['프론트엔드', '웹개발', 'React', 'Next.js', 'TypeScript', 'JavaScript'],
  social: {
    twitter: '@juyesu_dev',
    github: 'juyesu',
    linkedin: 'juyesu',
    email: 'hello@juyesu.dev',
  },
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  openGraph,
  twitter,
}: SEOProps): Metadata {
  const fullTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title
  const metaDescription = description || defaultSEO.description
  const url = canonical || defaultSEO.url

  const metadata: Metadata = {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords?.join(', ') || defaultSEO.keywords.join(', '),
    authors: [{ name: defaultSEO.author }],
    creator: defaultSEO.author,
    publisher: defaultSEO.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(defaultSEO.url),
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': '/rss.xml',
      },
    },
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || metaDescription,
      url: openGraph?.url || url,
      siteName: defaultSEO.siteName,
      type: (openGraph?.type as any) || 'website',
      locale: 'ko_KR',
      images: openGraph?.images || [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: defaultSEO.siteName,
        },
      ],
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      site: twitter?.site || defaultSEO.social.twitter,
      creator: twitter?.creator || defaultSEO.social.twitter,
      title: twitter?.title || fullTitle,
      description: twitter?.description || metaDescription,
      images: twitter?.images || ['/og.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: {
        'naver-site-verification': process.env.NAVER_SITE_VERIFICATION || '',
      },
    },
  }

  return metadata
}

export function generatePostMetadata({
  title,
  description,
  publishedTime,
  modifiedTime,
  tags,
  images,
  url,
}: {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  tags?: string[]
  images?: string[]
  url: string
}): Metadata {
  const fullTitle = `${title} | ${defaultSEO.siteName}`

  return generateMetadata({
    title,
    description,
    keywords: tags,
    canonical: url,
    openGraph: {
      title: fullTitle,
      description,
      type: 'article',
      url,
      images: images?.map(image => ({
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
  })
}

export function generateBlogJsonLd({
  url,
  title,
  description,
  datePublished,
  dateModified,
  author,
  tags,
  image,
}: {
  url: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  tags?: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || defaultSEO.author,
      url: defaultSEO.url,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      url: defaultSEO.url,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultSEO.url}/og.png`,
      },
    },
    image: image || `${defaultSEO.url}/og.png`,
    keywords: tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    description: defaultSEO.description,
    url: defaultSEO.url,
    author: {
      '@type': 'Person',
      name: defaultSEO.author,
      url: defaultSEO.url,
      sameAs: [
        `https://twitter.com/${defaultSEO.social.twitter.replace('@', '')}`,
        `https://github.com/${defaultSEO.social.github}`,
        `https://linkedin.com/in/${defaultSEO.social.linkedin}`,
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEO.url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: defaultSEO.author,
    url: defaultSEO.url,
    jobTitle: '프론트엔드 개발자',
    description: defaultSEO.description,
    sameAs: [
      `https://twitter.com/${defaultSEO.social.twitter.replace('@', '')}`,
      `https://github.com/${defaultSEO.social.github}`,
      `https://linkedin.com/in/${defaultSEO.social.linkedin}`,
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
    },
    knowsAbout: defaultSEO.keywords,
  }
}

export { defaultSEO }
