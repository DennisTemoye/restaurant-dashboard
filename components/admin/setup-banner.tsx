import Link from "next/link"
import { cookies } from "next/headers"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { onboardingCookies } from "@/lib/onboarding/cookies"

// Reads a cookie, so render it inside <Suspense>.
export async function SetupBanner() {
  const cookieStore = await cookies()
  if (cookieStore.get(onboardingCookies.restaurant)?.value === "complete") return null

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle>Finish setting up your restaurant</CardTitle>
          <CardDescription>
            Add your details, opening hours and services so guests can start booking and ordering.
          </CardDescription>
        </div>
        <Link href="/admin/onboarding" className={buttonVariants({ className: "shrink-0" })}>
          Continue setup
          <ArrowRight />
        </Link>
      </CardHeader>
    </Card>
  )
}
