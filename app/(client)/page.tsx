import { DiningOptions } from "@/components/client/landing/dining-options"
import { FeaturedDishes } from "@/components/client/landing/featured-dishes"
import { Hero } from "@/components/client/landing/hero"
import { VisitSection } from "@/components/client/landing/visit-section"
import { LoveLettersSection } from "@/components/client/love-letters/love-letters-section"
import { featuredDishes } from "@/lib/data/menu"
import { testimonials } from "@/lib/data/testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <DiningOptions />
      <FeaturedDishes dishes={featuredDishes} />
      <LoveLettersSection testimonials={testimonials} className="rounded-b-[2.5rem] sm:rounded-b-[3.5rem]" />
      <VisitSection />
    </>
  )
}
