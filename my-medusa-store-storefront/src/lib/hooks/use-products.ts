"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"
import { StoreGetProductsParams } from "@medusajs/medusa"

const PRODUCTS_PER_PAGE = 12

type ProductsResponse = {
  products: HttpTypes.StoreProduct[]
  count: number
}

function fetchProducts(options: {
  pageParam?: number
  queryParams: StoreGetProductsParams
  countryCode: string
  region: HttpTypes.StoreRegion
}): Promise<ProductsResponse> {
  const { pageParam = 0, queryParams, countryCode, region } = options
  const params = new URLSearchParams()
  
  params.set("offset", (pageParam * PRODUCTS_PER_PAGE).toString())
  params.set("limit", PRODUCTS_PER_PAGE.toString())
  params.set("region_id", region.id)

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v))
    } else if (value !== undefined && value !== null) {
      params.set(key, String(value))
    }
  })

  return fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?${params}`,
    {
      credentials: "include",
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
    }
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }
    return response.json()
  })
  .then((data) => ({
    products: data.products || [],
    count: data.count || 0,
  }))
  .catch((error) => {
    console.error("Error fetching products:", error)
    throw error
  })
}

export function useProducts(options: {
  queryParams: StoreGetProductsParams
  countryCode: string
  region: HttpTypes.StoreRegion
}) {
  return useInfiniteQuery({
    queryKey: ["store-products", options.queryParams, options.countryCode],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        pageParam,
        ...options,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.products.length < PRODUCTS_PER_PAGE) {
        return undefined
      }
      return pages.length
    },
    initialPageParam: 0,
  })
} 