"use client"

import { motion } from "framer-motion"
import { HttpTypes, StoreProductCategory, StoreRegion } from "@medusajs/types"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { Suspense, useState } from "react"
import { Spinner } from "@medusajs/icons"
import { Filter, ChevronRight, Sparkles } from "lucide-react"
import { Container, Button } from "@medusajs/ui"
import ProductGrid from "@modules/store/components/product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import MobileFilter from "@modules/store/components/mobile-filter"
import { useProducts } from "@lib/hooks/use-products"
import FeaturedCategories from "../components/featured-categories"
import TrendingProducts from "../components/trending-products"
import NewArrivals from "../components/new-arrivals"
import Newsletter from "../components/newsletter"
import { SortOptions } from "../components/refinement-list/sort-products"

type StoreClientPageProps = {
  region: StoreRegion
  categories: StoreProductCategory[]
  params: { countryCode: string }
  queryParams: StoreGetProductsParams
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

export default function StoreClientPage({
  region,
  categories,
  params,
  queryParams,
}: StoreClientPageProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage, error } = useProducts({
    queryParams,
    countryCode: params.countryCode,
    region,
  })

  const products = data?.pages?.flatMap((page) => page?.products || []) || []
  const trendingProducts = products.slice(0, 4)
  const newArrivals = products.slice(0, 4)
  const isEmpty = !products.length && !isLoading

  const sortBy = queryParams.order as SortOptions | undefined

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center">
          <Filter className="w-8 h-8 text-emperor-950 dark:text-white" />
        </div>
        <h3 className="text-emperor-950 dark:text-white text-2xl font-display mb-4">
          Error Loading Products
        </h3>
        <p className="text-emperor-600 dark:text-emperor-300 max-w-lg">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100vh] bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-950 dark:to-emperor-900">
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

        <Container>
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span className="text-sm font-medium text-emperor-950 dark:text-white">New Collection Available</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white">
                Discover Your Style
              </h1>
              <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
                Explore our curated collection of exclusive streetwear and luxury fashion pieces.
              </p>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Featured Categories */}
      <Container>
        <motion.div 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white">
                Shop by Category
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300">
                Browse our collections by category
              </p>
            </div>
            <button className="flex items-center gap-2 text-emperor-950 dark:text-white hover:text-emperor-600 dark:hover:text-emperor-300 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <FeaturedCategories categories={categories} />
        </motion.div>

        {/* Main Store Content */}
        <div className="flex flex-col small:flex-row gap-8 py-6">
          {/* Sidebar */}
          <motion.aside 
            className="flex-none w-full small:w-64 hidden small:block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-24">
              <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
                <RefinementList
                  refinementList={categories}
                  selectedCategories={queryParams.category_id || []}
                  sortBy={sortBy}
                />
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div 
              className="mb-8 flex justify-between items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex-1">
                <h2 className="font-display text-2xl md:text-3xl text-emperor-950 dark:text-white">
                  All Products
                </h2>
                <p className="text-emperor-600 dark:text-emperor-300 mt-2">
                  {products.length} items found
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-x-4">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="flex items-center gap-x-2 px-4 py-2 rounded-xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark text-emperor-950 dark:text-white small:hidden"
                >
                  <Filter size={20} />
                  <span>Filter & Sort</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Product Grid */}
            <div className="relative">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="animate-pulse bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass rounded-2xl aspect-[3/4]"
                    />
                  ))}
                </div>
              ) : isEmpty ? (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center">
                    <Filter className="w-8 h-8 text-emperor-950 dark:text-white" />
                  </div>
                  <h3 className="text-emperor-950 dark:text-white text-2xl font-display mb-4">
                    No Products Found
                  </h3>
                  <p className="text-emperor-600 dark:text-emperor-300 max-w-lg">
                    Try adjusting your search or filter parameters
                  </p>
                </motion.div>
              ) : (
                <>
                  <ProductGrid products={products} region={region} />
                  
                  {hasNextPage && (
                    <motion.div 
                      variants={itemVariants}
                      className="flex justify-center mt-16"
                    >
                      <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-8 py-4 rounded-full bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                      >
                        {isFetchingNextPage ? (
                          <Spinner />
                        ) : (
                          <>
                            Load More Products
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Trending Products Section */}
        <motion.div 
          className="py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TrendingProducts products={trendingProducts} region={region} />
        </motion.div>

        {/* New Arrivals Section */}
        <motion.div 
          className="py-24 rounded-3xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <NewArrivals products={newArrivals} region={region} />
        </motion.div>

        {/* Newsletter Section */}
        <div className="py-24">
          <Newsletter />
        </div>
      </Container>

      {/* Mobile Filter */}
      <MobileFilter
        categories={categories}
        selectedCategories={queryParams.category_id || []}
        sortBy={sortBy}
        isOpen={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
      />
    </div>
  )
} 