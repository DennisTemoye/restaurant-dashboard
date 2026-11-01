import Link from "next/link"

import { pillVariants } from "@/components/client/pill-link"
import { Logo } from "@/components/shared/logo"

type OnboardingShellProps = {
  exit: { href: string; label: string }
  progress?: React.ReactNode
  aside: React.ReactNode
  children: React.ReactNode
}

// Split layout shared by the guest and restaurant onboarding flows: the step
// on the left, a live preview on the right (desktop only).
export function OnboardingShell({ exit, progress, aside, children }: OnboardingShellProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      <div className="flex min-w-0 flex-col px-5 pt-6 pb-8 sm:px-10 lg:h-svh lg:overflow-y-auto lg:px-14 lg:pt-8">
        <header className="flex items-center justify-between gap-4">
          <Logo />
          <Link href={exit.href} className={pillVariants({ variant: "ghost", size: "sm" })}>
            {exit.label}
          </Link>
        </header>
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col">
          {progress}
          <div className="flex flex-1 flex-col pt-10 sm:pt-14">{children}</div>
        </main>
      </div>
      <aside aria-label="Preview" className="hidden lg:block lg:h-svh lg:p-4 lg:pl-0">
        {aside}
      </aside>
    </div>
  )
}
