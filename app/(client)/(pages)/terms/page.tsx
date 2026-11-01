import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = { title: "Terms of Service" }

export default function TermsPage() {
  return <PageHeader title="Terms of Service" description="The terms that apply when you use our services." />
}
