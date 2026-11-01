import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Reservations" }

export default function AdminReservationsPage() {
  return <PageHeader title="Reservations" description="Upcoming bookings and walk-ins." />
}
