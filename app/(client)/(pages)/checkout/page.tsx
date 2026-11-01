import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Checkout" }

export default function CheckoutPage() {
  return <PageHeader title="Checkout" description="Choose dine-in, pickup, or delivery and pay." />
}
