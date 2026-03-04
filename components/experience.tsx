"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Sparkles, Zap, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    title: "Assistant Software Development Manager",
    company: "Ropstam Solutions Inc.",
    logo: "/portfolio/ropstam-logo.png",
    period: "Nov 2024 – Present",
    achievements: [
      "Define data models, API contracts, and service boundaries across 8+ concurrent projects spanning MERN, mobile, and WordPress stacks.",
      "Introduced Redis caching on high-read endpoints, cutting average response times by ~40% on frequently hit routes.",
      "Mentor 30+ engineers via code reviews and pair programming; authored internal standards covering API design, Git workflows, and security practices.",
      "Handle production incidents end-to-end — root cause analysis, fix deployment, and follow-up safeguards to prevent recurrence.",
      "Build critical features personally (payment flows, OpenAI integrations, complex workflows) where senior-level depth is required.",
    ],
    skills: ["Team Leadership", "System Architecture", "MERN Stack", "Redis", "OpenAI", "Next.js"],
  },
  {
    title: "Team Lead – MERN Stack",
    company: "Ropstam Solutions Inc.",
    logo: "/portfolio/ropstam-logo.png",
    period: "Jul 2023 – Nov 2024",
    achievements: [
      "Led a team of 15 engineers with ~60% direct coding contribution, alongside sprint planning and PR reviews.",
      "Built RAG pipelines using LangChain and FAISS/Pinecone for document Q&A; added prompt-level caching to reduce OpenAI API costs by ~30%.",
      "Implemented Socket.io real-time features (chat, notifications, collaborative editing) with Redis pub/sub for multi-instance deployments.",
      "Provisioned AWS infrastructure (EC2, S3, RDS) with load balancing and auto-scaling; migrated two projects off shared hosting.",
      "Set up BitBucket CI/CD pipelines covering linting, testing, and automated deploys to staging and production.",
    ],
    skills: ["Team Leadership", "LangChain", "RAG", "AWS", "Socket.io", "CI/CD", "TypeScript"],
  },
  {
    title: "MERN Stack Developer",
    company: "Ropstam Solutions Inc.",
    logo: "/portfolio/ropstam-logo.png",
    period: "Jul 2022 – Jun 2023",
    achievements: [
      "Built production applications end-to-end: API design in Express, MongoDB schema design, and React frontend architecture.",
      "Integrated Stripe and PayPal with webhook handling for subscription lifecycle events and idempotency key enforcement.",
      "Optimized MongoDB aggregation queries with compound indexes; reduced execution time from ~4s to under 300ms on key reporting endpoints.",
      "Implemented JWT auth with refresh token rotation and OAuth2; structured token invalidation to reduce session hijacking exposure.",
      "Diagnosed and resolved Node.js memory leaks by profiling heap usage and identifying event listener accumulation.",
    ],
    skills: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT Auth"],
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Fiverr / Upwork",
    logo: "/portfolio/freelance-logo.svg",
    period: "Apr 2020 – Present",
    achievements: [
      "Delivered custom web applications for international clients across fintech, SaaS, and e-commerce — zero project cancellations.",
      "Built AI-powered tools including document editors with inline GPT suggestions and real-time collaboration via WebSockets.",
      "Managed full deployment lifecycle independently on AWS and DigitalOcean.",
    ],
    skills: ["Full Stack", "AWS", "DigitalOcean", "AI Tools", "WebSockets"],
  },
]

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden funky-dots">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0"></div>

      <motion.div
        className="absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            <span className="relative inline-block">
              Work Experience
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
            My professional journey in software development and leadership roles.
          </p>
        </motion.div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative pl-12">
          {/* Vertical timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="mb-12 relative"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-10 transform -translate-x-1/2 z-20">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="h-4 w-4 text-white" />
                </motion.div>
              </div>

              {/* Content card */}
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5 group rounded-[1rem_0.5rem]">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white p-2 shadow-md relative"
                      whileHover={{ rotate: 10 }}
                    >
                      <Image
                        src={exp.logo || "/placeholder.svg"}
                        alt={exp.company}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors gradient-text">
                        {exp.title}
                      </h3>
                      <p className="text-foreground/70">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5 text-sm bg-primary/10 w-fit px-3 py-1.5 rounded-full">
                    <Calendar size={14} className="text-primary" />
                    <span className="font-medium">{exp.period}</span>
                  </div>

                  <ul className="mb-6 space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/80 leading-relaxed text-sm">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <motion.div key={skillIndex} whileHover={{ scale: 1.1, rotate: skillIndex % 2 === 0 ? 3 : -3 }}>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors border-primary/20 px-3 py-1 text-sm rounded-full"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline line - visible on desktop only */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`mb-16 relative flex ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
              whileHover={{
                scale: 1.02,
                rotate: index % 2 === 0 ? 1 : -1,
                transition: { duration: 0.2 },
              }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-10 z-20">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="h-4 w-4 text-white" />
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? "mr-8 lg:mr-12" : "ml-8 lg:ml-12"}`}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5 group rounded-[2rem_0.5rem] even:rounded-[0.5rem_2rem] odd:rounded-[2rem_0.5rem]">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <motion.div
                        className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white p-2 shadow-md relative"
                        whileHover={{ rotate: 10 }}
                      >
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors gradient-text">
                          {exp.title}
                        </h3>
                        <p className="text-foreground/70">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-5 text-sm bg-primary/10 w-fit px-3 py-1.5 rounded-full">
                      <Calendar size={14} className="text-primary" />
                      <span className="font-medium">{exp.period}</span>
                    </div>

                    <ul className="mb-6 space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-foreground/80 leading-relaxed text-sm">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <motion.div key={skillIndex} whileHover={{ scale: 1.1, rotate: skillIndex % 2 === 0 ? 3 : -3 }}>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors border-primary/20 px-3 py-1 text-sm rounded-full"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating icons */}
        <motion.div
          className="absolute top-1/4 left-10 text-primary/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-10 text-accent/30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <Zap size={50} />
        </motion.div>
      </div>
    </section>
  )
}

export default Experience

