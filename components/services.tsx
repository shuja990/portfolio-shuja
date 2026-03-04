"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, Cpu, ShoppingCart, ArrowRight } from "lucide-react"

const services = [
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: "SaaS & Web Applications",
    description:
      "Full-stack applications built for scale — from auth and data modeling to deployment. I work across the entire stack, making architectural decisions that hold up under real production load.",
    highlights: ["MERN / Next.js", "REST & GraphQL APIs", "Real-time features", "Cloud deployment"],
  },
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "AI & Integrations",
    description:
      "Embedding AI capabilities into products that need them — not as a gimmick, but as a genuine feature. I integrate OpenAI, Gemini, and third-party APIs into cohesive user experiences.",
    highlights: ["OpenAI / Gemini API", "LLM pipelines", "Stripe / Plaid / Twilio", "Webhook systems"],
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: "E-commerce & Fintech",
    description:
      "Custom storefronts and financial dashboards that handle real transactions. Experienced with Stripe, Dwolla, and Plaid — payment flows, bank linking, and compliance-aware data handling.",
    highlights: ["Custom checkout flows", "Payment gateways", "Bank integrations", "Admin dashboards"],
  },
]

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 opacity-60 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What I Build</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            The kinds of problems I solve best — whether you're a company hiring or a client with a project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Card className="h-full border-none shadow-lg overflow-hidden group rounded-[2rem_0.5rem_2rem_0.5rem] bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
