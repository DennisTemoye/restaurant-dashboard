"use server"

import { cookies } from "next/headers"

import { adminOnboardingSchema } from "@/lib/onboarding/admin-schema"
import { onboardingCookieOptions, onboardingCookies } from "@/lib/onboarding/cookies"
import { issuesToErrors, type OnboardingResult } from "@/lib/onboarding/errors"

export async function completeRestaurantOnboarding(input: unknown): Promise<OnboardingResult> {
  const parsed = adminOnboardingSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, message: "A few details need another look.", errors: issuesToErrors(parsed.error.issues) }
  }

  // TODO: create the restaurant, hours and services, and send team invites.
  ;(await cookies()).set(onboardingCookies.restaurant, "complete", onboardingCookieOptions)
  return { ok: true }
}
