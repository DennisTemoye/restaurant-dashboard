import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/client/landing/section-heading"
import { pillVariants } from "@/components/client/pill-link"
import type { MenuItem } from "@/lib/types"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"

type FeaturedDishesProps = {
  dishes: (MenuItem & { imageUrl: string })[]
}

export function FeaturedDishes({ dishes }: FeaturedDishesProps) {
  return (
    <section aria-labelledby="dishes-heading" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="dishes-heading"
          align="start"
          eyebrow="From the kitchen"
          title="Plates people come back for"
        />
        <Link href="/menu" className={cn(pillVariants({ variant: "outline" }), "self-start sm:self-auto")}>
          See the full menu
          <ArrowRight />
        </Link>
      </div>
      <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {dishes.map((dish) => (
          <li key={dish.id}>
            <article className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink/5">
                <Image
                  src={dish.imageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover duration-700 ease-out motion-safe:transition-transform motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl leading-tight font-medium tracking-tight">
                  {/* The link's ::after covers the whole card, so the card is one click target. */}
                  <Link
                    href={`/menu/${dish.slug}`}
                    className="outline-none after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:after:ring-2 focus-visible:after:ring-pine focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-cream"
                  >
                    {dish.name}
                  </Link>
                </h3>
                <p className="shrink-0 font-medium tabular-nums">{formatPrice(dish.price)}</p>
              </div>
              <p className="mt-1.5 text-sm text-ink/70">{dish.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
