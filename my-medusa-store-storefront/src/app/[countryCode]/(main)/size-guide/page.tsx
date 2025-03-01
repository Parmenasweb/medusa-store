"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import Image from "next/image"

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
    title: "How to Measure",
    content: `For accurate measurements, please follow these guidelines:

1. General Tips:
• Use a soft measuring tape
• Measure against bare skin or light clothing
• Stand straight and relaxed
• Get help for hard-to-reach measurements

2. Required Measurements:
• Chest/Bust: Around the fullest part
• Waist: At natural waistline
• Hips: At widest point
• Inseam: From crotch to ankle
• Shoulders: Across back shoulder to shoulder`
  },
  {
    title: "Men's Tops",
    content: `Size Guide for Men's Tops (in inches):

XS (34-36):
• Chest: 34-36"
• Waist: 28-30"
• Shoulders: 17"
• Sleeve: 32"

S (36-38):
• Chest: 36-38"
• Waist: 30-32"
• Shoulders: 17.5"
• Sleeve: 32.5"

M (38-40):
• Chest: 38-40"
• Waist: 32-34"
• Shoulders: 18"
• Sleeve: 33"

L (40-42):
• Chest: 40-42"
• Waist: 34-36"
• Shoulders: 18.5"
• Sleeve: 33.5"

XL (42-44):
• Chest: 42-44"
• Waist: 36-38"
• Shoulders: 19"
• Sleeve: 34"

XXL (44-46):
• Chest: 44-46"
• Waist: 38-40"
• Shoulders: 19.5"
• Sleeve: 34.5"`
  },
  {
    title: "Men's Bottoms",
    content: `Size Guide for Men's Bottoms (in inches):

XS (28):
• Waist: 28"
• Hip: 34"
• Inseam: 32"
• Thigh: 21"

S (30):
• Waist: 30"
• Hip: 36"
• Inseam: 32"
• Thigh: 22"

M (32):
• Waist: 32"
• Hip: 38"
• Inseam: 32"
• Thigh: 23"

L (34):
• Waist: 34"
• Hip: 40"
• Inseam: 32"
• Thigh: 24"

XL (36):
• Waist: 36"
• Hip: 42"
• Inseam: 32"
• Thigh: 25"

XXL (38):
• Waist: 38"
• Hip: 44"
• Inseam: 32"
• Thigh: 26"`
  },
  {
    title: "Women's Tops",
    content: `Size Guide for Women's Tops (in inches):

XS (0-2):
• Bust: 32-33"
• Waist: 24-25"
• Shoulders: 14"
• Sleeve: 30"

S (4-6):
• Bust: 34-35"
• Waist: 26-27"
• Shoulders: 14.5"
• Sleeve: 30.5"

M (8-10):
• Bust: 36-37"
• Waist: 28-29"
• Shoulders: 15"
• Sleeve: 31"

L (12-14):
• Bust: 38-40"
• Waist: 30-32"
• Shoulders: 15.5"
• Sleeve: 31.5"

XL (16-18):
• Bust: 41-43"
• Waist: 33-35"
• Shoulders: 16"
• Sleeve: 32"

XXL (20-22):
• Bust: 44-46"
• Waist: 36-38"
• Shoulders: 16.5"
• Sleeve: 32.5"`
  },
  {
    title: "Women's Bottoms",
    content: `Size Guide for Women's Bottoms (in inches):

XS (0-2):
• Waist: 24-25"
• Hip: 34-35"
• Inseam: 30"
• Rise: 9"

S (4-6):
• Waist: 26-27"
• Hip: 36-37"
• Inseam: 30"
• Rise: 9.25"

M (8-10):
• Waist: 28-29"
• Hip: 38-39"
• Inseam: 30"
• Rise: 9.5"

L (12-14):
• Waist: 30-32"
• Hip: 40-42"
• Inseam: 30"
• Rise: 9.75"

XL (16-18):
• Waist: 33-35"
• Hip: 43-45"
• Inseam: 30"
• Rise: 10"

XXL (20-22):
• Waist: 36-38"
• Hip: 46-48"
• Inseam: 30"
• Rise: 10.25"`
  },
  {
    title: "International Size Conversion",
    content: `Use this guide to convert between different size systems:

Men's Tops & Bottoms:
• US/UK: XS, S, M, L, XL, XXL
• EU: 44, 46, 48, 50, 52, 54
• IT: 44, 46, 48, 50, 52, 54
• JP: SS, S, M, L, LL, 3L

Women's Tops & Bottoms:
• US: 0-2, 4-6, 8-10, 12-14, 16-18, 20-22
• UK: 4-6, 8-10, 12-14, 16-18, 20-22, 24-26
• EU: 32-34, 36-38, 40-42, 44-46, 48-50, 52-54
• IT: 36-38, 40-42, 44-46, 48-50, 52-54, 56-58`
  },
  {
    title: "Product Specific Guidance",
    content: `Additional sizing notes for specific product types:

1. Outerwear:
• Size up if planning to layer underneath
• Check sleeve length for proper coverage
• Consider shoulder fit for mobility

2. Fitted Items:
• Check stretch factor in product description
• Consider body shape and fit preference
• Review customer feedback for fit accuracy

3. Special Fits:
• Slim fit: Consider sizing up
• Oversized: Consider sizing down
• Cropped: Check length measurements
• Stretch: True to size usually works`
  }
]

export default function SizeGuidePage({
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
              Size Guide
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Find your perfect fit with our detailed size charts and measurement guides
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