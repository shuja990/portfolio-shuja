"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Code, Terminal } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import Three.js components with SSR disabled
const ThreeBackground = dynamic(() => import("./three-background"), {
  ssr: false,
  loading: () => <div className="three-canvas" />,
})

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

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "Full Stack Developer"
  const typingSpeed = 100
  const [threeJsSupported, setThreeJsSupported] = useState(true)
  const [threeJsError, setThreeJsError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Check if browser supports WebGL
    try {
      const canvas = document.createElement("canvas")
      const isWebGLSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      )
      setThreeJsSupported(isWebGLSupported)
    } catch (e) {
      setThreeJsSupported(false)
    }

    // Handle Three.js errors
    const handleThreeJsError = (event: ErrorEvent) => {
      if (event.message.includes("three")) {
        setThreeJsError(true)
      }
    }

    window.addEventListener("error", handleThreeJsError)

    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => {
        clearTimeout(timeout)
        window.removeEventListener("error", handleThreeJsError)
      }
    }

    return () => {
      window.removeEventListener("error", handleThreeJsError)
    }
  }, [typedText, fullText, typingSpeed])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      // Calculate header height for offset (adjust the value as needed)
      const headerHeight = 80
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }

  const showThreeJs = threeJsSupported && !threeJsError

  return (
    <>
      <ScrollProgressIndicator />
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-12 overflow-hidden">
        {/* 3D Background */}
        {showThreeJs && <ThreeBackground />}

        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 z-0" />

        <div className="container mx-auto px-4 z-10">
          {/* Profile Image for Mobile - Centered at top */}
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
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src="https://media.licdn.com/dms/image/v2/D4D03AQGU1MwmuiwxPg/profile-displayphoto-shrink_800_800/B4DZO8nQnAGUAk-/0/1734036230399?e=1748476800&v=beta&t=XtxFX1n18lqBuMkaQIs2r9Ogm2LSpsZRxD8rHs4CLdM"
                  alt="Shuja Ali - Full Stack Developer"
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  priority
                  sizes="160px"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <motion.div
              className="flex-1 glass p-6 md:p-8 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold mb-3 md:mb-4 animate-text-shimmer">
                Hi, I'm <span className="text-primary">Shuja Ali</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 h-8 font-orbitron">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
              <p className="text-base md:text-lg text-foreground/80 mb-6 md:mb-8 max-w-2xl">
                Innovative Full Stack Developer with extensive experience in MERN stack and Next.js. Proven track record
                in designing and implementing robust backend solutions, developing interactive and scalable web
                applications, and leading development teams.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button
                  asChild
                  size="default"
                  className="btn-funky bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
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

            {/* Desktop Image - Only visible on md and up */}
            <motion.div
              className="hidden md:flex flex-shrink-0 justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="relative w-72 h-72 overflow-hidden border-4 border-primary/20 img-tech tech-glow">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <Image
                    src="https://media.licdn.com/dms/image/v2/D4D03AQGU1MwmuiwxPg/profile-displayphoto-shrink_800_800/B4DZO8nQnAGUAk-/0/1734036230399?e=1748476800&v=beta&t=XtxFX1n18lqBuMkaQIs2r9Ogm2LSpsZRxD8rHs4CLdM"
                    alt="Shuja Ali - Full Stack Developer"
                    fill
                    className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    priority
                    sizes="288px"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
                </div>
                {/* Decorative elements for desktop */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent/20 rounded-full blur-sm"></div>
              </div>
            </motion.div>
          </div>

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

