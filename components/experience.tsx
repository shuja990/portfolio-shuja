"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Assistant Software Development Manager",
    company: "Ropstam Solutions Inc.",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFxM9EIyHT4FQ/company-logo_400_400/company-logo_400_400/0/1652215827771/ropstam_logo?e=1748476800&v=beta&t=FfC7w_Yu4cAAwB9PvKPYUbs3rMGALUE_hY5a1wMvMek",
    period: "Dec 24 - Present",
    description:
      "Leading development teams and overseeing project implementations. Designing and implementing robust backend solutions and scalable web applications.",
    skills: ["Team Leadership", "Project Management", "Full Stack Development", "MERN Stack", "Next.js"],
  },
  {
    title: "Team Lead MERN",
    company: "Ropstam Solutions Inc.",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFxM9EIyHT4FQ/company-logo_400_400/company-logo_400_400/0/1652215827771/ropstam_logo?e=1748476800&v=beta&t=FfC7w_Yu4cAAwB9PvKPYUbs3rMGALUE_hY5a1wMvMek",
    period: "Jun 23 - Dec 24",
    description:
      "Led a team of developers working on MERN stack projects. Ensured code quality, mentored junior developers, and coordinated with clients.",
    skills: ["Team Leadership", "MERN Stack", "Code Reviews", "Client Communication"],
  },
  {
    title: "MERN Stack Developer",
    company: "Ropstam Solutions Inc.",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFxM9EIyHT4FQ/company-logo_400_400/company-logo_400_400/0/1652215827771/ropstam_logo?e=1748476800&v=beta&t=FfC7w_Yu4cAAwB9PvKPYUbs3rMGALUE_hY5a1wMvMek",
    period: "Jul 22 - Jun 23",
    description:
      "Developed and maintained web applications using the MERN stack. Implemented responsive designs and integrated third-party APIs.",
    skills: ["React", "Node.js", "MongoDB", "Express", "API Integration"],
  },
  {
    title: "Freelance Web Developer",
    company: "Freelance",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFHz9agyy675A/company-logo_400_400/company-logo_400_400/0/1635337455615/fiverr_com_logo?e=1748476800&v=beta&t=HbDAfCf9HP581MNcm_Mlaww1Biuth3vm8iOUtt0zPUc",
    period: "Apr 20 - Present",
    description:
      "Delivered custom web solutions for clients worldwide. Specialized in e-commerce websites, dashboards, and interactive web applications.",
    skills: ["Web Development", "Client Management", "E-commerce", "Custom Solutions"],
  },
]

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-background/80 z-0"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            My professional journey in software development and leadership roles.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line - visible on all screen sizes */}
          <div className="absolute left-16 sm:left-24 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`mb-12 md:mb-16 relative flex ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              {/* Timeline dot and connector */}
              <div className="absolute left-16 sm:left-24 md:left-1/2 transform md:-translate-x-1/2 top-10 z-20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary/70 shadow-lg shadow-primary/20 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                {/* Connector line to card - visible on mobile only */}
                <div className="md:hidden h-10 w-1 bg-gradient-to-b from-primary to-primary/10 absolute top-8 left-1/2 transform -translate-x-1/2"></div>
              </div>

              {/* Content card */}
              <div
                className={`ml-28 sm:ml-36 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? "md:mr-8 lg:mr-12" : "md:ml-8 lg:ml-12"
                }`}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5 group">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white p-2 shadow-md">
                        <img
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-foreground/70">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-5 text-sm bg-primary/10 w-fit px-3 py-1.5 rounded-full">
                      <Calendar size={14} className="text-primary" />
                      <span className="font-medium">{exp.period}</span>
                    </div>

                    <p className="mb-6 text-foreground/80 leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="bg-primary/10 hover:bg-primary/20 transition-colors border-primary/20 px-3 py-1 text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

