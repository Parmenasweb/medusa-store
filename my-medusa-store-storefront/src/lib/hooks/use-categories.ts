"use client"

import { useQuery } from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"

export function useCategories() {
  return useQuery<{ product_categories: HttpTypes.StoreProductCategory[] }>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories`,
          {
            credentials: "include",
            headers: {
              "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }

        return response.json()
      } catch (error) {
        console.error("Error fetching categories:", error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
} 