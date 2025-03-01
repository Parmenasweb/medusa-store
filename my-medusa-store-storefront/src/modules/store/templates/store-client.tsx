"use client"

import { motion } from "framer-motion"
import { HttpTypes, StoreProductCategory, StoreRegion } from "@medusajs/types"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { Suspense, useState } from "react"
import { Spinner } from "@medusajs/icons"
import { Filter } from "lucide-react"
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
    y: 0
  }
}

export default function StoreClientPage({
  region,
  categories,
  params,
  queryParams,
}: StoreClientPageProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useProducts({
    queryParams,
    countryCode: params.countryCode,
    region,
  })

  const products = data?.pages.flatMap((page) => page.products) || []
  const trendingProducts = products.slice(0, 4)
  const newArrivals = products.slice(0, 4)
  const isEmpty = !products.length && !isLoading

  const sortBy = queryParams.order as SortOptions | undefined

  return (
    <div className="flex flex-col min-h-[100vh] bg-white dark:bg-emperor-950">
      {/* Hero Section */}
      <motion.div 
        className="w-full bg-gradient-to-r from-emperor-100 to-emperor-200 dark:from-emperor-900 dark:to-emperor-800 py-16 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="content-container">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white mb-4"
          >
            Discover Your Style
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300 max-w-2xl"
          >
            Explore our curated collection of exclusive streetwear and luxury fashion pieces.
          </motion.p>
        </div>
      </motion.div>

      {/* Featured Categories */}
      <div className="content-container mb-16">
        <FeaturedCategories categories={categories} />
      </div>

      {/* Main Store Content */}
      <div className="content-container">
        <div className="flex flex-col small:flex-row gap-8 py-6">
          {/* Sidebar */}
          <motion.aside 
            className="flex-none w-full small:w-64 hidden small:block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <RefinementList
              refinementList={categories}
              selectedCategories={queryParams.category_id || []}
              sortBy={sortBy}
            />
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8 flex flex-col gap-y-4">
              <motion.div 
                className="flex justify-between items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex-1">
                  <h2 className="font-display text-3xl text-emperor-950 dark:text-white">
                    All Products
                  </h2>
                  <p className="text-emperor-600 dark:text-emperor-300 mt-2">
                    {products.length} items found
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-x-4">
                  <button
                    onClick={() => setShowMobileFilter(true)}
                    className="flex items-center gap-x-2 bg-emperor-100 dark:bg-emperor-800 px-4 py-2 rounded-lg text-emperor-600 dark:text-emperor-300 small:hidden"
                  >
                    <Filter size={20} />
                    <span>Filter & Sort</span>
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Product Grid */}
            <div className="relative">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="animate-pulse bg-emperor-100 dark:bg-emperor-800 rounded-lg aspect-[4/5]"
                    />
                  ))}
                </div>
              ) : isEmpty ? (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
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
                      className="flex justify-center mt-12"
                    >
                      <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                      >
                        {isFetchingNextPage ? (
                          <Spinner />
                        ) : (
                          "Load More Products"
                        )}
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="content-container py-16">
        <TrendingProducts products={trendingProducts} region={region} />
      </div>

      {/* New Arrivals Section */}
      <div className="content-container py-16 bg-emperor-50 dark:bg-emperor-900">
        <NewArrivals products={newArrivals} region={region} />
      </div>

      {/* Newsletter Section */}
      <div className="content-container py-16">
        <Newsletter />
      </div>

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