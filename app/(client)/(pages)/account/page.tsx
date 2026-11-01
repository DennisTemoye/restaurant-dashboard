import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Account" }

export default function AccountPage() {
  return <PageHeader title="Account" description="Your profile and preferences." />
}
