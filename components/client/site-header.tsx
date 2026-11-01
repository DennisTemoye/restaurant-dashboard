import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { MainNav, MobileNav } from "@/components/client/main-nav"
import { pillVariants } from "@/components/client/pill-link"
import { Logo } from "@/components/shared/logo"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:h-[4.5rem] lg:px-8">
        <Logo />
        <MainNav className="hidden md:block" />
        <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0 md:justify-self-end">
          <Link href="/cart" className={pillVariants({ variant: "ghost", size: "icon" })}>
            <ShoppingBag className="size-5!" />
            <span className="sr-only">Cart</span>
          </Link>
          <Link href="/login" className={cn(pillVariants({ variant: "ghost", size: "sm" }), "hidden md:inline-flex")}>
            Sign in
          </Link>
          <Link href="/reservations" className={cn(pillVariants({ size: "sm" }), "hidden sm:inline-flex")}>
            Book a table
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
