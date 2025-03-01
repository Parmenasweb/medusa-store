import { HttpTypes } from "@medusajs/types"

type FormatAmountParams = {
  amount: number
  region: HttpTypes.StoreRegion
  includeTaxes?: boolean
}

export function formatAmount({ amount, region, includeTaxes = true }: FormatAmountParams): string {
  const locale = region.countries?.[0]?.iso_2?.toLowerCase() || "en"
  const currency = region.currency_code?.toUpperCase()

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount / 100) // Medusa stores amounts in cents, so divide by 100
} 