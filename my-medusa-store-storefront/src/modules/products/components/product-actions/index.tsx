"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Heart, Package, AlertCircle } from "lucide-react"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useFavorites } from "@lib/context/favorites-context"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
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

export default function ProductActions({
  product,
  region,
  disabled = false,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const countryCode = useParams().countryCode as string

  const isProductFavorite = isFavorite(product.id)

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
      
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 3000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }

    setIsAdding(false)
  }

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <motion.div 
        className="flex flex-col gap-y-4"
        ref={actionsRef}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        {/* Options Selection */}
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <motion.div 
              className="flex flex-col gap-y-4"
              variants={itemVariants}
            >
              {(product.options || []).map((option) => {
                return (
                  <motion.div 
                    key={option.id}
                    variants={itemVariants}
                  >
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </motion.div>
                )
              })}
              <Divider />
            </motion.div>
          )}
        </div>

        {/* Price */}
        <motion.div variants={itemVariants}>
          <ProductPrice product={product} variant={selectedVariant} />
        </motion.div>

        {/* Stock Status */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 text-sm"
        >
          {inStock ? (
            <>
              <Package className="w-4 h-4 text-green-500" />
              <span className="text-green-500">In Stock</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-500">Out of Stock</span>
            </>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex gap-4"
        >
          <Button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            variant="primary"
            className="flex-1 h-12 rounded-xl bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            <ShoppingBag className="w-4 h-4" />
            {!selectedVariant && !options
              ? "Select variant"
              : !inStock || !isValidVariant
              ? "Out of stock"
              : "Add to cart"}
          </Button>
          <Button
            onClick={handleFavoriteClick}
            variant="secondary"
            className={`w-12 h-12 rounded-xl backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center transition-colors ${
              isProductFavorite 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-glass-gradient dark:bg-glass-gradient-dark hover:opacity-80'
            }`}
          >
            <Heart 
              className={`w-5 h-5 ${
                isProductFavorite 
                  ? 'fill-white text-white' 
                  : 'text-emperor-950 dark:text-white'
              }`} 
            />
          </Button>
        </motion.div>

        {/* Success Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-green-500 text-white flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Added to cart!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Actions */}
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={disabled}
        />
      </motion.div>
    </div>
  )
}
