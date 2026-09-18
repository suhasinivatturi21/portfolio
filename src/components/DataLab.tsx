import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { SushiBot } from "@/components/SushiBot"
import { TiltCard } from "@/components/TiltCard"
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
} from "recharts"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"
import { Activity, TrendingUp, BarChart3 } from "lucide-react"

const radarData = [
  { subject: "Python", A: 80, fullMark: 100 },
  { subject: "Data Viz", A: 85, fullMark: 100 },
  { subject: "ML", A: 65, fullMark: 100 },
  { subject: "SQL", A: 72, fullMark: 100 },
  { subject: "Stats", A: 78, fullMark: 100 },
  { subject: "Events", A: 90, fullMark: 100 },
]

const lineData = [
  { month: "Jan", projects: 2, events: 1 },
  { month: "Feb", projects: 3, events: 2 },
  { month: "Mar", projects: 2, events: 4 },
  { month: "Apr", projects: 4, events: 1 },
  { month: "May", projects: 3, events: 3 },
  { month: "Jun", projects: 5, events: 2 },
]

const barData = [
  { name: "Python", value: 80 },
  { name: "Pandas", value: 75 },
  { name: "ML", value: 65 },
  { name: "SQL", value: 72 },
  { name: "Viz", value: 85 },
  { name: "Stats", value: 78 },
]

const chartConfig: ChartConfig = {
  projects: { label: "Projects", color: "var(--chart-1)" },
  events: { label: "Events", color: "var(--chart-4)" },
  value: { label: "Skill Level", color: "var(--chart-2)" },
}

function AnimatedStat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    let start = 0
    const timer = setInterval(() => {
      start += Math.ceil(value / 30)
      if (start >= value) { setDisplayed(value); clearInterval(timer) }
      else setDisplayed(start)
    }, 50)
    return () => clearInterval(timer)
  }, [value])
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-primary">
        {displayed}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

const dataCards = [
  { icon: Activity, label: "Models Trained", value: 15, suffix: "+", color: "var(--chart-1)" },
  { icon: TrendingUp, label: "Datasets Analyzed", value: 20, suffix: "+", color: "var(--chart-2)" },
  { icon: BarChart3, label: "Visualizations Created", value: 50, suffix: "+", color: "var(--chart-4)" },
]

export function DataLab() {
  return (
    <section id="data-lab" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pink opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Data Lab"
          title="Where data comes alive"
          subtitle="A visual playground showcasing my data science journey through interactive charts and stats."
          decorative="📊"
        />

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          {dataCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="p-5" tiltStrength={5} glowColor={`${card.color}15`}>
                  <div
                    className="inline-flex p-2.5 rounded-xl mb-3 mx-auto"
                    style={{ backgroundColor: card.color + "15" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <AnimatedStat value={card.value} label={card.label} suffix={card.suffix} />
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="p-6 h-full" tiltStrength={3} glowColor="oklch(0.65 0.18 0 / 0.1)">
              <h3 className="text-sm font-semibold text-foreground mb-1">Skill Radar</h3>
              <p className="text-xs text-muted-foreground mb-4">A snapshot of my capabilities</p>
              <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                <RadarChart data={radarData} accessibilityLayer>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Radar dataKey="A" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.3} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            </TiltCard>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <TiltCard className="p-6 h-full" tiltStrength={3} glowColor="oklch(0.7 0.12 290 / 0.1)">
              <h3 className="text-sm font-semibold text-foreground mb-1">Activity Over Time</h3>
              <p className="text-xs text-muted-foreground mb-4">Projects vs events per month</p>
              <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                <LineChart data={lineData} accessibilityLayer>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line dataKey="projects" stroke="var(--color-projects)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line dataKey="events" stroke="var(--color-events)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ChartContainer>
            </TiltCard>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TiltCard className="p-6 h-full" tiltStrength={3} glowColor="oklch(0.72 0.14 340 / 0.1)">
              <h3 className="text-sm font-semibold text-foreground mb-1">Tool Proficiency</h3>
              <p className="text-xs text-muted-foreground mb-4">Skill levels across tools</p>
              <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                <BarChart data={barData} accessibilityLayer>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </TiltCard>
          </motion.div>
        </div>

        {/* SushiBot analyzing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="flex flex-col items-center gap-2">
            <SushiBot size="md" mood="analyzing" speechBubble="Analyzing data... 📊" />
            <p className="text-xs text-muted-foreground italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              SushiBot is crunching the numbers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
