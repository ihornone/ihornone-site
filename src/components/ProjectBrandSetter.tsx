"use client"

import { useEffect } from "react"
import { useBrand, type BrandConfig } from "./BrandProvider"

export default function ProjectBrandSetter({ brand }: { brand: BrandConfig | null }) {
  const { setBrand } = useBrand()

  useEffect(() => {
    setBrand(brand)
    return () => setBrand(null)
  }, [brand, setBrand])

  return null
}
