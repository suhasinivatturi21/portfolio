export type SkillCategory = {
  id: string
  label: string
  color: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: "data-science",
    label: "Data Science",
    color: "var(--chart-1)",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "SQL", "Data Cleaning"],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    color: "var(--chart-2)",
    skills: ["Machine Learning", "Data Analysis", "Statistics", "Model Evaluation", "Data Visualization", "Feature Engineering"],
  },
  {
    id: "tools",
    label: "Tools & Tech",
    color: "var(--chart-3)",
    skills: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Google Colab", "Excel"],
  },
  {
    id: "event-planning",
    label: "Event Planning",
    color: "var(--chart-4)",
    skills: ["Event Planning", "Team Coordination", "Communication", "Time Management", "Documentation", "Logistics"],
  },
]

export const radarData = [
  { subject: "Python", A: 80, fullMark: 100 },
  { subject: "Data Analysis", A: 78, fullMark: 100 },
  { subject: "ML", A: 65, fullMark: 100 },
  { subject: "SQL", A: 72, fullMark: 100 },
  { subject: "Visualization", A: 82, fullMark: 100 },
  { subject: "Event Planning", A: 90, fullMark: 100 },
]
