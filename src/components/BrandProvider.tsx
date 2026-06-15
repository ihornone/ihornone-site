"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"

export interface BrandConfig {
  accent: string
  accentLight: string
  accentBg: string
  borderRadius: number
  fontFamily: string
  darkBg: string
  darkSurface: string
  darkText: string
  darkTextSecondary: string
  darkTextMuted: string
  darkBorder: string
  lightBg: string
  lightSurface: string
  lightText: string
  lightTextSecondary: string
  lightTextMuted: string
  lightBorder: string
  slug: string
}

interface BrandContextValue {
  brand: BrandConfig | null
  setBrand: (b: BrandConfig | null) => void
}

const BrandContext = createContext<BrandContextValue>({ brand: null, setBrand: () => {} })

export function useBrand() {
  return useContext(BrandContext)
}

export default function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig | null>(null)
  const styleRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    if (!brand) {
      if (styleRef.current) {
        styleRef.current.remove()
        styleRef.current = null
      }
      document.documentElement.style.removeProperty("--font-ui")
      document.documentElement.style.removeProperty("--brand-radius")
      return
    }

    const css = `
[data-theme="dark"] {
  --color-bg: ${brand.darkBg};
  --color-surface: ${brand.darkSurface};
  --color-text: ${brand.darkText};
  --color-text-secondary: ${brand.darkTextSecondary};
  --color-text-muted: ${brand.darkTextMuted};
  --color-border: ${brand.darkBorder};
  --color-accent: ${brand.accent};
  --color-accent-light: ${brand.accentLight};
  --color-accent-bg: ${brand.accentBg};
}
[data-theme="light"] {
  --color-bg: ${brand.lightBg};
  --color-surface: ${brand.lightSurface};
  --color-text: ${brand.lightText};
  --color-text-secondary: ${brand.lightTextSecondary};
  --color-text-muted: ${brand.lightTextMuted};
  --color-border: ${brand.lightBorder};
  --color-accent: ${brand.accent};
  --color-accent-light: ${brand.accentLight};
  --color-accent-bg: ${brand.accentBg};
}`

    if (styleRef.current) {
      styleRef.current.textContent = css
    } else {
      const el = document.createElement("style")
      el.setAttribute("data-brand", brand.slug)
      el.textContent = css
      document.head.appendChild(el)
      styleRef.current = el
    }

    document.documentElement.style.setProperty("--font-ui", brand.fontFamily)
    document.documentElement.style.setProperty("--brand-radius", `${brand.borderRadius}px`)

    return () => {
      if (styleRef.current) {
        styleRef.current.remove()
        styleRef.current = null
      }
      document.documentElement.style.removeProperty("--font-ui")
      document.documentElement.style.removeProperty("--brand-radius")
    }
  }, [brand])

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  )
}
