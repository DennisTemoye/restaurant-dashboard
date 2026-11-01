import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/shared/page-header"

export default function OrderPage({ params }: PageProps<"/orders/[orderId]">) {
  return (
    <Suspense fallback={<Skeleton className="h-8 w-48" />}>
      {params.then(({ orderId }) => (
        <PageHeader title={`Order #${orderId}`} description="Live status of your order." />
      ))}
    </Suspense>
  )
}
