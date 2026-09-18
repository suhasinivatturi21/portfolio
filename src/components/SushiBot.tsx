import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

type SushiBotMood = "idle" | "waving" | "thinking" | "analyzing" | "celebrating"

interface SushiBotProps {
  mood?: SushiBotMood
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  speechBubble?: string
}

export function SushiBot({ mood = "idle", size = "md", className, onClick, speechBubble }: SushiBotProps) {
  const sizes = { sm: 48, md: 72, lg: 96 }
  const s = sizes[size]

  const bodyVariants: Variants = {
    idle: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
    waving: { rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 0.6 } },
    thinking: { rotate: [0, -5, 0, 5, 0], transition: { repeat: Infinity, duration: 2 } },
    analyzing: { scale: [1, 1.04, 1], transition: { repeat: Infinity, duration: 1 } },
    celebrating: { scale: [1, 1.1, 1], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.4 } },
  }

  const eyeVariants: Variants = {
    idle: { scaleY: [1, 0.1, 1], transition: { repeat: Infinity, duration: 3, repeatDelay: 2 } },
    waving: { scaleY: 1 },
    thinking: { y: [-1, 1, -1], transition: { repeat: Infinity, duration: 1.5 } },
    analyzing: { scaleX: [1, 1.3, 1], transition: { repeat: Infinity, duration: 1 } },
    celebrating: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.4 } },
  }

  return (
    <div className={cn("relative inline-flex flex-col items-center gap-1", className)} onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}>
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary shadow-sm"
          style={{ zIndex: 10 }}
        >
          {speechBubble}
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 block w-3 h-1.5 overflow-hidden">
            <span className="block w-2 h-2 bg-primary/10 border-r border-b border-primary/20 rotate-45 mx-auto -mt-1" />
          </span>
        </motion.div>
      )}
      <motion.div
        variants={bodyVariants}
        animate={mood}
        className="select-none"
      >
        <svg width={s} height={s} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow */}
          <ellipse cx="36" cy="62" rx="18" ry="4" fill="oklch(0.88 0.07 0 / 0.3)" />
          {/* Antennae */}
          <line x1="28" y1="12" x2="22" y2="4" stroke="oklch(0.7 0.12 290)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="3" r="2.5" fill="oklch(0.72 0.14 340)" />
          <line x1="44" y1="12" x2="50" y2="4" stroke="oklch(0.7 0.12 290)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="3" r="2.5" fill="oklch(0.72 0.14 340)" />
          {/* Body */}
          <rect x="12" y="14" width="48" height="42" rx="18" fill="oklch(0.92 0.06 0)" />
          <rect x="12" y="14" width="48" height="42" rx="18" fill="url(#bodyGrad)" />
          {/* Face panel */}
          <rect x="18" y="20" width="36" height="28" rx="10" fill="oklch(0.97 0.02 290)" />
          {/* Eyes */}
          <motion.g variants={eyeVariants} animate={mood} style={{ transformOrigin: "36px 32px" }}>
            <circle cx="26" cy="32" r="5" fill="oklch(0.22 0.05 300)" />
            <circle cx="26" cy="32" r="2.5" fill="white" />
            <circle cx="46" cy="32" r="5" fill="oklch(0.22 0.05 300)" />
            <circle cx="46" cy="32" r="2.5" fill="white" />
            {/* Eye shine */}
            <circle cx="27.5" cy="30.5" r="1" fill="white" opacity="0.9" />
            <circle cx="47.5" cy="30.5" r="1" fill="white" opacity="0.9" />
          </motion.g>
          {/* Cheeks */}
          <circle cx="20" cy="37" r="4" fill="oklch(0.72 0.14 0 / 0.25)" />
          <circle cx="52" cy="37" r="4" fill="oklch(0.72 0.14 0 / 0.25)" />
          {/* Smile */}
          <path d="M28 41 Q36 47 44 41" stroke="oklch(0.62 0.17 0)" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Arm/wave indicator for waving mood */}
          {mood === "waving" && (
            <motion.path
              d="M60 30 L68 22"
              stroke="oklch(0.62 0.17 0)"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{ transformOrigin: "60px 30px" }}
            />
          )}
          {/* Sparkles for celebrating */}
          {mood === "celebrating" && (
            <>
              <motion.text x="2" y="18" fontSize="10" animate={{ opacity: [0, 1, 0], y: [-2, -8, -2] }} transition={{ repeat: Infinity, duration: 0.6 }}>✨</motion.text>
              <motion.text x="60" y="18" fontSize="10" animate={{ opacity: [0, 1, 0], y: [-2, -8, -2] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}>✨</motion.text>
            </>
          )}
          {/* Data dots for analyzing */}
          {mood === "analyzing" && (
            <>
              <motion.circle cx="15" cy="50" r="2" fill="oklch(0.65 0.18 0)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
              <motion.circle cx="22" cy="50" r="2" fill="oklch(0.65 0.18 0)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
              <motion.circle cx="29" cy="50" r="2" fill="oklch(0.65 0.18 0)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
            </>
          )}
          <defs>
            <linearGradient id="bodyGrad" x1="12" y1="14" x2="60" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="oklch(0.88 0.07 0)" />
              <stop offset="1" stopColor="oklch(0.82 0.09 290)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}
