import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Menu" }

export default function AdminMenuPage() {
  return (
    <PageHeader
      title="Menu"
      description="Manage categories, dishes, prices, and availability."
      actions={
        <Link href="/admin/menu/new" className={buttonVariants()}>
          <Plus />
          New item
        </Link>
      }
    />
  )
}
