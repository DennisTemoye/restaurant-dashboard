import Link from "next/link"

import { siteConfig } from "@/lib/config/site"
import { cn } from "@/lib/utils"

type LogoProps = {
  href?: string
  size?: "default" | "lg"
  className?: string
}

export function Logo({ href = "/", size = "default", className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "inline-flex w-fit items-center rounded-md font-display text-2xl leading-none font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-pine",
        size === "lg" && "text-4xl",
        className
      )}
    >
      {siteConfig.logoText}
    </Link>
  )
}
