"use client"

import { useState, useEffect, useCallback, type ReactElement } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Mail, Phone, MessageCircle } from "lucide-react"

interface ContactOption {
  name: string
  icon: ReactElement
  action: () => void
  color: string
  ariaLabel: string
}

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
  }, [])

  useEffect(() => {
    // Show widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Hide widget when scrolling to contact section
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  const contactOptions: ContactOption[] = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
      action: () => window.open("https://wa.me/923025133646", "_blank"),
      color: "bg-green-500 hover:bg-green-600",
      ariaLabel: "Contact via WhatsApp",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      action: () => window.open("mailto:shujaali1234@gmail.com", "_blank"),
      color: "bg-blue-500 hover:bg-blue-600",
      ariaLabel: "Contact via Email",
    },
    {
      name: "Call",
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      action: () => window.open("tel:+923025133646", "_blank"),
      color: "bg-purple-500 hover:bg-purple-600",
      ariaLabel: "Contact via Phone",
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mb-4 flex flex-col gap-3"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {contactOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      onClick={option.action}
                      className={`${option.color} text-white rounded-full shadow-lg flex items-center gap-2 pl-3 pr-4 py-6`}
                      aria-label={option.ariaLabel}
                    >
                      {option.icon}
                      <span>{option.name}</span>
                    </Button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <span className="text-xs text-foreground/60 bg-background/80 px-2 py-1 rounded-full">
                    How can I help?
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleWidget}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
              isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close contact options" : "Open contact options"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            ) : (
              <MessageSquare className="h-6 w-6 text-white" aria-hidden="true" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactWidget

