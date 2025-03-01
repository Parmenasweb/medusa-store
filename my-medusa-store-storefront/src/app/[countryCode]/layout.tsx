import { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
// import { getRegion } from "@lib/data/regions"
import { ThemeProvider } from "@lib/providers/theme-provider"
import { listCategories } from "@lib/data/categories"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Emperor's Clothing",
  description: "Your premier destination for luxury streetwear and fashion.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await listCategories()

  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer categories={categories} />
    </div>
  )
} 