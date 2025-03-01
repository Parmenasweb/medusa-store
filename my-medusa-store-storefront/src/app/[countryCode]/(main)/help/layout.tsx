import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help Center | Emperor's Clothing",
  description: "Get answers to common questions and find helpful resources about shopping at Emperor's Clothing.",
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 