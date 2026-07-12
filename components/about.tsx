"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useBlobParallax } from "@/lib/use-blob-parallax"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Terminal } from "lucide-react"
import { site, certifications } from "@/data"

const badgeStyles = [
  "bg-primary/10 text-primary border-primary/20",
  "bg-secondary/10 text-secondary border-secondary/20",
  "bg-accent/10 text-accent border-accent/20",
  "bg-primary/10 text-primary border-primary/20",
]

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  useBlobParallax(sectionRef)

  return (
    <section
      id="about"
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      className="py-20 bg-muted/30 relative overflow-hidden tech-circuit"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-70 z-0"></div>

      <div data-parallax="140" className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div data-parallax="-110" className="absolute bottom-40 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
            <span className="relative inline-block">
              {/* clip only the text: positioned children inside a
                  background-clip:text element stop the text painting */}
              <span className="animate-text-shimmer">About Me</span>
              <Code className="absolute -top-6 -right-6 h-6 w-6 text-accent" />
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            I'm a passionate {site.role.replace(" · ", " and ")} with a focus on creating innovative and scalable web
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="glass p-6 rounded-lg"
          >
            <h3 className="text-2xl font-orbitron font-semibold mb-4 gradient-text flex items-center">
              <Terminal className="mr-2 h-5 w-5" />
              Who I Am
            </h3>
            <p className="text-foreground/80 mb-6">{site.about.p1}</p>
            <p className="text-foreground/80 mb-6">{site.about.p2}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {site.about.badges.map((badge, index) => (
                <motion.div key={badge} whileHover={{ scale: 1.1 }}>
                  <Badge variant="outline" className={`${badgeStyles[index % badgeStyles.length]} rounded-lg px-3 py-1`}>
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="glass p-6 rounded-lg"
          >
            <h3 className="text-2xl font-orbitron font-semibold mb-4 gradient-text flex items-center">
              <Code className="mr-2 h-5 w-5" />
              Education & Certifications
            </h3>

            <motion.div whileHover={{ scale: 1.03 }}>
              <Card className="mb-4 border-none overflow-hidden rounded-lg">
                <CardContent className="pt-6 bg-gradient-to-br from-background to-primary/5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img src={site.education.logo} alt={site.education.school} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold gradient-text font-orbitron">{site.education.degree}</h4>
                      <p className="text-sm text-foreground/70">{site.education.school}</p>
                      <p className="text-sm text-foreground/70">{site.education.period}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <h4 className="font-semibold mb-3 gradient-text font-orbitron">Certifications</h4>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <motion.li key={cert.name} className="flex items-center gap-2" whileHover={{ x: 5, scale: 1.02 }}>
                  <Badge variant="secondary" className="rounded-lg bg-secondary/20 text-secondary-foreground">
                    {cert.issuer}
                  </Badge>
                  <span className="text-sm">{cert.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

