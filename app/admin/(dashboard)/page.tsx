import { Suspense } from "react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SetupBanner } from "@/components/admin/setup-banner"
import { PageHeader } from "@/components/shared/page-header"

const stats = [
  { label: "Revenue today", value: "—" },
  { label: "Orders today", value: "—" },
  { label: "Reservations today", value: "—" },
  { label: "Average order value", value: "—" },
]

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Today at a glance." />
      <Suspense>
        <SetupBanner />
      </Suspense>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  )
}
