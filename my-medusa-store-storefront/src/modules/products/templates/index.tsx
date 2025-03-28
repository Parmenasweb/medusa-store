"use client"

import React, { Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Heart, ChevronRight, Package, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingWrapper from "@modules/products/components/product-onboarding-cta/product-onboarding-wrapper"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { useFavorites } from "@lib/context/favorites-context"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
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
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  if (!product || !product.id) {
    return notFound()
  }

  const isProductFavorite = isFavorite(product.id)

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[100vh] bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-950 dark:to-emperor-900"
    >
      {/* Breadcrumbs */}
      <div className="content-container py-4">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/store"
            className="text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
          >
            Store
          </Link>
          <ChevronRight className="w-4 h-4 text-emperor-400" />
          {product.collection && (
            <>
              <Link
                href={`/collections/${product.collection.handle}`}
                className="text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
              >
                {product.collection.title}
              </Link>
              <ChevronRight className="w-4 h-4 text-emperor-400" />
            </>
          )}
          <span className="text-emperor-950 dark:text-white font-medium">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Product Content */}
      <motion.div
        variants={containerVariants}
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Product Info & Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col small:sticky small:top-48 small:py-0 small:w-[300px] w-full py-8 gap-y-6"
        >
          <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
            <ProductInfo product={product} />
          </div>
          <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
            <ProductTabs product={product} />
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div 
          variants={itemVariants}
          className="block flex-1 px-8 relative"
        >
          <div className="sticky top-48">
            <ImageGallery images={product?.images || []} />
          </div>
        </motion.div>

        {/* Product Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col small:sticky small:top-48 small:py-0 small:w-[300px] w-full py-8 gap-y-6"
        >
          <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
            <Suspense>
              <ProductOnboardingWrapper />
            </Suspense>
          </div>
          <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
            <ProductActions product={product} region={region} />
          </div>

          {/* Additional Info */}
          <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark space-y-4">
            <div className="flex items-center gap-2 text-sm text-emperor-600 dark:text-emperor-300">
              <Package className="w-4 h-4" />
              <span>Free shipping on orders over {region.currency_code.toUpperCase()}100</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emperor-600 dark:text-emperor-300">
              <Clock className="w-4 h-4" />
              <span>Usually ships within 2-3 business days</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emperor-600 dark:text-emperor-300">
              <Star className="w-4 h-4" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Related Products */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="content-container py-24"
        data-testid="related-products-container"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display text-emperor-950 dark:text-white">
              Related Products
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 mt-2">
              You might also like these items
            </p>
          </div>
          <Link
            href="/store"
            className="flex items-center gap-2 text-emperor-600 dark:text-emperor-400 hover:text-emperor-950 dark:hover:text-white transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} region={region} />
        </Suspense>
      </motion.div>
    </motion.div>
  )
}

export default ProductTemplate
