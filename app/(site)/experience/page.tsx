import { generateMetadata } from '@/lib/seo'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

export const metadata = generateMetadata({
  title: 'Experience',
  description: 'Academic and research experience of Haejun Kim in XR and Human-Computer Interaction',
  canonical: '/experience',
})

const workExperience = [
  {
    period: "Jul. 2023 -- Sep. 2023",
    title: "Undergraduate Researcher",
    organization: "KAIST Human Factors & Ergonomics Lab",
    department: "",
    location: "Daejeon, South Korea",
    description: "Analyzed gait in VR across avatar fidelity levels; supported experiment design, data collection, and analysis."
  },
  {
    period: "Apr. 2021 -- Jan. 2023", 
    title: "Mandatory Military Service",
    organization: "Republic of Korea Army",
    department: "",
    location: "South Korea",
    description: "Completed compulsory national service."
  }
]

const education = [
  {
    period: "Mar. 2024 -- Feb. 2026 (expected)",
    degree: "M.S. in Data Science",
    institution: "Korea Advanced Institute of Science and Technology (KAIST)",
    location: "Daejeon, South Korea",
    thesis: "Adaptive Transparency Control for Spatial UI: Investigating User Experience and Behavior During Walking in XR",
    advisor: "Advisor: Shuping Xiong"
  },
  {
    period: "Mar. 2018 -- Feb. 2024",
    degree: "B.A. in Philosophy; Second Major in Industrial Engineering",
    institution: "Hanyang University",
    location: "Seoul, South Korea",
    thesis: "VHDT:Vision and Human-Object Interaction Detection Transformer based on ViDT",
    honors: "CUM LAUDE"
  }
]

const awards = [
  {
    year: "Sep. 2025",
    title: "Future Research Award",
    organization: "Korean Data Science Society",
    description: "Awarded for outstanding research presented at the Korean Data Science Conference."
  },
  {
    year: "Nov. 2024",
    title: "Q-Day Special Student Award",
    organization: "KAIST",
    description: "Recognized for contributing to a campus culture of questioning and for outstanding performance in creative education & research through active participation in 'QAIST.'"
  },
  {
    year: "Fall 2018, Spring 2019, Spring 2020, Fall 2020, Fall 2023",
    title: "Hanyang Brain (Academic Excellence) Scholarship",
    organization: "Hanyang University",
    description: "Outstanding academic performance."
  }
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Experience</h1>
          <p className="text-lg text-muted-foreground">
            Academic and research experience in Extended Reality (XR), Human-Computer Interaction, multimodal interactions, and context-aware computing.
          </p>
        </header>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{edu.period}</div>
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <div className="text-lg font-medium text-primary mb-1">{edu.institution}</div>
                    <div className="text-sm text-muted-foreground">{edu.location}</div>
                    {edu.honors && (
                      <div className="text-sm text-primary font-medium mt-1">{edu.honors}</div>
                    )}
                  </div>
                </div>
                {edu.thesis && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="font-medium text-foreground mb-1">Thesis: {edu.thesis}</div>
                    <div className="text-sm text-muted-foreground">{edu.advisor}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </div>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{exp.period}</div>
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <div className="text-lg font-medium text-primary mb-1">{exp.organization}</div>
                    <div className="text-sm text-muted-foreground">{exp.location}</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Awards & Recognition</h2>
          </div>
          <div className="space-y-4">
            {awards.map((award, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{award.year}</div>
                    <h3 className="text-lg font-bold mb-1">{award.title}</h3>
                    <div className="text-primary font-medium mb-2">{award.organization}</div>
                    <p className="text-muted-foreground text-sm">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  )
}