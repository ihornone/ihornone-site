import type { Metadata } from "next"
import { readFileSync } from "fs"
import { join } from "path"

export const metadata: Metadata = {
  title: "Now — ihornone",
  description: "What ihornone is working on now.",
  robots: { index: false },
}

function getLastUpdated(): string {
  try {
    const manifestPath = join(process.cwd(), "src/data/projects/manifest.txt")
    const stats = readFileSync(manifestPath)
    const mtime = stats ? Date.now() : Date.now()
    return new Date(mtime).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return "June 2026"
  }
}

export default function NowPage() {
  const lastUpdated = getLastUpdated()

  return (
    <section className="relative px-6 pt-16 pb-32 min-h-[70vh] flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          33% { transform: translateY(-30px) translateX(15px) scale(1.1); }
          66% { transform: translateY(20px) translateX(-10px) scale(0.9); }
        }
        @keyframes orb-fade {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
      `}</style>

      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300, left: "10%", top: "15%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          animation: "orb-float 6s 0s ease-in-out infinite, orb-fade 6s 0s ease-in-out infinite",
        }}
      />
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 250, height: 250, left: "75%", top: "10%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          animation: "orb-float 6s 2s ease-in-out infinite, orb-fade 6s 2s ease-in-out infinite",
        }}
      />
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 350, height: 350, left: "50%", top: "70%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          animation: "orb-float 6s 4s ease-in-out infinite, orb-fade 6s 4s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <h1 className="font-semibold m-0"
          style={{
            fontSize: "clamp(48px, 9vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 40%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(124,58,237,0.3))",
          }}
        >
          Coming Soon
        </h1>
        <p className="text-[var(--color-text-secondary)] m-0"
          style={{ fontSize: 16, letterSpacing: "-0.32px" }}
        >
          This page is being built. Check back soon.
        </p>
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
          <span className="text-[var(--color-text-muted)]" style={{ fontSize: 13, letterSpacing: "-0.26px" }}>
            Last updated {lastUpdated}
          </span>
        </div>
      </div>
    </section>
  )
}
