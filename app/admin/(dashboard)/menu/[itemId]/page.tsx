import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminEditMenuItemPage({ params }: PageProps<"/admin/menu/[itemId]">) {
  return (
    <Suspense fallback={<Skeleton className="h-8 w-48" />}>
      {params.then(({ itemId }) => (
        <PageHeader title={`Edit item ${itemId}`} description="Update dish details and availability." />
      ))}
    </Suspense>
  )
}
