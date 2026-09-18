export type EventCategory = "College" | "Technical" | "Cultural" | "Workshop" | "Competition" | "Other"

export type EventTimeline = {
  time: string
  title: string
  description: string
}

export type EventGalleryItem = {
  src: string | null
  caption: string
  alt: string
}

export type EventReflections = {
  favoriteMemory: string
  challenge: string
  learned: string
  bestMoment: string
}

export type Event = {
  slug: string
  title: string
  date: string
  location: string
  role: string
  category: EventCategory
  coverImage: string | null
  description: string
  stats: {
    participants?: number
    teamSize?: number
    duration?: string
    activities?: number
  }
  responsibilities: string[]
  timeline: EventTimeline[]
  gallery: EventGalleryItem[]
  reflections: EventReflections
  excerpt: string
  tags: string[]
}

export const events: Event[] = [
  {
    slug: "college-cultural-fest",
    title: "[Cultural Fest Name]",
    date: "March 2024",
    location: "[University Campus]",
    role: "Lead Coordinator",
    category: "Cultural",
    coverImage: null,
    description: "[Description of the cultural festival and your involvement in planning and executing it.]",
    excerpt: "Led the planning and execution of the annual cultural festival, coordinating teams across multiple events.",
    stats: {
      participants: 200,
      teamSize: 15,
      duration: "3 Days",
      activities: 12,
    },
    responsibilities: [
      "Coordinated logistics for all event venues",
      "Managed a team of [N] volunteers",
      "Handled participant registrations",
      "[Add more responsibilities]",
    ],
    timeline: [
      { time: "Day 1", title: "Opening Ceremony", description: "[Description of opening day activities]" },
      { time: "Day 2", title: "Main Events", description: "[Description of main events day]" },
      { time: "Day 3", title: "Closing & Awards", description: "[Description of closing ceremony]" },
    ],
    gallery: [
      { src: null, caption: "[Event Photo 1]", alt: "Cultural fest opening ceremony" },
      { src: null, caption: "[Event Photo 2]", alt: "Team photo" },
      { src: null, caption: "[Event Photo 3]", alt: "Performance photo" },
    ],
    reflections: {
      favoriteMemory: "[Your favorite memory from this event]",
      challenge: "[The biggest challenge you overcame]",
      learned: "[What you learned from organizing this event]",
      bestMoment: "[The best moment of the event]",
    },
    tags: ["Cultural", "Leadership", "Coordination"],
  },
  {
    slug: "tech-workshop",
    title: "[Tech Workshop / Hackathon Name]",
    date: "January 2024",
    location: "[Venue]",
    role: "Event Organizer",
    category: "Technical",
    coverImage: null,
    description: "[Description of the technical workshop or hackathon and what made it special.]",
    excerpt: "Organized a hands-on technical workshop bringing together students passionate about technology.",
    stats: {
      participants: 80,
      teamSize: 8,
      duration: "1 Day",
      activities: 5,
    },
    responsibilities: [
      "Coordinated with speakers and mentors",
      "Managed event schedule and flow",
      "Handled participant experience",
      "[Add more responsibilities]",
    ],
    timeline: [
      { time: "9:00 AM", title: "Registration & Welcome", description: "[Opening session description]" },
      { time: "11:00 AM", title: "Technical Sessions", description: "[Workshop sessions description]" },
      { time: "3:00 PM", title: "Closing & Networking", description: "[Closing session description]" },
    ],
    gallery: [
      { src: null, caption: "[Event Photo 1]", alt: "Workshop session" },
      { src: null, caption: "[Event Photo 2]", alt: "Participants at work" },
    ],
    reflections: {
      favoriteMemory: "[Your favorite memory]",
      challenge: "[Biggest challenge]",
      learned: "[What you learned]",
      bestMoment: "[Best moment]",
    },
    tags: ["Technical", "Workshop", "Community"],
  },
  {
    slug: "competition-event",
    title: "[Competition Name]",
    date: "November 2023",
    location: "[Venue]",
    role: "Participant & Co-Organizer",
    category: "Competition",
    coverImage: null,
    description: "[Description of the competition and your dual role as participant and organizer.]",
    excerpt: "Participated and helped coordinate an inter-college competition that challenged participants creatively.",
    stats: {
      participants: 120,
      teamSize: 10,
      duration: "2 Days",
      activities: 8,
    },
    responsibilities: [
      "Managed judging panels",
      "Coordinated inter-college logistics",
      "Oversaw participant experience",
    ],
    timeline: [
      { time: "Day 1", title: "Preliminary Rounds", description: "[Preliminary rounds description]" },
      { time: "Day 2", title: "Finals & Celebration", description: "[Finals description]" },
    ],
    gallery: [
      { src: null, caption: "[Competition Photo 1]", alt: "Competition event" },
      { src: null, caption: "[Competition Photo 2]", alt: "Award ceremony" },
    ],
    reflections: {
      favoriteMemory: "[Favorite memory]",
      challenge: "[Biggest challenge]",
      learned: "[What you learned]",
      bestMoment: "[Best moment]",
    },
    tags: ["Competition", "Leadership", "Inter-college"],
  },
]

export const eventCategoryColors: Record<EventCategory, string> = {
  College: "oklch(0.65 0.18 0)",
  Technical: "oklch(0.7 0.12 290)",
  Cultural: "oklch(0.75 0.1 60)",
  Workshop: "oklch(0.72 0.14 340)",
  Competition: "oklch(0.68 0.15 200)",
  Other: "oklch(0.6 0.08 0)",
}
