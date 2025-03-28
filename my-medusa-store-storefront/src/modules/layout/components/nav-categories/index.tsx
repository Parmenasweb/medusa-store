"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StoreProductCategory } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronDown } from "lucide-react"

interface CategoryWithChildren extends StoreProductCategory {
  children: StoreProductCategory[]
}

interface NavCategoriesProps {
  categories: StoreProductCategory[]
}

export default function NavCategories({ categories }: NavCategoriesProps) {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  const categoryMap = categories.reduce<Map<string, CategoryWithChildren>>((acc, category) => {
    if (!category.parent_category_id) {
      acc.set(category.id, {
        ...category,
        children: categories.filter(c => c.parent_category_id === category.id),
      })
    }
    return acc
  }, new Map())

  return (
    <div className="relative h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-2 h-full text-emperor-600 hover:text-accent dark:text-emperor-300 dark:hover:text-accent transition-colors duration-200"
      >
        Categories
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-emperor-900 rounded-lg shadow-lg border border-ui-border-base dark:border-emperor-800 py-4"
          >
            <div className="flex flex-col">
              {Array.from(categoryMap.values()).map((category) => (
                <div key={category.id} className="group">
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="block px-4 py-2 text-emperor-600 hover:text-accent dark:text-emperor-300 dark:hover:text-accent transition-colors duration-200"
                  >
                    {category.name}
                  </LocalizedClientLink>
                  {category.children && category.children.length > 0 && (
                    <div className="pl-6">
                      {category.children.map((child) => (
                        <motion.div
                          key={child.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.1 }}
                        >
                          <LocalizedClientLink
                            href={`/categories/${category.handle}/${child.handle}`}
                            className="block px-4 py-1.5 text-sm text-emperor-500 hover:text-accent dark:text-emperor-400 dark:hover:text-accent transition-colors duration-200"
                          >
                            {child.name}
                          </LocalizedClientLink>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <LocalizedClientLink
                href="/categories"
                className="block mt-2 px-4 py-2 text-sm text-accent hover:text-accent-dark dark:text-accent dark:hover:text-accent-light transition-colors duration-200 border-t border-ui-border-base dark:border-emperor-800"
              >
                View All Categories
              </LocalizedClientLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 