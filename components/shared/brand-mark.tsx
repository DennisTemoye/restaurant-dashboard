import { cn } from "@/lib/utils"

// The app icon: a white ring on an orange tile.
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center rounded-[30%] bg-brand text-brand-foreground shadow-sm ring-1 ring-black/5",
        "bg-linear-to-b from-white/25 to-transparent",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-1/2">
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="4" />
        <circle cx="9" cy="8.5" r="2.25" className="fill-brand" />
      </svg>
    </span>
  )
}
