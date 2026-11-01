import { siteConfig } from "@/lib/config/site"

const priceFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

// Prices are stored in minor units (kobo, cents).
export function formatPrice(minorUnits: number) {
  return priceFormatter.format(minorUnits / 100)
}
