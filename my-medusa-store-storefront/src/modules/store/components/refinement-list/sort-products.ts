export type SortOptions = "default" | "created_at" | "price_asc" | "price_desc"

export const sortOptions = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low to High",
  },
  {
    value: "price_desc",
    label: "Price: High to Low",
  },
] as const 