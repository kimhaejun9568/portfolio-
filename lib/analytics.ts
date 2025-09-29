'use client'

import { useEffect } from 'react'

// Vercel Analytics (클라이언트 컴포넌트에서 직접 import하여 사용)
export function VercelAnalytics() {
  return null // 실제로는 Analytics 컴포넌트를 app/layout.tsx에서 직접 import
}

// Google Analytics 4 설정
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

type GTagEvent = {
  action: string
  category?: string
  label?: string
  value?: number
}

// Google Analytics 이벤트 전송
export const gtag = {
  event: ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  },
  config: (trackingId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  },
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID!, {
        page_path: url,
      })
    }
  },
}

// Google Analytics 스크립트 로더
export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_TRACKING_ID) return

    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `
    document.head.appendChild(script2)

    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  return null
}

// Plausible Analytics 설정
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
export const PLAUSIBLE_API_HOST = process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || 'https://plausible.io'

export function PlausibleAnalytics() {
  useEffect(() => {
    if (!PLAUSIBLE_DOMAIN) return

    const script = document.createElement('script')
    script.defer = true
    script.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
    script.src = `${PLAUSIBLE_API_HOST}/js/script.js`
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}

// 커스텀 이벤트 트래킹
export const trackEvent = {
  // 블로그 포스트 조회
  viewPost: (slug: string, title: string) => {
    gtag.event({
      action: 'view_post',
      category: 'Blog',
      label: title,
    })

    // Plausible 커스텀 이벤트 (있는 경우)
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('View Post', {
        props: { slug, title },
      })
    }
  },

  // 프로젝트 클릭
  clickProject: (name: string, url: string) => {
    gtag.event({
      action: 'click_project',
      category: 'Project',
      label: name,
    })

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Click Project', {
        props: { name, url },
      })
    }
  },

  // 소셜 링크 클릭
  clickSocial: (platform: string, url: string) => {
    gtag.event({
      action: 'click_social',
      category: 'Social',
      label: platform,
    })

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Click Social', {
        props: { platform, url },
      })
    }
  },

  // 검색 사용
  search: (query: string, results: number) => {
    gtag.event({
      action: 'search',
      category: 'Search',
      label: query,
      value: results,
    })

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Search', {
        props: { query, results },
      })
    }
  },

  // 태그 클릭
  clickTag: (tag: string) => {
    gtag.event({
      action: 'click_tag',
      category: 'Navigation',
      label: tag,
    })

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Click Tag', {
        props: { tag },
      })
    }
  },

  // 다크모드 토글
  toggleDarkMode: (mode: 'dark' | 'light') => {
    gtag.event({
      action: 'toggle_dark_mode',
      category: 'UI',
      label: mode,
    })

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Toggle Dark Mode', {
        props: { mode },
      })
    }
  },

  // 코드 복사
  copyCode: (language?: string) => {
    gtag.event({
      action: 'copy_code',
      category: 'Code',
      label: language,
    })

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Copy Code', {
        props: { language },
      })
    }
  },
}

// 페이지뷰 트래킹 (App Router용)
export function usePageView() {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)

      if (typeof window !== 'undefined' && (window as any).plausible) {
        ;(window as any).plausible('pageview')
      }
    }

    // 현재 페이지 트래킹
    handleRouteChange(window.location.pathname)

    // App Router는 자동으로 페이지 변경을 감지하지 못하므로
    // 필요시 커스텀 훅이나 미들웨어에서 처리
  }, [])
}

// 타입 확장 (window.gtag)
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: {
        page_title?: string
        page_location?: string
        page_path?: string
        event_category?: string
        event_label?: string
        value?: number
      }
    ) => void
    dataLayer: any[]
  }
}
