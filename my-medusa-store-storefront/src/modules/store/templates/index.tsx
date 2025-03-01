"use client"

import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SortOptions } from "../components/refinement-list/sort-products"
import ProductGrid from "../components/product-grid"
import RefinementList from "../components/refinement-list"
import MobileFilter from "../components/mobile-filter"
import { Button } from "@medusajs/ui"

type StoreTemplateProps = {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
  sortBy?: SortOptions
  page?: number
  selectedCategories?: string[]
  region: HttpTypes.StoreRegion
  initialData: {
    products: HttpTypes.StoreProduct[]
    count: number
  }
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

export default function StoreTemplate({
  categories,
  countryCode,
  sortBy = "created_at",
  page = 1,
  selectedCategories = [],
  region,
  initialData,
}: StoreTemplateProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const router = useRouter()

  if (!region?.id) {
    return (
      <div className="flex h-[75vh] w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Region Not Found
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Unable to determine the region for your location.
          </p>
        </div>
      </div>
    )
  }

  const handlePagination = () => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("page", (page + 1).toString())
    router.push(`/${countryCode}/store?${searchParams.toString()}`)
  }

  const hasNextPage = initialData ? initialData.count > page * 12 : false

  return (
    <div className="content-container py-6">
      <div className="flex flex-col small:flex-row gap-8 py-6">
        <motion.aside 
          className="flex-none w-full small:w-64 hidden small:block"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <RefinementList
            sortBy={sortBy}
            categories={categories}
            countryCode={countryCode}
            selectedCategories={selectedCategories}
          />
        </motion.aside>

        <div className="flex-1">
          <div className="mb-8 flex flex-col gap-y-4">
            <motion.div 
              className="flex justify-between items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={itemVariants}
                className="font-display text-3xl-regular text-emperor-950 dark:text-white"
              >
                Store
              </motion.h1>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-x-4"
              >
                <Button
                  variant="secondary"
                  onClick={() => setShowMobileFilter(true)}
                  className="flex small:hidden"
                >
                  Filter & Sort
                </Button>
              </motion.div>
            </motion.div>
            <motion.p 
              variants={itemVariants}
              className="text-emperor-600 dark:text-emperor-300"
            >
              Browse our collection of exclusive streetwear and luxury fashion.
            </motion.p>
          </div>

          {initialData?.products && initialData.products.length > 0 ? (
            <ProductGrid products={initialData.products} region={region} />
          ) : (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                No products found matching your criteria
              </p>
            </div>
          )}

          {hasNextPage && (
            <div className="flex items-center justify-center mt-12">
              <Button
                variant="secondary"
                onClick={handlePagination}
                className="w-72"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>

      <MobileFilter
        sortBy={sortBy}
        categories={categories}
        countryCode={countryCode}
        selectedCategories={selectedCategories}
        isOpen={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
      />
    </div>
  )
}
