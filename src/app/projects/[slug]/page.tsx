import type { Metadata } from "next"
import Link from "next/link"
import { getAllSlugs, getProjectBySlug } from "@/data/load-projects"
import type { BrandConfig } from "@/components/BrandProvider"
import ProjectBrandSetter from "@/components/ProjectBrandSetter"
import ProjectHeader from "@/components/ProjectHeader"
import ProjectBlockSection from "@/components/ProjectBlockSection"
import ProjectFeatures from "@/components/ProjectFeatures"
import ProjectCTA from "@/components/ProjectCTA"
import CodeBlock from "@/components/CodeBlock"
import Gallery from "@/components/Gallery"

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found — ihornone", robots: { index: false } }
  }

  return {
    title: `${project.title} — ihornone`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ihornone`,
      description: project.description,
      url: `https://ihornone.com/projects/${project.slug}`,
    },
  }
}

function buildBrandConfig(project: NonNullable<ReturnType<typeof getProjectBySlug>>): BrandConfig {
  const b = project.brand
  return {
    accent: b.accent,
    accentLight: b.accentLight,
    accentBg: b.accent + "1a",
    borderRadius: b.borderRadius,
    fontFamily: b.fontFamily,
    darkBg: b.darkBg,
    darkSurface: b.darkSurface,
    darkText: b.darkText,
    darkTextSecondary: b.darkTextSecondary,
    darkTextMuted: b.darkTextMuted,
    darkBorder: b.darkBorder,
    lightBg: b.lightBg,
    lightSurface: b.lightSurface,
    lightText: b.lightText,
    lightTextSecondary: b.lightTextSecondary,
    lightTextMuted: b.lightTextMuted,
    lightBorder: b.lightBorder,
    slug: project.slug,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <section className="px-6 pb-32 pt-8">
        <div className="mx-auto text-center" style={{ maxWidth: 560 }}>
          <p className="text-[var(--color-text-secondary)] text-lg">Project not found.</p>
          <Link href="/projects" className="inline-flex items-center gap-2 no-underline font-medium mt-4"
            style={{ color: "var(--color-accent-light)", fontSize: 16 }}
          >
            ← Back to projects
          </Link>
        </div>
      </section>
    )
  }

  const brand = buildBrandConfig(project)
  const isWeb = !(project.platform.includes("Mobile") || project.platform.includes("iOS") || project.platform.includes("Android"))

  return (
    <>
      <ProjectBrandSetter brand={brand} />
      <section className="px-6 pb-32">
        <div className="mx-auto" style={{ maxWidth: 1120 }}>
          <ProjectHeader p={project} />
          <ProjectBlockSection blocks={project.blocks} web={isWeb} />
          <ProjectFeatures p={project} />
          {project.code && (
            <div className="mb-20">
              <h2 className="text-[var(--color-text)] font-semibold m-0 mb-8"
                style={{ fontSize: 28, lineHeight: 1.3, letterSpacing: "-0.56px" }}
              >
                Under the hood
              </h2>
              <CodeBlock label={project.code.label} code={project.code.code} lang={project.code.lang} />
            </div>
          )}
          {project.gallery && project.gallery.length > 0 && (
            <Gallery images={project.gallery} web={isWeb} />
          )}
          <ProjectCTA p={project} />
        </div>
      </section>
    </>
  )
}
