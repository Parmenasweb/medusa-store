"use client"

import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import { Grid3X3, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type CategoriesTemplateProps = {
  categories: HttpTypes.StoreProductCategory[]
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

export default function CategoriesTemplate({ categories }: CategoriesTemplateProps) {
  // Organize categories into a hierarchy
  const categoryMap = new Map<string | null, HttpTypes.StoreProductCategory[]>()
  
  // Initialize with parent categories (null parent_category_id)
  categoryMap.set(null, [])
  
  // Group categories by their parent
  categories.forEach(category => {
    const parentId = category.parent_category?.id || null
    if (!categoryMap.has(parentId)) {
      categoryMap.set(parentId, [])
    }
    categoryMap.get(parentId)!.push(category)
  })

  // Get parent categories
  const parentCategories = categoryMap.get(null) || []

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-950 dark:to-emperor-900">
      {/* Hero Section */}
      <motion.div 
        className="relative w-full bg-gradient-to-r from-emperor-100 to-emperor-200 dark:from-emperor-900 dark:to-emperor-800 py-24 mb-16 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-glow-gradient from-glow-primary opacity-30 dark:opacity-40 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-glow-gradient from-glow-secondary opacity-30 dark:opacity-40 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
              <Grid3X3 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className="text-sm font-medium text-emperor-950 dark:text-white">Browse Categories</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white">
              Shop by Category
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
              Explore our wide range of products organized by categories
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="content-container py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8"
        >
          {parentCategories.map((parentCategory) => {
            const childCategories = categoryMap.get(parentCategory.id) || []
            
            return (
              <motion.div
                key={parentCategory.id}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark"
              >
                {/* Parent Category */}
                <Link 
                  href={`/store?category_id[]=${parentCategory.id}`}
                  className="flex items-center justify-between mb-6 group"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-display text-emperor-950 dark:text-white group-hover:text-emperor-600 dark:group-hover:text-emperor-300 transition-colors">
                      {parentCategory.name}
                    </h2>
                    {parentCategory.description && (
                      <p className="text-emperor-600 dark:text-emperor-400">
                        {parentCategory.description}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-6 h-6 text-emperor-400 dark:text-emperor-500 group-hover:text-emperor-600 dark:group-hover:text-emperor-300 transition-colors" />
                </Link>

                {/* Child Categories */}
                {childCategories.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {childCategories.map((childCategory) => (
                      <Link
                        key={childCategory.id}
                        href={`/store?category_id[]=${childCategory.id}`}
                        className="p-4 rounded-xl bg-white/50 dark:bg-emperor-800/50 hover:bg-white dark:hover:bg-emperor-800 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          {childCategory.thumbnail && (
                            <div className="w-12 h-12 rounded-lg bg-emperor-100 dark:bg-emperor-900 overflow-hidden">
                              <Image
                                src={childCategory.thumbnail}
                                alt={childCategory.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-medium text-emperor-950 dark:text-white group-hover:text-emperor-600 dark:group-hover:text-emperor-300 transition-colors">
                              {childCategory.name}
                            </h3>
                            {childCategory.description && (
                              <p className="text-sm text-emperor-600 dark:text-emperor-400">
                                {childCategory.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
} 