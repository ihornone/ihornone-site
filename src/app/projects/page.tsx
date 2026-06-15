import type { Metadata } from "next"
import { getAllProjects } from "@/data/load-projects"
import ProjectCard from "@/components/ProjectCard"

export const metadata: Metadata = {
  title: "Projects — ihornone",
  description: "Portfolio of projects by ihornone — production apps, experiments, and open source built with React, React Native, TypeScript, and more.",
  openGraph: {
    title: "Projects — ihornone",
    description: "Portfolio of projects by ihornone — production apps, experiments, and open source built with React, React Native, TypeScript, and more.",
    url: "https://www.ihornone.site/projects",
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <section className="px-6 pb-32">
      <div className="mx-auto" style={{ maxWidth: 1120 }}>
        <div className="mb-12">
          <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
            Work
          </p>
          <h1 className="text-[var(--color-text)] font-semibold m-0 mb-4" style={{ fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.72px" }}>
            All Projects
          </h1>
          <p className="text-[var(--color-text-secondary)] m-0" style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.36px" }}>
            Everything I&apos;ve built — production apps, experiments, and open source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
