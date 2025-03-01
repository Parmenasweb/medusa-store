"use client" // include with Next.js 13+

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState,
} from "react"
import { HttpTypes } from "@medusajs/types"

type RegionContextType = {
  region?: HttpTypes.StoreRegion
  setRegion: React.Dispatch<
    React.SetStateAction<HttpTypes.StoreRegion | undefined>
  >
}

const RegionContext = createContext<RegionContextType | null>(null)

type RegionProviderProps = {
  children: React.ReactNode
}

export const RegionProvider = (
  { children }: RegionProviderProps
) => {
  const [region, setRegion] = useState<
    HttpTypes.StoreRegion
  >()

  const fetchAllRegions = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/regions`,
      {
        credentials: "include",
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
      }
    )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch regions: ${response.status} ${response.statusText}`)
      }
      return response.json()
    })
    .then(({ regions }) => {
      if (!regions || regions.length === 0) {
        console.error("No regions found in the response")
        return
      }
      console.log("Setting initial region:", regions[0])
      setRegion(regions[0])
      localStorage.setItem("region_id", regions[0].id)
    })
    .catch((error) => {
      console.error("Error fetching regions:", error)
    })
  }

  useEffect(() => {
    if (region) {
      localStorage.setItem("region_id", region.id)
      return
    }

    const regionId = localStorage.getItem("region_id")
    if (!regionId) {
      fetchAllRegions()
    } else {
      // retrieve selected region
      fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/regions/${regionId}`, {
        credentials: "include",
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
      })
      .then((res) => {
        if (!res.ok) {
          // If region not found, clear localStorage and fetch all regions
          if (res.status === 404) {
            console.log("Stored region ID not found, fetching all regions...")
            localStorage.removeItem("region_id")
            fetchAllRegions()
            return Promise.reject(new Error("Region not found"))
          }
          throw new Error(`Failed to fetch region: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then(({ region: dataRegion }) => {
        if (!dataRegion) {
          console.error("No region found in the response")
          localStorage.removeItem("region_id")
          fetchAllRegions()
          return
        }
        console.log("Setting region from storage:", dataRegion)
        setRegion(dataRegion)
      })
      .catch((error) => {
        console.error("Error fetching region by ID:", error)
        if (error.message !== "Region not found") {
          localStorage.removeItem("region_id")
          fetchAllRegions()
        }
      })
    }
  }, [region])

  return (
    <RegionContext.Provider value={{
      region,
      setRegion,
    }}>
      {children}
    </RegionContext.Provider>
  )
}

export const useRegion = () => {
  const context = useContext(RegionContext)

  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider")
  }

  return context
}