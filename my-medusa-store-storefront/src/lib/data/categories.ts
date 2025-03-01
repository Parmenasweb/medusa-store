import { sdk } from "@lib/config"
import { HttpTypes, StoreProductCategory } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export async function listCategories(): Promise<StoreProductCategory[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories?include_descendants_tree=true&fields=*category_children`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  const { product_categories } = await response.json()
  
  // Filter to get only root categories (those without parent)
  const rootCategories = product_categories.filter(
    (category: StoreProductCategory) => !category.parent_category_id
  )

  return rootCategories
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
