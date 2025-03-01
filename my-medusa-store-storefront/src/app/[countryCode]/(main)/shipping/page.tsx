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
    title: "Shipping Methods",
    content: `We offer several shipping options to meet your needs:

1. Standard Shipping (3-5 business days):
• Free on orders over $100
• $7.95 for orders under $100
• Available for all domestic addresses
• Tracking provided via email

2. Express Shipping (1-2 business days):
• $14.95 flat rate
• Order by 2 PM for same-day dispatch
• Available for most metropolitan areas
• Real-time tracking updates

3. International Shipping (7-14 business days):
• Starting from $24.95
• Duties and taxes not included
• Full tracking capability
• Available to most countries`
  },
  {
    title: "Delivery Times",
    content: `Estimated delivery times by region:

1. Domestic Deliveries:
• Metropolitan areas: 1-3 business days
• Regional areas: 2-5 business days
• Remote areas: 5-7 business days
• PO boxes: Additional 1-2 days

2. International Deliveries:
• North America: 7-10 business days
• Europe: 8-12 business days
• Asia Pacific: 10-14 business days
• Rest of World: 12-21 business days

Note: These are estimates and may vary during peak seasons or due to customs processing.`
  },
  {
    title: "Shipping Costs",
    content: `Our shipping rates are calculated based on:

1. Order Value:
• Free shipping on orders over $100 (domestic)
• Flat rate shipping under $100
• International rates vary by destination

2. Package Weight:
• Standard rate up to 2kg
• Additional cost per kg over 2kg
• Oversized items may incur extra charges

3. Destination:
• Domestic zones (3 tiers)
• International zones (4 tiers)
• Remote area surcharges may apply`
  },
  {
    title: "Order Tracking",
    content: `Track your order easily:

1. Tracking Updates:
• Automatic email notifications
• SMS updates (where available)
• Real-time tracking via your account
• Detailed shipment milestones

2. Tracking Features:
• Estimated delivery date
• Current package location
• Delivery attempt notifications
• Signature confirmation (if required)`
  },
  {
    title: "International Shipping",
    content: `Important information for international orders:

1. Customs & Import Duties:
• Recipient responsible for duties/taxes
• Pre-paid duties available for some countries
• Customs forms provided by us
• May require additional documentation

2. Restrictions:
• Some items restricted in certain countries
• Size and weight limitations apply
• Certain shipping methods unavailable
• Insurance included on all orders`
  },
  {
    title: "Shipping Restrictions",
    content: `Please note the following restrictions:

1. Address Requirements:
• Must be complete and accurate
• No P.O. boxes for express shipping
• Military addresses have special requirements
• Some remote areas may be restricted

2. Product Restrictions:
• Certain items can't be shipped internationally
• Oversized items have special requirements
• Hazardous materials restrictions
• Temperature-sensitive items`
  },
  {
    title: "Lost or Damaged Packages",
    content: `Our policy for lost or damaged shipments:

1. Lost Packages:
• Investigation initiated after 7 days (domestic)
• 21 days for international shipments
• Full refund or replacement offered
• Insurance claim process handled by us

2. Damaged Packages:
• Photo documentation required
• Report within 48 hours of receipt
• Return shipping provided free
• Immediate replacement shipping`
  },
  {
    title: "Special Services",
    content: `Additional shipping services available:

1. Gift Shipping:
• Free gift wrapping service
• Personal message option
• Discreet packaging available
• Multiple shipping addresses per order

2. Special Handling:
• Signature required delivery
• Saturday delivery (select areas)
• Hold for pickup option
• Specific delivery time windows`
  }
]

export default function ShippingPage({
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
              Shipping Information
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Everything you need to know about our shipping services and delivery options
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