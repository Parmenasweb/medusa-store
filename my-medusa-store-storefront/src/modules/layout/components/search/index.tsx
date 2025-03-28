"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search as SearchIcon, X, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useProducts } from "@lib/hooks/use-products"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRegion } from "@lib/providers/region"

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const params = useParams()
  const { region } = useRegion()

  const { data, isLoading } = useProducts({
    queryParams: {
      q: query,
      limit: 6
    },
    countryCode: params?.countryCode as string,
    region: region!
  })

  const products = data?.pages[0]?.products || []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
        inputRef.current?.focus()
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark text-emperor-950 dark:text-white hover:opacity-80 transition-opacity"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="text-sm">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-emperor-950/40 dark:bg-emperor-950/60 backdrop-blur-sm z-50"
          >
            <Container className="h-full flex items-start justify-center pt-[20vh]">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-2xl"
              >
                {/* Search Input */}
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-14 pl-12 pr-12 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark text-emperor-950 dark:text-white placeholder-emperor-400 dark:placeholder-emperor-500 focus:outline-none focus:ring-2 focus:ring-emperor-300 dark:focus:ring-emperor-600"
                    autoFocus
                  />
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emperor-400 dark:text-emperor-500" />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emperor-400 dark:text-emperor-500 hover:text-emperor-600 dark:hover:text-emperor-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                {query && (
                  <motion.div
                    variants={containerVariants}
                    className="mt-4 p-4 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-emperor-600 dark:text-emperor-300" />
                      </div>
                    ) : products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((product) => (
                          <motion.div
                            key={product.id}
                            variants={itemVariants}
                            className="group"
                          >
                            <LocalizedClientLink
                              href={`/products/${product.handle}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-4 p-4 rounded-xl hover:bg-emperor-50/50 dark:hover:bg-emperor-800/50 transition-colors"
                            >
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-emperor-100 dark:bg-emperor-800">
                                {product.thumbnail ? (
                                  <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-emperor-400 dark:text-emperor-500">
                                    <SearchIcon className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-emperor-950 dark:text-white font-medium truncate group-hover:text-emperor-600 dark:group-hover:text-emperor-300 transition-colors">
                                  {product.title}
                                </h3>
                                <p className="text-sm text-emperor-600 dark:text-emperor-400 truncate">
                                  {product.collection?.title || "General Collection"}
                                </p>
                              </div>
                            </LocalizedClientLink>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-emperor-600 dark:text-emperor-400">
                          No products found for "{query}"
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 