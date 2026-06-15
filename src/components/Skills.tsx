import { stack } from "@/data/stack"

const rows = [
  ["Mobile", "Web"],
  ["Desktop", "Design"],
  ["AI"],
  ["Tools", "Services"],
] as const

export default function Skills() {
  return (
    <section className="px-6 pb-24" id="skills">
      <div className="mx-auto" style={{ maxWidth: 1120 }}>
        <div className="mb-12">
          <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
            Skills
          </p>
          <h2 className="text-[var(--color-text)] font-semibold m-0" style={{ fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.72px" }}>
            Tech I work with
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {rows.map((pair, i) => {
            const cats = pair
              .map(label => stack.find(c => c.label === label))
              .filter(Boolean)
            return (
              <div key={i} className="flex flex-col sm:flex-row gap-4">
                {cats.map(cat => cat && (
                  <div key={cat.label}
                    className="rounded-xl p-5 flex-auto min-w-0"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="text-[var(--color-text-muted)] text-xs font-semibold uppercase tracking-wider mb-4" style={{ letterSpacing: "0.06em" }}>
                      {cat.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map(item => (
                        <div key={item.name}
                          className="inline-flex items-center gap-2 rounded-lg py-2 px-2.5"
                          style={{ background: "var(--color-item-bg)" }}
                        >
                          <img src={item.icon} alt="" className="w-5 h-5 shrink-0" aria-hidden="true" />
                          <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)", letterSpacing: "-0.28px" }}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
