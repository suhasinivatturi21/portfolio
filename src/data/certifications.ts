export type Certification = {
  id: string
  title: string
  organization: string
  date: string
  credentialId?: string
  credentialUrl?: string
  description: string
  category: "Data Science" | "ML/AI" | "Tools" | "Other"
}

export const certifications: Certification[] = [
  {
    id: "cert1",
    title: "[Certificate Name]",
    organization: "[Issuing Organization]",
    date: "[Month Year]",
    credentialId: "[Credential ID if available]",
    credentialUrl: "https://www.example.com/verify/cert1",
    description: "[Brief description of what this certificate covers]",
    category: "Data Science",
  },
  {
    id: "cert2",
    title: "[Certificate Name]",
    organization: "[Issuing Organization]",
    date: "[Month Year]",
    credentialId: undefined,
    credentialUrl: "https://www.example.com/verify/cert2",
    description: "[Brief description]",
    category: "ML/AI",
  },
  {
    id: "cert3",
    title: "[Certificate Name]",
    organization: "[Issuing Organization]",
    date: "[Month Year]",
    description: "[Brief description]",
    category: "Tools",
  },
]
