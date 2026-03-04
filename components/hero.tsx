"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Code, Terminal, FileText } from "lucide-react"
import Image from "next/image"

const RESUME_PATH = "/Shuja%20Ali%20-%20Tech%20Lead%20-%20Full%20Stack%20Developer.pdf"

// Scroll progress indicator component
const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (window.scrollY / totalHeight) * 100
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </div>
  )
}

const roles = [
  "Technical Lead",
  "Senior Full Stack Developer",
  "MERN Stack Engineer",
  "AI Integration Specialist",
]

// Tech badges that float around the profile image on desktop
const techBadges = [
  { label: "React.js", top: "6%", left: "0%", delay: 0, duration: 5 },
  { label: "Next.js", top: "0%", left: "55%", delay: 0.8, duration: 6 },
  { label: "Node.js", top: "18%", left: "88%", delay: 1.5, duration: 5.5 },
  { label: "OpenAI", top: "62%", left: "90%", delay: 0.4, duration: 7 },
  { label: "TypeScript", top: "82%", left: "60%", delay: 1.2, duration: 6 },
  { label: "MongoDB", top: "88%", left: "5%", delay: 0.6, duration: 5 },
  { label: "AWS", top: "70%", left: "-2%", delay: 1.8, duration: 6.5 },
  { label: "LangChain", top: "36%", left: "92%", delay: 1.0, duration: 5.8 },
]

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Cycling typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 45 : 90
    const pauseDelay = !isDeleting && typedText === currentRole ? 1800 : typingSpeed

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setIsDeleting(true)
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      } else {
        setTypedText(
          isDeleting
            ? currentRole.slice(0, typedText.length - 1)
            : currentRole.slice(0, typedText.length + 1)
        )
      }
    }, pauseDelay)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, roleIndex])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = 80
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top: sectionTop, behavior: "smooth" })
    }
  }

  return (
    <>
      <ScrollProgressIndicator />
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16 pb-12 overflow-hidden"
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-accent/[0.05] z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 z-0" />

        {/* ── Main content ── */}
        <div className="container mx-auto px-4 z-10">
          {/* Mobile profile image */}
          <div className="md:hidden flex justify-center mb-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg shadow-primary/20">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <Image
                  src="/portfolio/profile.jpg"
                  alt="Shuja Ali - Technical Lead"
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  priority
                  sizes="160px"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
              </div>
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left: text block */}
            <motion.div
              className="flex-1 glass p-6 md:p-8 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Availability badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium px-4 py-1.5 rounded-full mb-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Open to opportunities &amp; freelance work
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold mb-3 md:mb-4 animate-text-shimmer">
                Hi, I'm <span className="text-primary">Shuja Ali</span>
              </h1>

              {/* Fixed height prevents layout shift as text changes */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 h-9 font-orbitron">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>

              <p className="text-base md:text-lg text-foreground/80 mb-6 md:mb-8 max-w-2xl">
                Full-stack engineer with 5+ years building production-grade web applications across
                fintech, SaaS, and AI domains. Currently managing technical delivery for multiple
                product teams at Ropstam Solutions while staying hands-on with architecture, code
                reviews, and complex feature development.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button
                  asChild
                  size="default"
                  className="btn-funky bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                >
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Download Resume
                  </a>
                </Button>
                <Button asChild variant="outline" size="default" className="btn-funky">
                  <a
                    href="#projects"
                    onClick={(e) => handleScrollToSection(e, "projects")}
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" aria-hidden="true" />
                    View Projects
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="default"
                  className="border border-primary/20 hover:bg-primary/10"
                >
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollToSection(e, "contact")}
                    className="flex items-center gap-2"
                  >
                    <Terminal className="h-4 w-4" aria-hidden="true" />
                    Get In Touch
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-4 mt-6 md:mt-8">
                <motion.a
                  href="https://github.com/shuja990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-lg tech-glow"
                  whileHover={{ scale: 1.1 }}
                  aria-label="GitHub Profile"
                >
                  <Github size={20} aria-hidden="true" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/shujaali7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-lg tech-glow"
                  whileHover={{ scale: 1.1 }}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} aria-hidden="true" />
                </motion.a>
                <motion.a
                  href="mailto:shujaali1234@gmail.com"
                  className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-lg tech-glow"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Email Contact"
                >
                  <Mail size={20} aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right: profile image with floating tech badges (desktop only) */}
            <motion.div
              className="hidden md:flex flex-shrink-0 justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-72 h-72">
                {/* Floating tech badges around the image */}
                {techBadges.map((badge) => (
                  <motion.div
                    key={badge.label}
                    className="absolute z-20 px-3 py-1 rounded-full text-xs font-medium bg-background/80 border border-primary/20 text-primary/70 backdrop-blur-sm shadow-sm whitespace-nowrap"
                    style={{ top: badge.top, left: badge.left }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: badge.duration,
                      delay: badge.delay,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {badge.label}
                  </motion.div>
                ))}

                {/* Profile image */}
                <div className="relative w-72 h-72 overflow-hidden border-4 border-primary/20 img-tech tech-glow">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src="/portfolio/profile.jpg"
                    alt="Shuja Ali - Technical Lead & Senior Full Stack Developer"
                    fill
                    className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    priority
                    sizes="288px"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm" />
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent/20 rounded-full blur-sm" />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="#about"
              onClick={(e) => handleScrollToSection(e, "about")}
              className="flex flex-col items-center"
              aria-label="Scroll to About section"
            >
              <span className="text-sm text-foreground/60 mb-2 animated-underline">Scroll Down</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowDown className="text-primary" size={20} aria-hidden="true" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Hero
