"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "Full Stack Developer"
  const typingSpeed = 100

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Shuja Ali</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 h-8">
              {typedText}
              <span className="animate-pulse">|</span>
            </h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl">
              Innovative Full Stack Developer with extensive experience in MERN stack and Next.js. Proven track record
              in designing and implementing robust backend solutions, developing interactive and scalable web
              applications, and leading development teams.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://github.com/shuja990"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/shujaali7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a href="mailto:shujaali1234@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4D03AQGU1MwmuiwxPg/profile-displayphoto-shrink_800_800/B4DZO8nQnAGUAk-/0/1734036230399?e=1748476800&v=beta&t=XtxFX1n18lqBuMkaQIs2r9Ogm2LSpsZRxD8rHs4CLdM"
                alt="Shuja Ali"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <a href="#about" className="flex flex-col items-center">
            <span className="text-sm text-foreground/60 mb-2">Scroll Down</span>
            <ArrowDown className="text-primary" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

