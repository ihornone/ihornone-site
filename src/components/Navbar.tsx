"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import MobileMenu from "./MobileMenu"
import { useBrand } from "./BrandProvider"

const links = [
  ["Projects", "/projects"],
  ["Stack", "/stack"],
  ["Now", "/now"],
] as const

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { brand } = useBrand()

  const accentHex = brand?.accent ?? "#7c3aed"
  const accentRgb = hexToRgb(accentHex)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-500"
      style={{ paddingTop: scrolled ? "var(--nav-pad-scrolled)" : "var(--nav-pad-top)" }}
    >
      <nav
        className="relative z-50 flex items-center justify-between w-full h-14 px-4 sm:px-5 rounded-2xl transition-all duration-500"
        style={{
          maxWidth: 960,
          background: scrolled ? "color-mix(in srgb, var(--color-bg) 20%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          border: scrolled ? "1px solid color-mix(in srgb, var(--color-border) 30%, transparent)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.03)" : "none",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
            style={{
              background: accentHex,
              boxShadow: `0 0 20px rgba(${accentRgb},0.3), 0 0 0 1px rgba(255,255,255,0.1) inset`,
            }}
          >
            <span className="text-white font-bold text-[16px] font-mono leading-none select-none"
              style={{ letterSpacing: "-0.5px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "-1px" }}
            >
              {"{}"}
            </span>
          </span>
          <span className="text-[15px] font-semibold text-[var(--color-text)]" style={{ letterSpacing: "-0.3px" }}>
            ihornone
          </span>
        </Link>

        <ul className="hidden sm:flex items-center gap-0.5 list-none m-0 p-0">
          {links.map(([label, href]) => {
            const isNow = label === "Now"
            return (
              <li key={label}>
                <Link href={href}
                  className="relative inline-flex items-center gap-1.5 text-[14px] font-medium no-underline h-9 px-3.5 rounded-xl transition-all duration-200"
                  style={{ letterSpacing: "-0.28px", color: isNow ? "var(--color-accent-light)" : "var(--color-text-secondary)" }}
                >
                  {label}
                  {isNow && (
                    <span className="inline-block w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "var(--color-accent-light)", boxShadow: "0 0 6px rgba(167,139,250,0.5)" }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link href="/#contact"
            className="hidden sm:inline-flex items-center no-underline font-semibold text-[13px] text-white h-9 px-4 rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: accentHex,
              letterSpacing: "-0.26px",
              boxShadow: `0 0 20px rgba(${accentRgb},0.25), 0 0 0 1px rgba(255,255,255,0.1) inset`,
            }}
          >
            Contact
          </Link>

          <button onClick={() => setMobileOpen(o => !o)}
            className="sm:hidden relative inline-flex items-center justify-center h-9 w-9 rounded-xl border cursor-pointer transition-colors shrink-0"
            style={{ background: "transparent", borderColor: "var(--color-border)" }}
            aria-label="Toggle menu"
          >
            <div className="relative w-4 h-4">
              <span className="absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-300"
                style={{ background: "var(--color-text)", top: mobileOpen ? "50%" : "25%", transform: mobileOpen ? "translateY(-50%) rotate(45deg)" : "translateY(-50%)" }}
              />
              <span className="absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-300"
                style={{ background: "var(--color-text)", top: "50%", transform: "translateY(-50%)", opacity: mobileOpen ? 0 : 1 }}
              />
              <span className="absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-300"
                style={{ background: "var(--color-text)", top: mobileOpen ? "50%" : "75%", transform: mobileOpen ? "translateY(-50%) rotate(-45deg)" : "translateY(-50%)" }}
              />
            </div>
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
