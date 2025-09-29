import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

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
    label: 'Twitter 프로필',
  },
  {
    name: 'Email',
    href: 'mailto:hello@juyesu.dev',
    icon: Mail,
    label: '이메일 보내기',
  },
]

const footerLinks = [
  {
    title: '콘텐츠',
    links: [
      { name: '블로그', href: '/blog' },
      { name: '프로젝트', href: '/projects' },
      { name: '발표', href: '/talks' },
    ],
  },
  {
    title: '정보',
    links: [
      { name: '지금 하는 일', href: '/now' },
      { name: '사용하는 도구', href: '/uses' },
      { name: 'RSS 피드', href: '/rss.xml' },
    ],
  },
]

export function Footer() {
  const handleSocialClick = (name: string, href: string) => {
    trackEvent.clickSocial(name.toLowerCase(), href)
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">주</span>
                </div>
                <span className="font-bold text-lg">주예수</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              웹 개발과 사용자 경험에 관심이 많은 프론트엔드 개발자입니다. 
              좋은 코드와 아름다운 인터페이스를 만들기 위해 노력하고 있습니다.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  onClick={() => handleSocialClick(social.name, social.href)}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md p-2',
                    'text-muted-foreground hover:text-foreground',
                    'hover:bg-muted transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  )}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-muted-foreground hover:text-foreground',
                        'transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm'
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 주예수. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              href="/sitemap.xml"
              className="hover:text-foreground transition-colors duration-200"
            >
              사이트맵
            </Link>
            <Link
              href="/rss.xml"
              className="hover:text-foreground transition-colors duration-200"
            >
              RSS
            </Link>
            <span>
              Made with{' '}
              <Link
                href="https://nextjs.org"
                className="hover:text-foreground transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
