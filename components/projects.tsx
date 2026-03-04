"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter, Sparkles, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

// Project data — curated selection of strongest work
const projectsData = [
  {
    title: "Moc Interview",
    description:
      "AI-powered mock interview platform with real-time video recording and audio transcription.",
    metrics: "Reduced feedback latency to <2s. Handled cross-browser transcoding for 3+ major browsers.",
    features:
      "Video recording, FFmpeg transcoding, Whisper transcription, GPT-3.5-turbo feedback, edge streaming",
    techStack: ["Next.js", "OpenAI", "FFmpeg", "Vercel Edge"],
    github: "https://github.com/shuja990/moc-interview",
    image: "/portfolio/project 44.png",
    link: "https://moc-interview.vercel.app/",
    category: "AI & Machine Learning",
    projectType: "independent",
  },
  {
    title: "Documents Editor",
    description:
      "Real-time collaborative document editor with live cursors, concurrent editing, and user invitations.",
    metrics: "Supported 50+ concurrent editors per document without input lag via WebSocket diffing.",
    features:
      "Real-time collaboration, live cursors, document sharing, invite system, Clerk auth",
    techStack: ["Next.js", "Liveblocks", "Clerk", "MongoDB"],
    github: "https://github.com/shuja990/documents-editor",
    image: "/portfolio/project 3 editing.png",
    link: "https://documentseditor.devmations.com/",
    category: "Business Tools & Productivity",
    projectType: "exploration",
  },
  {
    title: "Backdrop AI",
    description:
      "AI image editing tool with Generative Fill, Image Restore, and Object Removal features.",
    metrics: "Automated image processing for 1000+ assets with <500ms average response time.",
    features:
      "Generative fill, image restore, object removal, object recolor, Cloudinary AI, auth",
    techStack: ["Next.js", "Cloudinary AI", "Clerk", "MongoDB"],
    github: null,
    image: "/portfolio/backdrop ai project 8.png",
    link: "https://backdrop-ai.devmations.com/",
    category: "AI & Machine Learning",
    projectType: "exploration",
  },
  {
    title: "Podcast AI",
    description:
      "AI podcast platform where users create podcasts from text prompts, generate thumbnails, and stream audio. Integrates OpenAI for text-to-speech and image generation with full profile management.",
    features:
      "Text-to-podcast, AI thumbnail generation, OpenAI integration, audio streaming, profile management",
    techStack: ["Next.js", "OpenAI", "Convex", "Clerk"],
    github: "https://github.com/shuja990/podcast-ai",
    image: "/portfolio/project 6 podcaster ai.png",
    link: "https://podcast-ai.devmations.com/",
    category: "AI & Machine Learning",
    projectType: "exploration",
  },
  {
    title: "FinanceFlow",
    description:
      "Personal finance management app with bank account linking via Plaid, fund transfers through Dwolla, and a transaction dashboard. Demonstrates secure handling of financial APIs and PII data.",
    features:
      "Plaid bank linking, Dwolla transfers, transaction history, financial dashboard",
    techStack: ["Next.js", "Plaid", "Dwolla", "Appwrite"],
    github: null,
    image: "/portfolio/Bank Website Project 1.png",
    link: "https://securebank.devmations.com/",
    category: "Finance & Fintech",
    projectType: "exploration",
  },
  {
    title: "Healthcare App",
    description:
      "Patient management system with appointment booking, admin dashboard for doctor assignment, and SMS notifications via Twilio. Uses Appwrite for backend services and file storage.",
    features:
      "Appointment scheduling, admin panel, doctor management, Twilio SMS, patient profiles",
    techStack: ["Next.js", "Appwrite", "Twilio", "TypeScript"],
    github: null,
    image: "/portfolio/project 9 care plus.png",
    link: "https://healthcare.devmations.com/",
    category: "Business Tools & Productivity",
    projectType: "exploration",
  },
  {
    title: "PriceWatch",
    description:
      "Amazon product price tracker that scrapes product pages, stores historical pricing data, and sends email alerts when prices drop. Automated with cron jobs for periodic scraping.",
    features:
      "Web scraping, price history tracking, email alerts, cron-based automation",
    techStack: ["Next.js", "MongoDB", "Cheerio", "Nodemailer"],
    github: null,
    image: "/portfolio/price watch project 11.png",
    link: "https://pricewatch.devmations.com/",
    category: "Business Tools & Productivity",
    projectType: "independent",
  },
  {
    title: "Events App",
    description:
      "Event management platform with Stripe payment integration for ticket purchases, event creation with image uploads, and category-based browsing. Full CRUD with role-based access.",
    features:
      "Stripe payments, event CRUD, image uploads, category filtering, auth",
    techStack: ["Next.js", "Stripe", "MongoDB", "Clerk"],
    github: null,
    image: "/portfolio/poject 5 evently.png",
    link: "https://events.devmations.com/",
    category: "E-commerce & Payments",
    projectType: "exploration",
  },
  {
    title: "Glam Shack",
    description:
      "Full-stack e-commerce store with product catalog, category navigation, cart management, and payment processing. Server-side rendered with Next.js for SEO and performance.",
    features:
      "Product catalog, cart system, checkout flow, category filters, SSR",
    techStack: ["Next.js", "MongoDB", "Express", "Stripe"],
    github: "https://github.com/shuja990/glam-shack",
    image: "/portfolio/shoplify project 45.png",
    link: "https://glam-shackk.vercel.app/",
    category: "E-commerce & Payments",
    projectType: "independent",
  },
  {
    title: "Devmations AI",
    description:
      "AI chatbot powered by Google Gemini API with streaming responses, conversation history, and a ChatGPT-style interface. Demonstrates real-time AI API integration with clean UX.",
    features:
      "Gemini API integration, streaming responses, chat history, responsive UI",
    techStack: ["Next.js", "Google Gemini", "TypeScript"],
    github: null,
    image: "/portfolio/project 4 ai chat boot.png",
    link: "https://ai.devmations.com/",
    category: "AI & Machine Learning",
    projectType: "independent",
  },
  {
    title: "SmartFormBot",
    description:
      "Browser automation tool for structured form data extraction. Handles conditional form logic, dynamic field detection, and CAPTCHA via Playwright's browser context management. Configurable via JSON schema so non-engineers can define new form targets without code changes.",
    features:
      "Form automation, conditional logic, dynamic field detection, JSON schema config, browser context management",
    techStack: ["Node.js", "Playwright", "Puppeteer", "TypeScript"],
    github: null,
    image: "/placeholder.svg",
    link: null,
    category: "Business Tools & Productivity",
    projectType: "independent",
  },
]

