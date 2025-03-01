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
    title: "Information We Collect",
    content: `We collect information that you provide directly to us, including:

• Personal information (name, email, shipping address)
• Account credentials
• Payment information
• Order history
• Communication preferences
• Customer service interactions

We also automatically collect certain information about your device and how you interact with our services.`
  },
  {
    title: "How We Use Your Information",
    content: `We use the collected information to:

• Process your orders and payments
• Provide customer support
• Send order updates and shipping notifications
• Personalize your shopping experience
• Improve our services
• Detect and prevent fraud
• Comply with legal obligations

We do not sell your personal information to third parties.`
  },
  {
    title: "Information Sharing",
    content: `We may share your information with:

• Service providers who assist in our operations
• Payment processors for secure transactions
• Shipping partners for order delivery
• Legal authorities when required by law

We require all third parties to respect your privacy and handle your information securely.`
  },
  {
    title: "Data Security",
    content: `We implement appropriate security measures to protect your information:

• Encryption of sensitive data
• Secure payment processing
• Regular security assessments
• Access controls and authentication
• Secure data storage

We regularly review and update our security practices to maintain data protection.`
  },
  {
    title: "Cookies and Tracking",
    content: `We use cookies and similar technologies to:

• Remember your preferences
• Analyze site traffic and usage
• Personalize content and ads
• Improve site functionality

You can control cookie settings through your browser preferences.`
  },
  {
    title: "Your Rights",
    content: `You have the right to:

• Access your personal information
• Correct inaccurate data
• Request deletion of your data
• Opt-out of marketing communications
• Export your data
• Withdraw consent

Contact us to exercise these rights.`
  },
  {
    title: "Children's Privacy",
    content: `Our services are not intended for children under 13. We do not knowingly collect or maintain information from children under 13. If we learn we have collected such information, we will delete it.`
  },
  {
    title: "Updates to Privacy Policy",
    content: `We may update this policy periodically. We will notify you of significant changes by:

• Posting updates on our website
• Sending email notifications
• Displaying notices in your account

Your continued use of our services after changes indicates acceptance of the updated policy.`
  }
]

export default function PrivacyPage({
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
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              How we protect and handle your personal information
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