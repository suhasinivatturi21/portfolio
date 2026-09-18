import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { SushiBot } from "@/components/SushiBot"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"
import { profile } from "@/data/profile"
import { events } from "@/data/events"
import { Heart, Users, Clock, Star } from "lucide-react"

const eventCategoryData = events.reduce((acc, e) => {
  const existing = acc.find((a) => a.name === e.category)
  if (existing) existing.count++
  else acc.push({ name: e.category, count: 1 })
  return acc
}, [] as { name: string; count: number }[])

const chartConfig: ChartConfig = {
  count: { label: "Events", color: "var(--chart-1)" },
}

const stats = [
  { icon: Star, label: "Events Organized", value: profile.stats.events, suffix: "" },
  { icon: Users, label: "People Coordinated", value: profile.stats.people, suffix: "+" },
  { icon: Heart, label: "Teams Worked With", value: 8, suffix: "+" },
  { icon: Clock, label: "Hours Planned", value: 200, suffix: "+" },
]

export function DataMeetsEvents() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pink opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Signature"
          title="Where Data Meets Events"
          subtitle="The intersection of my two worlds — data science and event planning, visualized."
          decorative="✨"
        />

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-sm"
                >
                  <div className="inline-flex p-2 rounded-xl bg-primary/10 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </motion.div>
              )
            })}
            {/* Note about sample data */}
            <div className="col-span-2 text-xs text-muted-foreground italic mt-1">
              * Sample values — replace with real data when available.
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-foreground mb-1">Events by Category</h3>
            <p className="text-xs text-muted-foreground mb-4">Distribution of events I've been involved in</p>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <BarChart data={eventCategoryData} accessibilityLayer layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-4)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ChartContainer>
          </motion.div>
        </div>

        {/* SushiBot */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <SushiBot size="md" mood="celebrating" speechBubble="Data + Events = Magic! ✨" />
        </motion.div>
      </div>
    </section>
  )
}
