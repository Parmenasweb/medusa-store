"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"

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

const sections = [
  {
    title: "What Are Cookies",
    content: `Cookies are small text files that are stored on your device when you visit our website. They help us:

• Remember your preferences and settings
• Understand how you use our website
• Improve your shopping experience
• Provide personalized content and advertisements
• Maintain your shopping cart between visits

Cookies can be temporary (session cookies) or permanent (persistent cookies).`
  },
  {
    title: "Types of Cookies We Use",
    content: `We use the following categories of cookies:

1. Essential Cookies:
• Required for basic website functionality
• Enable secure checkout and payment processing
• Maintain your shopping cart
• Remember your login status

2. Performance Cookies:
• Analyze website traffic and usage patterns
• Help us understand which pages are most popular
• Identify technical issues and loading times
• Improve website speed and performance

3. Functionality Cookies:
• Remember your preferences (e.g., language, currency)
• Customize your shopping experience
• Save your previous searches and viewed items
• Enable social media integration

4. Targeting/Advertising Cookies:
• Display relevant product recommendations
• Show personalized advertisements
• Track marketing campaign effectiveness
• Enable retargeting across other websites`
  },
  {
    title: "Third-Party Cookies",
    content: `We work with trusted partners who may also place cookies on your device:

• Payment processors for secure transactions
• Analytics providers (e.g., Google Analytics)
• Social media platforms for sharing and engagement
• Advertising networks for targeted marketing

We carefully select our partners and require them to protect your privacy.`
  },
  {
    title: "Cookie Management",
    content: `You have control over cookies through your browser settings:

• Block all or specific types of cookies
• Delete existing cookies
• Receive notifications when cookies are set
• Browse in private/incognito mode

Note: Blocking essential cookies may affect website functionality.`
  },
  {
    title: "Cookie Consent",
    content: `When you first visit our website, we'll ask for your consent to use non-essential cookies. You can:

• Accept all cookies
• Reject non-essential cookies
• Customize your preferences
• Change your settings at any time

Your choices are saved and respected across visits.`
  },
  {
    title: "Data Collection and Use",
    content: `Information collected through cookies may include:

• IP address and device information
• Browser type and settings
• Pages visited and time spent
• Products viewed and purchased
• Referring websites and search terms
• Location data (if enabled)

We use this data in accordance with our Privacy Policy.`
  },
  {
    title: "Cookie Security",
    content: `We implement security measures to protect cookie data:

• Encryption of sensitive information
• Regular security assessments
• Access controls and monitoring
• Secure data storage and transmission
• Compliance with data protection regulations

We never store personal financial information in cookies.`
  },
  {
    title: "Updates to Cookie Policy",
    content: `We may update this policy as our practices evolve. Changes may occur due to:

• New features and functionality
• Regulatory requirements
• Industry best practices
• User feedback and concerns

We'll notify you of significant changes through our website.`
  }
]

export default function CookiesPage({
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
              Cookie Policy
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Understanding how we use cookies to enhance your experience
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* Content Sections */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="prose dark:prose-invert max-w-none"
              >
                <h2 className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="text-emperor-600 dark:text-emperor-300 whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}

            {/* Last Updated */}
            <motion.div 
              variants={itemVariants}
              className="text-emperor-600 dark:text-emperor-300 text-sm border-t border-emperor-200 dark:border-emperor-800 pt-8 mt-16"
            >
              Last updated: February 27, 2024
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </div>
  )
} 