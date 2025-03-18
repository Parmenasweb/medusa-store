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
  ShoppingBag,
  ArrowRight
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

// Category icons mapping with colors
const CATEGORY_ICONS = {
  "streetwear": { icon: Shirt, color: "from-blue-500 to-indigo-600" },
  "luxury": { icon: Crown, color: "from-amber-500 to-yellow-600" },
  "accessories": { icon: Watch, color: "from-emerald-500 to-green-600" },
  "new-arrivals": { icon: Sparkles, color: "from-purple-500 to-violet-600" },
  "sale": { icon: Tag, color: "from-rose-500 to-red-600" },
  "trending": { icon: TrendingUp, color: "from-cyan-500 to-blue-600" },
  "default": { icon: ShoppingBag, color: "from-gray-500 to-slate-600" }
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
    <section className="py-24 bg-white dark:bg-emperor-950">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-sm font-medium text-emperor-600 dark:text-emperor-400">
              BROWSE BY CATEGORY
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
              Shop by Category
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300">
              Explore our curated collections and find your perfect style
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {showcaseCategories.map((category) => {
              const metadata = category.metadata as CategoryMetadata | null
              const categoryConfig = CATEGORY_ICONS[category.handle as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.default
              const IconComponent = categoryConfig.icon

              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="group block"
                  >
                    <div className="relative">
                      {/* Background Card */}
                      <div className="aspect-[4/3] rounded-2xl bg-gradient-to-b from-emperor-100 to-emperor-50 dark:from-emperor-900 dark:to-emperor-800 p-6 flex flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-[0.97]">
                        {/* Icon Container */}
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${categoryConfig.color} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-display text-emperor-950 dark:text-white">
                            {category.name}
                          </h3>
                          {metadata?.description && (
                            <p className="text-sm text-emperor-600 dark:text-emperor-300 mt-1 line-clamp-2">
                              {metadata.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emperor-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* View Category Link */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-emperor-600 dark:text-emperor-400 group-hover:text-emperor-950 dark:group-hover:text-white transition-colors">
                      View Category
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </LocalizedClientLink>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 rounded-full hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors font-medium group"
            >
              View All Categories
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 