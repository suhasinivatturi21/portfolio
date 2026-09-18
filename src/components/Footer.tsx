import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { SushiBot } from "@/components/SushiBot"
import { profile } from "@/data/profile"
import { Heart, Mail, ArrowUp, Sparkles } from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/SocialIcons"

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Data Lab", href: "/#data-lab" },
  { label: "Projects", href: "/#projects" },
  { label: "Event Diaries", href: "/#events" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
]

const socialLinks = [
  { icon: Mail, label: "Email", href: `mailto:${profile.email}`, customIcon: null },
  { icon: null, label: "LinkedIn", href: profile.linkedin, customIcon: LinkedinIcon },
  { icon: null, label: "GitHub", href: profile.github, customIcon: GithubIcon },
]

const footerStats = [
  { value: `${profile.stats.events}+`, label: "Events" },
  { value: `${profile.stats.projects}+`, label: "Projects" },
  { value: `${profile.stats.people}+`, label: "People" },
]

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative bg-muted/50 border-t border-border overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Top: CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-10 border-b border-border"
        >
          <div className="flex items-center gap-4">
            <SushiBot size="md" mood="waving" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Let's create something lovely</h3>
              <p className="text-sm text-muted-foreground">Data, events, or just a friendly hello — I'm always up for a chat.</p>
            </div>
          </div>
          <Link to="/#contact" data-cursor="Say Hi">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            >
              <Sparkles className="w-4 h-4" /> Get in Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Middle: Main grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand + stats */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <SushiBot size="sm" mood="idle" />
              <span className="font-semibold text-foreground text-lg">
                Suhasini Vatturi <Heart className="inline w-4 h-4 text-primary fill-primary" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Data Scientist in the making · Event Planner · Creative Thinker. Turning data into insights and ideas into experiences.
            </p>
            {/* Mini stats */}
            <div className="flex gap-6 pt-2">
              {footerStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social cards */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-2">
              {socialLinks.map((social) => {
                const Icon = social.customIcon || social.icon
                if (!Icon) return null
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-accent/30 transition-all group"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{social.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Suhasini Vatturi. Made with <Heart className="inline w-3 h-3 text-primary fill-primary" /> and lots of data.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-border hover:border-primary/40"
            data-cursor="Top"
          >
            Back to top <ArrowUp className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
