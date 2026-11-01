// Marks onboarding as finished until profiles are stored in a database.
export const onboardingCookies = {
  guest: "dcc_onboarding_guest",
  restaurant: "dcc_onboarding_restaurant",
} as const

export const onboardingCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
} as const
