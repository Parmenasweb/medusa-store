"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button, Input, Text, Container } from "@medusajs/ui"
import { toast } from "sonner"

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

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement newsletter subscription logic
      toast.success("Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-emperor-900 to-emperor-950 py-16 sm:py-24"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[60rem] w-[90rem] -translate-x-[50%] bg-gradient-to-r from-emperor-900/50 to-emperor-950/50 opacity-30 blur-3xl" />
      </div>

      <Container>
        <motion.div 
          variants={itemVariants}
          className="relative mx-auto max-w-2xl text-center"
        >
          <Text className="text-2xl md:text-3xl font-display text-white mb-4">
            Stay in the Loop
          </Text>
          <Text className="text-emperor-200 mb-8">
            Subscribe to our newsletter for exclusive offers, early access to new products, and the latest updates.
          </Text>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 px-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-emperor-700 text-white placeholder:text-emperor-400"
            />
            <Button
              type="submit"
              variant="secondary"
              isLoading={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </motion.div>
      </Container>
    </motion.section>
  )
} 