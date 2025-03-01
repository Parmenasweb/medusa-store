"use client"

import { useQuery } from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"

type UseProductParams = {
  id?: string
  handle?: string
}

export function useProduct({ id, handle }: UseProductParams) {
  return useQuery<{ product: HttpTypes.StoreProduct }>({
    queryKey: ["product", id, handle],
    queryFn: async () => {
      let url: string

      if (id) {
        url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products/${id}`
      } else if (handle) {
        url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?handle=${handle}`
      } else {
        throw new Error("Either id or handle must be provided")
      }

      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }

      const data = await response.json()

      // If fetching by handle, return the first product in the array
      if (handle) {
        return { product: data.products[0] }
      }

      return data
    },
    enabled: Boolean(id || handle), // Only run the query if either id or handle is provided
  })
} 