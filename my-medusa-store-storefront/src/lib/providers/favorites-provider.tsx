"use client"

import { FavoritesProvider as Provider } from "@lib/context/favorites-context"

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
} 