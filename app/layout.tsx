import { Inter, JetBrains_Mono } from 'next/font/google'
import { generateMetadata } from '@/lib/seo'
import { ThemeProvider } from '@/lib/theme-context'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata = generateMetadata({
  title: 'Haejun Kim - M.S. Student',
  description: 'Haejun Kim - M.S. Student in Data Science at KAIST. Research on Extended Reality (XR), Human-Computer Interaction, and Context-aware Computing.',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme && (theme === 'light' || theme === 'dark')) {
                    document.documentElement.className = '';
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.className = '';
                    document.documentElement.classList.add('light');
                    localStorage.setItem('theme', 'light');
                  }
                } catch (e) {
                  document.documentElement.className = '';
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
