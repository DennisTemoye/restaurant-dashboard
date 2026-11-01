import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Customers" }

export default function AdminCustomersPage() {
  return <PageHeader title="Customers" description="Customer list and order history." />
}
