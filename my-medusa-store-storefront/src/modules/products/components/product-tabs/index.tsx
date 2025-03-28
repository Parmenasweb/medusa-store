"use client"

import { motion } from "framer-motion"
import { Package, Globe, Scale, Box, Truck, RefreshCw, RotateCcw } from "lucide-react"
import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
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

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <motion.div 
      variants={itemVariants}
      className="w-full"
    >
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
            className="border-b border-emperor-200 dark:border-emperor-700 last:border-0"
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </motion.div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="py-6 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
            </div>
            <div>
              <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Material</span>
              <p className="text-sm text-emperor-600 dark:text-emperor-300">{product.material ? product.material : "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
              <Globe className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
            </div>
            <div>
              <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Country of Origin</span>
              <p className="text-sm text-emperor-600 dark:text-emperor-300">{product.origin_country ? product.origin_country : "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
              <Box className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
            </div>
            <div>
              <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Type</span>
              <p className="text-sm text-emperor-600 dark:text-emperor-300">{product.type ? product.type.value : "Not specified"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
              <Scale className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
            </div>
            <div>
              <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Weight</span>
              <p className="text-sm text-emperor-600 dark:text-emperor-300">{product.weight ? `${product.weight} g` : "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
              <Box className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
            </div>
            <div>
              <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Dimensions</span>
              <p className="text-sm text-emperor-600 dark:text-emperor-300">
                {product.length && product.width && product.height
                  ? `${product.length}L x ${product.width}W x ${product.height}H`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ShippingInfoTab = () => {
  return (
    <motion.div 
      variants={itemVariants}
      className="py-6 space-y-6"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
          </div>
          <div>
            <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Fast Delivery</span>
            <p className="text-sm text-emperor-600 dark:text-emperor-300">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
          </div>
          <div>
            <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Simple Exchanges</span>
            <p className="text-sm text-emperor-600 dark:text-emperor-300">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-4 h-4 text-emperor-600 dark:text-emperor-300" />
          </div>
          <div>
            <span className="block text-sm font-medium text-emperor-950 dark:text-white mb-1">Easy Returns</span>
            <p className="text-sm text-emperor-600 dark:text-emperor-300">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductTabs
