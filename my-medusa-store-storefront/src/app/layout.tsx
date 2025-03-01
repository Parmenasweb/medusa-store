import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import { ThemeProvider } from "@lib/providers/theme-provider"
import { RegionProvider } from "@lib/providers/region"
import { QueryProvider } from "@lib/providers/query-provider"
import "styles/globals.css"

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
  metadataBase: new URL(getBaseURL()),
  title: "Emperor's Clothing Store",
  description: "Elevate your style with Emperor's exclusive streetwear collection.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bebas.variable}`}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <RegionProvider>
            <ThemeProvider>
              <main className="relative">{props.children}</main>
            </ThemeProvider>
          </RegionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
