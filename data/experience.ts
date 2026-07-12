import type { ExperienceItem } from "./types"

/** Work history — dates and bullets from the 2026 CV */
export const experiences: ExperienceItem[] = [
  {
    title: "Assistant Software Development Manager",
    company: "Ropstam Solutions Inc.",
    logo: "/images/logos/ropstam.png",
    period: "Nov 2024 - Present",
    bullets: [
      "Define data models, API contracts, and service boundaries across 8+ concurrent projects spanning MERN, mobile, and WordPress stacks.",
      "Introduced Redis caching on high-read endpoints across two projects, reducing average response times.",
      "Handle production incidents end-to-end: root cause analysis, fix deployment, and follow-up safeguards to prevent recurrence.",
      "Build critical features personally — payment flows, OpenAI integrations, and complex workflows.",
      "Mentor 30+ engineers via code reviews and pair programming; authored internal standards covering API design, Git workflows, and security practices.",
    ],
    skills: ["System Architecture", "Team Leadership", "Redis Caching", "Incident Response", "Code Reviews"],
  },
  {
    title: "Team Lead – MERN Stack",
    company: "Ropstam Solutions Inc.",
    logo: "/images/logos/ropstam.png",
    period: "Jul 2023 - Nov 2024",
    bullets: [
      "Led a team of 15 engineers with ~60% direct coding contribution, alongside sprint planning and PR reviews.",
      "Built RAG pipelines using LangChain and FAISS/Pinecone for document Q&A; added prompt-level caching to reduce OpenAI API costs by ~30%.",
      "Implemented Socket.io real-time features — chat, notifications, collaborative editing — with Redis pub/sub to support multi-instance deployments.",
      "Provisioned AWS infrastructure (EC2, S3, RDS) with load balancing and auto-scaling; migrated two projects off shared hosting, improving uptime stability.",
      "Migrated two JavaScript codebases to TypeScript and set up CI/CD pipelines covering linting, testing, and automated deploys.",
    ],
    skills: ["MERN Stack", "LangChain & RAG", "Socket.io", "AWS", "TypeScript", "CI/CD"],
  },
  {
    title: "MERN Stack Developer",
    company: "Ropstam Solutions Inc.",
    logo: "/images/logos/ropstam.png",
    period: "Jul 2022 - Jun 2023",
    bullets: [
      "Built production applications end-to-end: API design in Express.js, MongoDB schema design, and React frontend architecture.",
      "Integrated Stripe and PayPal with webhook handling for subscription lifecycle events and idempotency key enforcement.",
      "Optimized MongoDB aggregation queries with compound indexes, reducing execution time from ~4s to under 300ms on key reporting endpoints.",
      "Implemented JWT authentication with refresh token rotation and OAuth2; structured token invalidation to reduce session hijacking exposure.",
      "Diagnosed and resolved Node.js memory leaks.",
    ],
    skills: ["React", "Node.js", "MongoDB", "Express", "Stripe", "OAuth2"],
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Fiverr / Upwork",
    logo: "/images/logos/fiverr.png",
    period: "Apr 2020 - Present",
    bullets: [
      "Delivered custom web applications for international clients across fintech, SaaS, and e-commerce verticals.",
      "Built AI-powered tools including document editors with inline GPT suggestions and real-time collaboration via WebSockets.",
      "Managed full deployment lifecycle independently on AWS and DigitalOcean.",
    ],
    skills: ["Full Stack Development", "AI Integrations", "AWS", "Client Management"],
  },
]
