import { useRef, useState, type ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  tiltStrength?: number
  whileHoverY?: number
  dataCursor?: string
  onClick?: () => void
}

export function TiltCard({
  children,
  className,
  glowColor = "oklch(0.62 0.17 0 / 0.15)",
  tiltStrength = 8,
  whileHoverY = -6,
  dataCursor,
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 400, damping: 30, mass: 0.3 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [0, 1], [tiltStrength, -tiltStrength])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-tiltStrength, tiltStrength])

  const glowX = useTransform(smoothMouseX, [0, 1], ["0%", "100%"])
  const glowY = useTransform(smoothMouseY, [0, 1], ["0%", "100%"])
  const glowBackground = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, ${glowColor}, transparent 40%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mouseX.set(px)
    mouseY.set(py)
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{ y: isHovering ? whileHoverY : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300",
        isHovering && "shadow-xl border-primary/30",
        className
      )}
    >
      {/* Glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovering ? 1 : 0 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: glowBackground,
          }}
        />
      </motion.div>
      {/* Content */}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  )
}
