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

  console.log('Fetching products with options:', {
    pageParam,
    queryParams,
    countryCode,
    regionId: region?.id
  })

  // Validate required parameters
  if (!region || !region.id) {
    throw new Error("Invalid region provided")
  }

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

  const url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?${params}`
  console.log('Fetching products from URL:', url)

  return fetch(url, {
    credentials: "include",
    headers: {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
    },
  })
  .then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log('API Response:', data)
    
    // Ensure we always return a valid response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from server')
    }

    if (!Array.isArray(data.products)) {
      console.error('Invalid products array in response:', data)
      throw new Error('Products array is missing or invalid')
    }

    return {
      products: data.products,
      count: typeof data.count === 'number' ? data.count : data.products.length,
    }
  })
  .catch((error) => {
    console.error("Error in fetchProducts:", error)
    throw error // Propagate the error to trigger error UI
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
    retry: false, // Disable retries to show error UI immediately
  })
} 