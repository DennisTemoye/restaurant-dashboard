export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4
  label: "" | "Weak" | "Fair" | "Good" | "Strong"
}

const labels = ["", "Weak", "Fair", "Good", "Strong"] as const

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "" }

  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score++

  // Anything under 8 characters is weak, whatever it contains.
  if (password.length < 8) score = 1

  const clamped = Math.max(score, 1) as PasswordStrength["score"]
  return { score: clamped, label: labels[clamped] }
}
