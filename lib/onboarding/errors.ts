import type { z } from "zod"

// Field errors keyed by dotted path, e.g. "hours.2.to" or "invites.0.email".
export type FieldErrors = Record<string, string>

export function issuesToErrors(issues: z.core.$ZodIssue[]): FieldErrors {
  const errors: FieldErrors = {}
  for (const issue of issues) {
    const key = issue.path.join(".")
    errors[key] ??= issue.message
  }
  return errors
}

export type OnboardingResult = { ok: true } | { ok: false; message: string; errors?: FieldErrors }
