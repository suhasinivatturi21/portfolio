import { motion } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { SushiBot } from "@/components/SushiBot"
import { Button } from "@/components/ui/button"
import { Mail, Heart } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"
import { profile } from "@/data/profile"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-pink-blush/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-lavender/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeader
          label="Contact"
          title="Let's create something lovely."
          subtitle="Whether it's a data project, an event to plan, or just a hello — I'd love to hear from you."
          decorative="♡"
        />

        {/* SushiBot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <SushiBot size="lg" mood="waving" speechBubble="Should we make something awesome? ✨" />
        </motion.div>

        {/* CTA Button: Open Gmail compose (only 'to' field) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center justify-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&tf=1`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compose email to ${profile.email} in Gmail`}
            >
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 w-full sm:w-auto btn-full-mobile">
                <Mail className="w-4 h-4 mr-2" /> Contact me
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground italic mt-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          "Every great project starts with a simple hello."
          <Heart className="inline w-3 h-3 text-primary ml-1" />
        </motion.p>
      </div>
    </section>
  )
}
