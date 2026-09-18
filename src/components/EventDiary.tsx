import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/SectionHeader"
import { events, type Event, type EventCategory, eventCategoryColors } from "@/data/events"
import { Link } from "react-router-dom"
import { Calendar, MapPin, ArrowRight, BookOpen } from "lucide-react"

const filters: (EventCategory | "All")[] = ["All", "College", "Technical", "Cultural", "Workshop", "Competition", "Other"]

// Varied card layouts for scrapbook feel
const layouts = [
  "polaroid",
  "landscape",
  "portrait",
  "note",
  "landscape",
  "polaroid",
] as const

function EventCard({ event, layout, index }: { event: Event; layout: string; index: number }) {
  const catColor = eventCategoryColors[event.category]

  if (layout === "polaroid") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
        className="bg-card border border-border rounded-xl p-3 pb-5 shadow-md hover:shadow-xl transition-shadow"
        style={{ transformOrigin: "center" }}
      >
        <Link to={`/events/${event.slug}`} className="block">
          {/* Photo area */}
          <div className="relative aspect-square rounded-lg bg-gradient-to-br from-pink-blush/40 to-lavender/30 overflow-hidden mb-3">
            <div className="absolute inset-0 bg-grid-pink opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <div className="text-3xl">📷</div>
            </div>
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: catColor }}>
              {event.category}
            </span>
          </div>
          {/* Caption */}
          <div className="px-1">
            <div className="text-xs text-muted-foreground mb-1">{event.date}</div>
            <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">{event.title}</h3>
            <p className="text-xs text-muted-foreground italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "{event.excerpt}"
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-primary">
              <BookOpen className="w-3 h-3" /> Open Diary <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  if (layout === "portrait") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -6 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      >
        <Link to={`/events/${event.slug}`} className="block">
          <div className="relative aspect-[3/4] bg-gradient-to-br from-lavender/40 to-pink-blush/30 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pink opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <div className="text-4xl">📸</div>
            </div>
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: catColor }}>
                {event.category}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-card/80 backdrop-blur-sm text-foreground">
                {event.date}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent">
              <h3 className="font-semibold text-foreground text-sm leading-tight">{event.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{event.role}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  if (layout === "note") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -4, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
        className="diary-bg bg-card border border-primary/20 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
      >
        <Link to={`/events/${event.slug}`} className="block">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: catColor }}>
              {event.category}
            </span>
            <span className="text-xs font-medium text-primary">📌 {event.date}</span>
          </div>
          <h3 className="font-semibold text-foreground leading-tight mb-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            "{event.excerpt}"
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" /> {event.location}
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-primary">
            <BookOpen className="w-3 h-3" /> Read the diary <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </motion.div>
    )
  }

  // landscape (default)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link to={`/events/${event.slug}`} className="block">
        <div className="relative aspect-[16/9] bg-gradient-to-br from-pink-blush/40 to-lavender/30 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pink opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <div className="text-4xl">🖼️</div>
          </div>
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: catColor }}>
            {event.category}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3 h-3" /> {event.date}
            <span className="text-border">·</span>
            <MapPin className="w-3 h-3" /> {event.location}
          </div>
          <h3 className="font-semibold text-foreground leading-tight mb-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">{event.role}</span>
            <span className="text-xs text-primary flex items-center gap-1">
              Open <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function EventDiary() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter)

  return (
    <section id="events" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-pink-blush/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-lavender/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Event Diaries"
          title="Stories worth keeping"
          subtitle="A digital scrapbook of events I've planned, organized, and been part of. Each one is a memory."
          decorative="📖"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <EventCard
                key={event.slug}
                event={event}
                layout={layouts[i % layouts.length]}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No events in this category yet. Check back soon! 📔</p>
          </div>
        )}
      </div>
    </section>
  )
}
