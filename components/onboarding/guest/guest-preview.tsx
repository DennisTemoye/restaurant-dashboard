import { UserRound } from "lucide-react"

import { PreviewCard, PreviewRow, PreviewTag } from "@/components/onboarding/preview-panel"
import { diningModes } from "@/lib/config/dining"
import { initials } from "@/lib/initials"
import type { ClientOnboardingData } from "@/lib/onboarding/client-schema"

const updateLabels = { orders: "Order updates", reservations: "Booking reminders", news: "News" } as const

export function GuestPreview({ data }: { data: ClientOnboardingData }) {
  const name = data.name.trim()
  const modes = diningModes.filter((mode) => data.diningModes.includes(mode.id))
  const updates = (Object.keys(updateLabels) as (keyof typeof updateLabels)[]).filter((key) => data.notifications[key])

  return (
    <PreviewCard>
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#f4c7a1] text-lg font-medium">
          {name ? initials(name) : <UserRound className="size-6" aria-hidden />}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-3xl leading-none font-medium">{name || "Your name"}</p>
          <p className="mt-1.5 text-sm text-ink/60">Guest profile</p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 border-t border-ink/10 pt-6">
        <PreviewRow label="Prefers">
          <div className="flex flex-wrap gap-1.5">
            {modes.length ? (
              modes.map((mode) => <PreviewTag key={mode.id}>{mode.title}</PreviewTag>)
            ) : (
              <PreviewTag muted>Not chosen yet</PreviewTag>
            )}
          </div>
        </PreviewRow>
        <PreviewRow label="Dietary">
          <div className="flex flex-wrap gap-1.5">
            {data.dietary.length ? (
              data.dietary.map((item) => <PreviewTag key={item}>{item}</PreviewTag>)
            ) : (
              <PreviewTag muted>No restrictions</PreviewTag>
            )}
          </div>
        </PreviewRow>
        <PreviewRow label="Updates">
          <p className="text-sm">{updates.length ? updates.map((key) => updateLabels[key]).join(" · ") : "None"}</p>
        </PreviewRow>
      </div>
    </PreviewCard>
  )
}
