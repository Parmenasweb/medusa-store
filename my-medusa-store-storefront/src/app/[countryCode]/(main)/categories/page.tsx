import { Metadata } from "next"
import { getRegion } from "@lib/data/region"
import { getCategoriesList } from "@lib/data/categories"
import CategoriesTemplate from "@modules/categories/templates/categories-template"

type Props = {
  params: { countryCode: string }
}

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore our product categories",
}

export default async function CategoriesPage({ params }: Props) {
  const region = await getRegion(params.countryCode)
  const { product_categories } = await getCategoriesList()

  return (
    <CategoriesTemplate
      categories={product_categories}
      region={region}
    />
  )
} 