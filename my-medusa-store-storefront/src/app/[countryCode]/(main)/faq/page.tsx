"use client"
import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container, Button } from "@medusajs/ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// export const metadata: Metadata = {
//   title: "FAQ | Emperor's Clothing",
//   description: "Frequently asked questions about Emperor's Clothing products, shipping, returns, and more.",
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

const faqCategories = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order ships, you'll receive a tracking number via email that you can use to monitor your delivery status."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
      }
    ]
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn items in their original condition with tags attached. Return shipping is free for domestic orders."
      },
      {
        question: "How do I start a return?",
        answer: "Log into your account and visit the Orders section to initiate a return. You'll receive a prepaid shipping label via email."
      },
      {
        question: "Can I exchange an item?",
        answer: "Yes, you can exchange items for a different size or color within 30 days of purchase, subject to availability."
      }
    ]
  },
  {
    title: "Product Information",
    questions: [
      {
        question: "How do I find my size?",
        answer: "Check our size guide for detailed measurements. Each product page includes specific sizing information and fit recommendations."
      },
      {
        question: "Are your products sustainable?",
        answer: "Yes, we use eco-friendly materials and ethical manufacturing processes. Each product page lists specific sustainability features."
      },
      {
        question: "How should I care for my items?",
        answer: "Care instructions are provided on each product's label and product page. Generally, we recommend gentle washing and following garment-specific care guidelines."
      }
    ]
  }
]

export default function FAQPage({
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Find answers to common questions about our products and services
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* FAQ Categories */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Container>
          <div className="grid grid-cols-1 gap-12">
            {faqCategories.map((category) => (
              <motion.div 
                key={category.title}
                variants={itemVariants}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-emperor-200 dark:border-emperor-800 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 text-emperor-950 dark:text-white hover:no-underline hover:bg-emperor-50 dark:hover:bg-emperor-900">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-emperor-600 dark:text-emperor-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 mb-8">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <Button asChild>
              <LocalizedClientLink href="/contact">
                Contact Support
              </LocalizedClientLink>
            </Button>
          </motion.div>
        </Container>
      </motion.section>
    </div>
  )
} 