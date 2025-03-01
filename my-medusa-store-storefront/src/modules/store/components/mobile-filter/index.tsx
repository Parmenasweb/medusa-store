"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { Filter, X } from "lucide-react"
import { SortOptions } from "../refinement-list/sort-products"
import RefinementList from "../refinement-list"

type MobileFilterProps = {
  categories: HttpTypes.StoreProductCategory[]
  selectedCategories: string[]
  sortBy?: SortOptions
  isOpen: boolean
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
}

const panelVariants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

export default function MobileFilter({
  categories,
  selectedCategories,
  sortBy = "created_at",
  isOpen,
  onClose,
}: MobileFilterProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>
              
              <Dialog.Content asChild>
                <motion.div
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white dark:bg-emperor-950 rounded-t-2xl z-50 overflow-hidden flex flex-col"
                >
                  <Dialog.Title className="sr-only">
                    Filter and Sort Products
                  </Dialog.Title>

                  {/* Header */}
                  <div className="sticky top-0 flex items-center justify-between p-4 bg-white dark:bg-emperor-950 border-b border-emperor-200 dark:border-emperor-800">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-emperor-600 dark:text-emperor-300" />
                      <h2 className="font-display text-xl text-emperor-950 dark:text-white">
                        Filter & Sort
                      </h2>
                      {selectedCategories.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-sm bg-emperor-100 dark:bg-emperor-800 text-emperor-600 dark:text-emperor-300 rounded-full">
                          {selectedCategories.length}
                        </span>
                      )}
                    </div>
                    <Dialog.Close asChild>
                      <Button
                        variant="transparent"
                        className="p-2 hover:bg-emperor-100 dark:hover:bg-emperor-800 rounded-full"
                      >
                        <X className="w-5 h-5 text-emperor-600 dark:text-emperor-300" />
                      </Button>
                    </Dialog.Close>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto">
                    <RefinementList
                      refinementList={categories}
                      selectedCategories={selectedCategories}
                      sortBy={sortBy}
                      isMobile={true}
                    />
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 p-4 bg-white dark:bg-emperor-950 border-t border-emperor-200 dark:border-emperor-800">
                    <div className="flex gap-4">
                      <Button
                        variant="transparent"
                        onClick={onClose}
                        className="flex-1 border border-emperor-200 dark:border-emperor-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={onClose}
                        className="flex-1 bg-emperor-950 text-white dark:bg-white dark:text-emperor-950"
                      >
                        Apply Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 