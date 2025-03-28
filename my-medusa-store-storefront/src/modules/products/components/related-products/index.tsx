"use client"

import { useQuery } from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"
import { motion } from "framer-motion"
import ProductPreview from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
  region: HttpTypes.StoreRegion
}

async function fetchRelatedProducts(product: HttpTypes.StoreProduct, countryCode: string) {
  const params = new URLSearchParams()
  
  if (product.collection_id) {
    params.append("collection_id", product.collection_id)
  }
  if (product.tags) {
    product.tags.forEach(tag => {
      params.append("tag_id", tag.id)
    })
  }
  params.append("is_giftcard", "false")

  const url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?${params}`

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch related products")
  }

  const data = await response.json()
  return data.products.filter(
    (p: HttpTypes.StoreProduct) => p.id !== product.id
  )
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

export default function RelatedProducts({
  product,
  countryCode,
  region,
}: RelatedProductsProps) {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["related-products", product.id],
    queryFn: () => fetchRelatedProducts(product, countryCode),
  })

  if (error) {
    return null
  }

  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="animate-pulse"
          >
            <div className="aspect-[3/4] bg-emperor-100 dark:bg-emperor-800 rounded-2xl" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 bg-emperor-100 dark:bg-emperor-800 rounded" />
              <div className="h-4 w-1/2 bg-emperor-100 dark:bg-emperor-800 rounded" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (!products.length) {
    return null
  }

  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
    >
      {products.map((relatedProduct: HttpTypes.StoreProduct) => (
        <motion.div
          key={relatedProduct.id}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ProductPreview product={relatedProduct} region={region} />
        </motion.div>
      ))}
    </motion.div>
  )
}
