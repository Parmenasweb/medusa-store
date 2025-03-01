"use client"

import { useProduct } from "@lib/hooks/use-product"
import { motion } from "framer-motion"
import Image from "next/image"

type ProductInfoProps = {
  id?: string
  handle?: string
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

export default function ProductInfo({ id, handle }: ProductInfoProps) {
  const { data, isLoading, error } = useProduct({ id, handle })

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !data?.product) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <p className="text-emperor-600 dark:text-emperor-300">
          {error ? "Error loading product" : "Product not found"}
        </p>
      </div>
    )
  }

  const { product } = data

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12"
    >
      {/* Product Images */}
      <motion.div variants={itemVariants} className="space-y-4">
        {product.images?.map((image) => (
          <div key={image.id} className="relative aspect-square w-full">
            <Image
              src={image.url}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
            />
          </div>
        ))}
      </motion.div>

      {/* Product Details */}
      <motion.div variants={itemVariants} className="space-y-8">
        <div>
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-display text-emperor-950 dark:text-white mb-4"
          >
            {product.title}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-emperor-600 dark:text-emperor-300"
          >
            {product.description}
          </motion.p>
        </div>

        {/* Product Options */}
        {(product.options?.length || 0) > 0 && (
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-display text-emperor-950 dark:text-white">
              Options
            </h2>
            <div className="space-y-4">
              {product.options!.map((option) => (
                <div key={option.id} className="space-y-2">
                  <h3 className="text-emperor-800 dark:text-emperor-200">
                    {option.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {option.values?.map((value) => (
                      <button
                        key={value.id}
                        className="px-4 py-2 border border-emperor-200 dark:border-emperor-700 rounded-lg text-emperor-600 dark:text-emperor-300 hover:border-accent hover:text-accent transition-colors duration-200"
                      >
                        {value.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
} 