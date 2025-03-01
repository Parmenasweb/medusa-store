import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "./contact-form"
import { use } from "react"

export const metadata: Metadata = {
  title: "Contact Us | Emperor's Clothing",
  description: "Get in touch with Emperor's Clothing. We're here to help with any questions or concerns.",
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

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "support@emperors-clothing.com",
    description: "For general inquiries and support"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
    description: "Monday to Friday, 9am to 5pm EST"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "123 Fashion Street, New York, NY 10001",
    description: "Our flagship store and headquarters"
  }
]

export default function ContactPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = use(params)

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
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              We're here to help and answer any question you might have
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* Contact Info */}
      <motion.section
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="bg-emperor-50 dark:bg-emperor-900 p-8 rounded-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  <info.icon className="w-8 h-8 text-emperor-600 dark:text-emperor-300" />
                </div>
                <h3 className="text-xl font-display text-emperor-950 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-emperor-950 dark:text-white font-medium mb-2">
                  {info.content}
                </p>
                <p className="text-emperor-600 dark:text-emperor-300 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        </Container>
      </motion.section>
    </div>
  )
} 