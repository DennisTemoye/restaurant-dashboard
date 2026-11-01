"use client"

import { useState } from "react"
import { z } from "zod"

import type { AuthFormState } from "@/lib/validations/auth"

// Controlled values + client-side validation for the auth forms. Errors show
// once a field has been blurred; server errors cover no-JS submissions.
export function useAuthForm<Schema extends z.ZodObject>(
  schema: Schema,
  initialValues: z.input<Schema>,
  serverState: AuthFormState
) {
  type Name = keyof z.input<Schema> & string

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState<Partial<Record<Name, boolean>>>({})

  const result = schema.safeParse(values)
  const clientErrors: AuthFormState["fieldErrors"] = result.success
    ? {}
    : z.flattenError(result.error).fieldErrors

  function errorFor(name: Name) {
    return touched[name] ? clientErrors?.[name]?.[0] : serverState.fieldErrors?.[name]?.[0]
  }

  function register(name: Name) {
    return {
      name,
      value: values[name] as string,
      "aria-invalid": Boolean(errorFor(name)) || undefined,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [name]: e.target.value })),
      onBlur: () => setTouched((prev) => ({ ...prev, [name]: true })),
    }
  }

  return { values, isValid: result.success, errorFor, register }
}
