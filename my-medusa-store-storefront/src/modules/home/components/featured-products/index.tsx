"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { StoreRegion } from "@medusajs/types"
import { useProducts } from "@lib/hooks/use-products"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

type FeaturedProductsProps = {
  region: StoreRegion
}

export default function FeaturedProducts({ region }: FeaturedProductsProps) {
  const { data, isLoading } = useProducts({
    queryParams: {
      limit: 8,
      order: "created_at",
    },
    countryCode: region.countries?.[0]?.iso_2 || "us",
    region,
  })

  const products = data?.pages.flatMap(page => page.products) || []

  return (
    <section className="py-16 bg-emperor-50 dark:bg-emperor-900">
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
              Featured Products
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
              Discover our handpicked selection of premium fashion pieces
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-emperor-100 dark:bg-emperor-800 rounded-lg animate-pulse"
                />
              ))
            ) : (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                >
                  <ProductPreview product={product} region={region} />
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 rounded-full hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors font-medium"
            >
              View All Products
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
