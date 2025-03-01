"use client"

import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import { Text, Container, Heading } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

type NewArrivalsProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
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

export default function NewArrivals({ products, region }: NewArrivalsProps) {
  if (!products.length) return null

  return (
    <div className="bg-emperor-50 dark:bg-emperor-900">
      <Container>
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 sm:py-24"
        >
          <div className="text-center mb-12">
            <Heading 
              level="h2"
              className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-4"
            >
              Just Arrived
            </Heading>
            <Text className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
              Check out our latest collection of fresh and exciting products
            </Text>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {products.map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
                region={region}
              />
            ))}
          </motion.div>
        </motion.section>
      </Container>
    </div>
  )
} 