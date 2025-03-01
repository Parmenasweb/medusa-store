"use client"

import { useEffect, useState } from "react"
import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "../cart-dropdown"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CartButton() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await retrieveCart()
        setCart(cartData)
      } catch (error) {
        setCart(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-x-2 h-full">
        <LocalizedClientLink href="/cart" className="hover:text-ui-fg-base flex gap-2">
          Cart (0)
        </LocalizedClientLink>
      </div>
    )
  }

  return <CartDropdown cart={cart} />
}
