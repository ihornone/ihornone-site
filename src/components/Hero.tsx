import Link from "next/link"

export default function Hero({ projectsCount = 40 }: { projectsCount?: number }) {
  return (
    <section className="relative px-6 pt-20 pb-24 sm:pt-36 sm:pb-32 overflow-x-clip">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none select-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" style={{ maxWidth: 1120 }}>
        <div className="flex flex-col">
          <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-6" style={{ letterSpacing: "0.08em" }}>
            Web & mobile developer
          </p>

          <h1 className="text-[var(--color-text)] font-semibold m-0 mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 60px)", lineHeight: 1.1, letterSpacing: "-1.2px" }}
          >
            Crafting digital
            <br />
            <span className="relative inline-block">
              products
              <span className="absolute left-0 right-0 top-full h-1 rounded-full mt-1 opacity-60"
                style={{ background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))" }}
              />
            </span>
            {" "}with precision
          </h1>

          <p className="text-[var(--color-text-secondary)] font-normal m-0 mb-10"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.5, letterSpacing: "-0.4px", maxWidth: 480 }}
          >
            I build web apps and cross-platform mobile experiences with
            React & React Native. Clean code, sharp design, zero fluff.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/#contact"
              className="inline-flex items-center justify-center no-underline font-medium text-white rounded-lg transition-all duration-300 hover:scale-[1.03]"
              style={{ fontSize: 16, letterSpacing: "-0.32px", padding: "16px 24px", borderRadius: 8, background: "var(--color-accent)", boxShadow: "0 0 24px rgba(124,58,237,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset" }}
            >
              Start a project
            </Link>
            <Link href="/projects"
              className="inline-flex items-center justify-center no-underline font-medium text-[var(--color-text-secondary)] bg-transparent rounded-lg hover:text-[var(--color-text)] transition-colors"
              style={{ fontSize: 16, letterSpacing: "-0.32px", padding: "16px 24px", borderRadius: 8 }}
            >
              View work
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-12">
            {[
              ["3+", "Years coding"],
              [`${projectsCount}+`, "Projects shipped"],
              ["iOS & Android", "React Native"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-[var(--color-text)] font-semibold"
                  style={{ fontSize: label === "React Native" ? 16 : 24, lineHeight: label === "React Native" ? 1.5 : 1.33, letterSpacing: "-0.32px" }}
                >
                  {num}
                </div>
                <div className="text-[var(--color-text-muted)]" style={{ fontSize: 13, lineHeight: 1.5, letterSpacing: "-0.26px" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative rounded-xl overflow-hidden"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-code)" }}
          >
            <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
              <span className="block w-3 h-3 rounded-full" style={{ background: "#f87171" }} />
              <span className="block w-3 h-3 rounded-full" style={{ background: "#facc15" }} />
              <span className="block w-3 h-3 rounded-full" style={{ background: "#4ade80" }} />
              <span className="ml-3 text-xs" style={{ color: "var(--color-text-muted)", letterSpacing: "-0.24px" }}>
                developer.ts
              </span>
            </div>

            <div className="px-5 py-4 font-mono text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {[
                [`const`, `ihor`, `= {`],
                [`// Web & mobile developer`],
                [`role`, `"full-stack"`],
                [`mobile`, `"react-native"`],
                [`web`, `"react, typescript"`],
                [`shipped`, `40`],
                [`}`],
                [``],
                [`// Available for new projects`],
                [`ihor`, `work`, `()`],
              ].map((tokens, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-6 shrink-0 text-right mr-4" style={{ color: "var(--color-border)" }}>{i + 1}</span>
                  <span>
                    {tokens.length === 1 && tokens[0].startsWith("//") ? (
                      <span style={{ color: "var(--color-text-muted)" }}>{tokens[0]}</span>
                    ) : tokens.length === 2 && tokens[0] === "ihor" && tokens[1] === "work" ? (
                      <><span style={{ color: "var(--color-accent-light)" }}>ihor</span><span style={{ color: "#67e8f9" }}>.work</span>()</>
                    ) : tokens.length === 1 && tokens[0] === "" ? (
                      <span>&nbsp;</span>
                    ) : tokens.length === 1 && tokens[0] === "}" ? (
                      <span>{"}"}</span>
                    ) : tokens.length === 1 ? (
                      <span style={{ color: "#facc15" }}>{tokens[0]}</span>
                    ) : tokens[0] === "const" ? (
                      <><span style={{ color: "#c084fc" }}>const</span> <span style={{ color: "#67e8f9" }}>ihor</span> = {'{'}</>
                    ) : (
                      <><span style={{ color: "var(--color-text)" }}>{tokens[0]}</span>: <span style={{ color: "#4ade80" }}>{tokens[1]}</span>,</>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -z-10 rounded-xl"
            style={{
              inset: "-1px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), transparent 40%, transparent 60%, rgba(167,139,250,0.1))",
              borderRadius: 13,
              filter: "blur(1px)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
