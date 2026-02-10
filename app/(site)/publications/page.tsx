import Link from 'next/link'
import Image from 'next/image'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Publications',
  description: 'Research publications by Haejun Kim in Extended Reality, Human-Computer Interaction, and Context-aware Computing',
  canonical: '/publications',
})

// Define the publication type
interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  type: string
  pdfUrl: string
}

// Publications categorized by type
const conferenceJournalPapers: Publication[] = [
  {
    id: "c.1",
    title: "Toward a More Standardized Multi-directional Tapping Task in VR: The Effect of Target Depth",
    authors: "Haejun Kim, Yuhwa Hong, Jihae Yu, Shuping Xiong*, Woojoo Kim*",
    venue: "ISMAR 2025: IEEE International Symposium on Mixed and Augmented Reality",
    year: "2025",
    type: "conference",
    pdfUrl: "/pdf/publications/c.1-tapping-task-vr-depth.pdf"
  },
  {
    id: "j.1",
    title: "The Effects of Task Factors on the Multi-Directional Tapping Task",
    authors: "Yuhwa Hong†, Haejun Kim†, Jihea Yu, Heedo Shin, Xiaoqun Yu, Shuping Xiong*, Woojoo Kim*",
    venue: "International Journal of Human-Computer Interaction (IJHCI)",
    year: "2025",
    type: "journal",
    pdfUrl: "/pdf/publications/j.1-task-factors-multidirectional.pdf"
  },
  {
    id: "j.2",
    title: "Effects of a Passive Shoulder Support Exoskeleton and Keyboard Interaction Design on Mid-Air Typing in Mixed Reality",
    authors: "Haejun Kim, Qiuli Jin, Seonghyeok Park, Woojoo Kim*, Shuping Xiong*",
    venue: "International Journal of Human-Computer Interaction (IJHCI)",
    year: "2025",
    type: "journal",
    pdfUrl: "/pdf/publications/j.2-exoskeleton-midair-typing.pdf"
  }
]

const underReview: Publication[] = [
  {
    id: "U.1",
    title: "Effects of Adaptive UI: Transparency Control on XR Walking and Pedestrian Avoidance",
    authors: "Haejun Kim, Qiuli Jin, Shuping Xiong*, Woojoo Kim*",
    venue: "International Journal of Human-Computer Interaction (IJHCI)",
    year: "2025",
    type: "journal",
    pdfUrl: "#"
  }
]

const postersWorkshops: Publication[] = [
  {
    id: "p.3",
    title: "HickStudyVR: A Hick's Law-Based Information Processing Speed Test in VR for Large Choice Sets",
    authors: "Junha Choe, Hyeeun Cho, Haejun Kim, Woojoo Kim",
    venue: "ISMAR 2025 (Poster)",
    year: "2025",
    type: "poster",
    pdfUrl: "/pdf/publications/p.3-hick-study-vr.pdf"
  },
  {
    id: "p.2",
    title: "The Effect of Target Depth on Performance of Multi-directional Tapping Task in Virtual Reality",
    authors: "Haejun Kim, Yuhwa Hong, Jihae Yu, Shuping Xiong, Woojoo Kim",
    venue: "CHI EA '25 Extended Abstracts: ACM Conference on Human Factors in Computing Systems (Poster)",
    year: "2025",
    type: "poster",
    pdfUrl: "/pdf/publications/p.2-depth-tapping-task-vr.pdf"
  },
  {
    id: "p.1",
    title: "ChaMEleon: Identity-Adjustable Remote Collaboration System in Virtual Reality",
    authors: "Hyunyoung Han, Haejun Kim, Junseo Lee, Woontack Woo",
    venue: "HCI Korea 2025 (Poster)",
    year: "2025",
    type: "poster",
    pdfUrl: "/pdf/publications/p.1-chameleon-vr-collaboration.pdf"
  }
]

// Function to format authors with emphasis on Haejun Kim
const formatAuthors = (authorsString: string) => {
  const parts = authorsString.split('Haejun Kim')
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && (
        <span className="font-bold">Haejun Kim</span>
      )}
    </span>
  ))
}

// Publication item component
const PublicationItem = ({ pub }: { pub: Publication }) => (
  <div className="mb-6 pl-8 relative">
    <div className="absolute left-0 top-0 w-6 text-sm text-muted-foreground font-mono">
      {pub.id}
    </div>
    <div className="space-y-2">
      <div className="leading-relaxed">
        <Link
          href={`/publications/${pub.id}`}
          className="font-bold text-foreground hover:text-primary transition-colors underline decoration-2 underline-offset-4"
        >
          {pub.title}
        </Link>
      </div>
      <div className="text-muted-foreground">
        <span>{formatAuthors(pub.authors)}</span>.
      </div>
      <div className="italic text-foreground">
        {pub.venue}.
      </div>
      <div className="flex gap-2 mt-3">
        {pub.pdfUrl !== "#" ? (
          <a
            href={pub.pdfUrl}
            className="inline-block bg-primary text-primary-foreground px-3 py-1 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            PDF
          </a>
        ) : (
          <div className="inline-block bg-muted text-muted-foreground px-3 py-1 text-sm font-medium cursor-not-allowed">
            PDF (Coming Soon)
          </div>
        )}
      </div>
    </div>
  </div>
)

export default function PublicationsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Publications</h1>
          <p className="text-lg text-muted-foreground">
            (†Co-first authors; *Corresponding authors.)
          </p>
        </header>

        {/* Conference & Journal Papers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
            Conference & Journal Papers
          </h2>
          <div className="space-y-4">
            {conferenceJournalPapers.map((pub) => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        </section>

        {/* Under Review */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
            Under Review
          </h2>
          <div className="space-y-4">
            {underReview.map((pub) => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        </section>

        {/* Posters, Demos, and Workshop Papers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
            Posters, Demos, and Workshop Papers
          </h2>
          <div className="space-y-4">
            {postersWorkshops.map((pub) => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        </section>

        {/* Ongoing Research Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
            Ongoing Research Projects
          </h2>
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-full md:w-80 h-48 bg-muted/50 rounded-lg overflow-hidden">
                    <Image
                      src="/images/research/ai-ux-prediction.png"
                      alt="Human Factor and AI-Based UX Prediction of Spatial User Interfaces"
                      width={320}
                      height={192}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3">
                  Human Factor and AI-Based UX Prediction of Spatial User Interfaces
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                  Predicting UX metrics during XR interactions using AI models with EMG and IMU sensor
                  data; developing multimodal prediction frameworks.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Status:</span>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active Research
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  )
}