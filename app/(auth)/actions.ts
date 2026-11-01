"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { signInSchema, signUpSchema, type AuthFormState } from "@/lib/validations/auth"

export async function signUp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  // TODO: create the account and start a session with your auth provider, and
  // return { message } for errors such as an email that is already registered.
  redirect("/onboarding")
}

export async function signIn(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  // TODO: verify credentials with your auth provider; on failure return
  // { message: "Incorrect email or password" }.
  redirect("/")
}
