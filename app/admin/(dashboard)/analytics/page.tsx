import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Analytics" }

export default function AdminAnalyticsPage() {
  return <PageHeader title="Analytics" description="Sales, popular dishes, and peak hours." />
}
