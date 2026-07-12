import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"

export default defineConfig([
  globalIgnores([".next/**", "out/**", "node_modules/**", "next-env.d.ts"]),
  ...nextVitals,
  {
    rules: {
      // JSX prose apostrophes are fine; escaping them hurts readability
      "react/no-unescaped-entities": "off",
      // The mounted-flag pattern (setMounted(true) in an effect) is intentional
      // hydration-gating for next-themes; keep visible as a warning only
      "react-hooks/set-state-in-effect": "warn",
    },
  },
])
