"use client"

import { motion } from "framer-motion"
import { StoreProductCategory } from "@medusajs/types"
import { Text, Container, Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Link from "next/link"
import { Shirt, Watch, Gem, Glasses, ShoppingBag } from "lucide-react"

type CategoryMetadata = {
  thumbnail?: string
  productCount?: number
}

type FeaturedCategoriesProps = {
  categories: StoreProductCategory[]
}

const categoryIcons: Record<string, JSX.Element> = {
  "clothing": <Shirt className="w-6 h-6" />,
  "accessories": <Watch className="w-6 h-6" />,
  "jewelry": <Gem className="w-6 h-6" />,
  "eyewear": <Glasses className="w-6 h-6" />,
  "default": <ShoppingBag className="w-6 h-6" />
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
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  const featuredCategories = categories.slice(0, 6)

  return (
    <Container>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <Heading 
          level="h2"
          className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-8"
        >
          Featured Categories
        </Heading>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {featuredCategories.map((category) => {
            const icon = categoryIcons[category.name.toLowerCase()] || categoryIcons.default

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <Link
                  href={`/store?categories[]=${category.id}`}
                  className="block h-full"
                >
                  <div className="relative aspect-[4/5] rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:2rem_2rem] opacity-20 dark:opacity-10" />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-glow-gradient from-glow-primary opacity-30 dark:opacity-40 blur-xl" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-emperor-50 dark:bg-emperor-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {icon}
                      </div>
                      <h3 className="text-lg font-medium text-emperor-950 dark:text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-emperor-600 dark:text-emperor-400">
                        {category.handle.split("-").join(" ")}
                      </p>
                    </div>

                    {/* Hover Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-emperor-200 dark:group-hover:border-emperor-700 rounded-2xl transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>
    </Container>
  )
} 