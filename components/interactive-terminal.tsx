"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useTheme } from "next-themes"
import { Terminal as TerminalIcon, Maximize2, Minus, X } from "lucide-react"

interface HistoryItem {
  id: string
  command: string
  output: React.ReactNode
}

const InteractiveTerminal = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // Initial welcome message
    setHistory([
      {
        id: "welcome",
        command: "",
        output: (
          <div className="text-green-400 mb-2">
            <p>Welcome to Shuja OS v1.0.0</p>
            <p>Type <span className="text-primary font-bold">'help'</span> to see available commands.</p>
          </div>
        ),
      },
    ])
  }, [])

  useEffect(() => {
    // Auto scroll to bottom when history changes but only within the container
    if (bottomRef.current) {
      const parent = bottomRef.current.parentElement;
      if (parent) {
        parent.scrollTo({
          top: parent.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  }, [history])

  // Focus input when clicking anywhere on the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output: React.ReactNode = ""

    const args = trimmedCmd.split(" ")
    const mainCommand = args[0]

    switch (mainCommand) {
      case "help":
        output = (
          <div className="space-y-1 text-gray-300 mt-2 mb-4">
            <p><strong className="text-primary">about</strong>    - Learn more about me</p>
            <p><strong className="text-primary">skills</strong>   - View my tech stack</p>
            <p><strong className="text-primary">projects</strong> - List my top projects</p>
            <p><strong className="text-primary">contact</strong>  - Get my contact info</p>
            <p><strong className="text-primary">theme</strong>    - Toggle site theme (args: light, dark)</p>
            <p><strong className="text-primary">clear</strong>    - Clear the terminal screen</p>
            <p><strong className="text-primary">whoami</strong>   - Display current user</p>
            <p><strong className="text-primary">echo</strong>     - Print text back to terminal</p>
          </div>
        )
        break
      case "about":
        output = (
          <div className="mt-2 mb-4 text-gray-300">
            <p>Hi, I'm Shuja Ali, a Senior Full Stack Developer (MERN / Next.js).</p>
            <p>Currently working as a Technical Lead managing product teams and building scalable web applications.</p>
          </div>
        )
        break
      case "skills":
        output = (
          <div className="mt-2 mb-4 text-gray-300">
            <p><strong className="text-accent">Frontend:</strong> React, Next.js, Tailwind, TypeScript</p>
            <p><strong className="text-accent">Backend:</strong> Node.js, Express, NestJS</p>
            <p><strong className="text-accent">Database:</strong> MongoDB, PostgreSQL, Redis</p>
            <p><strong className="text-accent">Cloud & AI:</strong> AWS, Docker, OpenAI API, LangChain</p>
          </div>
        )
        break
      case "projects":
        output = (
          <div className="mt-2 mb-4 text-gray-300">
            <p>- <a href="https://moc-interview.vercel.app/" target="_blank" className="text-primary underline">Moc Interview</a> (AI Video Platform)</p>
            <p>- <a href="https://documentseditor.devmations.com/" target="_blank" className="text-primary underline">Documents Editor</a> (Live Collaboration)</p>
            <p>- <a href="https://backdrop-ai.devmations.com/" target="_blank" className="text-primary underline">Backdrop AI</a> (Generative Fill Image Editor)</p>
            <p>Type 'help' to find out how to contact me to see more.</p>
          </div>
        )
        break
      case "contact":
        output = (
          <div className="mt-2 mb-4 text-gray-300">
            <p>Email: <a href="mailto:shujaali1234@gmail.com" className="text-primary">shujaali1234@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/shuja990" target="_blank" className="text-primary">github.com/shuja990</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/shujaali7" target="_blank" className="text-primary">linkedin.com/in/shujaali7</a></p>
          </div>
        )
        break
      case "theme":
        if (args[1] === "light") {
          setTheme("light")
          output = <p className="mt-2 mb-4 text-green-400">Theme switched to light mode.</p>
        } else if (args[1] === "dark") {
          setTheme("dark")
          output = <p className="mt-2 mb-4 text-green-400">Theme switched to dark mode.</p>
        } else {
          // Toggle if no arg is provided
          const newTheme = resolvedTheme === "dark" ? "light" : "dark"
          setTheme(newTheme)
          output = <p className="mt-2 mb-4 text-green-400">Theme toggled to {newTheme} mode.</p>
        }
        break
      case "clear":
        setHistory([])
        return
      case "whoami":
        output = <p className="mt-2 mb-4 text-gray-300">guest_visitor</p>
        break
      case "sudo":
        output = <p className="mt-2 mb-4 text-red-500">Nice try! This incident will be reported.</p>
        break
      case "echo":
        output = <p className="mt-2 mb-4 text-gray-300">{args.slice(1).join(" ")}</p>
        break
      case "":
        output = ""
        break
      default:
        output = (
          <p className="mt-2 mb-4 text-red-500">
            Command not found: {mainCommand}. Type <span className="text-primary">'help'</span> for a list of commands.
          </p>
        )
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: cmd,
        output,
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    }
  }

  if (!mounted) return null

  return (
    <section id="terminal" ref={ref} className="py-20 bg-muted/20 relative overflow-hidden">
       {/* Background decorative gradient */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
            <TerminalIcon className="h-8 w-8" />
            Developer Console
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Interact with my portfolio directly through the command line. Try exploring my skills or toggling the theme!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Terminal Window */}
          <div 
            className="w-full h-[500px] flex flex-col bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-code"
            onClick={handleTerminalClick}
          >
            {/* Terminal Header */}
            <div className="h-12 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 shrink-0">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 cursor-not-allowed hover:bg-red-500 transition-colors" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 cursor-not-allowed hover:bg-yellow-500 transition-colors" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 cursor-not-allowed hover:bg-green-500 transition-colors" />
              </div>
              <div className="mx-auto text-gray-400 text-sm font-medium flex items-center gap-2">
                shuja@dev-portfolio:~
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-5 overflow-y-auto !text-gray-300 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {history.map((item, i) => (
                <div key={item.id || i}>
                  {item.command && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-500 font-bold">visitor@shuja.dev:~$</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  {item.output}
                </div>
              ))}
              
              {/* Active Input Line */}
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold shrink-0">visitor@shuja.dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-0 ring-0 outline-none focus:ring-0 focus:outline-none focus:border-0 shadow-none text-gray-300 py-1"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveTerminal
