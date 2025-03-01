import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Information | Emperor's Clothing",
  description: "Learn about our shipping methods, delivery times, and costs for domestic and international orders.",
}

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 