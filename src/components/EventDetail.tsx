import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronLeft, ChevronRight, X, Calendar, MapPin, Users, Clock, Heart, Star, BookOpen, CheckCircle } from "lucide-react"
import { events } from "@/data/events"
import { eventCategoryColors } from "@/data/events"
import { SushiBot } from "@/components/SushiBot"

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: { src: string | null; caption: string; alt: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") onPrev()
    if (e.key === "ArrowRight") onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleKey])

  const current = images[index]
  if (!current) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white/80 hover:text-white p-2" onClick={onClose} aria-label="Close gallery">
        <X className="w-6 h-6" />
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 disabled:opacity-30"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        disabled={index === 0}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video rounded-xl bg-gradient-to-br from-pink-blush/30 to-lavender/20 flex items-center justify-center mb-3">
          <div className="text-6xl opacity-50">🖼️</div>
        </div>
        <p className="text-white text-sm text-center">{current.caption}</p>
        <p className="text-white/50 text-xs text-center mt-1">{index + 1} / {images.length}</p>
      </motion.div>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 disabled:opacity-30"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        disabled={index === images.length - 1}
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </motion.div>
  )
}

export function EventDetail() {
  const { slug } = useParams()
  const rawEvent = events.find((e) => e.slug === slug)
  const overrides = (() => {
    try {
      const o = JSON.parse(localStorage.getItem("portfolio_overrides") || "{}")
      return o[`event:${slug}`] || {}
    } catch (e) {
      return {}
    }
  })()
  const event = rawEvent ? { ...rawEvent, ...overrides } : undefined
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center space-y-4">
          <SushiBot size="lg" mood="thinking" speechBubble="This diary page seems to be missing..." />
          <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
          <Link to="/#events">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Event Diaries
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const catColor = eventCategoryColors[event.category]
  const stats = [
    { icon: Users, label: "Participants", value: event.stats.participants },
    { icon: Users, label: "Team Size", value: event.stats.teamSize },
    { icon: Clock, label: "Duration", value: event.stats.duration },
    { icon: Star, label: "Activities", value: event.stats.activities },
  ].filter((s) => s.value !== undefined)

  const reflections = [
    { icon: Heart, label: "Favorite Memory", content: event.reflections.favoriteMemory },
    { icon: Star, label: "Biggest Challenge", content: event.reflections.challenge },
    { icon: BookOpen, label: "What I Learned", content: event.reflections.learned },
    { icon: Star, label: "Best Moment", content: event.reflections.bestMoment },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Cover */}
      <div className="relative h-72 sm:h-96 overflow-hidden" style={event.coverImage ? { backgroundImage: `url(${event.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        {!event.coverImage && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-blush/40 to-lavender/30" />
            <div className="absolute inset-0 bg-grid-pink opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center opacity-50">
                <div className="text-5xl mb-2">📷</div>
                <div className="text-sm font-medium text-muted-foreground">[Event Cover Photo]</div>
              </div>
            </div>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/60 to-transparent">
          <div className="max-w-4xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white mb-3 inline-block" style={{ backgroundColor: catColor }}>
              {event.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-white/80 text-sm">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {event.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link to="/#events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Event Diaries
        </Link>

        {/* Snapshot */}
        {stats.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center shadow-sm">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* My Role */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" /> My Role
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{event.description}</p>
          <ul className="space-y-2">
            {event.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">♡</span> {r}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The Story */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="diary-bg bg-card border border-primary/20 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> The Story
          </h2>
          <p className="text-muted-foreground leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            {event.description}
          </p>
          <p className="text-muted-foreground leading-relaxed italic mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            [Add the full diary-style narrative of this event here — what happened, how it felt, what made it special.]
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Timeline</h2>
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            {event.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative mb-6 last:mb-0"
              >
                <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                  <span className="text-xs font-medium text-primary">{item.time}</span>
                  <h3 className="font-semibold text-foreground text-sm mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        {event.gallery.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Gallery</h2>
            <div className="columns-2 sm:columns-3 gap-3 [&>*]:mb-3">
              {event.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full break-inside-avoid group relative rounded-xl overflow-hidden bg-gradient-to-br from-pink-blush/30 to-lavender/20 aspect-[4/3]"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <div className="text-3xl">🖼️</div>
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-end p-2">
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reflections */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">Reflections</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {reflections.map((ref, i) => {
              const Icon = ref.icon
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{ref.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {ref.content}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex items-center justify-between">
          <Link to="/#events">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> All Events
            </Button>
          </Link>
          <SushiBot size="sm" mood="idle" />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={event.gallery}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
            onNext={() => setLightboxIndex((i) => Math.min(event.gallery.length - 1, (i ?? 0) + 1))}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
