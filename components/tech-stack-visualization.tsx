"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Server, Globe, Layout, Cloud, Sparkles, Zap, Cpu, Workflow } from "lucide-react"

interface TechItem {
  name: string
  category: string
  proficiency: number // 0-100
  icon: JSX.Element
  color: string
}

const techStack: TechItem[] = [
  // Frontend
  { name: "React", category: "Frontend", proficiency: 95, icon: <Layout />, color: "text-blue-500" },
  { name: "Next.js", category: "Frontend", proficiency: 90, icon: <Layout />, color: "text-gray-800" },
  { name: "TypeScript", category: "Frontend", proficiency: 85, icon: <Code />, color: "text-blue-600" },
  { name: "TailwindCSS", category: "Frontend", proficiency: 90, icon: <Layout />, color: "text-cyan-500" },
  { name: "Material UI", category: "Frontend", proficiency: 80, icon: <Layout />, color: "text-blue-400" },
  { name: "Redux", category: "Frontend", proficiency: 85, icon: <Workflow />, color: "text-purple-600" },

  // Backend
  { name: "Node.js", category: "Backend", proficiency: 90, icon: <Server />, color: "text-green-600" },
  { name: "Express", category: "Backend", proficiency: 90, icon: <Server />, color: "text-gray-600" },
  { name: "NestJS", category: "Backend", proficiency: 75, icon: <Server />, color: "text-red-600" },
  { name: "GraphQL", category: "Backend", proficiency: 80, icon: <Workflow />, color: "text-pink-600" },
  { name: "Socket.io", category: "Backend", proficiency: 85, icon: <Zap />, color: "text-gray-800" },

  // Databases
  { name: "MongoDB", category: "Databases", proficiency: 90, icon: <Database />, color: "text-green-700" },
  { name: "PostgreSQL", category: "Databases", proficiency: 85, icon: <Database />, color: "text-blue-700" },
  { name: "Firebase", category: "Databases", proficiency: 80, icon: <Database />, color: "text-yellow-600" },
  { name: "Redis", category: "Databases", proficiency: 75, icon: <Database />, color: "text-red-500" },

  // DevOps
  { name: "Docker", category: "DevOps", proficiency: 80, icon: <Cloud />, color: "text-blue-500" },
  { name: "AWS", category: "DevOps", proficiency: 75, icon: <Cloud />, color: "text-yellow-500" },
  { name: "CI/CD", category: "DevOps", proficiency: 85, icon: <Workflow />, color: "text-green-500" },
  { name: "Git", category: "DevOps", proficiency: 95, icon: <Workflow />, color: "text-orange-600" },

  // APIs & Tools
  { name: "REST API", category: "APIs & Tools", proficiency: 95, icon: <Globe />, color: "text-blue-600" },
  { name: "Stripe", category: "APIs & Tools", proficiency: 85, icon: <Globe />, color: "text-purple-500" },
  { name: "OpenAI", category: "APIs & Tools", proficiency: 80, icon: <Sparkles />, color: "text-green-600" },
  { name: "Shopify", category: "APIs & Tools", proficiency: 75, icon: <Globe />, color: "text-green-500" },
]

const categories = Array.from(new Set(techStack.map((tech) => tech.category)))

const TechStackVisualization = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [filteredTech, setFilteredTech] = useState<TechItem[]>(techStack)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (inView) {
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [inView])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredTech(techStack)
    } else {
      setFilteredTech(techStack.filter((tech) => tech.category === selectedCategory))
    }
  }, [selectedCategory])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Layout className="h-5 w-5" />
      case "Backend":
        return <Server className="h-5 w-5" />
      case "Databases":
        return <Database className="h-5 w-5" />
      case "DevOps":
        return <Cloud className="h-5 w-5" />
      case "APIs & Tools":
        return <Globe className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
    }
  }

  return (
    <section id="tech-stack" ref={ref} className="py-20 relative overflow-hidden funky-grid">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 opacity-70 z-0"></div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-30"
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 animate-text-shimmer">
            <span className="relative inline-block">
              Tech Stack Proficiency
              <motion.span
                className="absolute -top-6 -right-6"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Cpu className="h-6 w-6 text-accent" />
              </motion.span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            An interactive visualization of my technical skills and proficiency levels
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("All")}
          >
            <Badge
              variant={selectedCategory === "All" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-base ${
                selectedCategory === "All" ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10"
              }`}
            >
              All
            </Badge>
          </motion.div>

          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
            >
              <Badge
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-base flex items-center gap-  : "outline"}
                className={\`cursor-pointer px-4 py-2 text-base flex items-center gap-2`}
              >
                {getCategoryIcon(category)}
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView && !isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 1 : -1 }}
            >
              <Card className="h-full border-none overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full bg-gradient-to-br from-background to-primary/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-primary/10 ${tech.color}`}>{tech.icon}</div>
                    <h3 className="text-lg font-medium">{tech.name}</h3>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground/70">Proficiency</span>
                      <span className="text-sm font-medium">{tech.proficiency}%</span>
                    </div>

                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                      {isLoading ? (
                        <div className="h-full bg-primary/30 animate-pulse rounded-full"></div>
                      ) : (
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.proficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackVisualization

