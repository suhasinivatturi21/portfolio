import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { TiltCard } from "@/components/TiltCard"
import { experience, education } from "@/data/experience"
import { certifications } from "@/data/certifications"
import { GraduationCap, Briefcase, Award, ExternalLink, MapPin, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const certColors: Record<string, string> = {
  "Data Science": "oklch(0.65 0.18 0)",
  "ML/AI": "oklch(0.7 0.12 290)",
  "Tools": "oklch(0.72 0.14 340)",
  "Other": "oklch(0.68 0.15 200)",
}

const expTypeColors: Record<string, string> = {
  Work: "oklch(0.65 0.18 0)",
  Internship: "oklch(0.7 0.12 290)",
  Volunteer: "oklch(0.72 0.14 340)",
  Club: "oklch(0.68 0.15 200)",
}

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-40 left-0 w-72 h-72 rounded-full bg-lavender/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Journey"
          title="Experience & Education"
          subtitle="The path so far — roles, learning, and milestones that shaped my journey."
          decorative="🌱"
        />

        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-lg font-semibold text-foreground mb-8 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" /> Experience
          </h3>
          <div className="relative pl-8">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/40 via-border to-transparent" />
            {experience.map((exp, i) => {
              const typeColor = expTypeColors[exp.type] || "oklch(0.62 0.17 0)"
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[22px] top-3 w-4 h-4 rounded-full border-2 border-background shadow-sm"
                    style={{ backgroundColor: typeColor }}
                  />
                  {exp.current && (
                    <div
                      className="absolute -left-[26px] top-2 w-5 h-5 rounded-full animate-ping opacity-40"
                      style={{ backgroundColor: typeColor }}
                    />
                  )}
                  <TiltCard className="p-6 relative transform-gpu transition-transform duration-300 hover:-translate-y-1" tiltStrength={4} glowColor={`${typeColor}18`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${typeColor}, transparent)` }} />
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/6 to-primary/2 flex items-center justify-center text-xl font-semibold text-primary shrink-0 border border-border">
                            {exp.organization?.[0] ?? "★"}
                          </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{exp.role}</h4>
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: typeColor + "cc" }}
                            >
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-sm text-foreground font-medium">{exp.organization}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {exp.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {exp.startDate} — {exp.endDate}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-2 mt-3">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">•</span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Education */}
        <div className="mb-20">
          <h3 className="text-lg font-semibold text-foreground mb-8 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" /> Education
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="p-6 h-full relative overflow-hidden transform-gpu transition-transform duration-300 hover:-translate-y-1" tiltStrength={5} glowColor="oklch(0.65 0.18 0 / 0.12)">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary/60 to-transparent" />
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/6 to-primary/2 flex items-center justify-center shrink-0 text-primary font-semibold text-lg border border-border">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{edu.institution}</h4>
                        <p className="text-sm text-foreground/80">{edu.degree} in {edu.field}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {edu.startYear} — {edu.endYear}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" /> {edu.location}
                  </p>
                  {edu.gpa && <p className="text-sm text-muted-foreground mb-2">GPA: {edu.gpa}</p>}
                  <div>
                    <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary" /> Relevant Coursework
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {edu.relevantCourses.map((course) => (
                        <span key={course} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-8 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(() => {
              // merge overrides from localStorage for certifications
              let overrides: Record<string, any> = {}
              try {
                const o = JSON.parse(localStorage.getItem("portfolio_overrides") || "{}")
                Object.entries(o).forEach(([k, v]) => {
                  const parts = k.split(":")
                  if (parts[0] === "cert") overrides[parts[1]] = v
                })
              } catch (e) {
                overrides = {}
              }
              return certifications.map((cert, i) => {
                const merged = { ...cert, ...(overrides[cert.id] || {}) }
                const certItem = merged
                const catColor = certColors[certItem.category] || "oklch(0.62 0.17 0)"
                return (
                  <motion.div
                    key={certItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <TiltCard className="p-5 h-full" tiltStrength={6} glowColor={`${catColor}18`} dataCursor="View">
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                        style={{ background: `linear-gradient(90deg, ${catColor}, transparent)` }}
                      />
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: catColor + "15" }}>
                          <Award className="w-4 h-4" style={{ color: catColor }} />
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: catColor + "cc" }}
                        >
                          {certItem.category}
                        </span>
                      </div>
                      {certItem.image && (
                        <img src={certItem.image} alt={certItem.title} className="w-16 h-12 object-cover rounded-md absolute top-4 right-4 shadow-sm" />
                      )}
                      <h4 className="font-semibold text-foreground text-sm leading-tight mb-1">{certItem.title}</h4>
                      <p className="text-xs text-muted-foreground">{certItem.organization}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {certItem.date}
                      </p>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{certItem.description}</p>
                      {certItem.credentialUrl && (
                        <a
                          href={certItem.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary mt-3 hover:underline font-medium"
                        >
                          View Credential <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </TiltCard>
                  </motion.div>
                )
              })
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}
