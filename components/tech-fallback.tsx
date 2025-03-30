import { Code, Database, Server, Globe } from "lucide-react"

const TechFallback = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
          <Code className="h-12 w-12 text-primary mb-2" />
          <span className="text-sm font-medium">Frontend</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-secondary/10 rounded-lg">
          <Server className="h-12 w-12 text-secondary mb-2" />
          <span className="text-sm font-medium">Backend</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-accent/10 rounded-lg">
          <Database className="h-12 w-12 text-accent mb-2" />
          <span className="text-sm font-medium">Database</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
          <Globe className="h-12 w-12 text-primary mb-2" />
          <span className="text-sm font-medium">API</span>
        </div>
      </div>
    </div>
  )
}

export default TechFallback

