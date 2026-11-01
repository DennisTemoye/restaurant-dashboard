import type { Metadata } from "next"
import Link from "next/link"

import { AuthDivider } from "@/components/auth/auth-divider"
import { AuthHeader } from "@/components/auth/auth-header"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { siteConfig } from "@/lib/config/site"

export const metadata: Metadata = { title: "Sign up" }

export default function RegisterPage() {
  return (
    <>
      <div className="my-auto py-12">
        <AuthHeader prompt="Already have an account?" linkLabel="Sign In" href="/login" />
        <SignUpForm className="mt-10" />
        <AuthDivider className="my-10" />
        <SocialAuthButtons />
      </div>
      <p className="text-center text-sm text-balance text-muted-foreground">
        By clicking Sign up, you agree to accept {siteConfig.name}&apos;s{" "}
        <Link href="/terms" className="font-medium text-foreground hover:underline underline-offset-4">
          Terms of Service
        </Link>
      </p>
    </>
  )
}
