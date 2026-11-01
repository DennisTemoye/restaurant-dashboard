import { Check } from "lucide-react"

import { STEP_HEADING_ID } from "@/components/onboarding/use-onboarding-wizard"

type DoneScreenProps = {
  title: React.ReactNode
  description: React.ReactNode
  actions: React.ReactNode
}

export function DoneScreen({ title, description, actions }: DoneScreenProps) {
  return (
    <div className="flex flex-1 flex-col justify-center pb-10">
      <span className="flex size-14 items-center justify-center rounded-full bg-pine text-cream motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-500">
        <Check className="size-7" aria-hidden />
      </span>
      <h1
        id={STEP_HEADING_ID}
        tabIndex={-1}
        className="mt-8 font-display text-[clamp(2.75rem,6.5vw,4.25rem)] leading-[0.92] font-medium tracking-[-0.02em] text-balance outline-none"
      >
        {title}
      </h1>
      <p className="mt-5 text-lg text-pretty text-ink/70">{description}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div>
    </div>
  )
}
