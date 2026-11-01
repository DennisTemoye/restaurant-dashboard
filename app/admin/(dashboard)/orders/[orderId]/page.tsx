import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/shared/page-header"

export default function AdminOrderPage({ params }: PageProps<"/admin/orders/[orderId]">) {
  return (
    <Suspense fallback={<Skeleton className="h-8 w-48" />}>
      {params.then(({ orderId }) => (
        <PageHeader title={`Order #${orderId}`} description="Items, customer, and status updates." />
      ))}
    </Suspense>
  )
}
