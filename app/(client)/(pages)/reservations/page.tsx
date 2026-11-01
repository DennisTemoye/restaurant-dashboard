import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Reservations" }

export default function ReservationsPage() {
  return <PageHeader title="Reservations" description="Book a table or manage your bookings." />
}
