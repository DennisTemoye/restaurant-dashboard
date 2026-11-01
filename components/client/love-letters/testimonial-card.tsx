import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Testimonial } from "@/lib/data/testimonials"
import { initials } from "@/lib/initials"
import { cn } from "@/lib/utils"

// Cards are bottom-aligned in the row; cycling minimum heights gives the
// staggered skyline from the design.
const heights = [
  "min-h-[15rem] lg:min-h-[16.5rem]",
  "min-h-[21rem] lg:min-h-[24rem]",
  "min-h-[16.5rem] lg:min-h-[18rem]",
  "min-h-[14rem] lg:min-h-[15rem]",
  "min-h-[19rem] lg:min-h-[21.5rem]",
]

const avatarTints = ["bg-[#f4c7a1]", "bg-[#cfe3d4]", "bg-[#f2d0d6]", "bg-[#d9d4f0]", "bg-[#f7e19a]"]

type TestimonialCardProps = {
  testimonial: Testimonial
  index: number
  className?: string
}

export function TestimonialCard({ testimonial, index, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col items-center rounded-[1.75rem] bg-cream px-6 py-7 text-center text-ink sm:px-8 sm:py-8 lg:rounded-[2rem]",
        heights[index % heights.length],
        className
      )}
    >
      <Avatar className="size-14">
        {testimonial.avatarUrl && <AvatarImage src={testimonial.avatarUrl} alt="" />}
        <AvatarFallback className={cn("text-sm font-medium text-ink", avatarTints[index % avatarTints.length])}>
          {initials(testimonial.name)}
        </AvatarFallback>
      </Avatar>
      <blockquote className="mt-auto pt-6 text-[1.0625rem] leading-[1.4] text-balance lg:text-[1.1875rem]">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-6 text-[0.8125rem] text-ink/80">
        <cite className="not-italic">{testimonial.name}</cite>, {testimonial.role}
      </figcaption>
    </figure>
  )
}
