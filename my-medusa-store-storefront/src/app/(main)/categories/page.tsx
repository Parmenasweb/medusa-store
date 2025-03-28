import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import CategoriesTemplate from "@modules/categories/templates/categories-template"

export const metadata: Metadata = {
  title: "Categories | Emperor",
  description: "Browse all product categories",
}

export default async function CategoriesPage() {
  const categories = await listCategories()
  return <CategoriesTemplate categories={categories} />
} 