import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Cart" }

export default function CartPage() {
  return <PageHeader title="Cart" description="Review your items before checkout." />
}
