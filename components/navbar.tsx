"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Code, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm dark:bg-background/90" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative group">
            <motion.span
              className="text-2xl font-bold gradient-text flex items-center font-orbitron"
              whileHover={{ scale: 1.05 }}
            >
              <Code className="mr-2 h-5 w-5" />
              Shuja Ali
            </motion.span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div key={link.name} whileHover={{ scale: 1.1 }}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-foreground/80 hover:text-primary transition-colors group"
                  scroll={false}
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}

            <div className="ml-2 flex items-center gap-3">
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors tech-glow"
                  aria-label="Toggle theme"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={18} className="text-primary" />
                  ) : (
                    <Moon size={18} className="text-primary" />
                  )}
                </motion.button>
              )}

              <Button
                asChild
                className="rounded-lg px-6 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
              >
                <a href="https://drive.google.com/file/d/1_Jf2BfCz9A8QxJXL6NpMF4QQbPhGBorC/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Terminal size={16} />
                  Resume
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} className="text-primary" />
                ) : (
                  <Moon size={18} className="text-primary" />
                )}
              </motion.button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-primary" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 dark:bg-background/95 backdrop-blur-md border-t border-border/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 px-4 my-1 text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                    onClick={() => setIsMenuOpen(false)}
                    scroll={false}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
              >
                <Button
                  asChild
                  className="w-full mt-4 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                >
                  <a
                    href="https://drive.google.com/file/d/1_Jf2BfCz9A8QxJXL6NpMF4QQbPhGBorC/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Terminal size={16} />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

