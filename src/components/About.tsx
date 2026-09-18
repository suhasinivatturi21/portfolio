import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { BarChart2, Calendar, Palette, Lightbulb, BookOpen, Heart } from "lucide-react"

const personalityCards = [
  { icon: BarChart2, label: "Analytical", desc: "I love finding stories in data", color: "text-chart-1" },
  { icon: Calendar, label: "Organized", desc: "Every detail, perfectly planned", color: "text-chart-4" },
  { icon: Palette, label: "Creative", desc: "Design thinking meets data science", color: "text-chart-3" },
  { icon: Lightbulb, label: "Curious", desc: "Always asking 'why?' and 'what if?'", color: "text-chart-2" },
  { icon: Heart, label: "Detail-Oriented", desc: "Small things make big differences", color: "text-primary" },
  { icon: BookOpen, label: "Always Learning", desc: "Every day is a new experiment", color: "text-chart-5" },
]

const identityCards = [
  {
    id: "data",
    emoji: "📊",
    title: "DATA",
    desc: "Data science, analytics, ML, visualization — I speak fluent Python and love uncovering insights from complex datasets.",
    bg: "bg-chart-1/10 border-chart-1/20",
    accent: "text-chart-1",
  },
  {
    id: "events",
    emoji: "🎉",
    title: "EVENTS",
    desc: "Planning, coordination, teamwork, execution — I've orchestrated experiences that bring people together and create memories.",
    bg: "bg-primary/10 border-primary/20",
    accent: "text-primary",
  },
  {
    id: "creative",
    emoji: "✨",
    title: "CREATIVE",
    desc: "Design, storytelling, photography, ideas — creativity is the thread that weaves through everything I do.",
    bg: "bg-chart-4/10 border-chart-4/20",
    accent: "text-chart-4",
  },
  {
    id: "learning",
    emoji: "🌱",
    title: "LEARNING",
    desc: "Experiments, projects, continuous learning — I believe growth happens at the intersection of comfort and challenge.",
    bg: "bg-chart-2/10 border-chart-2/20",
    accent: "text-chart-2",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="About Me"
          title="Nice to meet you"
          subtitle="I'm Suhasini — a curious mind at the intersection of data and creativity."
        />

        {/* Main about content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-pink-blush to-lavender/50 border border-border overflow-hidden relative flex items-end">
              <div className="absolute inset-0 bg-grid-pink opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 opacity-50">
                  <div className="text-6xl">📸</div>
                  <div className="text-sm font-medium text-muted-foreground">[Portrait Photo]</div>
                </div>
              </div>
              {/* Decorative stickers */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md text-xs font-medium border border-border">
                Data × Events ✨
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="diary-bg bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <p className="text-sm text-muted-foreground italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "Turning data into insights and ideas into experiences."
                  </p>
                  <p className="text-xs font-semibold text-primary mt-2">— Suhasini V.</p>
                </div>
              </div>
            </div>
            {/* Floating stat */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -right-4 top-16 bg-card border border-border rounded-2xl p-3 shadow-lg"
            >
              <div className="text-xl font-bold text-primary">12+</div>
              <div className="text-xs text-muted-foreground">Events Planned</div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">[University Name]</span>
              <h3 className="text-2xl font-bold mt-1">
                Upcoming Data Scientist <span className="text-primary">+</span> Event Planner
              </h3>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Suhasini — a final year student passionate about <strong className="text-foreground">data science</strong> and <strong className="text-foreground">event planning</strong>. I love diving into datasets as much as I love orchestrating unforgettable events.
              </p>
              <p>
                Whether I'm building a machine learning model or coordinating a campus festival, I bring the same energy: <em className="text-foreground">detail-oriented, people-first, and always learning.</em>
              </p>
              <p>
                [Add more personal details about your journey, inspirations, and what makes you unique!]
              </p>
            </div>

            {/* Identity cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {identityCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`rounded-xl border p-4 cursor-default ${card.bg}`}
                >
                  <div className="text-xl mb-1">{card.emoji}</div>
                  <div className={`text-xs font-bold mb-1 ${card.accent}`}>{card.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Personality section */}
        <div>
          <SectionHeader
            label="A little bit of me"
            title="My personality, in cards"
            subtitle="A few words that describe how I think and what I value."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {personalityCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="group bg-card border border-border rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-muted mb-3 group-hover:scale-110 transition-transform ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{card.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
