"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { site } from "@/data"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-tr from-primary/5 to-secondary/5 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-10 funky-waves opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-10 funky-waves opacity-30 rotate-180"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold gradient-text relative inline-block group">
              Shuja Ali
              <motion.span
                className="absolute -top-4 -right-6"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="h-5 w-5 text-accent" />
              </motion.span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <p className="text-foreground/70 mt-2 max-w-md">
              {site.role} specializing in MERN stack, Next.js, and AI integrations — building scalable, production-grade
              web applications.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <motion.a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href={`mailto:${site.email}`}
                className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>

            <p className="text-foreground/60 text-sm flex items-center">
              © {currentYear} {site.name}. Made with{" "}
              <motion.span
                className="inline-flex"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart size={14} className="mx-1 text-accent" />
              </motion.span>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

