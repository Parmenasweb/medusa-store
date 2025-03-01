"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import ThemeToggle from "@modules/layout/components/theme-toggle"

type NavContentProps = {
  regions: StoreRegion[]
}

export default function NavContent({ regions }: NavContentProps) {
  return (
    <motion.div 
      className="sticky top-0 inset-x-0 z-50 group"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base dark:bg-emperor-950 dark:border-emperor-800">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl text-emperor-950 dark:text-white hover:text-accent dark:hover:text-accent transition-colors duration-200"
            >
              EMPEROR
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-emperor-600 hover:text-accent dark:text-emperor-300 dark:hover:text-accent transition-colors duration-200"
                href="/store"
              >
                Store
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-emperor-600 hover:text-accent dark:text-emperor-300 dark:hover:text-accent transition-colors duration-200"
                href="/account"
              >
                Account
              </LocalizedClientLink>
            </div>
            <ThemeToggle />
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </motion.div>
  )
} 