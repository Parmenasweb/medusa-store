import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ | Emperor's Clothing",
  description: "Frequently asked questions about Emperor's Clothing products, shipping, returns, and more.",
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

const faqCategories = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our website or the carrier's site."
      }
    ]
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for customers in the US."
      },
      {
        question: "How do I start a return?",
        answer: "Log into your account, go to your orders, and select the item you wish to return. Follow the prompts to generate a return label."
      },
      {
        question: "Can I exchange an item for a different size?",
        answer: "Yes, exchanges are available for different sizes of the same item. Start the process through your account or contact customer service."
      }
    ]
  },
  {
    title: "Product Information",
    questions: [
      {
        question: "How do I find my size?",
        answer: "Check our size guide on each product page. We provide detailed measurements to help you find the perfect fit."
      },
      {
        question: "Are your products sustainable?",
        answer: "Yes, we prioritize sustainability in our production. Our materials are ethically sourced and we use eco-friendly packaging."
      },
      {
        question: "How should I care for my items?",
        answer: "Care instructions are provided on each product's label and page. Generally, we recommend washing in cold water and air drying."
      }
    ]
  }
]

export default function FAQPage() {
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
        whileInView="visible"
        viewport={{ once: true }}
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
              Still Have Questions?
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 mb-8">
              Our customer service team is here to help. Contact us and we'll get back to you as soon as possible.
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