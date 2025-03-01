"use client"

import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"

type ProductGridProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  isLoading?: boolean
  error?: Error | null
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

export default function ProductGrid({ products, region, isLoading, error }: ProductGridProps) {
  if (error) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-emperor-600 dark:text-emperor-300">
          {error.message || "Error loading products"}
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div 
            key={i}
            className="animate-pulse bg-white dark:bg-emperor-900 rounded-lg shadow-sm"
          >
            <div className="aspect-[4/3] w-full bg-emperor-100 dark:bg-emperor-800 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-2/3 bg-emperor-100 dark:bg-emperor-800 rounded" />
              <div className="h-4 w-1/2 bg-emperor-100 dark:bg-emperor-800 rounded" />
              <div className="h-4 w-1/3 bg-emperor-100 dark:bg-emperor-800 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-emperor-600 dark:text-emperor-300">
          No products found
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      {products.map((product) => (
        <ProductPreview 
          key={product.id} 
          product={product} 
          region={region} 
        />
      ))}
    </motion.div>
  )
} 