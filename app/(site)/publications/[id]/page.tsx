import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, FileText } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo'

// Define the publication type with additional details
interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  type: string
  pdfUrl: string
  teaserImage?: string
  abstract: string
  publication: string
}

// All publications data with detailed information
const allPublications: Publication[] = [
  {
    id: "c.1",
    title: "Toward a More Standardized Multi-directional Tapping Task in VR: The Effect of Target Depth",
    authors: "Haejun Kim, Yuhwa Hong, Jihae Yu, Shuping Xiong*, Woojoo Kim*",
    venue: "ISMAR 2025: IEEE International Symposium on Mixed and Augmented Reality",
    year: "2025",
    type: "Conference Paper",
    pdfUrl: "/pdf/publications/c.1-tapping-task-vr-depth.pdf",
    teaserImage: "/images/publications/tapping-task-teaser.png",
    abstract: "The multi-directional tapping task has long served as a foundational tool for evaluating pointing performance in human-computer interaction research. However, its transition from 2D interfaces to virtual reality (VR) raises challenges, especially in standardizing target depth. This study explores how target depth influences performance in VR, focusing on two common techniques: Raycasting and Virtual Hand. We conducted two controlled experiments (each with n = 20) to isolate depth effects. In Experiment 1, fixed target size led to visual angle (VA) shifts across depths, affecting performance. Both techniques performed best when VA was between 1 - 4◦; Raycasting peaked at 2m, Virtual Hand at 0.4 and 0.5m. In Experiment 2, we controlled VA to isolate depth itself. Raycasting remained stable beyond 2m but degraded at close range due to biomechanical limits. Virtual Hand remained sensitive to depth despite fixed VA, but differences were smaller, with throughput unaffected. These results suggest VA should be the primary parameter for standardizing the task in VR. Depth-specific evaluation remains necessary, except for Raycasting beyond 2m. We provide depth-aware guidelines to improve standardization and comparability while aligning with ISO protocols.",
    publication: "In Proceedings of the IEEE International Symposium on Mixed and Augmented Reality (ISMAR 2025)"
  },
  {
    id: "j.1",
    title: "The Effects of Task Factors on the Multi-Directional Tapping Task",
    authors: "Yuhwa Hong†, Haejun Kim†, Jihea Yu, Heedo Shin, Xiaoqun Yu, Shuping Xiong*, Woojoo Kim*",
    venue: "International Journal of Human-Computer Interaction (IJHCI)",
    year: "2025",
    type: "Journal Article",
    pdfUrl: "/pdf/publications/j.1-task-factors-multidirectional.pdf",
    teaserImage: "/images/publications/task-factors-teaser.jpg",
    abstract: "In Fitts' law research for pointing and selecting tasks, the multi-directional tapping task from ISO/TS 9241-411 has been widely used as a standard task. However, the ISO standard does not describe several task factors in sufficient detail, leading researchers to interpret and apply them independently in various ways. This study aims to investigate the effects of four task factors for multi-directional tapping task: error highlight, hover highlight, target shape, and number of targets. The experimental results indicated that all investigated task factors had significant effects on user performance and behavior, as reflected in both eye movement and mouse movement patterns. Our research findings can be helpful for researchers who want to evaluate the efficiency and effectiveness of interaction techniques and input devices for graphical user interfaces as a multi-directional tapping task protocol.",
    publication: "International Journal of Human-Computer Interaction, 2025"
  },
  {
    id: "u.1",
    title: "Effects of a Passive Shoulder Support Exoskeleton and Keyboard Interaction Design on Mid-Air Typing in Mixed Reality",
    authors: "Haejun Kim, Qiuli Jin, Seonghyeok Park, Woojoo Kim*, Shuping Xiong*",
    venue: "IJHCI, resubmitted after minor revision",
    year: "2025",
    type: "Journal Article",
    pdfUrl: "#",
    teaserImage: "/images/publications/exoskeleton-typing-teaser.png",
    abstract: "Typing in Mixed Reality (MR) presents significant interaction and ergonomic challenges, particularly in mid-air scenarios. This study investigated how passive shoulder support exoskeletons and different keyboard interaction designs affect mid-air typing in Mixed Reality. Twenty participants performed typing tasks across three keyboard conditions (Physical, Virtual-Poking, and Virtual-Touch) both with and without exoskeleton support. Results showed exoskeletons significantly reduced deltoid muscle activity and self-reported fatigue without compromising typing performance. When wearing exoskeletons, participants exhibited increased shoulder flexion and abduction angles with decreased hand movement distance. Physical keyboards significantly outperformed virtual keyboards in typing metrics. Among virtual keyboards, the Poking interface received higher haptic sensation ratings than the Touch interface and demonstrated better compatibility with exoskeletons. These findings inform the development of sustainable mid-air text entry solutions that balance ergonomic support with performance and satisfaction, suggesting keyboard interfaces should match available physical support infrastructure to optimize user experience in extended MR applications.",
    publication: "International Journal of Human-Computer Interaction (Under Review)"
  },
  {
    id: "p.3",
    title: "HickStudyVR: A Hick's Law-Based Information Processing Speed Test in VR for Large Choice Sets",
    authors: "Junha Choe, Hyeeun Cho, Haejun Kim, Woojoo Kim",
    venue: "ISMAR 2025 (Poster)",
    year: "2025",
    type: "Poster",
    pdfUrl: "/pdf/publications/p.3-hick-study-vr.pdf",
    teaserImage: "/images/publications/hick-study-teaser.png",
    abstract: "Hick’s law, a foundational principle in human–computer interaction (HCI), predicts that reaction time increases logarithmically with the number of equally likely choices. While its theoretical value is well established, practical applications in modern HCI remain limited, particularly for accurately estimating individual information processing speed (IPS), defined as the reciprocal of the regression slope. This study introduces HickStudyVR, a virtual reality–based system designed to measure IPS with high precision by minimizing perceptual and motor confounds through gaze-based aiming and controller-based selection. A pilot study with four participants showed strong adherence to Hick’s law (all R^2 > 0.94), with IPS ranging from 5.00 to 5.56bit/s. To further validate the system’s design, future work will compare it against traditional 2D layouts to determine whether the VR-based interaction method indeed enhances IPS measurement accuracy. Additional investigations will explore the impact of stimulus type, spatial layout, and gamification on IPS estimation, supporting the development of more robust and generalizable tools for cognitive assessment in immersive environments.",
    publication: "IEEE International Symposium on Mixed and Augmented Reality (ISMAR 2025) - Poster Session"
  },
  {
    id: "p.2",
    title: "The Effect of Target Depth on Performance of Multi-directional Tapping Task in Virtual Reality",
    authors: "Haejun Kim, Yuhwa Hong, Jihae Yu, Shuping Xiong, Woojoo Kim",
    venue: "CHI EA '25 Extended Abstracts: ACM Conference on Human Factors in Computing Systems (Poster)",
    year: "2025",
    type: "Poster",
    pdfUrl: "/pdf/publications/p.2-depth-tapping-task-vr.pdf",
    teaserImage: "/images/publications/depth-tapping-teaser.jpg",
    abstract: "While widely used to evaluate 2D pointing performance, adapting the multi-directional tapping task (ISO/TS 9241-411) to virtual reality (VR) poses challenges, particularly in addressing target depth. This study examines how depth affects user performance in the multi-directional tapping task in VR. We conducted a within-subject experiment with 20 participants, investigating the effect of various depths (0.5–100 m for Raycasting; 0.3–0.6 m for Virtual Hand) under consistent visual angles. Results showed that Raycasting performance remained stable beyond 2 m but degraded significantly at 0.5 m, while Virtual Hand performed best between 0.4 and 0.5 m and declined at closer and farther depths. These findings suggest that target depth strongly influences selection performance even when visual angles remain consistent, underscoring the need for considering standardized depth parameters in VR pointing protocols. We also provide evidence-based recommendations for implementing depth parameters in future VR studies using the multi-directional tapping task.",
    publication: "Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA '25)"
  },
  {
    id: "p.1",
    title: "ChaMEleon: Identity-Adjustable Remote Collaboration System in Virtual Reality",
    authors: "Hyunyoung Han, Haejun Kim, Junseo Lee, Woontack Woo",
    venue: "HCI Korea 2025 (Poster)",
    year: "2025",
    type: "Poster",
    pdfUrl: "/pdf/publications/p.1-chameleon-vr-collaboration.pdf",
    teaserImage: "/images/publications/chameleon-teaser.png",
    abstract: "Recent advancements in virtual reality (VR) technology have revolutionized remote collaboration; however, existing platforms often constrain users' natural identity expression through limited avatar customization and fixed voice options. We propose ChaMEleon, a novel VR-based system that enables dynamic identity adjustment through customizable avatars and voice modulation across various collaborative contexts. The system allows users to modify their visual and auditory representations according to specific interaction scenarios such as problem-solving, brainstorming, and networking. Through experiments with 12 participants across different collaborative tasks, results demonstrated that the anonymous identity improved problemsolving efficiency and reduced user fatigue, while realistic identities enhanced engagement and satisfaction levels. This research contributes to the field by providing empirically validated design guidelines for context-appropriate identity selection in VR-based remote collaboration, ultimately promoting more effective and inclusive virtual interactions.",
    publication: "HCI Korea 2025 Conference - Poster Session"
  }
]

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const publication = allPublications.find(pub => pub.id === id)

  if (!publication) {
    return {
      title: 'Publication Not Found',
    }
  }

  return {
    title: `${publication.title} | Haejun Kim`,
    description: publication.abstract.slice(0, 160) + '...',
  }
}

