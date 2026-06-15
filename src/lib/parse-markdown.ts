export interface ParsedBlock {
  title: string
  body: string
  images: string[]
}

export interface ParsedFeature {
  title: string
  body: string
}

export interface ParsedBrand {
  accent: string
  accentLight: string
  borderRadius: number
  fontFamily: string
  darkBg: string
  darkSurface: string
  darkText: string
  darkTextSecondary: string
  darkTextMuted: string
  darkBorder: string
  lightBg: string
  lightSurface: string
  lightText: string
  lightTextSecondary: string
  lightTextMuted: string
  lightBorder: string
}

export interface ParsedProject {
  slug: string
  title: string
  stats: string
  platform: string
  description: string
  tech: string
  tags: string[]
  github?: string
  demo?: string
  install?: string
  accent: string
  brand: ParsedBrand
  blocks: ParsedBlock[]
  features: ParsedFeature[]
  code?: { label: string; code: string; lang: string }
  lessons: string
  gallery?: string[]
}

function parseFrontmatter(raw: string): Record<string, string> {
  const map: Record<string, string> = {}
  for (const line of raw.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const colonIdx = trimmed.indexOf(":")
    if (colonIdx === -1) continue
    const key = trimmed.slice(0, colonIdx).trim()
    let value = trimmed.slice(colonIdx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    map[key] = value
  }
  return map
}

function parseColor(fm: Record<string, string>, key: string, fallback: string): string {
  return fm[key] || fallback
}

function parseFont(fm: Record<string, string>, fallback: string): string {
  const raw = fm.fontFamily || fallback
  if (raw.startsWith("'") || raw.startsWith('"')) return raw
  return `'${raw}', system-ui, sans-serif`
}

const IMG_LIST_RE = /^(?:images:\s*\n((?:\s*-\s*.+\n?)+))/m

export function parseMarkdown(md: string): ParsedProject {
  const fmMatch = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fm = fmMatch ? parseFrontmatter(fmMatch[1]) : {}
  const body = fmMatch ? md.slice(fmMatch[0].length).trim() : md

  const brand: ParsedBrand = {
    accent: parseColor(fm, "accent", "#7c3aed"),
    accentLight: parseColor(fm, "accentLight", "#a78bfa"),
    borderRadius: Number(fm.borderRadius || 12),
    fontFamily: parseFont(fm, "Inter, system-ui, sans-serif"),
    darkBg: parseColor(fm, "darkBg", "#0d0a1a"),
    darkSurface: parseColor(fm, "darkSurface", "#151128"),
    darkText: parseColor(fm, "darkText", "#e8e4f8"),
    darkTextSecondary: parseColor(fm, "darkTextSec", "#b8b0d8"),
    darkTextMuted: parseColor(fm, "darkTextMuted", "#7a719f"),
    darkBorder: parseColor(fm, "darkBorder", "#2a2548"),
    lightBg: parseColor(fm, "lightBg", "#faf8ff"),
    lightSurface: parseColor(fm, "lightSurface", "#f0ecff"),
    lightText: parseColor(fm, "lightText", "#1a1438"),
    lightTextSecondary: parseColor(fm, "lightTextSec", "#4a3f6b"),
    lightTextMuted: parseColor(fm, "lightTextMuted", "#8b80a8"),
    lightBorder: parseColor(fm, "lightBorder", "#d4cee8"),
  }

  const sections: { heading: string; content: string }[] = []
  const sectionRegex = /^## (.+)$/gm
  let lastIdx = 0
  let match: RegExpExecArray | null
  while ((match = sectionRegex.exec(body)) !== null) {
    if (sections.length > 0) {
      sections[sections.length - 1].content = body.slice(lastIdx, match.index).trim()
    }
    sections.push({ heading: match[1].trim(), content: "" })
    lastIdx = match.index + match[0].length
  }
  if (sections.length > 0) {
    sections[sections.length - 1].content = body.slice(lastIdx).trim()
  }

  const blocks: ParsedBlock[] = []
  const features: ParsedFeature[] = []
  let code: ParsedProject["code"]
  let lessons = ""
  let gallery: string[] | undefined

  for (const sec of sections) {
    const heading = sec.heading

    if (heading.toLowerCase().includes("code")) {
      const codeMatch = sec.content.match(/```(\w*)\n([\s\S]*?)```/)
      if (codeMatch) {
        code = { label: fm.codeLabel || "Code", code: codeMatch[2].trim(), lang: codeMatch[1] || "plaintext" }
      }
      continue
    }

    if (heading.toLowerCase().includes("lesson")) {
      const imgMatch = sec.content.match(IMG_LIST_RE)
      lessons = imgMatch ? sec.content.slice(imgMatch[0].length).trim() : sec.content.trim()
      continue
    }

    if (heading.toLowerCase().includes("gallery")) {
      const imgMatch = sec.content.match(IMG_LIST_RE)
      if (imgMatch) {
        gallery = imgMatch[1].split("\n").map(l => l.replace(/^\s*-\s*/, "").trim()).filter(Boolean)
      }
      continue
    }

    if (heading.toLowerCase().includes("feature")) {
      const featureRegex = /^### (.+)$/gm
      let fMatch: RegExpExecArray | null
      while ((fMatch = featureRegex.exec(sec.content)) !== null) {
        const ftitle = fMatch[1].trim()
        const rest = sec.content.slice(fMatch.index + fMatch[0].length)
        const nextH3 = rest.match(/^### /m)
        const fbody = (nextH3 ? rest.slice(0, nextH3.index) : rest).trim()
        features.push({ title: ftitle, body: fbody })
      }
      continue
    }

    const imgListMatch = sec.content.match(IMG_LIST_RE)
    let images: string[] = []
    let blockBody = sec.content

    if (imgListMatch) {
      images = imgListMatch[1].split("\n").map(l => l.replace(/^\s*-\s*/, "").trim()).filter(Boolean)
      blockBody = sec.content.slice(imgListMatch[0].length).trim()
    }

    blocks.push({ title: heading, body: blockBody, images })
  }

  return {
    slug: fm.slug || fm.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
    title: fm.title || "",
    stats: fm.stats || "",
    platform: fm.platform || "",
    description: fm.description || "",
    tech: fm.tech || "",
    tags: (fm.tags || "").split(",").map(s => s.trim()).filter(Boolean),
    github: fm.github || undefined,
    demo: fm.demo || undefined,
    install: fm.install || undefined,
    accent: brand.accent,
    brand,
    blocks,
    features,
    code,
    lessons,
    gallery,
  }
}
