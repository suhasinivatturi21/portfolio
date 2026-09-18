import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { TiltCard } from "@/components/TiltCard"
import { skillCategories } from "@/data/skills"
import { Sparkles } from "lucide-react"

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-blush/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Toolkit"
          title="Skills & Tools"
          subtitle="Everything I use to turn data into insights and ideas into events."
          decorative="✨"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="p-6 h-full" tiltStrength={4} glowColor={`${cat.color}15`}>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: cat.color + "15" }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{cat.label}</h3>
                    <p className="text-xs text-muted-foreground">{cat.skills.length} skills</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.03 }}
                      whileHover={{ scale: 1.06, y: -3 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-background hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
