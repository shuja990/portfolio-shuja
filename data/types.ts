export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "payments"
  | "integrations"
  | "devops"

export type TechId =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "nodejs"
  | "express"
  | "nestjs"
  | "graphql"
  | "socketio"
  | "mongodb"
  | "postgresql"
  | "redis"
  | "firebase"
  | "ai"
  | "openai"
  | "anthropic"
  | "gemini"
  | "langchain"
  | "stripe"
  | "paypal"
  | "plaid"
  | "dwolla"
  | "twilio"
  | "cloudinary"
  | "liveblocks"
  | "appwrite"
  | "aws"
  | "docker"
  | "github-actions"
  | "playwright"
  | "puppeteer"

export interface Tech {
  id: TechId
  label: string
  category: TechCategory
  /** accent color used by the tech galaxy nodes and filter chips */
  color: string
  /** show in the galaxy even with no public projects (e.g. client-work-only skills) */
  alwaysShow?: boolean
}

export type ProjectCategory =
  | "AI & Machine Learning"
  | "Finance & Accounting"
  | "Business Tools & Productivity"
  | "E-commerce"
  | "Booking & Events"
  | "Websites & Marketing"
  | "Entertainment & Media"

export interface Project {
  slug: string
  title: string
  description: string
  features: string
  tech: TechId[]
  category: ProjectCategory
  featured?: boolean
  github: string | null
  link: string | null
  image: string | null
}

export interface ExperienceItem {
  title: string
  company: string
  logo: string
  period: string
  bullets: string[]
  skills: string[]
}

export interface SkillCategory {
  title: string
  /** lucide icon key resolved by the Skills component */
  icon: "code" | "layout" | "server" | "database" | "sparkles" | "globe" | "cloud"
  skills: string[]
}

export interface Certification {
  issuer: string
  name: string
}
