import { readFileSync, readdirSync, existsSync } from "fs"
import { join } from "path"
import { parseMarkdown, type ParsedProject } from "@/lib/parse-markdown"

const projectsDir = join(process.cwd(), "src/data/projects")
const manifestPath = join(projectsDir, "manifest.txt")

function getOrderedSlugs(): string[] {
  const all = readdirSync(projectsDir)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""))

  if (!existsSync(manifestPath)) return all.sort()

  const order = readFileSync(manifestPath, "utf-8")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean)

  const ordered = order.filter(s => all.includes(s))
  const rest = all.filter(s => !order.includes(s))
  return [...ordered, ...rest.sort()]
}

let _cache: ParsedProject[] | null = null

export function getAllSlugs(): string[] {
  return getOrderedSlugs()
}

export function getAllProjects(): ParsedProject[] {
  if (_cache) return _cache
  _cache = getOrderedSlugs().map(slug => {
    const raw = readFileSync(join(projectsDir, `${slug}.md`), "utf-8")
    return parseMarkdown(raw)
  })
  return _cache
}

export function getProjectBySlug(slug: string): ParsedProject | undefined {
  return getAllProjects().find(p => p.slug === slug)
}
