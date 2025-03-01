import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { notFound } from "next/navigation"
import { StoreGetProductsParams } from "@medusajs/medusa"
import StoreClientPage from "@modules/store/templates/store-client"

export const metadata: Metadata = {
  title: "Store | Emperor's Clothing",
  description: "Browse our collection of exclusive streetwear and luxury fashion.",
}

export default async function StorePage({
  params,
  searchParams,
}: {
  params: { countryCode: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Await all server-side data fetching in parallel
  const [region, categories] = await Promise.all([
    getRegion(String(params.countryCode)),
    listCategories(),
  ])

  if (!region) {
    notFound()
  }

  // Parse search params
  const categoryParams = searchParams.categories
  const sortBy = searchParams.sortBy

  // Prepare query params for client-side fetching
  const queryParams: StoreGetProductsParams = {
    category_id: Array.isArray(categoryParams) 
      ? categoryParams 
      : categoryParams ? [categoryParams] : [],
    order: typeof sortBy === 'string' 
      ? sortBy 
      : "created_at",
  }

  return (
    <StoreClientPage
      region={region}
      categories={categories}
      params={{ countryCode: String(params.countryCode) }}
      queryParams={queryParams}
    />
  )
}
