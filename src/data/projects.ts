export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  images?: string[]
  technologies: string[]
  year: string
  image: string | null
  github: string | null
  liveDemo: string | null
  featured: boolean
  problem: string
  approach: string
  dataset: string
  results: string
  learnings: string
}

export const projects: Project[] = [
  {
    slug: "social-pulse",
    title: "Social Pulse — Sentiment Explorer",
    description: "A cross-platform app that visualizes sentiment trends across social channels.",
    longDescription: "A project that ingests streaming social data and surfaces trends, topics, and sentiment over time.",
    category: "Web",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    ],
    technologies: ["TypeScript", "React", "D3", "Node.js"],
    year: "2024",
    image: null,
    github: "https://github.com/example/social-pulse",
    liveDemo: "https://example.com/social-pulse",
    featured: true,
    problem: "Understand public sentiment trends across platforms",
    approach: "Aggregate streaming data, normalize text, run sentiment models and visualize results.",
    dataset: "Public social posts and streaming APIs",
    results: "Interactive dashboards and time-series sentiment signals",
    learnings: "Engineering for streaming data and UX for time-series exploration",
  },
  {
    slug: "insightboard",
    title: "InsightBoard — Analytics Dashboard",
    description: "Interactive dashboard for exploring business KPIs and visualizing trends.",
    longDescription: "Built a modular dashboard with reusable chart components and CSV/data connectors.",
    category: "Data",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    ],
    technologies: ["React", "Recharts", "Python", "Flask"],
    year: "2024",
    image: null,
    github: "https://github.com/example/insightboard",
    liveDemo: "https://example.com/insightboard",
    featured: true,
    problem: "Provide non-technical stakeholders with actionable dashboards",
    approach: "Design clear visuals, precompute aggregates, support filtering and snapshots.",
    dataset: "Business metrics and CSV uploads",
    results: "Faster insight discovery and stakeholder adoption",
    learnings: "Designing for clarity and performance",
  },
  {
    slug: "forecastly",
    title: "Forecastly — Demand Prediction",
    description: "A demand forecasting model integrated into a lightweight dashboard.",
    longDescription: "Combined time-series models with explainability features and deployment pipeline.",
    category: "AI",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    ],
    technologies: ["Python", "Prophet", "Pandas", "FastAPI"],
    year: "2023",
    image: null,
    github: "https://github.com/example/forecastly",
    liveDemo: "https://example.com/forecastly",
    featured: false,
    problem: "Forecast demand to optimize inventory",
    approach: "Experiment with multiple models and provide confidence intervals",
    dataset: "Historical sales data",
    results: "Improved forecast accuracy and inventory suggestions",
    learnings: "Model monitoring and feature engineering",
  },
  {
    slug: "storylines",
    title: "Storylines — EDA Toolkit",
    description: "EDA reports and automated storytelling for datasets.",
    longDescription: "A toolkit that generates automated EDA reports and narrative summaries for datasets.",
    category: "Tools",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    ],
    technologies: ["Python", "Pandas", "Jupyter"],
    year: "2023",
    image: null,
    github: "https://github.com/example/storylines",
    liveDemo: "https://example.com/storylines",
    featured: false,
    problem: "Make data exploration faster and sharable",
    approach: "Automate common EDA steps and generate shareable HTML reports",
    dataset: "User-provided CSVs",
    results: "Faster onboarding for analysts",
    learnings: "Tradeoffs between automation and accuracy",
  },
]
