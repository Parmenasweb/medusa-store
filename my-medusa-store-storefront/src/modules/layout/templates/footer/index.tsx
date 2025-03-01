"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { StoreProductCategory } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Github, Twitter, Instagram, Facebook } from "lucide-react"

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

const footerLinks = {
  support: [
    { text: "Help Center", href: "/help" },
    { text: "Contact Us", href: "/contact" },
    { text: "Size Guide", href: "/size-guide" },
    { text: "Shipping Information", href: "/shipping" },
    { text: "Returns & Exchanges", href: "/shipping#returns" }
  ],
  about: [
    { text: "About Us", href: "/about" },
    { text: "Careers", href: "/careers" },
    { text: "Blog", href: "/blog" },
    { text: "Store Locations", href: "/stores" }
  ],
  legal: [
    { text: "Terms of Service", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Cookie Policy", href: "/cookies" }
  ],
  social: [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" }
  ]
}

type FooterProps = {
  categories: StoreProductCategory[]
}

export default function Footer({ categories }: FooterProps) {
  const parentCategories = categories?.filter(category => !category.parent_category)

  return (
    <footer className="bg-white dark:bg-emperor-950 border-t border-emperor-200 dark:border-emperor-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Categories */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="text-emperor-950 dark:text-white font-display text-xl mb-6">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {parentCategories?.map((category) => (
                  <LocalizedClientLink
                    key={category.id}
                    href={`/categories/${category.handle}`}
                    className="text-emperor-600 dark:text-emperor-300 hover:text-emperor-950 dark:hover:text-white transition-colors"
                  >
                    {category.name}
                  </LocalizedClientLink>
                ))}
              </div>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants}>
              <h3 className="text-emperor-950 dark:text-white font-display text-xl mb-6">
                Support
              </h3>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.text}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-emperor-600 dark:text-emperor-300 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    >
                      {link.text}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* About */}
            <motion.div variants={itemVariants}>
              <h3 className="text-emperor-950 dark:text-white font-display text-xl mb-6">
                About
              </h3>
              <ul className="space-y-4">
                {footerLinks.about.map((link) => (
                  <li key={link.text}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-emperor-600 dark:text-emperor-300 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    >
                      {link.text}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants}>
              <h3 className="text-emperor-950 dark:text-white font-display text-xl mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.text}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-emperor-600 dark:text-emperor-300 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    >
                      {link.text}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-emperor-200 dark:border-emperor-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-emperor-600 dark:text-emperor-300">
                © {new Date().getFullYear()} Emperor's Clothing. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emperor-600 dark:text-emperor-300 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </footer>
  )
}
