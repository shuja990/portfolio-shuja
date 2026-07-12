"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useBlobParallax } from "@/lib/use-blob-parallax"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Server, Layout, Cloud, Sparkles, Zap, Lightbulb } from "lucide-react"
import { skillCategories } from "@/data"
import type { SkillCategory } from "@/data"

const categoryIcons: Record<SkillCategory["icon"], React.ReactNode> = {
  code: <Code className="h-7 w-7 text-primary" />,
  layout: <Layout className="h-7 w-7 text-primary" />,
  server: <Server className="h-7 w-7 text-primary" />,
  database: <Database className="h-7 w-7 text-primary" />,
  sparkles: <Sparkles className="h-7 w-7 text-primary" />,
  globe: <Globe className="h-7 w-7 text-primary" />,
  cloud: <Cloud className="h-7 w-7 text-primary" />,
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  useBlobParallax(sectionRef)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="skills"
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      className="py-20 relative overflow-hidden funky-waves"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 opacity-70 z-0"></div>

      <div data-parallax="130" className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div data-parallax="-100" className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            My technical toolkit includes a wide range of languages, frameworks, and technologies that I leverage to
            build robust and scalable applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                rotate: index % 2 === 0 ? 1 : -1,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-none overflow-hidden group rounded-[2rem_0.5rem_2rem_0.5rem]">
                <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-background to-primary/5">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {categoryIcons[category.icon]}
                    </motion.div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: 0.1 + skillIndex * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          rotate: skillIndex % 2 === 0 ? 3 : -3,
                        }}
                      >
                        <div className="bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md">
                          {skill}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

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
          className="absolute bottom-1/4 right-10 text-secondary/30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <Zap size={50} />
        </motion.div>

        <motion.div
          className="absolute top-2/3 left-1/3 text-accent/30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
        >
          <Lightbulb size={30} />
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

