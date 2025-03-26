"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import emailjs from "@emailjs/browser"

const Contact = () => {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("idle")

    try {
      // Initialize EmailJS with your public key
      emailjs.init("user_DLaK4TDVt4KzTGl1oxNQk") // Replace with your actual public key

      // Send the email using EmailJS
      await emailjs.send(
        "gmail", // Replace with your EmailJS service ID
        "template_c3rbjy2", // Replace with your EmailJS template ID
        {
          to_email: "shujaali1234@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      )

      // Handle success
      setFormStatus("success")
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      // Handle error
      console.error("Error sending email:", error)
      setFormStatus("error")
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 opacity-50 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="h-full overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-primary/5">
              <CardContent className="p-8 flex flex-col h-full relative">
                {/* Decorative circle */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full"></div>

                <h3 className="text-2xl font-semibold mb-8 relative">Contact Information</h3>

                <div className="space-y-8 flex-grow relative">
                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Email</h4>
                      <a
                        href="mailto:shujaali1234@gmail.com"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        shujaali1234@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Phone</h4>
                      <a href="tel:+923025133646" className="text-foreground/70 hover:text-primary transition-colors">
                        +92 302 5133646
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Location</h4>
                      <p className="text-foreground/70">Islamabad, Pakistan</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 relative">
                  <h4 className="font-medium text-lg mb-5">Connect with me</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/shujaali7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-4 rounded-xl hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="https://github.com/shuja990"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-4 rounded-xl hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                    >
                      <Github className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="https://twitter.com/shuja011"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-4 rounded-xl hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                    >
                      <Twitter className="h-5 w-5 text-primary" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-none shadow-lg bg-gradient-to-br from-background to-primary/5 overflow-hidden">
              <CardContent className="p-8 relative">
                {/* Decorative elements */}
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary/10 rounded-full"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full"></div>

                <h3 className="text-2xl font-semibold mb-8 relative">Send Me a Message</h3>

                {formStatus === "success" ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-400">Message Sent Successfully!</h4>
                      <p className="text-green-700 dark:text-green-500 mt-1">
                        Thank you for your message. I'll get back to you soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative">
                    {formStatus === "error" && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-red-700 dark:text-red-400 text-sm">
                          There was an error sending your message. Please try again.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-background/50 border-primary/20 focus:border-primary h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Your Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-background/50 border-primary/20 focus:border-primary h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        required
                        className="bg-background/50 border-primary/20 focus:border-primary h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hello, I'd like to discuss a project..."
                        rows={6}
                        required
                        className="bg-background/50 border-primary/20 focus:border-primary rounded-xl resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto px-5 py-2 h-auto rounded-xl text-base font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={18} />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

