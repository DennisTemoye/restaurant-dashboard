import type { Metadata } from "next"

import { AuthDivider } from "@/components/auth/auth-divider"
import { AuthHeader } from "@/components/auth/auth-header"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { TimeGreeting } from "@/components/auth/time-greeting"

export const metadata: Metadata = { title: "Sign in" }

export default function LoginPage() {
  return (
    <div className="">
      <TimeGreeting className="text-4xl font-bold tracking-tighter sm:text-5xl" />
      <SignInForm className="mt-10" />
      <AuthHeader prompt="Don't have an account?" linkLabel="Sign Up" href="/register" />
      <AuthDivider className="my-10" />
      <SocialAuthButtons />
    </div>
  )
}
