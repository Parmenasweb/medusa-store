"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { StoreProductCategory } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { 
  Shirt, 
  Crown, 
  Watch, 
  Sparkles, 
  Tag, 
  TrendingUp,
  ShoppingBag
} from "lucide-react"

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

type CategoryMetadata = {
  thumbnail?: string
  featured?: boolean
  description?: string
}

// Category icons mapping
const CATEGORY_ICONS = {
  "streetwear": Shirt,
  "luxury": Crown,
  "accessories": Watch,
  "new-arrivals": Sparkles,
  "sale": Tag,
  "trending": TrendingUp,
  "default": ShoppingBag
} as const

type CategoryShowcaseProps = {
  categories: StoreProductCategory[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  // Filter featured categories or use parent categories if no featured ones
  const showcaseCategories = categories.filter(category => {
    const metadata = category.metadata as CategoryMetadata | null
    return metadata?.featured || !category.parent_category_id
  }).slice(0, 6)

  return (
    <section className="py-16 bg-white dark:bg-emperor-950">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
              Explore our curated collections and find your perfect style
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {showcaseCategories.map((category) => {
              const metadata = category.metadata as CategoryMetadata | null
              const IconComponent = CATEGORY_ICONS[category.handle as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.default

              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                >
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="group flex flex-col items-center text-center p-6 rounded-lg bg-emperor-50 dark:bg-emperor-900 hover:bg-emperor-100 dark:hover:bg-emperor-800 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-emperor-950 dark:text-white" />
                    </div>
                    <h3 className="text-lg font-display text-emperor-950 dark:text-white mb-1">
                      {category.name}
                    </h3>
                    {metadata?.description && (
                      <p className="text-sm text-emperor-600 dark:text-emperor-300">
                        {metadata.description}
                      </p>
                    )}
                  </LocalizedClientLink>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 rounded-full hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors font-medium"
            >
              View All Categories
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 