import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "My orders" }

export default function OrdersPage() {
  return <PageHeader title="My orders" description="Track current orders and view past ones." />
}
