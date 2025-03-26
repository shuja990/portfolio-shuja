import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Shuja Ali
            </Link>
            <p className="text-foreground/70 mt-2 max-w-md">
              Full Stack Developer specializing in MERN stack and Next.js, creating innovative and scalable web
              solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/shuja990"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/shujaali7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:shujaali1234@gmail.com"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <p className="text-foreground/60 text-sm flex items-center">
              © {currentYear} Shuja Ali. Made with <Heart size={14} className="mx-1 text-primary" /> All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

