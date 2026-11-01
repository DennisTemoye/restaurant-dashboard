import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Orders" }

export default function AdminOrdersPage() {
  return <PageHeader title="Orders" description="Incoming and past orders across all channels." />
}
