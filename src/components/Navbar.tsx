import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SushiBot } from "@/components/SushiBot"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Data Lab", href: "/#data-lab" },
  { label: "Projects", href: "/#projects" },
  { label: "Event Diaries", href: "/#events" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "")
      if (isHome) {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      } else {
        navigate(href)
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <SushiBot size="sm" mood="idle" />
            <span className="font-semibold text-foreground text-sm">
              Suhasini <Heart className="inline w-3 h-3 text-primary fill-primary" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }
                }}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    if (link.href.startsWith("/#")) {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }
                  }}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
