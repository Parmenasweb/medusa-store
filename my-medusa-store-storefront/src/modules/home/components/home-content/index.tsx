"use client"

import { motion } from "framer-motion"
import { StoreRegion, StoreProductCategory } from "@medusajs/types"
import HeroSection from "../hero-section"
import FeaturedProducts from "../featured-products"
import CategoryShowcase from "../category-showcase"
import TrendingSection from "../trending-section"
import BenefitsSection from "../benefits-section"
import Newsletter from "../newsletter"
import InstagramFeed from "../instagram-feed"
import YoutubeSection from "../youtube-section"

type HomeContentProps = {
  categories: StoreProductCategory[]
  region: StoreRegion
}

export default function HomeContent({ categories, region }: HomeContentProps) {
  return (
    <>
      <HeroSection />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-0"
      >
        <CategoryShowcase categories={categories} />
        <FeaturedProducts region={region} />
        <BenefitsSection />
        <TrendingSection region={region} />
        <YoutubeSection />
        <InstagramFeed />
        <Newsletter />
      </motion.div>
    </>
  )
} 