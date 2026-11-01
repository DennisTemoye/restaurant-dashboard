import type { Metadata } from "next"

import { BrandScope } from "@/components/shared/brand-scope"

export const metadata: Metadata = { title: "Welcome" }

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <BrandScope className="min-h-svh">{children}</BrandScope>
}
