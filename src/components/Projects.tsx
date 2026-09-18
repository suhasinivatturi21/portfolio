import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
// Button is not used in this component
import { ExternalLink, ArrowRight, FolderGit2, Star } from "lucide-react"
import { GithubIcon } from "@/components/SocialIcons"
import { projects, type Project } from "@/data/projects"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const categories = ["All", "Web", "Data", "AI", "Tools", "Other"] as const

const categoryColors: Record<string, string> = {
  Web: "oklch(0.65 0.18 0)",
  Data: "oklch(0.7 0.12 290)",
  AI: "oklch(0.72 0.14 340)",
  Tools: "oklch(0.68 0.15 200)",
  Other: "oklch(0.6 0.08 0)",
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const catColor = categoryColors[project.category] || "oklch(0.62 0.17 0)"
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springConfig = { stiffness: 400, damping: 30, mass: 0.3 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [0, 1], [6, -6])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-6, 6])
  const glowX = useTransform(smoothMouseX, [0, 1], ["0%", "100%"])
  const glowY = useTransform(smoothMouseY, [0, 1], ["0%", "100%"])
  const glowBackground = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, ${catColor}25, transparent 40%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  const navigate = useNavigate()
  const location = useLocation()

  const openCaseStudy = (e?: React.MouseEvent) => {
    e?.preventDefault()
    navigate(`/projects/${project.slug}`, { state: { background: location } })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div
        role="link"
        tabIndex={0}
        onClick={openCaseStudy}
        onKeyDown={(e) => { if (e.key === 'Enter') openCaseStudy() }}
        data-cursor="View"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
          animate={{ y: isHovering ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "group relative rounded-2xl overflow-hidden border bg-card transition-all duration-300",
            isHovering ? "shadow-2xl border-primary/30" : "shadow-sm border-border"
          )}
        >
          {/* Animated gradient border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300 z-20"
            animate={{ opacity: isHovering ? 1 : 0 }}
          >
            <motion.div
              className="absolute -inset-px rounded-2xl"
              style={{
                background: glowBackground,
              }}
            />
          </motion.div>

          {/* Visual area */}
          <div className="relative aspect-[16/10] overflow-hidden" style={{ background: `linear-gradient(135deg, ${catColor}25, oklch(0.85 0.07 290 / 0.15))` }}>
            <div className="absolute inset-0 bg-grid-pink opacity-15" />

            {/* Large project number watermark */}
            <div
              className="absolute -bottom-4 -right-2 text-8xl font-black leading-none select-none"
              style={{ color: catColor, opacity: 0.12 }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovering ? 1.15 : 1, rotate: isHovering ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FolderGit2 className="w-14 h-14" style={{ color: catColor, opacity: 0.5 }} />
              </motion.div>
            </div>

            {/* Top row: category + featured */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                style={{ backgroundColor: catColor + "dd" }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-card/80 backdrop-blur-sm text-foreground border border-border">
                  <Star className="w-3 h-3 text-primary fill-primary" /> Featured
                </span>
              )}
            </div>

            {/* Hover overlay with CTA */}
            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: isHovering ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-white text-sm font-semibold flex items-center gap-1.5 bg-primary px-5 py-2.5 rounded-full shadow-xl"
              >
                View Project <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <span className="text-xs font-medium text-muted-foreground shrink-0 mt-0.5">{project.year}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded-full border border-border bg-background text-muted-foreground group-hover:border-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-0.5 rounded-full border border-border bg-background text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-2.5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md"
                      >
                        <GithubIcon className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
              </div>
              <button onClick={openCaseStudy} className="text-primary font-medium text-sm w-full sm:w-auto text-center py-2 rounded-md">
                Read case study <ArrowRight className="w-3 h-3 inline-block ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All")
  const [overrides, setOverrides] = useState<Record<string, any>>({})

  useEffect(() => {
    try {
      const o = JSON.parse(localStorage.getItem("portfolio_overrides") || "{}")
      // transforms composite keys 'project:slug' to map by slug
      const projOverrides: Record<string, any> = {}
      Object.entries(o).forEach(([k, v]) => {
        const parts = k.split(":")
        if (parts[0] === "project") projOverrides[parts[1]] = v
      })
      setOverrides(projOverrides)
    } catch (e) {
      setOverrides({})
    }
  }, [])

  const mergedProjects = projects.map((p) => ({ ...p, ...(overrides[p.slug] || {}) }))
  const filtered = filter === "All" ? mergedProjects : mergedProjects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-lavender/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Portfolio"
          title="Projects I've Built"
          subtitle="A selection of web, data, and AI projects — case studies and demos."
          decorative="🚀"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3 opacity-40">🔍</div>
            <p className="text-muted-foreground">No projects in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}
