"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { memo } from "react"

function ThemeProviderComponent({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Memoize the component to prevent unnecessary re-renders
export const ThemeProvider = memo(ThemeProviderComponent)

