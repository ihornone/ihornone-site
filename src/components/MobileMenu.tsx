"use client"

import Link from "next/link"
import { useBrand } from "./BrandProvider"

const links = [
  ["Projects", "/projects"],
  ["Stack", "/stack"],
  ["Now", "/now"],
] as const

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { brand } = useBrand()
  const accentHex = brand?.accent ?? "#7c3aed"

  return (
    <>
      <div
        className="sm:hidden fixed inset-0 z-40 transition-all duration-400"
        style={{
          background: open ? "rgba(0,0,0,0.5)" : "transparent",
          backdropFilter: open ? "blur(4px)" : "none",
          WebkitBackdropFilter: open ? "blur(4px)" : "none",
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      <div
        className="sm:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: open ? "translateY(0)" : "translateY(100%)" }}
      >
        <div
          className="mx-auto rounded-t-2xl pb-safe overflow-hidden"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderBottom: "none",
            boxShadow: "var(--shadow-sheet)",
          }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: "var(--color-border)" }} />
          </div>

          <div className="flex flex-col p-3 pt-1 gap-1">
            {links.map(([label, href], i) => {
              const isNow = label === "Now"
              return (
                <Link key={label} href={href}
                  onClick={onClose}
                  className="no-underline font-medium rounded-xl px-4 py-3.5 text-[16px] transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2"
                  style={{
                    color: isNow ? "var(--color-accent-light)" : "var(--color-text)",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                  }}
                >
                  {label}
                  {isNow && (
                    <span className="inline-block w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "var(--color-accent-light)", boxShadow: "0 0 6px rgba(167,139,250,0.5)" }}
                    />
                  )}
                </Link>
              )
            })}
            <div className="h-px mx-4 my-1.5" style={{ background: "var(--color-border)" }} />
            <Link href="/#contact" onClick={onClose}
              className="no-underline text-white font-semibold text-center rounded-xl px-4 py-3.5 text-[16px] transition-all duration-300 active:scale-[0.98]"
              style={{
                background: accentHex,
                boxShadow: `0 0 20px rgba(124,58,237,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
                transitionDelay: open ? `${100 + links.length * 60}ms` : "0ms",
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
