"use client"

import { motion } from "framer-motion"
import { StoreProductCategory } from "@medusajs/types"
import { Text, Container, Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoryMetadata = {
  thumbnail?: string
  productCount?: number
}

type FeaturedCategoriesProps = {
  categories: StoreProductCategory[]
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

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  // Only show parent categories
  const parentCategories = categories.filter(category => !category.parent_category_id)

  return (
    <Container>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <Heading 
          level="h2"
          className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white mb-8"
        >
          Featured Categories
        </Heading>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {parentCategories.map((category) => {
            const metadata = category.metadata as CategoryMetadata | null

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative aspect-square overflow-hidden rounded-lg bg-emperor-100 dark:bg-emperor-800"
              >
                {metadata?.thumbnail && (
                  <Image
                    src={metadata.thumbnail}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <LocalizedClientLink
                    href={`/store?categories[]=${category.id}`}
                    className="block"
                  >
                    <Text className="text-lg font-display text-white mb-1">
                      {category.name}
                    </Text>
                    {metadata?.productCount && (
                      <Text className="text-sm text-white/80">
                        {metadata.productCount} Products
                      </Text>
                    )}
                  </LocalizedClientLink>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>
    </Container>
  )
} 