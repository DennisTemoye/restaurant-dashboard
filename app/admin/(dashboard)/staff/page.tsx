import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Staff" }

export default function AdminStaffPage() {
  return <PageHeader title="Staff" description="Team members and their roles." />
}
