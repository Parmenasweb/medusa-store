"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Truck, Shield, RefreshCw, Clock } from "lucide-react"

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

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $150"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment methods"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated customer service"
  }
]

export default function BenefitsSection() {
  return (
    <section className="py-16 bg-white dark:bg-emperor-950">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-emperor-950 dark:text-white" />
              </div>
              <h3 className="text-xl font-display text-emperor-950 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-emperor-600 dark:text-emperor-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
} 