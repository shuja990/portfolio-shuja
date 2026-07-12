import type { SkillCategory, Tech, TechCategory, TechId } from "./types"

/** Accent color per tech category — used by galaxy nodes, legends, and chips */
export const TECH_CATEGORY_COLORS: Record<TechCategory, string> = {
  frontend: "#0d80f2", // primary blue
  backend: "#4763eb", // secondary indigo
  database: "#10b981", // emerald
  ai: "#a855f7", // purple
  payments: "#f59e0b", // amber
  integrations: "#1ac4e6", // accent cyan
  devops: "#f43f5e", // rose
}

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  ai: "AI & Automation",
  payments: "Payments",
  integrations: "Integrations",
  devops: "Cloud & DevOps",
}

function tech(id: TechId, label: string, category: TechCategory, alwaysShow?: boolean): Tech {
  return { id, label, category, color: TECH_CATEGORY_COLORS[category], alwaysShow }
}

/** Single registry of every technology — galaxy nodes and project tags both key into this */
export const TECHS: Record<TechId, Tech> = {
  react: tech("react", "React", "frontend"),
  nextjs: tech("nextjs", "Next.js", "frontend"),
  typescript: tech("typescript", "TypeScript", "frontend"),
  javascript: tech("javascript", "JavaScript", "frontend"),
  tailwind: tech("tailwind", "TailwindCSS", "frontend"),
  nodejs: tech("nodejs", "Node.js", "backend"),
  express: tech("express", "Express.js", "backend"),
  nestjs: tech("nestjs", "NestJS", "backend"),
  graphql: tech("graphql", "GraphQL", "backend"),
  socketio: tech("socketio", "Socket.io", "backend"),
  mongodb: tech("mongodb", "MongoDB", "database"),
  postgresql: tech("postgresql", "PostgreSQL", "database"),
  redis: tech("redis", "Redis", "database"),
  firebase: tech("firebase", "Firebase", "database"),
  ai: tech("ai", "Artificial Intelligence", "ai", true),
  openai: tech("openai", "OpenAI", "ai", true),
  anthropic: tech("anthropic", "Claude", "ai", true),
  gemini: tech("gemini", "Gemini", "ai", true),
  langchain: tech("langchain", "LangChain", "ai", true),
  stripe: tech("stripe", "Stripe", "payments"),
  paypal: tech("paypal", "PayPal", "payments"),
  plaid: tech("plaid", "Plaid", "payments"),
  dwolla: tech("dwolla", "Dwolla", "payments"),
  twilio: tech("twilio", "Twilio", "integrations"),
  cloudinary: tech("cloudinary", "Cloudinary", "integrations"),
  liveblocks: tech("liveblocks", "Liveblocks", "integrations"),
  appwrite: tech("appwrite", "Appwrite", "integrations"),
  aws: tech("aws", "AWS", "devops"),
  docker: tech("docker", "Docker", "devops"),
  "github-actions": tech("github-actions", "GitHub Actions", "devops"),
  playwright: tech("playwright", "Playwright", "ai"),
  puppeteer: tech("puppeteer", "Puppeteer", "ai"),
}

/** Skills grid content — refreshed from the 2026 CV */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "layout",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "TailwindCSS",
      "Shadcn/ui",
      "Redux & Global State",
      "Material UI",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "GraphQL (Apollo)",
      "WebSockets (Socket.io)",
      "RESTful API Design",
    ],
  },
  {
    title: "Databases & Caching",
    icon: "database",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Mongoose", "Firebase Firestore", "Aggregation Pipelines"],
  },
  {
    title: "AI & Automation",
    icon: "sparkles",
    skills: [
      "OpenAI API",
      "Anthropic API",
      "Gemini API",
      "LangChain",
      "RAG Pipelines",
      "Vector Databases",
      "Playwright",
      "Puppeteer",
    ],
  },
  {
    title: "Payments & Integrations",
    icon: "globe",
    skills: [
      "Stripe (Subscriptions, Webhooks)",
      "PayPal",
      "Plaid",
      "Dwolla",
      "Shopify",
      "Cloudinary",
      "Twilio",
      "Google Maps",
    ],
  },
  {
    title: "Cloud, DevOps & Tooling",
    icon: "cloud",
    skills: [
      "AWS (EC2, S3, RDS)",
      "Docker",
      "GitHub Actions",
      "PM2",
      "CI/CD Pipelines",
      "Jest",
      "Postman",
      "Swagger/OpenAPI",
      "GitHub Copilot",
      "Cursor",
      "Claude Code",
    ],
  },
]
