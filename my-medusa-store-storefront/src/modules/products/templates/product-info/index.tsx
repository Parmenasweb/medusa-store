import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { motion } from "framer-motion"
import { Tag, Clock } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
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

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <motion.div
      id="product-info"
      variants={itemVariants}
      className="space-y-6"
    >
      {/* Collection Link */}
      {product.collection && (
        <motion.div variants={itemVariants}>
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emperor-100/50 dark:bg-emperor-800/50 text-emperor-600 dark:text-emperor-300 hover:bg-emperor-200 dark:hover:bg-emperor-700 transition-colors text-sm font-medium"
          >
            <Tag className="w-4 h-4" />
            {product.collection.title}
          </LocalizedClientLink>
        </motion.div>
      )}

      {/* Product Title */}
      <motion.div variants={itemVariants}>
        <Heading
          level="h2"
          className="text-3xl md:text-4xl font-display leading-tight text-emperor-950 dark:text-white"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
      </motion.div>

      {/* Product Tags */}
      {product.tags && product.tags.length > 0 && (
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-2"
        >
          {product.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full bg-emperor-100/50 dark:bg-emperor-800/50 text-emperor-600 dark:text-emperor-300 text-sm"
            >
              {tag.value}
            </span>
          ))}
        </motion.div>
      )}

      {/* Product Description */}
      <motion.div variants={itemVariants}>
        <Text
          className="text-base leading-relaxed text-emperor-600 dark:text-emperor-300 whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </motion.div>

      {/* Additional Info */}
      <motion.div 
        variants={itemVariants}
        className="pt-4 mt-4 border-t border-emperor-200 dark:border-emperor-700"
      >
        <div className="flex items-center gap-2 text-sm text-emperor-500 dark:text-emperor-400">
          <Clock className="w-4 h-4" />
          <span>Usually ships within 2-3 business days</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProductInfo
