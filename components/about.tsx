"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Terminal } from "lucide-react"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30 relative overflow-hidden tech-circuit">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-70 z-0"></div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -30, 0],
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
              About Me
              <Code className="absolute -top-6 -right-6 h-6 w-6 text-accent" />
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer with a focus on creating innovative and scalable web solutions.
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
            <p className="text-foreground/80 mb-6">
              Innovative Full Stack Developer with extensive experience in MERN stack and Next.js. I have a proven track
              record in designing and implementing robust backend solutions, developing interactive and scalable web
              applications, and leading development teams.
            </p>
            <p className="text-foreground/80 mb-6">
              I'm adept at integrating APIs, managing data, and leveraging cutting-edge technologies including AI and
              machine learning to drive business solutions. My experience includes successful project deliveries and
              freelance work, combining technical proficiency with a keen understanding of client needs.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 rounded-lg px-3 py-1">
                  Full Stack Development
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-secondary/20 rounded-lg px-3 py-1"
                >
                  Digital Transformation
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 rounded-lg px-3 py-1">
                  Web Solutions
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 rounded-lg px-3 py-1">
                  Computer Software
                </Badge>
              </motion.div>
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
                      <img
                        src="https://media.licdn.com/dms/image/v2/C510BAQEaocAMS5PVuw/company-logo_400_400/company-logo_400_400/0/1631438106544/comsats_university_logo?e=1748476800&v=beta&t=rAwm94uKaCWUYxLa4v7ZtyFY7m4TVceA_m-qMywq9m0"
                        alt="COMSATS University"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold gradient-text font-orbitron">
                        Bachelor's in Computer Software Engineering
                      </h4>
                      <p className="text-sm text-foreground/70">COMSATS University Islamabad</p>
                      <p className="text-sm text-foreground/70">2018 - 2022</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <h4 className="font-semibold mb-3 gradient-text font-orbitron">Certifications</h4>
            <ul className="space-y-2">
              <motion.li className="flex items-center gap-2" whileHover={{ x: 5, scale: 1.02 }}>
                <Badge variant="secondary" className="rounded-lg bg-secondary/20 text-secondary-foreground">
                  Coursera
                </Badge>
                <span className="text-sm">Python Project for Data Engineering</span>
              </motion.li>
              <motion.li className="flex items-center gap-2" whileHover={{ x: 5, scale: 1.02 }}>
                <Badge variant="secondary" className="rounded-lg bg-secondary/20 text-secondary-foreground">
                  Coursera
                </Badge>
                <span className="text-sm">Python for Applied Data Science and AI</span>
              </motion.li>
              <motion.li className="flex items-center gap-2" whileHover={{ x: 5, scale: 1.02 }}>
                <Badge variant="secondary" className="rounded-lg bg-secondary/20 text-secondary-foreground">
                  LinkedIn
                </Badge>
                <span className="text-sm">Node.js Essential Training</span>
              </motion.li>
              <motion.li className="flex items-center gap-2" whileHover={{ x: 5, scale: 1.02 }}>
                <Badge variant="secondary" className="rounded-lg bg-secondary/20 text-secondary-foreground">
                  Udemy
                </Badge>
                <span className="text-sm">The Complete Web Developer in 2020: Zero to Mastery</span>
              </motion.li>
              <motion.li className="flex items-center gap-2" whileHover={{ x: 5, scale: 1.02 }}>
                <Badge variant="secondary" className="rounded-lg bg-secondary/20 text-secondary-foreground">
                  Google
                </Badge>
                <span className="text-sm">Fundamentals of Digital Marketing</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

