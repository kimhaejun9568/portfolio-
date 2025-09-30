'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'About me', href: '/about' },
  { name: 'Publications', href: '/publications' },
  { name: 'Experience', href: '/experience' },
]

export function Header() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR 안전성을 위해 마운트 전에는 기본 헤더만 표시
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Navigation */}
            <div className="flex items-center space-x-8">
              <Link
                href="/about"
                className="text-xl font-bold hover:opacity-80 transition-opacity"
                aria-label="About"
              >
                Haejun Kim
              </Link>

              {/* Desktop Navigation - Only 3 items */}
              <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-200 hover:text-primary text-muted-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side Icons - Theme toggle only */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle Placeholder */}
              <div className="w-8 h-8 opacity-50">
                <div className="h-4 w-4 animate-pulse bg-muted-foreground/50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              href="/about"
              className="text-xl font-bold hover:opacity-80 transition-opacity"
              aria-label="About"
            >
              Haejun Kim
            </Link>

            {/* Desktop Navigation - Only 3 items */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (pathname === '/' && item.href === '/about')

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors duration-200 hover:text-primary',
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Side Icons - Theme toggle only */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header