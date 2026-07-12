"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { TechId } from "@/data"

interface TechFilterContextValue {
  selectedTech: TechId | null
  setSelectedTech: (tech: TechId | null) => void
}

const TechFilterContext = createContext<TechFilterContextValue>({
  selectedTech: null,
  setSelectedTech: () => {},
})

/**
 * Shared filter state between the tech galaxy (click a node) and the
 * projects grid (filters by that tech). Client provider wrapping server
 * children keeps app/page.tsx a server component.
 */
export function TechFilterProvider({ children }: { children: ReactNode }) {
  const [selectedTech, setSelectedTech] = useState<TechId | null>(null)
  return (
    <TechFilterContext.Provider value={{ selectedTech, setSelectedTech }}>{children}</TechFilterContext.Provider>
  )
}

export function useTechFilter() {
  return useContext(TechFilterContext)
}
