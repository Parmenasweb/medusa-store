"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, ChevronRight } from "lucide-react"

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 space-y-8"
          >
            {/* Announcement Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-medium text-white">
                New
              </span>
              <span className="text-sm text-white">Spring Collection 2024</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display text-white space-y-4"
            >
              <span className="block">Redefine</span>
              <span className="block">Your Style</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/90 max-w-lg"
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emperor-950 rounded-full hover:bg-emperor-100 transition-colors font-medium group"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/categories/new-arrivals"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white rounded-full hover:bg-white/10 transition-colors font-medium"
              >
                New Arrivals
              </LocalizedClientLink>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
            >
              <div>
                <div className="text-3xl font-display text-white">50+</div>
                <div className="text-sm text-white/60">Brands</div>
              </div>
              <div>
                <div className="text-3xl font-display text-white">1000+</div>
                <div className="text-sm text-white/60">Products</div>
              </div>
              <div>
                <div className="text-3xl font-display text-white">24/7</div>
                <div className="text-sm text-white/60">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Products Preview */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 hidden lg:block"
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {/* Featured Product Cards - These would be dynamic in production */}
              <div className="aspect-[3/4] rounded-lg bg-white/10 backdrop-blur-sm p-4 flex flex-col justify-end">
                <div className="text-white">
                  <div className="text-sm font-medium">Featured</div>
                  <div className="text-lg">Urban Jacket</div>
                  <div className="text-sm opacity-60">$199.00</div>
                </div>
              </div>
              <div className="aspect-[3/4] rounded-lg bg-white/10 backdrop-blur-sm p-4 flex flex-col justify-end translate-y-8">
                <div className="text-white">
                  <div className="text-sm font-medium">New Arrival</div>
                  <div className="text-lg">Street Pants</div>
                  <div className="text-sm opacity-60">$89.00</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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