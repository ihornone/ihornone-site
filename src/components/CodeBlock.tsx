"use client"

import { useEffect, useRef } from "react"
import hljs from "highlight.js"

export default function CodeBlock({ label, code, lang }: { label: string; code: string; lang: string }) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code])

  return (
    <div className="rounded-xl overflow-hidden"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-code)" }}
    >
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full" style={{ background: "#f87171" }} />
          <span className="block w-3 h-3 rounded-full" style={{ background: "#facc15" }} />
          <span className="block w-3 h-3 rounded-full" style={{ background: "#4ade80" }} />
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-muted)", letterSpacing: "-0.24px" }}>{label}</span>
      </div>
      <div className="px-5 py-4 overflow-x-auto" style={{ lineHeight: 1.85 }}>
        <pre className="m-0" style={{ background: "transparent" }}>
          <code ref={codeRef} className={`language-${lang}`}
            style={{ background: "transparent", fontSize: 14, fontFamily: "'Fira Code', 'JetBrains Mono', monospace" }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
