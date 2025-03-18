"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Mail, ArrowRight, CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react"

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const benefits = [
  {
    title: "Exclusive Offers",
    description: "Be the first to know about special deals and new arrivals",
    icon: <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
  },
  {
    title: "Style Tips",
    description: "Get personalized fashion advice and styling inspiration",
    icon: <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
  },
  {
    title: "Early Access",
    description: "Enjoy VIP access to sales and limited edition drops",
    icon: <ArrowRight className="w-5 h-5 text-green-500 dark:text-green-400" />
  }
]

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email.includes("@")) {
      setStatus("success")
      setEmail("")
    } else {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-900 dark:to-emperor-950 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-glow-gradient from-glow-primary opacity-30 dark:opacity-40 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-glow-gradient from-glow-secondary opacity-30 dark:opacity-40 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-emperor-950 dark:text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
                Stay in the Loop
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300 max-w-lg mx-auto">
                Subscribe to our newsletter for exclusive offers, new arrivals, and fashion insights.
                Join our community of style enthusiasts.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="group relative p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark hover:shadow-glass-sm dark:hover:shadow-glass-dark-sm transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emperor-50 dark:bg-emperor-800 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-medium text-emperor-950 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-emperor-600 dark:text-emperor-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="relative max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark border border-emperor-200 dark:border-emperor-800 text-emperor-950 dark:text-white placeholder-emperor-500 dark:placeholder-emperor-400 focus:outline-none focus:ring-2 focus:ring-emperor-300 dark:focus:ring-emperor-700"
                disabled={status === "loading" || status === "success"}
                required
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 rounded-full bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 font-medium hover:bg-emperor-800 dark:hover:bg-emperor-100 disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px] transition-all duration-300"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-0 text-sm text-rose-500 dark:text-rose-400 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                {errorMessage}
              </motion.p>
            )}
          </motion.form>

          <motion.p variants={itemVariants} className="text-emperor-500 dark:text-emperor-400 text-sm text-center">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
} 