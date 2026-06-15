const items = [
  {
    title: "Performance first",
    body: "Every millisecond counts. I profile, benchmark and optimise until the numbers are right.",
  },
  {
    title: "Design matters",
    body: "Visual polish isn't decoration—it's usability. Sharp typography, intentional spacing, honest interactions.",
  },
  {
    title: "Ship early, iterate fast",
    body: "Working software beats perfect plans. I deliver MVPs, gather feedback and refine relentlessly.",
  },
  {
    title: "Open by default",
    body: "I build in public, share what I learn and contribute back to the tools that make my work possible.",
  },
]

export default function About() {
  return (
    <section className="px-8 pb-32">
      <div className="mx-auto w-full" style={{ maxWidth: 1120 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
              Philosophy
            </p>
            <h2 className="text-[var(--color-text)] font-semibold m-0 mb-6"
              style={{ fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.72px" }}
            >
              About & Philosophy
            </h2>
            <p className="text-[var(--color-text-secondary)] m-0"
              style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.36px" }}
            >
              I believe great software comes from clarity of thought and respect
              for the craft. Every line of code should earn its place.
              Complexity is the enemy—I chase simplicity without sacrificing
              power.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {items.map(item => (
              <div key={item.title}
                className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="text-[var(--color-text)] font-semibold m-0 mb-1.5"
                  style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: "-0.32px" }}
                >
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] m-0"
                  style={{ fontSize: 15, lineHeight: 1.5, letterSpacing: "-0.3px" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
