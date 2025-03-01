import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Emperor's Clothing",
  description: "Learn about how we collect, use, and protect your personal information at Emperor's Clothing.",
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 