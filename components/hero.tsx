"use client"

import type React from "react"

import { useEffect, useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Code, Terminal } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { site } from "@/data"
import { gsap, SplitText, useGSAP } from "@/lib/gsap"

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
  const fullText = site.role
  const typingSpeed = 100
  const [threeJsSupported, setThreeJsSupported] = useState(true)
  const [threeJsError, setThreeJsError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Entrance timeline (GSAP owns the hero's entrance; framer-motion keeps hover micro-interactions)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.from(".hero-card", { y: 40, autoAlpha: 0, duration: 0.7 })
          .from(".hero-avatar", { scale: 0.85, autoAlpha: 0, duration: 0.6 }, "-=0.4")
          .from(".hero-cta", { y: 20, autoAlpha: 0, stagger: 0.12, duration: 0.45 }, "-=0.3")
          .from(".hero-social", { y: 12, autoAlpha: 0, stagger: 0.08, duration: 0.35 }, "-=0.25")
          .from(".hero-scroll", { autoAlpha: 0, y: -10, duration: 0.4 }, "-=0.1")

        // Split the headline into chars once the display font has loaded,
        // otherwise SplitText measures fallback-font glyph widths
        gsap.set(".hero-heading", { autoAlpha: 0 })
        document.fonts.ready.then(() => {
          gsap.set(".hero-heading", { autoAlpha: 1 })
          const split = SplitText.create(".hero-heading", { type: "chars" })
          gsap.from(split.chars, {
            autoAlpha: 0,
            y: 24,
            rotateX: -60,
            stagger: 0.03,
            duration: 0.5,
            ease: "back.out(1.7)",
          })
        })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-card", ".hero-avatar", ".hero-cta", ".hero-social", ".hero-scroll", ".hero-heading"], {
          clearProps: "all",
        })
      })
    },
    { scope: containerRef },
  )

  useEffect(() => {
    // Check if browser supports WebGL (probe context is released right away)
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (gl && "getExtension" in gl) {
        ;(gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext()
      }
      setThreeJsSupported(!!gl)
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
      <section
        id="home"
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center pt-16 pb-12 overflow-hidden"
      >
        {/* 3D Background */}
        {showThreeJs && <ThreeBackground />}

        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 z-0" />

        <div className="container mx-auto px-4 z-10">
          {/* Profile Image for Mobile - Centered at top */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="relative hero-avatar">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg shadow-primary/20">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src="/images/profile-photo.jpg"
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
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="flex-1 glass p-6 md:p-8 rounded-lg hero-card">
              <h1 className="hero-heading text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold mb-3 md:mb-4 animate-text-shimmer">
                Hi, I'm <span className="text-primary">{site.name}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 min-h-8 font-orbitron">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
              <p className="text-base md:text-lg text-foreground/80 mb-6 md:mb-8 max-w-2xl">{site.summary}</p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button
                  asChild
                  size="default"
                  className="hero-cta btn-funky bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
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
                <Button asChild variant="outline" size="default" className="hero-cta btn-funky">
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
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-lg tech-glow"
                  whileHover={{ scale: 1.1 }}
                  aria-label="GitHub Profile"
                >
                  <Github size={20} aria-hidden="true" />
                </motion.a>
                <motion.a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-lg tech-glow"
                  whileHover={{ scale: 1.1 }}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} aria-hidden="true" />
                </motion.a>
                <motion.a
                  href={`mailto:${site.email}`}
                  className="hero-social text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-lg tech-glow"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Email Contact"
                >
                  <Mail size={20} aria-hidden="true" />
                </motion.a>
              </div>
            </div>

            {/* Desktop Image - Only visible on md and up */}
            <div className="hidden md:flex flex-shrink-0 justify-center hero-avatar">
              <div className="relative">
                <div className="relative w-72 h-72 overflow-hidden border-4 border-primary/20 img-tech tech-glow">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <Image
                    src="/images/profile-photo.jpg"
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
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hero-scroll">
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero

