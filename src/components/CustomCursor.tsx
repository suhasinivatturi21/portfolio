import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState("")
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 40, stiffness: 1200, mass: 0.1 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    const moveHandler = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)

      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-cursor]")
      if (interactive) {
        setHovering(true)
        const cursorLabel = interactive.getAttribute("data-cursor")
        setLabel(cursorLabel || "")
      } else {
        setHovering(false)
        setLabel("")
      }
    }

    const leaveHandler = () => setVisible(false)

    window.addEventListener("mousemove", moveHandler)
    document.addEventListener("mouseleave", leaveHandler)

    return () => {
      window.removeEventListener("mousemove", moveHandler)
      document.removeEventListener("mouseleave", leaveHandler)
    }
  }, [cursorX, cursorY])

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        animate={{ scale: hovering ? 2.5 : 1, opacity: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
        style={{ width: 14, height: 14, backgroundColor: hovering ? "oklch(0.62 0.17 0 / 0.12)" : "transparent" }}
      >
        {label && hovering && (
          <span className="absolute top-5 left-5 text-xs font-medium text-primary whitespace-nowrap bg-card px-2 py-0.5 rounded-full border border-border shadow-sm">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
