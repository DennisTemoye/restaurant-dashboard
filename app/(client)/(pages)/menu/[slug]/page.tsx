import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/shared/page-header"

export default function MenuItemPage({ params }: PageProps<"/menu/[slug]">) {
  return (
    <Suspense fallback={<Skeleton className="h-8 w-48" />}>
      {params.then(({ slug }) => (
        <PageHeader title={`Dish: ${slug}`} description="Dish details, options, and add to cart." />
      ))}
    </Suspense>
  )
}
