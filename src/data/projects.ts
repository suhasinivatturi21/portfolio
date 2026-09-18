export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  category: "Data Science" | "Machine Learning" | "AI" | "Analytics" | "Other"
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
    slug: "sentiment-analysis",
    title: "[Project Title] — Sentiment Analysis",
    description: "A natural language processing project that analyzes sentiment in social media posts using ML models.",
    longDescription: "[Extended project description goes here. Replace with real project details when available.]",
    category: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "NLTK", "Pandas", "Matplotlib"],
    year: "2024",
    image: null,
    github: null,
    liveDemo: null,
    featured: true,
    problem: "[Describe the problem this project solves]",
    approach: "[Describe your methodology and approach]",
    dataset: "[Describe the dataset used]",
    results: "[Describe the outcomes and metrics achieved]",
    learnings: "[What did you learn from this project?]",
  },
  {
    slug: "data-visualization-dashboard",
    title: "[Project Title] — Data Visualization Dashboard",
    description: "An interactive dashboard built to explore and visualize complex datasets with insightful charts.",
    longDescription: "[Extended project description goes here.]",
    category: "Analytics",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
    year: "2024",
    image: null,
    github: null,
    liveDemo: null,
    featured: true,
    problem: "[Describe the problem]",
    approach: "[Describe your approach]",
    dataset: "[Dataset description]",
    results: "[Results achieved]",
    learnings: "[Learnings]",
  },
  {
    slug: "predictive-model",
    title: "[Project Title] — Predictive Model",
    description: "Built a machine learning model to predict outcomes using historical data and statistical analysis.",
    longDescription: "[Extended project description goes here.]",
    category: "Data Science",
    technologies: ["Python", "Scikit-learn", "NumPy", "Pandas", "SQL"],
    year: "2023",
    image: null,
    github: null,
    liveDemo: null,
    featured: false,
    problem: "[Describe the problem]",
    approach: "[Describe your approach]",
    dataset: "[Dataset description]",
    results: "[Results achieved]",
    learnings: "[Learnings]",
  },
  {
    slug: "exploratory-data-analysis",
    title: "[Project Title] — EDA Project",
    description: "Comprehensive exploratory data analysis uncovering patterns and insights from real-world data.",
    longDescription: "[Extended project description goes here.]",
    category: "Analytics",
    technologies: ["Python", "Pandas", "Seaborn", "Matplotlib", "NumPy"],
    year: "2023",
    image: null,
    github: null,
    liveDemo: null,
    featured: false,
    problem: "[Describe the problem]",
    approach: "[Describe your approach]",
    dataset: "[Dataset description]",
    results: "[Results achieved]",
    learnings: "[Learnings]",
  },
]