// Get unique categories
const categories = [
  "All",
  ...new Set(projectsData.map((project) => project.category)),
]

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [visibleProjects, setVisibleProjects] = useState(6) // Initially show 6 projects

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter((project) => project.category === selectedCategory))
    }
    // Reset visible projects when category changes
    setVisibleProjects(6)
  }, [selectedCategory])

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 3) // Load 3 more projects
  }

  const hasMoreProjects = visibleProjects < filteredProjects.length

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden funky-lines">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0"></div>

      <motion.div
        className="absolute top-40 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            <span className="relative inline-block">
              Featured Projects
              <motion.span
                className="absolute -top-6 -right-6"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="h-6 w-6 text-accent" />
              </motion.span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            A selection of my recent work showcasing my skills and expertise.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full px-6 border-primary/30 hover:border-primary"
              >
                <Filter size={16} />
                Filter by Category: {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl border-primary/20">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary/10 rounded-lg" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                rotate: index % 2 === 0 ? 1 : -1,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden rounded-[1.5rem_0.5rem] border-primary/20">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={project.image || "/placeholder.svg?height=300&width=500"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60 mix-blend-overlay" />
                </div>
                <CardContent className="flex-grow p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1 bg-secondary/20 dark:bg-secondary/30 text-secondary-foreground"
                    >
                      {project.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-1 text-xs ${
                        project.projectType === "production"
                          ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                          : project.projectType === "independent"
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-muted border-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      {project.projectType === "production"
                        ? "Production / Client Work"
                        : project.projectType === "independent"
                        ? "Independent Build"
                        : "Technical Exploration"}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 gradient-text">{project.title}</h3>
                  <p className="text-foreground/80 mb-3 text-sm line-clamp-2">{project.description}</p>
                  {project.metrics && (
                    <div className="mb-4 bg-primary/10 border border-primary/20 rounded-md p-3">
                      <p className="text-xs font-semibold text-primary mb-1">Impact & Architecture</p>
                      <p className="text-xs text-foreground/80">{project.metrics}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="bg-primary/10 dark:bg-primary/20 dark:border-primary/30 rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-4">
                  {project.link ? (
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-md hover:shadow-primary/25 transition-all text-primary-foreground font-medium"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      disabled
                      className="flex-1 rounded-full bg-muted text-muted-foreground font-medium cursor-not-allowed"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Private / NDA
                    </Button>
                  )}
                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="flex-1 rounded-full hover:bg-primary/10 transition-colors">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMoreProjects}
              variant="outline"
              size="lg"
              className="px-8 py-6 h-auto rounded-full text-base font-medium hover:bg-primary/10 border-primary/30 hover:border-primary"
            >
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

