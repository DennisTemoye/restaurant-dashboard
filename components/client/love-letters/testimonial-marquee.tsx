"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

import { TestimonialCard } from "@/components/client/love-letters/testimonial-card"
import type { Testimonial } from "@/lib/data/testimonials"
import { cn } from "@/lib/utils"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"

function TestimonialList({
  testimonials,
  className,
  ...props
}: { testimonials: Testimonial[] } & React.ComponentProps<"ul">) {
  return (
    // Trailing padding matches the gap so the duplicated list loops seamlessly.
    <ul className={cn("flex items-end gap-1 pr-1", className)} {...props}>
      {testimonials.map((testimonial, index) => (
        <li key={testimonial.id} className="w-[17.5rem] shrink-0 snap-start sm:w-[20rem] lg:w-[23rem]">
          <TestimonialCard testimonial={testimonial} index={index} />
        </li>
      ))}
    </ul>
  )
}

type TestimonialMarqueeProps = {
  testimonials: Testimonial[]
  className?: string
}

// An endless, right-to-left row of reviews. It pauses on hover, on keyboard
// focus, or with the toggle; with reduced motion it becomes a swipeable row.
export function TestimonialMarquee({ testimonials, className }: TestimonialMarqueeProps) {
  const [paused, setPaused] = useState(false)

  return (
    <>
      <div
        role="region"
        aria-label="Guest reviews"
        tabIndex={0}
        className={cn(
          "group/marquee overflow-hidden",
          "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:scroll-px-4 motion-reduce:px-4",
          focusRing,
          className
        )}
      >
        <div
          data-paused={paused}
          style={{ "--marquee-duration": `${testimonials.length * 8}s` } as React.CSSProperties}
          className="flex w-max items-end motion-safe:animate-marquee group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] data-[paused=true]:[animation-play-state:paused]"
        >
          <TestimonialList testimonials={testimonials} />
          <TestimonialList testimonials={testimonials} aria-hidden inert className="motion-reduce:hidden" />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play reviews" : "Pause reviews"}
        className={cn(
          "absolute right-4 bottom-1.5 inline-flex size-8 items-center justify-center rounded-full text-cream/75 transition-colors hover:bg-cream/10 hover:text-cream motion-reduce:hidden sm:right-6",
          focusRing
        )}
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </>
  )
}
