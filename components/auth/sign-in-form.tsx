"use client"

import { useActionState } from "react"
import { Mail } from "lucide-react"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { IconInput } from "@/components/auth/icon-input"
import { PasswordInput } from "@/components/auth/password-input"
import { SubmitButton } from "@/components/auth/submit-button"
import { useAuthForm } from "@/components/auth/use-auth-form"
import { signIn } from "@/app/(auth)/actions"
import { cn } from "@/lib/utils"
import { signInSchema } from "@/lib/validations/auth"

export function SignInForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(signIn, {})
  const { isValid, errorFor, register } = useAuthForm(signInSchema, { email: "", password: "" }, state)

  return (
    <form action={formAction} noValidate className={cn("grid gap-5", className)}>
      <Field data-invalid={Boolean(errorFor("email"))}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <IconInput
          id="email"
          icon={Mail}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Type your email address"
          {...register("email")}
        />
        <FieldError>{errorFor("email")}</FieldError>
      </Field>

      <Field data-invalid={Boolean(errorFor("password"))}>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Type your password"
          {...register("password")}
        />
        <FieldError>{errorFor("password")}</FieldError>
      </Field>

      {state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton disabled={!isValid} pending={pending} pendingLabel="Signing in…" className="mt-3">
        Sign In
      </SubmitButton>
    </form>
  )
}
