"use client"

import { useActionState } from "react"
import { Mail, UserRound } from "lucide-react"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { IconInput } from "@/components/auth/icon-input"
import { PasswordInput } from "@/components/auth/password-input"
import { PasswordStrengthMeter } from "@/components/auth/password-strength-meter"
import { SubmitButton } from "@/components/auth/submit-button"
import { useAuthForm } from "@/components/auth/use-auth-form"
import { signUp } from "@/app/(auth)/actions"
import { cn } from "@/lib/utils"
import { signUpSchema } from "@/lib/validations/auth"

export function SignUpForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(signUp, {})
  const { values, isValid, errorFor, register } = useAuthForm(
    signUpSchema,
    { name: "", email: "", password: "" },
    state
  )

  return (
    <form action={formAction} noValidate className={cn("grid gap-5", className)}>
      <Field data-invalid={Boolean(errorFor("name"))}>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <IconInput
          id="name"
          icon={UserRound}
          autoComplete="name"
          placeholder="Type your full name"
          {...register("name")}
        />
        <FieldError>{errorFor("name")}</FieldError>
      </Field>

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
          autoComplete="new-password"
          placeholder="Type your password"
          aria-describedby="password-strength"
          {...register("password")}
        />
        <PasswordStrengthMeter id="password-strength" password={values.password} className="pt-1" />
        <FieldError>{errorFor("password")}</FieldError>
      </Field>

      {state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton disabled={!isValid} pending={pending} pendingLabel="Signing up…" className="mt-3">
        Sign Up
      </SubmitButton>
    </form>
  )
}
