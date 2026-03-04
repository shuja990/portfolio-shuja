"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

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
              Full Stack Developer specialising in MERN stack and Next.js, creating innovative and scalable web
              solutions.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              Available for new projects
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <motion.a
                href="https://github.com/shuja990"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.2, rotate: 10 }}
                aria-label="GitHub Profile"
              >
                <Github size={20} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/shujaali7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.2, rotate: -10 }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="mailto:shujaali1234@gmail.com"
                className="text-foreground/70 hover:text-primary transition-colors p-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.2, rotate: 10 }}
                aria-label="Email Me"
              >
                <Mail size={20} aria-hidden="true" />
              </motion.a>
            </div>

            <p className="text-foreground/60 text-sm flex items-center">
              © {currentYear} Shuja Ali. Made with{" "}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart size={14} className="mx-1 text-accent" />
              </motion.div>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

