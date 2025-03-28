"use client"

import { motion } from "framer-motion"
import { ShoppingBag, ArrowRight } from "lucide-react"
import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

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

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[100vh] bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-950 dark:to-emperor-900 py-12"
    >
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 small:grid-cols-[1fr_400px] gap-8"
          >
            {/* Cart Items */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-6"
            >
              {!customer && (
                <motion.div variants={itemVariants}>
                  <div className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark">
                    <SignInPrompt />
                  </div>
                  <Divider className="my-6" />
                </motion.div>
              )}
              <motion.div 
                variants={itemVariants}
                className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark"
              >
                <ItemsTemplate cart={cart} />
              </motion.div>
            </motion.div>

            {/* Cart Summary */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="flex flex-col gap-6 sticky top-24">
                {cart && cart.region && (
                  <motion.div 
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark"
                  >
                    <Summary cart={cart as any} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 mb-6 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-emperor-950 dark:text-white" />
            </div>
            <EmptyCartMessage />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CartTemplate
