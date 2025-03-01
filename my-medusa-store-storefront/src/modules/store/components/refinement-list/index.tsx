"use client"

import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import { Tabs, Text, Label, RadioGroup, Checkbox } from "@medusajs/ui"
import { useRouter, useSearchParams } from "next/navigation"
import { SortOptions, sortOptions } from "./sort-products"

type RefinementListProps = {
  refinementList: HttpTypes.StoreProductCategory[]
  selectedCategories: string[]
  sortBy?: SortOptions
  isMobile?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

type CategoryItemProps = {
  category: HttpTypes.StoreProductCategory
  level: number
  selectedCategories: string[]
  onCategoryChange: (categoryId: string) => void
  isMobile?: boolean
}

const CategoryItem = ({ 
  category, 
  level, 
  selectedCategories,
  onCategoryChange,
  isMobile 
}: CategoryItemProps) => {
  const isSelected = selectedCategories.includes(category.id)
  const hasChildren = category.category_children && category.category_children.length > 0

  return (
    <div className={`${isMobile ? "pl-4" : ""}`}>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onCategoryChange(category.id)}
          className="border-emperor-400 dark:border-emperor-600"
        />
        <Text className="text-emperor-600 dark:text-emperor-300">
          {category.name}
        </Text>
      </div>

      {hasChildren && (
        <div className={`mt-2 ml-${level * 4}`}>
          {category.category_children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function RefinementList({ 
  refinementList,
  selectedCategories,
  sortBy = "created_at",
  isMobile 
}: RefinementListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function createQueryString(params: { [key: string]: string | string[] }) {
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        newSearchParams.delete(key)
        value.forEach((v) => newSearchParams.append(key, v))
      } else {
        newSearchParams.set(key, value)
      }
    })

    return newSearchParams.toString()
  }

  function handleCategoryChange(categoryId: string) {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId]

    const queryString = createQueryString({
      categories: newSelectedCategories
    })

    router.push(`?${queryString}`)
  }

  function handleSort(value: SortOptions) {
    const queryString = createQueryString({
      sortBy: value
    })

    router.push(`?${queryString}`)
  }

  if (isMobile) {
    return (
      <Tabs defaultValue="categories" className="w-full">
        <Tabs.List className="border-b border-emperor-200 dark:border-emperor-800">
          <Tabs.Trigger value="categories" className="flex-1">
            Categories
          </Tabs.Trigger>
          <Tabs.Trigger value="sort" className="flex-1">
            Sort
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="categories" className="py-4">
          <div className="space-y-3">
            {refinementList.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                level={0}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                isMobile={true}
              />
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content value="sort" className="py-4">
          <RadioGroup value={sortBy} onValueChange={handleSort}>
            {sortOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <RadioGroup.Item value={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer border-emperor-200 dark:border-emperor-800 hover:border-emperor-300 dark:hover:border-emperor-700 peer-checked:border-emperor-900 dark:peer-checked:border-emperor-100"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Tabs.Content>
      </Tabs>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-4 text-emperor-900 dark:text-white">Categories</Label>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {refinementList.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              level={0}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          ))}
        </motion.div>
      </div>

      <div>
        <Label className="mb-4 text-emperor-900 dark:text-white">Sort By</Label>
        <RadioGroup value={sortBy} onValueChange={handleSort}>
          {sortOptions.map((option) => (
            <div key={option.value} className="mb-2">
              <RadioGroup.Item value={option.value} className="peer sr-only" />
              <Label
                htmlFor={option.value}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer border-emperor-200 dark:border-emperor-800 hover:border-emperor-300 dark:hover:border-emperor-700 peer-checked:border-emperor-900 dark:peer-checked:border-emperor-100"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
