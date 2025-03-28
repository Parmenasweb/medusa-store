"use client"

import { Button, Heading } from "@medusajs/ui"
import { motion } from "framer-motion"
import { ShoppingBag, Tag, ArrowRight } from "lucide-react"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
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

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <motion.div 
      variants={itemVariants}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-emperor-100 dark:bg-emperor-800 flex items-center justify-center">
          <Tag className="w-5 h-5 text-emperor-600 dark:text-emperor-300" />
        </div>
        <Heading className="text-2xl md:text-3xl font-display text-emperor-950 dark:text-white">
          Summary
        </Heading>
      </div>

      {/* Discount Code */}
      <motion.div 
        variants={itemVariants}
        className="p-4 rounded-xl bg-emperor-50/50 dark:bg-emperor-800/50 backdrop-blur-sm"
      >
        <DiscountCode cart={cart} />
      </motion.div>

      <Divider className="bg-emperor-200 dark:bg-emperor-700" />

      {/* Cart Totals */}
      <motion.div variants={itemVariants}>
        <CartTotals totals={cart} />
      </motion.div>

      {/* Checkout Button */}
      <motion.div variants={itemVariants}>
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
          className="block"
        >
          <Button className="w-full h-12 rounded-xl bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-base">
            <ShoppingBag className="w-5 h-5" />
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Button>
        </LocalizedClientLink>
      </motion.div>

      {/* Additional Info */}
      <motion.div 
        variants={itemVariants}
        className="text-sm text-emperor-500 dark:text-emperor-400 text-center"
      >
        Shipping and taxes will be calculated at checkout
      </motion.div>
    </motion.div>
  )
}

export default Summary
