import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { notFound } from "next/navigation"
import HomeContent from "@modules/home/components/home-content"

export const metadata: Metadata = {
  title: "Emperor's Clothing | Luxury Streetwear & Fashion",
  description: "Discover our exclusive collection of luxury streetwear and fashion. Shop the latest trends and timeless classics.",
}

async function getData(countryCode: string) {
  const [categories, region] = await Promise.all([
    listCategories(),
    getRegion(countryCode),
  ])

  if (!region) {
    notFound()
  }

  return { categories, region }
}

export default async function HomePage({
  params,
}: {
  params: { countryCode: string }
}) {
  const data = await getData(params.countryCode)

  return (
    <main className="relative">
      <HomeContent 
        categories={data.categories}
        region={data.region}
      />
    </main>
  )
}
