import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Menu" }

export default function MenuPage() {
  return <PageHeader title="Menu" description="Browse dishes by category." />
}
