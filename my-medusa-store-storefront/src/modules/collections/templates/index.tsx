"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { Filter, ChevronRight, Tag } from "lucide-react"
import { Container } from "@medusajs/ui"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

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

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[100vh] bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-950 dark:to-emperor-900"
    >
      {/* Collection Hero */}
      <motion.div 
        variants={itemVariants}
        className="relative w-full bg-gradient-to-r from-emperor-100 to-emperor-200 dark:from-emperor-900 dark:to-emperor-800 py-24 mb-16 overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-glow-gradient from-glow-primary opacity-30 dark:opacity-40 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-glow-gradient from-glow-secondary opacity-30 dark:opacity-40 blur-3xl" />
        </div>

        <Container>
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
                <Tag className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span className="text-sm font-medium text-emperor-950 dark:text-white">Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white">
                {collection.title}
              </h1>
              <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
                Explore our curated selection of premium products
              </p>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Main Content */}
      <Container>
        <div className="flex flex-col small:flex-row gap-8 py-6">
          {/* Sidebar */}
          <motion.aside 
            variants={itemVariants}
            className="flex-none w-full small:w-64 hidden small:block"
          >
            <div className="sticky top-24">
              <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
                <RefinementList
                  refinementList={[]}
                  selectedCategories={[]}
                  sortBy={sort}
                />
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <motion.div 
            variants={itemVariants}
            className="flex-1"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display text-emperor-950 dark:text-white">
                  Products
                </h2>
                <p className="text-emperor-600 dark:text-emperor-300 mt-2">
                  {collection.products?.length || 0} items
                </p>
              </div>

              <button className="flex items-center gap-x-2 px-4 py-2 rounded-xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark text-emperor-950 dark:text-white small:hidden">
                <Filter size={20} />
                <span>Filter & Sort</span>
              </button>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      variants={itemVariants}
                      className="animate-pulse bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass rounded-2xl aspect-[3/4]"
                    />
                  ))}
                </div>
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                collectionId={collection.id}
                countryCode={countryCode}
              />
            </Suspense>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}
