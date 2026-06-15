import Hero from "@/components/Hero"
import FeaturedProjects from "@/components/FeaturedProjects"
import Skills from "@/components/Skills"
import About from "@/components/About"
import Contacts from "@/components/Contacts"
import { getAllProjects } from "@/data/load-projects"

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <>
      <Hero projectsCount={projects.length} />
      <FeaturedProjects projects={projects} />
      <Skills />
      <About />
      <Contacts />
    </>
  )
}
