"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Cart } from "@medusajs/medusa"
import { retrieveCart, updateLineItem } from "@lib/data/cart"

interface CartContextType {
  cart: Cart | null
  loading: boolean
  setCart: (cart: Cart | null) => void
  updateCartItem: (itemId: string, quantity: number) => Promise<void>
  removeCartItem: (itemId: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart()
        setCart(cartData)
      } catch (error) {
        console.error("Error fetching cart:", error)
        setCart(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!cart) return

    // Optimistically update the cart
    setCart((prevCart) => {
      if (!prevCart) return null

      return {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      }
    })

    try {
      await updateLineItem({ lineId: itemId, quantity })
      // Cart will be automatically revalidated
    } catch (error) {
      console.error("Error updating cart item:", error)
      // Revert optimistic update on error
      const cartData = await retrieveCart()
      setCart(cartData)
    }
  }

  const removeCartItem = async (itemId: string) => {
    if (!cart) return

    // Optimistically update the cart
    setCart((prevCart) => {
      if (!prevCart) return null

      return {
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== itemId),
      }
    })

    try {
      await updateLineItem({ lineId: itemId, quantity: 0 })
      // Cart will be automatically revalidated
    } catch (error) {
      console.error("Error removing cart item:", error)
      // Revert optimistic update on error
      const cartData = await retrieveCart()
      setCart(cartData)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        setCart,
        updateCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 