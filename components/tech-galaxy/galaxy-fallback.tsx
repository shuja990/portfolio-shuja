"use client"

import { useTechFilter } from "@/components/providers/tech-filter-provider"
import type { GalaxyNode } from "./galaxy-scene"
import type { TechId } from "@/data"

/**
 * 2D chip cloud with identical click-to-filter behaviour — used when WebGL
 * is unavailable or the device is low-end, and as the keyboard/screen-reader
 * friendly alternative to the canvas.
 */
export default function GalaxyFallback({ nodes }: { nodes: GalaxyNode[] }) {
  const { selectedTech, setSelectedTech } = useTechFilter()

  // selecting a tech opens the pre-filtered project archive dialog
  const handleSelect = (id: string) => {
    setSelectedTech(selectedTech === id ? null : (id as TechId))
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 py-10 max-w-4xl mx-auto">
      {nodes.map((node) => {
        const selected = selectedTech === node.id
        return (
          <button
            key={node.id}
            type="button"
            onClick={() => handleSelect(node.id)}
            aria-pressed={selected}
            className="rounded-full px-4 py-2 text-sm font-medium border transition-all hover:scale-110"
            style={{
              color: node.color,
              borderColor: `${node.color}${selected ? "" : "55"}`,
              backgroundColor: `${node.color}${selected ? "33" : "14"}`,
              boxShadow: selected ? `0 0 18px ${node.color}66` : undefined,
            }}
          >
            {node.label}
            {node.weight > 0 && <span className="ml-2 text-xs opacity-70">{node.weight}</span>}
          </button>
        )
      })}
    </div>
  )
}
