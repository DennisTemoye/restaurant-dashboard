import { PreviewCard, PreviewRow, PreviewTag } from "@/components/onboarding/preview-panel"
import type { AdminOnboardingData } from "@/lib/onboarding/admin-schema"
import { cn } from "@/lib/utils"

export function RestaurantPreview({ data }: { data: AdminOnboardingData }) {
  const services = [
    data.services.dineIn.enabled && "Dine in",
    data.services.pickup.enabled && "Pick up",
    data.services.delivery.enabled && "Delivery",
  ].filter(Boolean) as string[]
  const meta = [data.cuisine.trim(), data.city.trim()].filter(Boolean).join(" · ")

  return (
    <PreviewCard>
      <p className="text-xs font-medium tracking-wide text-ink/60 uppercase">{meta || "Cuisine · City"}</p>
      <p className="mt-2 font-display text-4xl leading-none font-medium text-balance">
        {data.restaurantName.trim() || "Your restaurant"}
      </p>
      <p className="mt-3 line-clamp-3 text-sm text-ink/70">
        {data.description.trim() || "A short description helps guests know what to expect."}
      </p>
      <div className="mt-6 grid gap-5 border-t border-ink/10 pt-6">
        <PreviewRow label="Hours">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {data.hours.map((day) => (
              <div key={day.day} className="contents">
                <dt className="text-ink/60">{day.day.slice(0, 3)}</dt>
                <dd className={cn("tabular-nums", !day.open && "text-ink/50")}>
                  {day.open ? `${day.from} – ${day.to}` : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
        </PreviewRow>
        <PreviewRow label="Services">
          <div className="flex flex-wrap gap-1.5">
            {services.length ? (
              services.map((service) => <PreviewTag key={service}>{service}</PreviewTag>)
            ) : (
              <PreviewTag muted>None yet</PreviewTag>
            )}
          </div>
        </PreviewRow>
        <PreviewRow label="Team">
          <p className="text-sm">
            {data.invites.length
              ? `${data.invites.length} ${data.invites.length === 1 ? "invite" : "invites"} ready`
              : "Just you for now"}
          </p>
        </PreviewRow>
      </div>
    </PreviewCard>
  )
}
