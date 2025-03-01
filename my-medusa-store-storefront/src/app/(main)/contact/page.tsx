"use client"

import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export const metadata: Metadata = {
  title: "Contact Us | Emperor's Clothing",
  description: "Get in touch with Emperor's Clothing. We're here to help with any questions or concerns.",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "support@emperors-clothing.com",
    link: "mailto:support@emperors-clothing.com"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Fashion Street, New York, NY 10001",
    link: "https://maps.google.com"
  }
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormState({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100vh] bg-white dark:bg-emperor-950">
      {/* Hero Section */}
      <motion.section 
        className="relative py-16 bg-gradient-to-r from-emperor-100 to-emperor-200 dark:from-emperor-900 dark:to-emperor-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Container>
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              We're here to help with any questions or concerns
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* Contact Information */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info) => (
              <motion.a
                key={info.title}
                href={info.link}
                target={info.title === "Address" ? "_blank" : undefined}
                rel={info.title === "Address" ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                className="flex flex-col items-center p-8 text-center bg-emperor-50 dark:bg-emperor-900 rounded-lg hover:bg-emperor-100 dark:hover:bg-emperor-800 transition-colors duration-200"
              >
                <info.icon className="w-8 h-8 text-emperor-950 dark:text-white mb-4" />
                <h3 className="text-xl font-display text-emperor-950 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-emperor-600 dark:text-emperor-300">
                  {info.content}
                </p>
              </motion.a>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        className="py-16 bg-emperor-50 dark:bg-emperor-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="max-w-2xl mx-auto">
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-emperor-950 dark:text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-emperor-200 dark:border-emperor-800 bg-white dark:bg-emperor-950 text-emperor-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-emperor-950 dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-emperor-200 dark:border-emperor-800 bg-white dark:bg-emperor-950 text-emperor-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-emperor-950 dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-emperor-200 dark:border-emperor-800 bg-white dark:bg-emperor-950 text-emperor-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-emperor-950 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-emperor-200 dark:border-emperor-800 bg-white dark:bg-emperor-950 text-emperor-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {submitStatus === "success" && (
                <p className="text-green-600 dark:text-green-400 text-center">
                  Thank you for your message! We'll get back to you soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 dark:text-red-400 text-center">
                  Something went wrong. Please try again later.
                </p>
              )}
            </motion.form>
          </div>
        </Container>
      </motion.section>
    </div>
  )
} 