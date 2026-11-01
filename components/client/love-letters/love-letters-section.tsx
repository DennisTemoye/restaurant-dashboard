import { BurstLines } from "@/components/client/love-letters/burst-lines"
import { TestimonialMarquee } from "@/components/client/love-letters/testimonial-marquee"
import { siteConfig } from "@/lib/config/site"
import type { Testimonial } from "@/lib/data/testimonials"
import { ebGaramond, figtree } from "@/lib/fonts"
import { cn } from "@/lib/utils"

type LoveLettersSectionProps = {
  testimonials: Testimonial[]
  className?: string
}

export function LoveLettersSection({ testimonials, className }: LoveLettersSectionProps) {
  return (
    <section
      aria-labelledby="love-letters-heading"
      className={cn(
        ebGaramond.variable,
        figtree.variable,
        "relative isolate overflow-hidden rounded-t-[2.5rem] bg-ink pt-20 pb-11 font-body text-cream sm:rounded-t-[3.5rem] sm:pt-24",
        className
      )}
    >
      <div className="relative mx-auto w-fit px-4">
        <BurstLines className="absolute top-1/2 left-1/2 -z-10 w-[180%] max-w-none -translate-x-1/2 -translate-y-[46%]" />
        <h2
          id="love-letters-heading"
          className="-rotate-3 text-center font-display text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.85] font-medium tracking-[-0.02em]"
        >
          <span className="block">Love letters</span>
          <span className="block">to {siteConfig.name}</span>
        </h2>
      </div>
      <TestimonialMarquee testimonials={testimonials} className="mt-28 sm:mt-40 lg:mt-52" />
    </section>
  )
}
