import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import TechGalaxySection from "@/components/tech-galaxy/tech-galaxy-section"
import Projects from "@/components/projects"
import GitHubActivity from "@/components/github-activity"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ContactWidget from "@/components/contact-widget"
import { site } from "@/data"
import { TechFilterProvider } from "@/components/providers/tech-filter-provider"

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <TechFilterProvider>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <TechGalaxySection />
          <Projects />
          <GitHubActivity />
          <Contact />
          <Footer />
          <ContactWidget />
        </TechFilterProvider>
      </main>

      {/* Structured data for SEO */}
      <script
        id="schema-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: `${site.name} - ${site.role} Portfolio`,
            url: site.siteUrl,
            description: site.seo.description,
            author: {
              "@type": "Person",
              name: site.name,
              jobTitle: site.role,
              url: site.siteUrl,
              sameAs: [site.socials.github, site.socials.linkedin, site.socials.twitter],
            },
            keywords: site.seo.keywords.join(", "),
          }),
        }}
      />
    </>
  )
}

