import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Sparkles, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SushiBot } from "@/components/SushiBot"
import { profile } from "@/data/profile"
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts"

const floatingChartData = [
  { subject: "Python", A: 80 },
  { subject: "Events", A: 90 },
  { subject: "ML", A: 65 },
  { subject: "SQL", A: 72 },
  { subject: "Viz", A: 82 },
]

function FloatingDataCard() {
  return (
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-lg w-40"
    >
      <div className="text-xs font-medium text-muted-foreground mb-2">Skill Radar</div>
      <ResponsiveContainer width="100%" height={80}>
        <RadarChart data={floatingChartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <PolarGrid stroke="oklch(0.88 0.07 0 / 0.5)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 6, fill: "var(--muted-foreground)" }} />
          <Radar dataKey="A" stroke="oklch(0.65 0.18 0)" fill="oklch(0.65 0.18 0)" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

function FloatingEventCard() {
  return (
    <motion.div
      animate={{ y: [5, -5, 5] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
      className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-3 shadow-lg w-36"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-xs font-medium text-primary">Latest Event</span>
      </div>
      <div className="text-xs font-semibold text-foreground leading-tight">[Cultural Fest]</div>
      <div className="text-xs text-muted-foreground mt-1">Lead Coordinator</div>
      <div className="mt-2 flex items-center gap-1">
        <div className="h-1 rounded-full bg-primary/30 flex-1">
          <div className="h-1 rounded-full bg-primary w-3/4" />
        </div>
        <span className="text-xs text-muted-foreground">200+</span>
      </div>
    </motion.div>
  )
}

const statItems = [
  { label: "Events Organized", value: profile.stats.events },
  { label: "People Coordinated", value: `${profile.stats.people}+` },
  { label: "Projects Built", value: profile.stats.projects },
  { label: "Certifications", value: profile.stats.certificates },
]

function AnimatedCounter({ value }: { value: number | string }) {
  const [displayed, setDisplayed] = useState(0)
  const isNum = typeof value === "number"

  useEffect(() => {
    if (!isNum) return
    let start = 0
    const end = value as number
    const timer = setInterval(() => {
      start += Math.ceil(end / 30)
      if (start >= end) { setDisplayed(end); clearInterval(timer) }
      else setDisplayed(start)
    }, 50)
    return () => clearInterval(timer)
  }, [value, isNum])

  return <span>{isNum ? displayed : value}</span>
}

export function Hero() {
  const [sushiBotMood, setSushiBotMood] = useState<"idle" | "waving" | "celebrating">("waving")
  const [clickCount, setClickCount] = useState(0)

  const handleSushiBotClick = () => {
    const next = clickCount + 1
    setClickCount(next)
    if (next >= 5) { setSushiBotMood("celebrating"); setTimeout(() => { setSushiBotMood("idle"); setClickCount(0) }, 3000) }
    else setSushiBotMood("waving")
    setTimeout(() => setSushiBotMood("idle"), 1000)
  }

  const handleScroll = () => {
    const el = document.getElementById("about")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pink opacity-60" />
      {/* Gradient blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-pink-blush/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-lavender/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Data Science × Event Planning
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-none"
            >
              Suhasini
              <br />
              <span className="text-gradient-pink">Vatturi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground font-medium italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed max-w-md"
            >
              {profile.subTagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-md"
                onClick={() => { const el = document.getElementById("projects"); if (el) el.scrollIntoView({ behavior: "smooth" }) }}
              >
                Explore My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5"
                onClick={() => { const el = document.getElementById("events"); if (el) el.scrollIntoView({ behavior: "smooth" }) }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Event Diaries
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {statItems.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: SushiBot + Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center items-center h-80 lg:h-auto"
          >
            {/* Central SushiBot */}
            <div className="relative flex flex-col items-center">
              <div className="w-44 h-44 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-xl">
                <SushiBot
                  size="lg"
                  mood={sushiBotMood}
                  onClick={handleSushiBotClick}
                  speechBubble={clickCount === 0 ? "Hi! I'm SushiBot ✨" : clickCount >= 5 ? "Yay! You found me! 🎉" : undefined}
                />
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute top-0 right-0 lg:right-8">
              <FloatingDataCard />
            </div>
            <div className="absolute bottom-0 left-0 lg:left-8">
              <FloatingEventCard />
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 left-4 text-xl pointer-events-none opacity-60"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 right-8 text-sm pointer-events-none opacity-50"
            >
              💗
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={handleScroll}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs">scroll down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
