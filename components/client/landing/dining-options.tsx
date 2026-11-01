import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/client/landing/section-heading"
import { diningModes } from "@/lib/config/dining"
import { cn } from "@/lib/utils"

type DiningOption = {
  title: string
  description: string
  href: string
  cta: string
  icon: LucideIcon
  tint: string
}

function modeVisuals(id: string) {
  const mode = diningModes.find((m) => m.id === id)!
  return { icon: mode.icon, tint: mode.tint }
}

const options: DiningOption[] = [
  {
    title: "Dine in",
    description:
      "Candlelit tables, an open kitchen and a wine list made for long evenings. Groups of up to twenty are welcome.",
    href: "/reservations",
    cta: "Book a table",
    ...modeVisuals("dine-in"),
  },
  {
    title: "Pick up",
    description: "Order ahead and skip the wait. We'll text you the moment your food is packed and ready.",
    href: "/menu",
    cta: "Order for pickup",
    ...modeVisuals("pickup"),
  },
  {
    title: "Delivery",
    description: "The full menu, delivered hot across Lekki, Victoria Island and Ikoyi in insulated packaging.",
    href: "/menu",
    cta: "Order delivery",
    ...modeVisuals("delivery"),
  },
]

export function DiningOptions() {
  return (
    <section aria-labelledby="dining-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        id="dining-heading"
        eyebrow="Three ways to eat with us"
        title="However you like your dinner"
        description="Same kitchen, same care, whether you're at our table or your own."
      />
      <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
        {options.map(({ title, description, href, cta, icon: Icon, tint }) => (
          <li key={title}>
            <Link
              href={href}
              className={cn(
                "group flex h-full flex-col rounded-[2rem] p-7 outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-cream motion-safe:hover:-translate-y-1 sm:p-8",
                tint
              )}
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-ink text-cream">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-12 font-display text-4xl font-medium tracking-tight sm:mt-16">{title}</h3>
              <p className="mt-3 text-ink/75">{description}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-medium">
                {cta}
                <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
