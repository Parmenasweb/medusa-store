"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { StoreRegion } from "@medusajs/types"
import { useProducts } from "@lib/hooks/use-products"
import ProductPreview from "@modules/products/components/product-preview"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
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
    <section className="py-24 bg-white dark:bg-emperor-950 overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border border-amber-200/30 dark:border-amber-800/30">
                <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
                Most Popular Items
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300">
                Shop our best-selling products loved by our customers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <div className="relative -mx-4 px-4">
            <motion.div
              ref={containerRef}
              variants={containerVariants}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-6 min-w-max pb-4">
                {isLoading ? (
                  // Loading skeletons with shimmer effect
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="relative w-[300px] aspect-[3/4] bg-emperor-100 dark:bg-emperor-800 rounded-2xl overflow-hidden"
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
                      className="group w-[300px]"
                    >
                      <div className="relative">
                        <ProductPreview product={product} region={region} />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emperor-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-4 w-4 bg-gradient-to-r from-white dark:from-emperor-950 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-4 bg-gradient-to-l from-white dark:from-emperor-950 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </Container>
    </section>
  )
} 