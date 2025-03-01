import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Terms of Service | Emperor's Clothing",
  description: "Read our Terms of Service to understand your rights and responsibilities when using Emperor's Clothing services.",
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

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing and using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.`
  },
  {
    title: "Use License",
    content: `Permission is granted to temporarily download one copy of the materials (information or software) on Emperor's Clothing's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
    
    • Modify or copy the materials
    • Use the materials for any commercial purpose
    • Attempt to decompile or reverse engineer any software contained on the site
    • Remove any copyright or other proprietary notations from the materials
    • Transfer the materials to another person or "mirror" the materials on any other server`
  },
  {
    title: "Product Information",
    content: `We strive to display our products and their colors as accurately as possible. However, we cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right to modify our products and prices at any time without notice.`
  },
  {
    title: "Ordering and Payment",
    content: `When you place an order, you offer to purchase the product at the price stated. All orders are subject to acceptance and availability. We reserve the right to refuse any order. Payment must be made at the time of ordering.`
  },
  {
    title: "Shipping and Delivery",
    content: `Delivery times are estimates only. We are not responsible for any delays caused by shipping carriers or customs. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.`
  },
  {
    title: "Returns and Refunds",
    content: `We accept returns within 30 days of delivery for unused items in their original condition. Refunds will be processed to the original payment method. Shipping costs for returns are the customer's responsibility unless the item was received damaged or incorrect.`
  },
  {
    title: "Account Responsibilities",
    content: `If you create an account, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.`
  },
  {
    title: "Intellectual Property",
    content: `All content included on this site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of Emperor's Clothing or its suppliers and protected by copyright and intellectual property laws.`
  },
  {
    title: "Limitation of Liability",
    content: `Emperor's Clothing shall not be liable for any damages arising from the use or inability to use our services. This includes but is not limited to direct, indirect, incidental, punitive, and consequential damages.`
  }
]

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* Introduction */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <p className="text-emperor-600 dark:text-emperor-300 leading-relaxed">
              Please read these Terms of Service carefully before using Emperor's Clothing's website and services. These terms constitute a legally binding agreement between you and Emperor's Clothing regarding your use of our services.
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* Terms Sections */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className={`pb-12 ${
                  index !== sections.length - 1 ? "border-b border-emperor-200 dark:border-emperor-800" : ""
                }`}
              >
                <h2 className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-6">
                  {section.title}
                </h2>
                <div className="text-emperor-600 dark:text-emperor-300 space-y-4">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-16 bg-emperor-50 dark:bg-emperor-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 mb-8">
              If you have any questions about our Terms of Service, please don't hesitate to contact us.
            </p>
            <a
              href="/contact"
              className="inline-block bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Contact Us
            </a>
          </motion.div>
        </Container>
      </motion.section>
    </div>
  )
} 