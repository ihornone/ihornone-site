import Link from "next/link"
import type { ParsedProject } from "@/lib/parse-markdown"

function PlatformIcon({ platform }: { platform: string }) {
  if (platform.includes("iOS")) {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    )
  }
  if (platform.includes("Android")) {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a12.2 12.2 0 0 0-9.4 0L5.19 5.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C3.12 11.28 1.2 14.29 1 17.86h22c-.2-3.57-2.12-6.58-5.4-8.38M7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25-.56 1.25-1.25 1.25m10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25" />
      </svg>
    )
  }
  return null
}

export default function ProjectCard({ p }: { p: ParsedProject }) {
  return (
    <div className="rounded-xl overflow-hidden"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="h-0.5 w-full" style={{ background: p.accent }} />
      <div className="p-5 flex flex-col" style={{ minHeight: "calc(100% - 2px)" }}>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[var(--color-text)] font-semibold m-0"
            style={{ fontSize: 17, lineHeight: 1.4, letterSpacing: "-0.34px" }}
          >
            {p.title}
          </h3>
          <span className="shrink-0 inline-flex items-center"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--color-accent-light)", background: "var(--color-accent-bg)", padding: "2px 7px", borderRadius: 9999 }}
          >
            {p.stats}
          </span>
        </div>

        <div className="inline-flex items-center gap-1 mb-3" style={{ fontSize: 11, letterSpacing: "-0.22px", color: "var(--color-text-muted)" }}>
          {p.platform.split(" · ").map((plat: string) => (
            <span key={plat} className="inline-flex items-center gap-0.5">
              <PlatformIcon platform={plat} />
              {plat}
            </span>
          ))}
        </div>

        <p className="text-[var(--color-text-secondary)] m-0 mb-4 line-clamp-2"
          style={{ fontSize: 13, lineHeight: 1.6, letterSpacing: "-0.26px" }}
        >
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5 min-h-[26px] mb-3">
          {p.tech.split(" · ").map((t: string) => (
            <span key={t} className="inline-flex items-center"
              style={{ fontSize: 10, lineHeight: 1.5, letterSpacing: "-0.2px", color: "var(--color-text-muted)", background: "var(--color-item-bg)", padding: "3px 7px", borderRadius: 6 }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-[22px] mb-4">
          {p.tags.map(t => (
            <span key={t} className="inline-flex items-center"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--color-accent-light)", background: "var(--color-accent-bg)", padding: "2px 7px", borderRadius: 9999 }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex-auto" />

        <div className="flex flex-wrap gap-2">
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="no-underline inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 hover:scale-[1.03]"
              style={{ color: "var(--color-text)", background: "var(--color-item-bg)", border: "1px solid var(--color-border)", letterSpacing: "-0.24px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              GitHub
            </a>
          )}
          {p.install && (
            <a href={p.install} target="_blank" rel="noopener noreferrer"
              className="no-underline inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 hover:scale-[1.03] text-white"
              style={{ background: p.accent, letterSpacing: "-0.24px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Install
            </a>
          )}
          <Link href={`/projects/${p.slug}`}
            className="no-underline inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 hover:scale-[1.03]"
            style={{ color: "var(--color-text)", background: "var(--color-item-bg)", border: "1px solid var(--color-border)", letterSpacing: "-0.24px" }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
