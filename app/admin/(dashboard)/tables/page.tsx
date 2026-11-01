import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Tables" }

export default function AdminTablesPage() {
  return <PageHeader title="Tables" description="Floor layout and table availability." />
}
