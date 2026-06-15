import type { ParsedProject } from "@/lib/parse-markdown"

export default function ProjectFeatures({ p }: { p: ParsedProject }) {
  return (
    <>
      {p.features.length > 0 && (
        <div className="flex flex-wrap justify-center gap-12 mb-20 py-10"
          style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
        >
          <StatBadge value={p.features.length.toString()} label="Key Features" />
          <StatBadge value={p.tech.split(" · ").length.toString()} label="Technologies" />
          <StatBadge value={p.stats} label="" />
          <StatBadge value={p.platform} label="Platforms" />
        </div>
      )}

      {p.features.length > 0 && (
        <div className="mb-20">
          <h2 className="text-[var(--color-text)] font-semibold m-0 mb-8"
            style={{ fontSize: 28, lineHeight: 1.3, letterSpacing: "-0.56px" }}
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.features.map((f, i) => (
              <div key={f.title} className="p-6 rounded-xl"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: p.accent + "1a", color: p.accent, fontSize: 16, fontWeight: 700 }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-[var(--color-text)] font-semibold m-0" style={{ fontSize: 16, letterSpacing: "-0.32px" }}>
                    {f.title}
                  </h3>
                </div>
                <p className="text-[var(--color-text-secondary)] m-0" style={{ fontSize: 15, lineHeight: 1.6, letterSpacing: "-0.3px" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-semibold" style={{ fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.56px", color: "var(--color-accent-light)" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, letterSpacing: "-0.26px", color: "var(--color-text-muted)" }}>{label}</div>
    </div>
  )
}
