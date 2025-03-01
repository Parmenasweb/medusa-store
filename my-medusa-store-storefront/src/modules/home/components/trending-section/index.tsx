"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { StoreRegion } from "@medusajs/types"
import { useProducts } from "@lib/hooks/use-products"
import ProductPreview from "@modules/products/components/product-preview"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

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

type TrendingSectionProps = {
  region: StoreRegion
}

export default function TrendingSection({ region }: TrendingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useProducts({
    queryParams: {
      limit: 12,
      order: "total_sales",
    },
    countryCode: region.countries?.[0]?.iso_2 || "us",
    region,
  })

  const products = data?.pages.flatMap(page => page.products) || []

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return

    const scrollAmount = direction === "left" ? -400 : 400
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <section className="py-16 bg-white dark:bg-emperor-950">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white mb-2">
                Trending Now
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300">
                Shop our most popular items this season
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <motion.div
            ref={containerRef}
            variants={containerVariants}
            className="relative -mx-4 px-4"
          >
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 min-w-max pb-4">
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[300px] h-[400px] bg-emperor-100 dark:bg-emperor-800 rounded-lg animate-pulse"
                    />
                  ))
                ) : (
                  products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      className="min-w-[300px]"
                    >
                      <ProductPreview product={product} region={region} isFeatured={false} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-emperor-950 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-emperor-950 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 