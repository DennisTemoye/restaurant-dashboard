import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { pillVariants } from "@/components/client/pill-link"
import { heroImages } from "@/lib/data/menu"
import { cn } from "@/lib/utils"

// Entrance motion: fade up, staggered. Disabled with reduced motion.
const enter = "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700 [animation-fill-mode:both]"

function HandDrawnUnderline() {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute -bottom-[0.12em] left-0 h-[0.18em] w-full text-pine"
    >
      <path
        d="M3 14 Q60 4 120 9 T197 7"
        pathLength={1}
        strokeDasharray={1}
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="motion-safe:animate-draw-line [animation-delay:600ms]"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink/75",
            enter
          )}
        >
          <span className="size-1.5 rounded-full bg-pine" aria-hidden />
          Open Tuesday to Sunday in Lekki, Lagos
        </p>
        <h1
          id="hero-heading"
          className={cn(
            "mx-auto mt-6 max-w-4xl font-display text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.88] font-medium tracking-[-0.03em] text-balance",
            enter,
            "[animation-delay:80ms]"
          )}
        >
          Come hungry.{" "}
          <span className="relative inline-block whitespace-nowrap">
            Leave happy.
            <HandDrawnUnderline />
          </span>
        </h1>
        <p className={cn("mx-auto mt-7 max-w-xl text-lg text-pretty text-ink/70 sm:text-xl", enter, "[animation-delay:160ms]")}>
          Seasonal West African and Mediterranean plates, cooked over open flame. Book a table, collect on your
          way home, or have dinner brought to your door.
        </p>
        <div className={cn("mt-9 flex flex-col justify-center gap-3 sm:flex-row", enter, "[animation-delay:240ms]")}>
          <Link href="/reservations" className={pillVariants({ size: "lg" })}>
            Book a table
          </Link>
          <Link href="/menu" className={pillVariants({ variant: "outline", size: "lg" })}>
            Order online
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-14 flex max-w-6xl items-end justify-center gap-3 px-4 pb-20 sm:mt-20 sm:gap-5 sm:px-6 sm:pb-28 lg:px-8",
          enter,
          "motion-safe:duration-1000 [animation-delay:320ms]"
        )}
      >
        <div className="relative aspect-[4/5] w-[30%] translate-y-6 -rotate-[5deg] overflow-hidden rounded-[1.25rem] sm:rounded-[2rem]">
          <Image src={heroImages.left.src} alt={heroImages.left.alt} fill sizes="30vw" className="object-cover" />
        </div>
        <div className="relative aspect-[4/5] w-[44%] overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem]">
          <Image
            src={heroImages.main.src}
            alt={heroImages.main.alt}
            fill
            preload
            sizes="(min-width: 1152px) 500px, 44vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/5] w-[30%] translate-y-6 rotate-[5deg] overflow-hidden rounded-[1.25rem] sm:rounded-[2rem]">
          <Image src={heroImages.right.src} alt={heroImages.right.alt} fill sizes="30vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
