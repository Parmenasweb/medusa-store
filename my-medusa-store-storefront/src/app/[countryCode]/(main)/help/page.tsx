"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Search, ShoppingBag, Truck, RefreshCw, CreditCard, User, Shield, MessageCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

const helpCategories = [
  {
    icon: ShoppingBag,
    title: "Orders & Purchases",
    description: "Track orders, view history, and manage returns",
    links: [
      { text: "Track My Order", href: "/account/orders" },
      { text: "Returns & Exchanges", href: "/shipping#returns" },
      { text: "Order History", href: "/account/orders" },
      { text: "Shipping Information", href: "/shipping" }
    ]
  },
  {
    icon: User,
    title: "Account & Profile",
    description: "Manage your account settings and preferences",
    links: [
      { text: "Account Settings", href: "/account/profile" },
      { text: "Change Password", href: "/account/profile" },
      { text: "Address Book", href: "/account/addresses" },
      { text: "Payment Methods", href: "/account/payment-methods" }
    ]
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Learn about shipping options and delivery times",
    links: [
      { text: "Shipping Methods", href: "/shipping" },
      { text: "Delivery Times", href: "/shipping#delivery-times" },
      { text: "International Shipping", href: "/shipping#international" },
      { text: "Track Package", href: "/account/orders" }
    ]
  },
  {
    icon: RefreshCw,
    title: "Returns & Refunds",
    description: "Information about our return and refund policies",
    links: [
      { text: "Return Policy", href: "/shipping#returns" },
      { text: "Start a Return", href: "/account/orders" },
      { text: "Refund Status", href: "/account/orders" },
      { text: "Exchange Process", href: "/shipping#returns" }
    ]
  },
  {
    icon: CreditCard,
    title: "Payment & Pricing",
    description: "Payment methods and pricing information",
    links: [
      { text: "Payment Methods", href: "/account/payment-methods" },
      { text: "Pricing Information", href: "/shipping#costs" },
      { text: "Gift Cards", href: "/gift-cards" },
      { text: "Promotions", href: "/promotions" }
    ]
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Learn about how we protect your information",
    links: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
      { text: "Cookie Policy", href: "/cookies" },
      { text: "Security Measures", href: "/privacy#security" }
    ]
  }
]

const commonQuestions = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the Orders section. You'll find detailed tracking information and delivery updates for all your purchases."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in their original condition with tags attached. Returns are free for domestic orders. Visit our Returns page for more details."
  },
  {
    question: "How do I find my size?",
    answer: "Check our comprehensive Size Guide for detailed measurements and fitting information. Each product page also includes specific sizing recommendations."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our Shipping Information page for details."
  }
]

export default function HelpPage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return (
    <div className="min-h-[100vh] bg-white dark:bg-emperor-950">
      {/* Hero Section */}
      <motion.section 
        className="relative py-16 md:py-24 bg-gradient-to-r from-emperor-100 to-emperor-200 dark:from-emperor-900 dark:to-emperor-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Container>
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white mb-4">
              Help Center
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300 mb-8">
              How can we help you today?
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emperor-400 dark:text-emperor-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-emperor-200 dark:border-emperor-800 bg-white dark:bg-emperor-900 text-emperor-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emperor-300 dark:focus:ring-emperor-700"
              />
            </div>
          </motion.div>
        </Container>
      </motion.section>

      {/* Help Categories */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="p-6 rounded-lg border border-emperor-200 dark:border-emperor-800 bg-white dark:bg-emperor-900"
              >
                <div className="flex items-center gap-4 mb-4">
                  <category.icon className="w-6 h-6 text-emperor-600 dark:text-emperor-300" />
                  <h2 className="text-xl font-display text-emperor-950 dark:text-white">
                    {category.title}
                  </h2>
                </div>
                <p className="text-emperor-600 dark:text-emperor-300 mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.text}>
                      <LocalizedClientLink
                        href={link.href}
                        className="text-emperor-500 dark:text-emperor-400 hover:text-emperor-700 dark:hover:text-emperor-200 transition-colors"
                      >
                        {link.text}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Common Questions */}
      <motion.section 
        className="py-16 md:py-24 bg-emperor-50 dark:bg-emperor-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white text-center mb-12"
          >
            Common Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {commonQuestions.map((item) => (
              <motion.div
                key={item.question}
                variants={itemVariants}
                className="bg-white dark:bg-emperor-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-display text-emperor-950 dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-emperor-600 dark:text-emperor-300">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Contact Support */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <MessageCircle className="w-12 h-12 text-emperor-600 dark:text-emperor-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 mb-8">
              Our support team is here to help. Contact us and we'll get back to you as soon as possible.
            </p>
            <LocalizedClientLink
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors"
            >
              Contact Support
            </LocalizedClientLink>
          </motion.div>
        </Container>
      </motion.section>
    </div>
  )
} 