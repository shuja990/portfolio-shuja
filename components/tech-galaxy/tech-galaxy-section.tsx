"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Orbit, Sparkles } from "lucide-react"
import { TECHS, TECH_CATEGORY_COLORS, TECH_CATEGORY_LABELS, projectCountByTech } from "@/data"
import { supportsWebGL } from "@/lib/webgl"
import GalaxyFallback from "./galaxy-fallback"
import type { GalaxyNode } from "./galaxy-scene"
import { useTechFilter } from "@/components/providers/tech-filter-provider"

const GalaxyCanvas = dynamic(() => import("./galaxy-canvas"), {
  ssr: false,
  loading: () => <div className="h-[420px] md:h-[540px]" />,
})

const TechGalaxySection = () => {
  // fallback-first: SSR and low-end devices get the chip cloud
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending")
  const { selectedTech, setSelectedTech } = useTechFilter()

  useEffect(() => {
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 2
    setMode(supportsWebGL() && !lowEnd ? "webgl" : "fallback")
  }, [])

  const nodes = useMemo<GalaxyNode[]>(() => {
    const counts = projectCountByTech()
    return Object.values(TECHS)
      .map((tech) => ({
        id: tech.id,
        label: tech.label,
        color: tech.color,
        weight: counts.get(tech.id) ?? 0,
        category: tech.category,
        alwaysShow: tech.alwaysShow,
      }))
      .filter((node) => node.weight > 0 || node.alwaysShow)
  }, [])

  return (
    <section id="galaxy" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 animate-text-shimmer">
            <span className="relative inline-block">
              Tech Galaxy
              <motion.span
                className="absolute -top-6 -right-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Orbit className="h-6 w-6 text-accent" />
              </motion.span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            My stack as a living galaxy — bigger stars power more projects.{" "}
            {mode === "webgl" ? "Drag to explore, click a star" : "Tap a technology"} to see everything I've built with
            it.
          </p>
        </motion.div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4 text-xs text-foreground/70">
          {Object.entries(TECH_CATEGORY_LABELS).map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: TECH_CATEGORY_COLORS[key as keyof typeof TECH_CATEGORY_COLORS] }}
              />
              {label}
            </span>
          ))}
        </div>

        {mode === "webgl" ? (
          <GalaxyCanvas nodes={nodes} onInitError={() => setMode("fallback")} />
        ) : (
          <GalaxyFallback nodes={nodes} />
        )}

        {selectedTech && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setSelectedTech(null)}
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              <Sparkles size={14} className="text-accent" />
              Filtering projects by {TECHS[selectedTech].label} — clear
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default TechGalaxySection
