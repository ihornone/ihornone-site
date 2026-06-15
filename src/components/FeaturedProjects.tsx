import type { ParsedProject } from "@/lib/parse-markdown"
import ProjectCard from "./ProjectCard"

export default function FeaturedProjects({ projects }: { projects: ParsedProject[] }) {
  if (projects.length === 0) return null

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto w-full" style={{ maxWidth: 1120 }}>
        <div className="mb-12">
          <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
            Work
          </p>
          <h2 className="text-[var(--color-text)] font-semibold m-0" style={{ fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.72px" }}>
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.slice(0, 3).map(p => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
