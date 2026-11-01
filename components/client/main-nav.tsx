"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { pillVariants } from "@/components/client/pill-link"
import { Logo } from "@/components/shared/logo"
import { clientNav, isActivePath } from "@/lib/config/nav"
import { cn } from "@/lib/utils"

type NavLinksProps = {
  pathname: string | null
  variant?: "bar" | "sheet"
  onNavigate?: () => void
  className?: string
}

function NavLinks({ pathname, variant = "bar", onNavigate, className }: NavLinksProps) {
  return (
    <nav aria-label="Main" className={className}>
      <ul className={cn("flex", variant === "bar" ? "items-center gap-1" : "flex-col gap-1")}>
        {clientNav.map((item) => {
          const active = isActivePath(pathname, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "outline-none focus-visible:ring-2 focus-visible:ring-pine",
                  variant === "bar"
                    ? "rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors"
                    : "block rounded-xl py-2 font-display text-4xl font-medium tracking-tight",
                  variant === "bar" &&
                    (active ? "bg-ink/[0.06] text-ink" : "text-ink/70 hover:bg-ink/5 hover:text-ink"),
                  variant === "sheet" && (active ? "text-pine" : "text-ink hover:text-pine")
                )}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function ActiveNavLinks(props: Omit<NavLinksProps, "pathname">) {
  return <NavLinks pathname={usePathname()} {...props} />
}

// With Cache Components, usePathname suspends on routes with unknown dynamic
// params (e.g. /menu/[slug]), so the active state streams in behind Suspense
// while the plain links stay in the static shell.
export function MainNav(props: Omit<NavLinksProps, "pathname">) {
  return (
    <Suspense fallback={<NavLinks pathname={null} {...props} />}>
      <ActiveNavLinks {...props} />
    </Suspense>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<button type="button" />}
        className={cn(pillVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
      >
        <Menu className="size-5!" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      {/* Portaled outside the site wrapper, so it opts into the light palette itself. */}
      <SheetContent side="right" className="light w-full gap-0 border-ink/10 bg-cream text-ink sm:max-w-sm">
        <SheetHeader className="px-6 pt-5">
          <SheetTitle render={<div />}>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <MainNav variant="sheet" onNavigate={close} className="px-6 pt-8" />
        <div className="mt-auto grid gap-3 p-6">
          <Link href="/reservations" onClick={close} className={pillVariants({ size: "lg" })}>
            Book a table
          </Link>
          <Link href="/login" onClick={close} className={pillVariants({ variant: "outline", size: "lg" })}>
            Sign in
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
