import type { MetadataRoute } from "next"
import { getAllSlugs } from "@/data/load-projects"

const BASE_URL = "https://www.ihornone.site"

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllSlugs().map(slug => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/stack`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projects,
  ]
}
