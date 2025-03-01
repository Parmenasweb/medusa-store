import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Size Guide | Emperor's Clothing",
  description: "Find your perfect fit with our comprehensive size guide for all clothing categories.",
}

export default function SizeGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 