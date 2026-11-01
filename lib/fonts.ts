import { EB_Garamond, Figtree } from "next/font/google"

// Display serif and humanist sans used by marketing sections. Apply the
// .variable class to a section to make the CSS variables available.
export const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["500"],
})

export const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
})
