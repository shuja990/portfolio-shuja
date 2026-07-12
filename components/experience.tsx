"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Sparkles, Zap } from "lucide-react"
import { experiences } from "@/data"
import { gsap, useGSAP } from "@/lib/gsap"

const Experience = () => {
  const containerRef = useRef<HTMLElement>(null)

  // GSAP owns this section's scroll choreography: the timeline line draws as you
  // scroll (scrub) and each role card slides in from its side of the line.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".exp-header", {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-header", start: "top 85%" },
        })

        gsap.utils.toArray<HTMLElement>(".exp-line").forEach((line) => {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 1,
            },
          })
        })

        gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
          const fromRight = card.classList.contains("exp-card-right")
          gsap.from(card, {
            x: fromRight ? 80 : -80,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          })
        })

        gsap.utils.toArray<HTMLElement>(".exp-dot").forEach((dot) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: dot, start: "top 88%" },
          })
        })

        // Decorative blobs drift on scroll instead of looping on the CPU
        gsap.to(".exp-blob-1", {
          y: 140,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true },
        })
        gsap.to(".exp-blob-2", {
          y: -120,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true },
        })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".exp-header", ".exp-line", ".exp-card", ".exp-dot"], { clearProps: "all" })
      })
    },
    { scope: containerRef },
  )

  return (
    <section id="experience" ref={containerRef} className="py-20 relative overflow-hidden funky-dots">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0"></div>

      <div className="exp-blob-1 absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="exp-blob-2 absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="exp-header text-center mb-16">
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
        </div>

        {/* Mobile / tablet timeline (single column) */}
        <div className="lg:hidden relative pl-12">
          {/* Vertical timeline line */}
          <div className="exp-line absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {experiences.map((exp) => (
            <motion.div
              key={exp.title}
              className="exp-card exp-card-left mb-12 relative"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {/* Timeline dot — card sits 48px in (pl-12), line center is at 10px,
                  so pull the dot 38px left of the card to land on the line */}
              <div className="absolute -left-[38px] top-10 transform -translate-x-1/2 z-20">
                <motion.div
                  className="exp-dot w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 flex items-center justify-center"
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
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white p-2 shadow-md"
                      whileHover={{ rotate: 10 }}
                    >
                      <img src={exp.logo || "/placeholder.svg"} alt={exp.company} className="w-full h-full object-contain" />
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
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="text-foreground/80 leading-relaxed flex gap-2 text-sm">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <motion.div key={skill} whileHover={{ scale: 1.1, rotate: skillIndex % 2 === 0 ? 3 : -3 }}>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 hover:bg-primary/20 transition-colors border-primary/20 px-3 py-1 text-sm rounded-full"
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

        {/* Desktop timeline (alternating two-column, lg+) */}
        <div className="hidden lg:block relative">
          {/* Timeline line - visible on desktop only */}
          <div className="exp-line absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
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
                  className="exp-dot w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="h-4 w-4 text-white" />
                </motion.div>
              </div>

              {/* Content card */}
              <div
                className={`exp-card w-5/12 ${
                  index % 2 === 0 ? "exp-card-right mr-8 lg:mr-12" : "exp-card-left ml-8 lg:ml-12"
                }`}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5 group rounded-[2rem_0.5rem] even:rounded-[0.5rem_2rem] odd:rounded-[2rem_0.5rem]">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <motion.div
                        className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white p-2 shadow-md"
                        whileHover={{ rotate: 10 }}
                      >
                        <img
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          className="w-full h-full object-contain"
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
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="text-foreground/80 leading-relaxed flex gap-2 text-sm">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <motion.div key={skill} whileHover={{ scale: 1.1, rotate: skillIndex % 2 === 0 ? 3 : -3 }}>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 hover:bg-primary/20 transition-colors border-primary/20 px-3 py-1 text-sm rounded-full"
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
