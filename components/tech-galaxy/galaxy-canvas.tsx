"use client"

import { useEffect, useRef } from "react"
import type { GalaxyNode } from "./galaxy-scene"
import { useTechFilter } from "@/components/providers/tech-filter-provider"
import type { TechId } from "@/data"

interface GalaxyCanvasProps {
  nodes: GalaxyNode[]
  /** called when WebGL init fails so the parent can fall back to chips */
  onInitError: () => void
}

export default function GalaxyCanvas({ nodes, onInitError }: GalaxyCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelLayerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<import("./galaxy-scene").GalaxyScene | null>(null)
  // setSelectedTech is a stable useState setter, safe to capture in the mount effect
  const { selectedTech, setSelectedTech } = useTechFilter()

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    const labelLayer = labelLayerRef.current
    if (!wrapper || !canvas || !labelLayer) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    let scene: import("./galaxy-scene").GalaxyScene | null = null
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let disposed = false

    const handleVisibility = () => {
      if (!scene) return
      if (document.hidden) scene.stop()
      else scene.start()
    }

    import("./galaxy-scene")
      .then(({ GalaxyScene }) => {
        if (disposed) return
        try {
          scene = new GalaxyScene({
            canvas,
            labelLayer,
            nodes,
            isMobile,
            reducedMotion,
            // selecting a tech opens the pre-filtered project archive dialog
            onSelect: (id) => setSelectedTech(id as TechId),
          })
        } catch (error) {
          console.error("Tech galaxy WebGL init failed:", error)
          onInitError()
          return
        }
        sceneRef.current = scene
        scene.setSize(wrapper.clientWidth, wrapper.clientHeight)

        resizeObserver = new ResizeObserver(() => {
          scene?.setSize(wrapper.clientWidth, wrapper.clientHeight)
        })
        resizeObserver.observe(wrapper)

        // Only burn frames while the galaxy is actually on screen; also let
        // the hero background pause itself while the galaxy is visible.
        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            if (!scene) return
            if (entry.isIntersecting) scene.start()
            else scene.stop()
            window.dispatchEvent(new CustomEvent("tech-galaxy-visible", { detail: entry.isIntersecting }))
          },
          { threshold: 0.05 },
        )
        intersectionObserver.observe(wrapper)

        document.addEventListener("visibilitychange", handleVisibility)
      })
      .catch((error) => {
        console.error("Failed to load tech galaxy:", error)
        onInitError()
      })

    return () => {
      disposed = true
      document.removeEventListener("visibilitychange", handleVisibility)
      intersectionObserver?.disconnect()
      resizeObserver?.disconnect()
      window.dispatchEvent(new CustomEvent("tech-galaxy-visible", { detail: false }))
      scene?.dispose()
      sceneRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    sceneRef.current?.highlight(selectedTech)
  }, [selectedTech])

  return (
    <div ref={wrapperRef} className="relative w-full h-[420px] md:h-[540px] select-none">
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" aria-hidden="true" />
      <div ref={labelLayerRef} className="absolute inset-0 overflow-hidden pointer-events-none [&>*]:pointer-events-auto" />
    </div>
  )
}
