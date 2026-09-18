import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"
import { GithubIcon } from "@/components/SocialIcons"

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const catColor = "#e2c02b"

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative z-10 max-w-3xl w-full bg-card border-2 border-border rounded-md shadow-2xl"
        style={{ outline: `6px solid ${catColor}`, background: "var(--card)" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-sm bg-transparent border p-2 rounded">✕</button>

        <div className="p-8">
          <div className="text-xs text-muted-foreground mb-3">CASE STUDY / 01</div>
          <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">PROBLEM</div>
                <div className="text-sm text-foreground">{project.problem}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">ARCHITECTURE</div>
                <div className="text-sm text-foreground">{project.technologies.join(" / ")}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">SOLUTION</div>
                <div className="text-sm text-foreground">{project.approach}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">KEY FEATURES</div>
                <ul className="text-sm text-foreground list-inside list-disc">
                  <li>Case study summary</li>
                  <li>Interactive demo</li>
                  <li>Project assets and notes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full">
                  <GithubIcon className="w-4 h-4 mr-2" /> GitHub
                </Button>
              </a>
            )}

            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer">
                <Button className="rounded-full bg-primary text-primary-foreground">
                  Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectModal
