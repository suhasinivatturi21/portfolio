import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { Camera, BookHeart, Palette, FlaskConical, BookOpen, Sparkles } from "lucide-react"

const creativeItems = [
  { icon: Camera, title: "Photography", desc: "Capturing moments and stories through a lens.", color: "bg-chart-1/10 text-chart-1", tag: "Visual" },
  { icon: BookHeart, title: "Journaling", desc: "Writing down thoughts, ideas, and reflections.", color: "bg-chart-4/10 text-chart-4", tag: "Words" },
  { icon: Palette, title: "Design", desc: "Creating visuals that blend data with aesthetics.", color: "bg-chart-3/10 text-chart-3", tag: "Creative" },
  { icon: FlaskConical, title: "Creative Experiments", desc: "Trying new things and exploring ideas.", color: "bg-chart-2/10 text-chart-2", tag: "Explore" },
  { icon: BookOpen, title: "Reading", desc: "Always reading — fiction, data, and everything between.", color: "bg-chart-5/10 text-chart-5", tag: "Learn" },
  { icon: Sparkles, title: "Event Aesthetics", desc: "Designing experiences that feel magical.", color: "bg-primary/10 text-primary", tag: "Events" },
]

export function CreativeCorner() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Beyond Data"
          title="Creative Corner"
          subtitle="Things I love outside of data science — a mini board of what inspires me."
          decorative="🎨"
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {creativeItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="break-inside-avoid bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <div className={`inline-flex p-2.5 rounded-xl mb-3 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <span className="text-xs text-muted-foreground">{item.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
