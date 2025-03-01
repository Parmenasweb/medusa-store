"use client"

import { HttpTypes } from "@medusajs/types"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProductPreviewProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isFeatured?: boolean
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

export default function ProductPreview({ product, region, isFeatured = false }: ProductPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = product.images && product.images.length > 1

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images!.length - 1 : prev - 1
      )
    }
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.images) {
      setCurrentImageIndex((prev) => 
        prev === product.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

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

  const formatPrice = (amount: number | null | undefined): string => {
    if (!amount || !region?.currency_code) return "N/A"

    try {
      // Get the currency symbol
      const formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: region.currency_code.toUpperCase(),
        currencyDisplay: "symbol",
      })
      
      // Format the number with the proper decimal places without dividing by 100
      const formattedAmount = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)

      // Extract just the currency symbol from the formatter
      const parts = formatter.formatToParts(0)
      const currencySymbol = parts.find(part => part.type === 'currency')?.value || region.currency_code

      // Combine the symbol and the formatted amount
      return `${currencySymbol}${formattedAmount}`
    } catch (error) {
      console.error("Error formatting price:", error)
      return "N/A"
    }
  }

  // Get unique color options from variants
  const colorOptions = useMemo(() => {
    if (!product?.variants?.length) return []

    const colors = new Set<string>()
    
    product.variants.forEach(variant => {
      const colorOption = variant.options?.find(opt => 
        opt.option?.title?.toLowerCase() === "color"
      )
      if (colorOption?.value) {
        colors.add(colorOption.value.toLowerCase())
      }
    })

    return Array.from(colors)
  }, [product])

  // Convert color names to CSS colors
  const getColorValue = (colorName: string): string => {
    // Add more color mappings as needed
    const colorMap: Record<string, string> = {
      black: "#000000",
      white: "#FFFFFF",
      red: "#FF0000",
      blue: "#0000FF",
      green: "#008000",
      yellow: "#FFFF00",
      purple: "#800080",
      pink: "#FFC0CB",
      gray: "#808080",
      brown: "#A52A2A",
      orange: "#FFA500",
      navy: "#000080",
      // Add more colors as needed
    }
    return colorMap[colorName.toLowerCase()] || colorName
  }

  const price = useMemo(() => {
    if (!cheapestVariant?.calculated_price?.calculated_amount) {
      return "N/A"
    }

    return formatPrice(cheapestVariant.calculated_price.calculated_amount)
  }, [cheapestVariant, formatPrice])

  return (
    <motion.div
      variants={itemVariants}
      className="group bg-white dark:bg-emperor-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <Link 
        href={`/products/${product.handle}`}
        className="block h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          {product.images && product.images[currentImageIndex] && (
            <Image
              src={product.images[currentImageIndex].url}
              alt={product.title}
              fill
              className="object-cover object-center transform group-hover:scale-105 transition-transform duration-200"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              priority={isFeatured}
            />
          )}
          
          {/* Image Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-emperor-900/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-emperor-600 dark:text-emperor-300" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-emperor-900/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-emperor-600 dark:text-emperor-300" />
              </button>
            </>
          )}

          {/* Image Pagination Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images?.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex
                      ? "bg-emperor-950 dark:bg-white"
                      : "bg-emperor-300/50 dark:bg-emperor-600/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-medium text-emperor-950 dark:text-white mb-2 line-clamp-2 h-12">
            {product.title}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-emperor-600 dark:text-emperor-300 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price and Color Options */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-emperor-950 dark:text-white">
              {price}
            </span>

            {colorOptions.length > 0 && (
              <div className="flex -space-x-1 items-center">
                {colorOptions.map((color, index) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-emperor-200 dark:border-emperor-700 shadow-sm"
                    style={{ 
                      backgroundColor: getColorValue(color),
                      zIndex: colorOptions.length - index 
                    }}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tags or Categories */}
          {product.collection && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300 rounded">
                {product.collection.title}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
