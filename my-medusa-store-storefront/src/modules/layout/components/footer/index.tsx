"use client"

import { Container } from "@medusajs/ui"
import { motion } from "framer-motion"
import Link from "next/link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { Github, Twitter, Instagram, Youtube, Facebook, MapPin, Mail, Phone } from "lucide-react"

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
  shop: [
    { title: "New Arrivals", href: "/store" },
    { title: "Best Sellers", href: "/store" },
    { title: "Sale", href: "/store" },
    { title: "Collections", href: "/collections" }
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Store Locations", href: "/locations" },
    { title: "Terms & Conditions", href: "/terms" }
  ],
  help: [
    { title: "Customer Service", href: "/support" },
    { title: "Shipping & Returns", href: "/shipping" },
    { title: "Size Guide", href: "/size-guide" },
    { title: "FAQ", href: "/faq" }
  ],
  social: [
    { title: "Instagram", href: "https://instagram.com", icon: <Instagram className="w-5 h-5" /> },
    { title: "Twitter", href: "https://twitter.com", icon: <Twitter className="w-5 h-5" /> },
    { title: "Facebook", href: "https://facebook.com", icon: <Facebook className="w-5 h-5" /> },
    { title: "Youtube", href: "https://youtube.com", icon: <Youtube className="w-5 h-5" /> },
    { title: "Github", href: "https://github.com", icon: <Github className="w-5 h-5" /> }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emperor-50 to-white dark:from-emperor-900 dark:to-emperor-950 relative overflow-hidden border-t border-emperor-200 dark:border-emperor-800">
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-glow-gradient from-glow-primary opacity-20 dark:opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-glow-gradient from-glow-secondary opacity-20 dark:opacity-30 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative py-16 grid grid-cols-1 lg:grid-cols-4 gap-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <Link 
              href="/"
              className="block font-display text-2xl text-emperor-950 dark:text-white"
            >
              EMPEROR
            </Link>
            <div className="space-y-4 text-emperor-600 dark:text-emperor-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <p>123 Fashion Street, Style City, 12345</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <p>contact@emperor.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <p>+1 (234) 567-8900</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 grid grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-emperor-950 dark:text-white">Shop</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.title}>
                    <Link 
                      href={link.href}
                      className="text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-emperor-950 dark:text-white">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.title}>
                    <Link 
                      href={link.href}
                      className="text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-emperor-950 dark:text-white">Help</h3>
              <ul className="space-y-2">
                {footerLinks.help.map((link) => (
                  <li key={link.title}>
                    <Link 
                      href={link.href}
                      className="text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <h3 className="font-medium text-emperor-950 dark:text-white">Connect With Us</h3>
            <div className="flex flex-wrap gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
                  aria-label={link.title}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="relative py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-emperor-200 dark:border-emperor-800"
        >
          <p className="text-emperor-600 dark:text-emperor-400 text-sm">
            © {new Date().getFullYear()} Emperor. All rights reserved.
          </p>
          <MedusaCTA />
        </motion.div>
      </Container>
    </footer>
  )
} 