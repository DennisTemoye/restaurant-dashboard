import type { Metadata } from "next"

import { RestaurantOnboarding } from "@/components/onboarding/restaurant/restaurant-onboarding"

export const metadata: Metadata = { title: "Set up your restaurant" }

export default function RestaurantOnboardingPage() {
  return <RestaurantOnboarding />
}
