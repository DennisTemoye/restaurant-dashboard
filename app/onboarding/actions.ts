"use server"

import { cookies } from "next/headers"

import { clientOnboardingSchema } from "@/lib/onboarding/client-schema"
import { onboardingCookieOptions, onboardingCookies } from "@/lib/onboarding/cookies"
import { issuesToErrors, type OnboardingResult } from "@/lib/onboarding/errors"

export async function completeGuestOnboarding(input: unknown): Promise<OnboardingResult> {
  const parsed = clientOnboardingSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, message: "A few details need another look.", errors: issuesToErrors(parsed.error.issues) }
  }

  // TODO: save parsed.data to the signed-in guest's profile.
  ;(await cookies()).set(onboardingCookies.guest, "complete", onboardingCookieOptions)
  return { ok: true }
}
