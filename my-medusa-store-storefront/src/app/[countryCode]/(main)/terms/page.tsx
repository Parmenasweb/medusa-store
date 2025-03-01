"use client"

import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"

// export const metadata: Metadata = {
//   title: "Terms of Service | Emperor's Clothing",
//   description: "Read our terms of service to understand your rights and responsibilities when using Emperor's Clothing services.",
// }

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
    title: "Agreement to Terms",
    content: `By accessing and using Emperor's Clothing's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.

Key Points:
• These terms constitute a legally binding agreement
• You must be at least 18 years old to use our services
• You are responsible for maintaining account security
• We reserve the right to modify these terms at any time`
  },
  {
    title: "Account Registration and Security",
    content: `To access certain features of our service, you must register for an account. You agree to:

1. Account Creation:
• Provide accurate and complete information
• Update your information promptly when necessary
• Keep your login credentials confidential
• Not share your account with others

2. Account Security:
• Use strong passwords
• Enable two-factor authentication when available
• Log out from shared devices
• Report unauthorized access immediately

3. Account Restrictions:
• One account per person
• No automated account creation
• No impersonation of others
• No reselling of accounts`
  },
  {
    title: "Product Information and Pricing",
    content: `1. Product Listings:
• All product descriptions are accurate to the best of our knowledge
• Images are representative but may vary slightly
• Specifications may change without notice
• Stock availability is subject to change

2. Pricing:
• All prices are in the displayed currency
• Prices may vary by region
• We reserve the right to modify prices
• Discounts cannot be combined unless specified
• Pricing errors will be corrected if discovered

3. Product Availability:
• Products are subject to availability
• We may limit order quantities
• Pre-orders may have estimated delivery dates
• We'll notify you of any stock issues`
  },
  {
    title: "Ordering and Payment",
    content: `1. Order Process:
• Orders are subject to acceptance and availability
• We may refuse or cancel any order
• Order confirmation doesn't guarantee availability
• We may verify information before processing

2. Payment Terms:
• Full payment is required at checkout
• We accept major credit cards and specified payment methods
• Prices include applicable taxes
• Payment information must be valid and authorized

3. Order Cancellation:
• Orders can be cancelled before shipping
• Some items may have cancellation restrictions
• Refunds will be processed to original payment method
• Processing fees may apply to cancellations`
  },
  {
    title: "Shipping and Delivery",
    content: `1. Shipping Options:
• Multiple shipping methods available
• Delivery times are estimates only
• International shipping may have restrictions
• Additional fees may apply for special handling

2. Delivery Terms:
• Risk transfers upon delivery
• Signature may be required
• We're not responsible for delivery delays
• Wrong address information may delay delivery

3. International Orders:
• Subject to customs and import duties
• May experience longer delivery times
• Must comply with local regulations
• Additional fees may apply`
  },
  {
    title: "Returns and Refunds",
    content: `1. Return Policy:
• 30-day return window from delivery
• Items must be unused with original tags
• Original packaging required
• Return shipping costs may apply

2. Return Process:
• Initiate returns through your account
• Obtain return authorization
• Use provided return label
• Pack items securely

3. Refund Terms:
• Refunds processed within 14 days
• Original payment method will be refunded
• Shipping costs may not be refunded
• Store credit option available`
  },
  {
    title: "Intellectual Property Rights",
    content: `1. Our Content:
• All content is our exclusive property
• Protected by copyright and trademark laws
• Includes text, images, logos, and design
• No unauthorized use permitted

2. User Content:
• You retain rights to your content
• We get license to use your content
• Must not violate others' rights
• We can remove content at our discretion

3. Restrictions:
• No copying or reproduction
• No commercial use without permission
• No modification of materials
• No removal of proprietary notices`
  },
  {
    title: "Limitation of Liability",
    content: `1. Disclaimer:
• Services provided "as is"
• No warranties of any kind
• Use at your own risk
• We're not liable for third-party services

2. Liability Limits:
• Not liable for indirect damages
• Not liable for lost profits
• Maximum liability limited to purchase price
• Some jurisdictions may not allow limitations

3. Indemnification:
• You agree to indemnify us
• Includes legal fees and costs
• Applies to violations of terms
• Covers third-party claims`
  },
  {
    title: "Dispute Resolution",
    content: `1. Governing Law:
• Laws of our jurisdiction apply
• Exclusive jurisdiction for disputes
• Mandatory arbitration may apply
• Class action waiver

2. Resolution Process:
• Informal resolution first
• Written notice required
• 30-day cooling off period
• Binding arbitration if needed

3. Time Limitation:
• Claims must be filed within one year
• Time starts from incident
• Failure to file waives right
• Exceptions may apply by law`
  }
]

export default function TermsPage({
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
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Please read these terms carefully before using our services
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