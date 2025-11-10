import Image from 'next/image'
import { AtSign } from 'lucide-react'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'About me',
  description: 'Haejun Kim - M.S. Student in Data Science at KAIST',
  canonical: '/about',
})

export default function AboutPage() {
  return (
    <div 
      className="min-h-screen pt-20 relative"
      style={{
        backgroundImage: 'url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <div className="flex-shrink-0">
              <Image
                src="/images/avatar.jpeg"
                alt="Haejun Kim"
                width={160}
                height={160}
              unoptimized
                className="rounded-full mx-auto md:mx-0"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Haejun Kim</h1>
              <div className="text-xl text-muted-foreground mb-4 space-y-1">
                <div className="font-semibold">M.S. Student</div>
                <div className="text-primary">Data Science</div>
                <div>KAIST</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                <a
                  href="mailto:vedonefor@kaist.ac.kr"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  vedonefor@kaist.ac.kr
                </a>
                <a
                  href="https://www.threads.com/@mock_jokerbug?hl=ko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <AtSign className="w-4 h-4" />
                  Threads
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* About Me Section - All in English */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">About me</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
         
           
            <p>
            I am currently a Master's student in the Graduate School of Data Science at KAIST, working under the supervision of <a href="https://hfel.kaist.ac.kr/profile/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Professor Shuping Xiong</a> in the <a href="https://hfel.kaist.ac.kr/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Human Factors and Ergonomics Lab</a>. My research focuses primarily on Human-Computer Interaction (HCI), especially within the context of Extended Reality (XR), approached from a human-centered and ergonomics perspective.
            </p>
            <p>
            Currently, my primary research interest lies in context-aware adaptive user interfaces in XR environments. I am exploring how interactive systems can intelligently respond to user contexts to enhance usability, comfort, and overall experience.
            </p>
            <p>
            Beyond academia, I share XR news and insights in Korean on <a href="https://www.threads.com/@mock_jokerbug?hl=ko" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Threads</a>  (9k followers) to help bridge cutting-edge research and the public.
            </p>        
            <p>
              <a 
                href="/cv.pdf" 
                className="text-primary hover:underline font-medium"
              >
                You can download my CV here
              </a>
              .
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}