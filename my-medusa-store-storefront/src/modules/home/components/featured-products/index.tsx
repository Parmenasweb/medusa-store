"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { StoreRegion } from "@medusajs/types"
import { useProducts } from "@lib/hooks/use-products"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Sparkles } from "lucide-react"

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
    <section className="py-24 bg-emperor-50 dark:bg-emperor-900">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emperor-100 dark:bg-emperor-800">
                <Sparkles className="w-4 h-4 text-emperor-950 dark:text-white" />
                <span className="text-sm font-medium text-emperor-950 dark:text-white">Featured Collection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
                Featured Products
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300">
                Discover our handpicked selection of premium fashion pieces
              </p>
            </div>
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 rounded-full hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors font-medium group whitespace-nowrap"
            >
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </LocalizedClientLink>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {isLoading ? (
              // Loading skeletons with shimmer effect
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] bg-emperor-100 dark:bg-emperor-800 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
              ))
            ) : (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <div className="relative">
                    <ProductPreview product={product} region={region} />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emperor-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
