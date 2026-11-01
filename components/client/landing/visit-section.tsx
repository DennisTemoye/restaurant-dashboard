import Link from "next/link"
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react"

import { pillVariants } from "@/components/client/pill-link"
import { SectionHeading } from "@/components/client/landing/section-heading"
import { siteConfig } from "@/lib/config/site"
import { cn } from "@/lib/utils"

const { address, phone } = siteConfig.contact
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  [siteConfig.name, ...address].join(", ")
)}`

export function VisitSection() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="visit-heading"
            align="start"
            eyebrow="Visit us"
            title="Save me a seat."
            description="Walk-ins are always welcome at the bar. For six or more, or for private dining, book ahead and we'll have everything ready when you arrive."
          />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/reservations" className={pillVariants({ size: "lg" })}>
              Book a table
            </Link>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className={pillVariants({ variant: "outline", size: "lg" })}>
              <Phone />
              {phone}
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-pine p-7 text-cream sm:p-10">
          <h3 className="flex items-center gap-2 text-sm font-medium text-cream/80">
            <Clock className="size-4" aria-hidden />
            Opening hours
          </h3>
          <dl className="mt-4 divide-y divide-cream/15">
            {siteConfig.hours.map(({ days, time }) => (
              <div key={days} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt>{days}</dt>
                <dd className={cn("tabular-nums", time === "Closed" && "text-cream/70")}>{time}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-5 border-t border-cream/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <address className="flex gap-3 not-italic">
              <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span>
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(pillVariants({ variant: "cream", size: "sm" }), "self-start focus-visible:ring-offset-pine")}
            >
              Get directions
              <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