// SEO 메타데이터 생성 헬퍼 함수
function createPublicationMetadata(publication: Publication) {
  return {
    title: `${publication.title} | Haejun Kim`,
    description: publication.abstract.slice(0, 160) + '...',
    openGraph: {
      title: publication.title,
      description: publication.abstract.slice(0, 160) + '...',
      type: 'article',
      authors: [publication.authors],
      publishedTime: publication.year,
      section: publication.type,
      tags: ['VR', 'HCI', 'Research', publication.type],
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.title,
      description: publication.abstract.slice(0, 160) + '...',
    },
  }
}

export default async function PublicationPage({ params }: PageProps) {
  const { id } = await params
  const publication = allPublications.find(pub => pub.id === id)

  if (!publication) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/publications"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Publications
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              {publication.type}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {publication.title}
            </h1>
            <div className="text-lg text-muted-foreground mb-4">
              {publication.authors.split('Haejun Kim').map((part, index, arr) => (
                <span key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <span className="font-bold text-foreground">Haejun Kim</span>
                  )}
                </span>
              ))}
            </div>
            <div className="text-muted-foreground">
              <em>{publication.venue}</em> ({publication.year})
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {publication.pdfUrl !== "#" ? (
              <a
                href={publication.pdfUrl}
                className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </a>
            ) : (
              <div className="inline-flex items-center bg-muted text-muted-foreground px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed">
                <FileText className="h-4 w-4 mr-2" />
                PDF (Coming Soon)
              </div>
            )}
          </div>
        </header>

        {/* Teaser Figure */}
        {publication.teaserImage && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Teaser Figure</h2>
            <div className="flex justify-center items-center w-full min-h-96 max-h-screen bg-muted/30 rounded-lg border border-border/50 p-4">
              <div className="relative max-w-full">
                <Image
                  src={publication.teaserImage}
                  alt={`Teaser figure for ${publication.title}`}
                  width={800}
                  height={600}
                  unoptimized
                  className="object-contain max-w-full max-h-[80vh]"
                />
              </div>
            </div>
          </section>
        )}

        {/* Abstract */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Abstract</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p>{publication.abstract}</p>
          </div>
        </section>

        {/* Publication Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Publication Details</h2>
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Type</h3>
                <p className="text-muted-foreground">{publication.type}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Publication</h3>
                <p className="text-muted-foreground">{publication.publication}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Year</h3>
                <p className="text-muted-foreground">{publication.year}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Authors</h3>
                <p className="text-muted-foreground">
                  {publication.authors.split('Haejun Kim').map((part, index, arr) => (
                    <span key={index}>
                      {part}
                      {index < arr.length - 1 && (
                        <span className="font-bold text-foreground">Haejun Kim</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
