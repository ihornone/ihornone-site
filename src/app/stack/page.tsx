import type { Metadata } from "next"
import { stack } from "@/data/stack"
import { sectionContent } from "@/data/stack-content"

export const metadata: Metadata = {
  title: "Stack — ihornone",
  description: "Full tech stack I work with: React, TypeScript, React Native, Next.js, Tauri, Rust, AI/LLM integrations, and more.",
  openGraph: {
    title: "Stack — ihornone",
    description: "Full tech stack I work with: React, TypeScript, React Native, Next.js, Tauri, Rust, AI/LLM integrations, and more.",
    url: "https://www.ihornone.site/stack",
  },
}

function TechBadge({ name, icon }: { name: string; icon: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle mx-1 rounded-md py-0.5 px-1.5"
      style={{ background: "var(--color-item-bg)", border: "1px solid var(--color-border)" }}
    >
      <img src={icon} alt="" className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span className="text-[13px] font-medium" style={{ color: "var(--color-text)", letterSpacing: "-0.26px" }}>{name}</span>
    </span>
  )
}

function renderParagraph(parts: string[]) {
  const toolMap = Object.fromEntries(stack.flatMap(c => c.items).map(i => [i.name, i.icon]))
  return parts.map((part, i) => {
    if (i % 2 === 0) return <span key={i}>{part}</span>
    const icon = toolMap[part]
    return icon ? <TechBadge key={part} name={part} icon={icon} /> : <span key={part}>{part}</span>
  })
}

function getReadingTime(): string {
  const words = sectionContent.flatMap(s => s.body).flat().join(" ").split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export default function StackPage() {
  const readingTime = getReadingTime()

  return (
    <section className="px-6 pb-32">
      <div className="mx-auto" style={{ maxWidth: 800 }}>
        <div className="mb-14">
          <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
            Stack
          </p>
          <h1 className="text-[var(--color-text)] font-semibold m-0 mb-3"
            style={{ fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.72px" }}
          >
            Tech I work with
          </h1>
          <p className="text-[var(--color-text-secondary)] m-0"
            style={{ fontSize: 18, lineHeight: 1.6, letterSpacing: "-0.36px" }}
          >
            Not just a list of tools — here I explain how and why I use each technology in my work.
          </p>
          <div className="inline-flex items-center gap-1.5 mt-4 rounded-full px-3 py-1"
            style={{ background: "var(--color-item-bg)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[var(--color-text-muted)]" style={{ fontSize: 12, letterSpacing: "-0.24px" }}>
              {readingTime}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {sectionContent.map(section => (
            <div key={section.title}>
              <h2 className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider mb-4" style={{ letterSpacing: "0.06em" }}>
                {section.title}
              </h2>
              {section.body.map((parts, i) => (
                <p key={i} className="text-[var(--color-text-secondary)] m-0 leading-relaxed"
                  style={{ fontSize: 16, lineHeight: 1.75, letterSpacing: "-0.32px", marginTop: i > 0 ? "0.75rem" : 0 }}
                >
                  {renderParagraph(parts)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
