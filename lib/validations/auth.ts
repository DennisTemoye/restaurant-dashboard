import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100, "Name is too long"),
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .regex(/[a-z]/i, "Include at least one letter")
    .regex(/\d/, "Include at least one number"),
})

export const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
})

export type SignUpValues = z.infer<typeof signUpSchema>
export type SignInValues = z.infer<typeof signInSchema>

// Returned by the auth Server Actions. Field errors are only needed when the
// form is submitted without JavaScript; otherwise the client validates first.
export type AuthFormState = {
  message?: string
  fieldErrors?: Partial<Record<string, string[]>>
}
