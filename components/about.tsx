"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer with a focus on creating innovative and scalable web solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
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
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Full Stack Development
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Digital Transformation
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Web Solutions
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Computer Software
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Education & Certifications</h3>

            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src="https://media.licdn.com/dms/image/v2/C510BAQEaocAMS5PVuw/company-logo_400_400/company-logo_400_400/0/1631438106544/comsats_university_logo?e=1748476800&v=beta&t=rAwm94uKaCWUYxLa4v7ZtyFY7m4TVceA_m-qMywq9m0"
                      alt="COMSATS University"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Bachelor's in Computer Software Engineering</h4>
                    <p className="text-sm text-foreground/70">COMSATS University Islamabad</p>
                    <p className="text-sm text-foreground/70">2018 - 2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h4 className="font-semibold mb-3">Certifications</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coursera</Badge>
                <span className="text-sm">Python Project for Data Engineering</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coursera</Badge>
                <span className="text-sm">Python for Applied Data Science and AI</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">LinkedIn</Badge>
                <span className="text-sm">Node.js Essential Training</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Udemy</Badge>
                <span className="text-sm">The Complete Web Developer in 2020: Zero to Mastery</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

