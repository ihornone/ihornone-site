import Link from "next/link"
import type { ParsedProject } from "@/lib/parse-markdown"

export default function ProjectHeader({ p }: { p: ParsedProject }) {
  return (
    <div className="mb-16">
      <Link href="/projects"
        className="inline-flex items-center gap-2 no-underline mb-8 transition-colors hover:text-[var(--color-accent-light)]"
        style={{ color: "var(--color-text-muted)", fontSize: 14, letterSpacing: "-0.28px" }}
      >
        ← All projects
      </Link>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-1 h-8 rounded-full shrink-0 mt-1.5" style={{ background: p.accent }} />
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[var(--color-text)] font-semibold m-0"
            style={{ fontSize: "clamp(28px, 6vw, 40px)", lineHeight: 1.2, letterSpacing: "-0.8px" }}
          >
            {p.title}
          </h1>
          <span className="shrink-0"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.24px", color: "var(--color-accent-light)", background: "var(--color-accent-bg)", padding: "4px 10px", borderRadius: 9999 }}
          >
            {p.stats}
          </span>
        </div>
      </div>

      <p className="text-[var(--color-text-secondary)] m-0 mb-6"
        style={{ fontSize: 20, lineHeight: 1.5, letterSpacing: "-0.4px", maxWidth: 680 }}
      >
        {p.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2"
          style={{ fontSize: 13, letterSpacing: "-0.26px", color: "var(--color-text-muted)", background: "var(--color-item-bg)", padding: "6px 12px", borderRadius: 8 }}
        >
          {p.platform}
        </div>
        {p.tech.split(" · ").map((t: string) => (
          <span key={t} className="inline-flex items-center"
            style={{ fontSize: 12, letterSpacing: "-0.24px", color: "var(--color-text-muted)", background: "var(--color-item-bg)", padding: "4px 10px", borderRadius: 6 }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-2 font-semibold rounded-lg px-5 py-2.5 transition-all duration-200 hover:scale-[1.03]"
            style={{ fontSize: 14, letterSpacing: "-0.28px", color: "var(--color-text)", background: "var(--color-item-bg)", border: "1px solid var(--color-border)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            GitHub
          </a>
        )}
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-2 font-semibold rounded-lg px-5 py-2.5 transition-all duration-200 hover:scale-[1.03]"
            style={{ fontSize: 14, letterSpacing: "-0.28px", color: "var(--color-text)", background: "var(--color-item-bg)", border: "1px solid var(--color-border)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            Live Demo
          </a>
        )}
        {p.install && (
          <a href={p.install} target="_blank" rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-2 font-semibold rounded-lg px-5 py-2.5 transition-all duration-200 hover:scale-[1.03]"
            style={{ fontSize: 14, letterSpacing: "-0.28px", color: "#ffffff", background: p.accent }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Install
          </a>
        )}
      </div>
    </div>
  )
}
