import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Emperor's Clothing",
  description: "Learn about how we use cookies and similar technologies to improve your shopping experience at Emperor's Clothing.",
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 