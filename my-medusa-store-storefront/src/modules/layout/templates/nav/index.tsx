import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import NavContent from "@modules/layout/components/nav-content"

export default async function Nav() {
  const regions = await listRegions()
  const categories = await listCategories()
  
  return <NavContent regions={regions} categories={categories} />
}
