"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter, Sparkles, X, Star, FolderOpen } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { projects, featuredProjects, projectCategories, TECHS } from "@/data"
import type { Project, TechId } from "@/data"
import { useTechFilter } from "@/components/providers/tech-filter-provider"

const categories = ["All", ...projectCategories]

const TechChips = ({ project, onSelect }: { project: Project; onSelect: (tech: TechId) => void }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {project.tech.map((techId) => {
      const tech = TECHS[techId]
      return (
        <button key={techId} type="button" onClick={() => onSelect(techId)} aria-label={`Filter projects by ${tech.label}`}>
          <Badge
            variant="outline"
            className="rounded-full transition-colors hover:bg-primary/20"
            style={{ borderColor: `${tech.color}55`, color: tech.color, backgroundColor: `${tech.color}14` }}
          >
            {tech.label}
          </Badge>
        </button>
      )
    })}
  </div>
)

const ProjectLinks = ({ project }: { project: Project }) => (
  <>
    {project.link && (
      <Button
        asChild
        variant="default"
        size="sm"
        className="rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
      >
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <ExternalLink size={16} />
          View Project
        </a>
      </Button>
    )}
    {project.github && (
      <Button asChild variant="outline" size="sm" className="rounded-full">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <Github size={16} />
          Code
        </a>
      </Button>
    )}
  </>
)

const ProjectCard = ({ project, onSelectTech }: { project: Project; onSelectTech: (tech: TechId) => void }) => (
  <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden rounded-[1.5rem_0.5rem] border-primary/20">
    <div className="h-44 overflow-hidden relative">
      <img
        src={project.image || "/placeholder.svg?height=300&width=500"}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60 mix-blend-overlay" />
    </div>
    <CardContent className="flex-grow p-6">
      <div className="mb-2">
        <Badge variant="secondary" className="rounded-full px-3 py-1 bg-secondary/20 text-secondary-foreground">
          {project.category}
        </Badge>
      </div>
      <h3 className="text-xl font-semibold mb-2 gradient-text">{project.title}</h3>
      <p className="text-foreground/80 mb-4 line-clamp-3">{project.description}</p>
      <TechChips project={project} onSelect={onSelectTech} />
    </CardContent>
    <CardFooter className="p-6 pt-0 flex justify-between">
      <ProjectLinks project={project} />
    </CardFooter>
  </Card>
)

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  const [archiveOpen, setArchiveOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { selectedTech, setSelectedTech } = useTechFilter()

  // A galaxy click (or any tech selection) opens the archive pre-filtered
  useEffect(() => {
    if (selectedTech) setArchiveOpen(true)
  }, [selectedTech])

  const handleArchiveOpenChange = (open: boolean) => {
    setArchiveOpen(open)
    if (!open) {
      // leaving the archive clears filters so the galaxy un-highlights too
      setSelectedTech(null)
      setSelectedCategory("All")
    }
  }

  const openArchiveWithTech = (tech: TechId) => {
    setSelectedTech(tech)
    setArchiveOpen(true)
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryOk = selectedCategory === "All" || project.category === selectedCategory
      const techOk = !selectedTech || project.tech.includes(selectedTech)
      return categoryOk && techOk
    })
  }, [selectedCategory, selectedTech])

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden funky-lines">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0"></div>

      <motion.div
        className="absolute top-40 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            <span className="relative inline-block">
              Featured Projects
              <motion.span
                className="absolute -top-6 -right-6"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="h-6 w-6 text-accent" />
              </motion.span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Hand-picked spotlight work. Browse the full archive of {projects.length} projects, or tap any tech chip to
            filter by stack.
          </p>
        </motion.div>

        {/* Featured spotlight row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={index === 0 ? "md:col-span-2 xl:col-span-1" : ""}
            >
              <Card className="h-full flex flex-col overflow-hidden rounded-[1.5rem_0.5rem] border-primary/30 shadow-lg shadow-primary/5 hover:shadow-primary/15 transition-shadow relative">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-1 border-none">
                    <Star size={12} className="fill-current" />
                    Spotlight
                  </Badge>
                </div>
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={project.image || "/placeholder.svg?height=300&width=500"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60 mix-blend-overlay" />
                </div>
                <CardContent className="flex-grow p-6">
                  <div className="mb-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 bg-secondary/20 text-secondary-foreground">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 gradient-text">{project.title}</h3>
                  <p className="text-foreground/80 mb-4 line-clamp-3">{project.description}</p>
                  <TechChips project={project} onSelect={openArchiveWithTech} />
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <ProjectLinks project={project} />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Archive trigger */}
        <div className="text-center">
          <Button
            onClick={() => setArchiveOpen(true)}
            variant="outline"
            size="lg"
            className="px-8 py-6 h-auto rounded-full text-base font-medium hover:bg-primary/10 border-primary/30 hover:border-primary"
          >
            <FolderOpen className="mr-2 h-5 w-5 text-primary" />
            View All {projects.length} Projects
          </Button>
        </div>
      </div>

      {/* Full archive dialog */}
      <Dialog open={archiveOpen} onOpenChange={handleArchiveOpenChange}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[88vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
            <DialogTitle className="text-2xl font-orbitron gradient-text">Project Archive</DialogTitle>
            <DialogDescription>
              All {projects.length} projects — filter by category or technology.
            </DialogDescription>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 rounded-full px-4 border-primary/30 hover:border-primary"
                  >
                    <Filter size={14} />
                    {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl border-primary/20 z-[60]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-primary/10 rounded-lg" : ""}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedTech && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTech(null)}
                  className="rounded-full flex items-center gap-2"
                  style={{ borderColor: `${TECHS[selectedTech].color}66`, color: TECHS[selectedTech].color }}
                >
                  {TECHS[selectedTech].label}
                  <X size={14} />
                </Button>
              )}

              <span className="text-sm text-foreground/60">
                {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
              </span>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto p-6">
            {filteredProjects.length === 0 ? (
              <p className="text-center text-foreground/60 py-12">
                {selectedTech
                  ? `I work with ${TECHS[selectedTech].label} on client projects that aren't public yet — no open showcase for it here.`
                  : "No projects match these filters."}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} onSelectTech={setSelectedTech} />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Projects
