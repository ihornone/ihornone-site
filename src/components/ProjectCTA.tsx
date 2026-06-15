import Link from "next/link"
import type { ParsedProject } from "@/lib/parse-markdown"

export default function ProjectCTA({ p }: { p: ParsedProject }) {
  return (
    <div className="text-center rounded-xl p-10"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}
    >
      <h2 className="text-[var(--color-text)] font-semibold m-0 mb-3"
        style={{ fontSize: 28, lineHeight: 1.3, letterSpacing: "-0.56px" }}
      >
        Want to see more?
      </h2>
      <p className="text-[var(--color-text-secondary)] m-0 mb-6" style={{ fontSize: 16, letterSpacing: "-0.32px" }}>
        Explore the full project catalog or grab the source code.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/projects"
          className="no-underline inline-flex items-center gap-2 font-semibold rounded-lg px-5 py-2.5 transition-all duration-200 hover:scale-[1.03]"
          style={{ fontSize: 14, letterSpacing: "-0.28px", color: "var(--color-text)", background: "var(--color-item-bg)", border: "1px solid var(--color-border)" }}
        >
          ← All projects
        </Link>
        {p.install && (
          <a href={p.install} target="_blank" rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-2 font-semibold rounded-lg px-5 py-2.5 transition-colors"
            style={{ fontSize: 14, letterSpacing: "-0.28px", color: "#ffffff", background: p.accent }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-2 font-semibold rounded-lg px-5 py-2.5 transition-colors"
            style={{ fontSize: 14, letterSpacing: "-0.28px", color: "var(--color-text)", background: "var(--color-item-bg)", border: "1px solid var(--color-border)" }}
          >
            View source on GitHub
          </a>
        )}
      </div>
    </div>
  )
}
