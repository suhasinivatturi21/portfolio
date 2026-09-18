export type ExperienceItem = {
  id: string
  role: string
  organization: string
  type: "Work" | "Internship" | "Volunteer" | "Club"
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: "exp1",
    role: "[Role Title]",
    organization: "[Organization Name]",
    type: "Club",
    startDate: "Aug 2023",
    endDate: "Present",
    current: true,
    location: "[Location]",
    description: "[Brief description of your role and what the organization does.]",
    highlights: [
      "[Key achievement or responsibility]",
      "[Another achievement]",
      "[Another highlight]",
    ],
  },
  {
    id: "exp2",
    role: "[Role Title]",
    organization: "[Organization Name]",
    type: "Volunteer",
    startDate: "Jan 2023",
    endDate: "Jun 2023",
    current: false,
    location: "[Location]",
    description: "[Brief description of your volunteer work.]",
    highlights: [
      "[Key achievement]",
      "[Another achievement]",
    ],
  },
]

export type EducationItem = {
  id: string
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
  current: boolean
  location: string
  gpa?: string
  relevantCourses: string[]
}

export const education: EducationItem[] = [
  {
    id: "edu1",
    institution: "[University Name]",
    degree: "[Degree]",
    field: "[Field of Study]",
    startYear: "2022",
    endYear: "2026",
    current: true,
    location: "[City, State]",
    gpa: "[GPA if you'd like to include]",
    relevantCourses: [
      "Data Structures & Algorithms",
      "Statistics",
      "Database Management",
      "[More relevant courses]",
    ],
  },
]
