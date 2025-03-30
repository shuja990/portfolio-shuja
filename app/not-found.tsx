"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Code } from "lucide-react"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl font-orbitron font-bold text-primary mb-4 animate-text-shimmer"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-orbitron font-bold mb-4">Page Not Found</h1>

        <p className="text-foreground/80 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary">
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline">
            <a href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Go Back
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-foreground/60 mb-2">
          <Code className="inline mr-2" size={16} />
          <span className="font-code">Error: Path not found</span>
        </p>
      </motion.div>

      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

