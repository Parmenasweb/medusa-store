"use client"

import { StoreGetProductsParams } from "@medusajs/medusa"
import { HttpTypes, StoreProduct, StoreRegion } from "@medusajs/types"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useFavorites } from "@lib/context/favorites-context"

type ProductGridProps = {
  products: StoreProduct[]
  region: StoreRegion
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function ProductGrid({ products, region }: ProductGridProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {products.map((product) => {
        // Get the cheapest variant price
        const cheapestVariant = useMemo(() => {
          if (!product?.variants?.length) return null

          const variantsWithPrices = product.variants.filter(
            (variant): variant is HttpTypes.StoreProductVariant => 
              variant?.calculated_price?.calculated_amount !== undefined
          )

          if (!variantsWithPrices.length) return null

          return variantsWithPrices.reduce((cheapest, current) => {
            if (!cheapest) return current
            
            const cheapestAmount = cheapest.calculated_price?.calculated_amount || Infinity
            const currentAmount = current.calculated_price?.calculated_amount || Infinity
            
            return currentAmount < cheapestAmount ? current : cheapest
          }, variantsWithPrices[0])
        }, [product])

        const price = useMemo(() => {
          if (!cheapestVariant?.calculated_price) {
            return null
          }

          const calculatedAmount = cheapestVariant.calculated_price.calculated_amount
          const originalAmount = cheapestVariant.calculated_price.original_amount
          const isSale = originalAmount && calculatedAmount && originalAmount > calculatedAmount

          const formatter = new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: region.currency_code.toUpperCase(),
          })

          return {
            calculated_price: calculatedAmount ? formatter.format(calculatedAmount) : "N/A",
            original_price: isSale ? formatter.format(originalAmount) : null,
            percentage_diff: isSale ? Math.round(((originalAmount - calculatedAmount) / originalAmount) * 100) : null
          }
        }, [cheapestVariant, region])

        const isProductFavorite = isFavorite(product.id)

        const handleFavoriteClick = (e: React.MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          if (isProductFavorite) {
            removeFromFavorites(product.id)
          } else {
            addToFavorites(product.id)
          }
        }

        return (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="group relative"
          >
            <Link href={`/products/${product.handle}`} className="block">
              <div className="relative aspect-[3/4] rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark overflow-hidden">
                {/* Product Image */}
                <div className="absolute inset-0">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-emperor-400 dark:text-emperor-600" />
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between text-white mb-4">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handleFavoriteClick}
                          className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                            isProductFavorite 
                              ? 'bg-red-500/90 hover:bg-red-600/90' 
                              : 'bg-white/20 hover:bg-white/30'
                          }`}
                        >
                          <Heart 
                            className={`w-5 h-5 ${
                              isProductFavorite ? 'fill-white text-white' : 'text-white'
                            }`} 
                          />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">View Details</span>
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4">
                  <div className="flex flex-col items-end">
                    {price?.original_price && (
                      <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-emperor-950/90 backdrop-blur-sm text-sm font-medium line-through text-emperor-600 dark:text-emperor-400">
                        {price.original_price}
                      </div>
                    )}
                    <div className={`px-3 py-1.5 rounded-full ${price?.original_price ? 'bg-red-500/90' : 'bg-white/90 dark:bg-emperor-950/90'} backdrop-blur-sm text-sm font-medium ${price?.original_price ? 'text-white' : 'text-emperor-950 dark:text-white'}`}>
                      {price?.calculated_price || "Out of Stock"}
                    </div>
                    {price?.percentage_diff && (
                      <div className="px-2 py-0.5 mt-1 rounded-full bg-red-500/90 backdrop-blur-sm text-xs font-medium text-white">
                        -{price.percentage_diff}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {(product as any).is_new && (
                    <div className="px-3 py-1.5 rounded-full bg-emperor-950/90 dark:bg-white/90 backdrop-blur-sm text-sm font-medium text-white dark:text-emperor-950">
                      New
                    </div>
                  )}
                  {product.tags?.map((tag) => (
                    <div 
                      key={tag.id}
                      className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-emperor-950/90 backdrop-blur-sm text-sm font-medium text-emperor-950 dark:text-white"
                    >
                      {tag.value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium text-emperor-950 dark:text-white group-hover:text-emperor-600 dark:group-hover:text-emperor-300 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-emperor-600 dark:text-emperor-400 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
} 