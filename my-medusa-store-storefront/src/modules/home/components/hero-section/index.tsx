"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const VIDEO_URL = "https://player.vimeo.com/external/451837085.sd.mp4?s=ff8852115da3e22b9f0d3d3d4ccb28a42825b539&profile_id=164&oauth2_token_id=57447761"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl text-white"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display mb-6"
          >
            Redefine Your Style
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8"
          >
            Discover our curated collection of luxury streetwear and fashion essentials.
            Elevate your wardrobe with pieces that make a statement.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emperor-950 rounded-full hover:bg-emperor-100 transition-colors font-medium"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/categories/new-arrivals"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white rounded-full hover:bg-white/10 transition-colors font-medium"
            >
              New Arrivals
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
} 