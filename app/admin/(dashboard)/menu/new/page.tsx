import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "New menu item" }

export default function AdminNewMenuItemPage() {
  return <PageHeader title="New menu item" description="Add a dish to the menu." />
}
