import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
  decorative?: string
}

export function SectionHeader({ label, title, subtitle, className, align = "center", decorative }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12", align === "center" ? "text-center" : "text-left", className)}
    >
      {label && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
        {decorative && <span className="text-primary ml-2">{decorative}</span>}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
