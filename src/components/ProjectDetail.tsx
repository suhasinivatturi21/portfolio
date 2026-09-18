import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Target, Lightbulb, Database, TrendingUp, BookOpen } from "lucide-react"
import { GithubIcon } from "@/components/SocialIcons"
import { projects } from "@/data/projects"
import { SushiBot } from "@/components/SushiBot"
import { useEffect, useState } from "react"

const sectionIcons = {
  problem: Target,
  approach: Lightbulb,
  dataset: Database,
  results: TrendingUp,
  learnings: BookOpen,
}

export function ProjectDetail() {
  const { slug } = useParams()
  const rawProject = projects.find((p) => p.slug === slug)
  const overrides = (() => {
    try {
      return JSON.parse(localStorage.getItem("portfolio_overrides") || "{}")
    } catch (e) {
      return {}
    }
  })()
  const project = rawProject ? { ...rawProject, ...(overrides[rawProject.slug] || {}) } : undefined

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center space-y-4">
          <SushiBot size="lg" mood="thinking" speechBubble="Hmm, I can't find that project..." />
          <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
          <Link to="/" state={{ scrollTo: "projects" }}>
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const sections = [
    { key: "problem", label: "The Problem", icon: sectionIcons.problem, content: project.problem },
    { key: "approach", label: "My Approach", icon: sectionIcons.approach, content: project.approach },
    { key: "dataset", label: "The Dataset", icon: sectionIcons.dataset, content: project.dataset },
    { key: "results", label: "Results", icon: sectionIcons.results, content: project.results },
    { key: "learnings", label: "What I Learned", icon: sectionIcons.learnings, content: project.learnings },
  ]
  // ensure we start at the top to avoid unexpected scroll positions
  useEffect(() => {
    try {
      window.scrollTo({ top: 0 })
    } catch (e) {
      // ignore
    }
  }, [])

  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const openGallery = (i: number) => setGalleryIndex(i)
  const closeGallery = () => setGalleryIndex(null)
  const nextImage = () => {
    if (project.images && galleryIndex !== null) {
      setGalleryIndex((galleryIndex + 1) % project.images.length)
    }
  }
  const prevImage = () => {
    if (project.images && galleryIndex !== null) {
      setGalleryIndex((galleryIndex - 1 + project.images.length) % project.images.length)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-pink-blush/40 to-lavender/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pink opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center opacity-50">
            <div className="text-5xl mb-2">📁</div>
            <div className="text-sm font-medium text-muted-foreground">[Project Hero Image]</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link to="/" state={{ scrollTo: "projects" }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Title block */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge>{project.category}</Badge>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">{project.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{project.longDescription}</p>
        </motion.div>

        {/* Tech stack */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-10">
          {project.technologies.map((tech: string) => (
              <span key={tech} className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                {tech}
              </span>
            ))}
        </motion.div>

        {/* Links */}
        <div className="flex gap-3 mb-12">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full">
                <GithubIcon className="w-4 h-4 mr-2" /> View Code
              </Button>
            </a>
          )}
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full">
                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
              </Button>
            </a>
          )}
        </div>

        {/* Gallery thumbnails */}
        {project.images && project.images.length > 0 && (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.images.map((src: string, i: number) => (
              <button
                key={src}
                onClick={() => openGallery(i)}
                className="rounded-xl overflow-hidden bg-card border border-border hover:scale-105 transform transition-transform"
              >
                <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-36 object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Detail sections */}
        <div className="space-y-8">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{section.label}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <Link to="/" state={{ scrollTo: "projects" }}>
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> All Projects
            </Button>
          </Link>
          <SushiBot size="sm" mood="idle" />
        </div>
      </div>
      {/* Lightbox modal */}
      {galleryIndex !== null && project.images && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-w-4xl w-full mx-4">
            <button onClick={closeGallery} className="absolute top-3 right-3 text-white bg-black/40 p-2 rounded-full">✕</button>
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full">‹</button>
            <img src={project.images[galleryIndex]} alt={`Large ${galleryIndex + 1}`} className="w-full h-[60vh] object-contain rounded-lg" />
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full">›</button>
          </div>
        </div>
      )}
    </div>
  )
}
