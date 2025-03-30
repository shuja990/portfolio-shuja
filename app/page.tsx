import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import GitHubActivity from "@/components/github-activity"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ContactWidget from "@/components/contact-widget"
import Script from "next/script"

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Contact />
        <Footer />
        <ContactWidget />
      </main>

      {/* Structured data for SEO */}
      <Script
        id="schema-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Shuja Ali - Full Stack Developer Portfolio",
            url: "https://shujaali.dev",
            description:
              "Portfolio of Shuja Ali, a Full Stack Developer specializing in MERN stack and Next.js, creating innovative and scalable web solutions.",
            author: {
              "@type": "Person",
              name: "Shuja Ali",
              jobTitle: "Full Stack Developer",
              url: "https://shujaali.dev",
              sameAs: [
                "https://github.com/shuja990",
                "https://linkedin.com/in/shujaali7",
                "https://twitter.com/shujaali",
              ],
            },
            keywords:
              "Full Stack Developer, MERN Stack, Next.js, React, Node.js, JavaScript, TypeScript, Web Development",
          }),
        }}
      />
    </>
  )
}

