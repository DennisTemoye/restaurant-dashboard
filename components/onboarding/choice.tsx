import { Check, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxInputProps = Omit<React.ComponentProps<"input">, "type" | "className">

const invalidRing = "has-[[aria-invalid=true]]:border-destructive"

// A large selectable card backed by a real checkbox, so it works with the
// keyboard and screen readers and inside forms.
export function ChoiceCard({
  title,
  description,
  icon: Icon,
  tint,
  className,
  ...input
}: CheckboxInputProps & { title: string; description?: string; icon: LucideIcon; tint?: string; className?: string }) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-center gap-4 rounded-[1.5rem] border border-ink/10 bg-white/50 p-4 transition-colors hover:border-ink/25 has-checked:border-ink has-checked:bg-white has-focus-visible:ring-2 has-focus-visible:ring-pine sm:p-5",
        invalidRing,
        className
      )}
    >
      <input type="checkbox" className="sr-only" {...input} />
      <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-full", tint ?? "bg-ink/5")}>
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{title}</span>
        {description && <span className="mt-0.5 block text-sm text-ink/70">{description}</span>}
      </span>
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-cream transition-colors group-has-checked:border-ink group-has-checked:bg-ink"
      >
        <Check className="size-3.5 opacity-0 transition-opacity group-has-checked:opacity-100" />
      </span>
    </label>
  )
}

export function ChoiceChip({ children, className, ...input }: CheckboxInputProps & { className?: string; children: React.ReactNode }) {
  return (
    <label
      className={cn(
        "group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-ink/35 has-checked:border-ink has-checked:bg-ink has-checked:text-cream has-focus-visible:ring-2 has-focus-visible:ring-pine has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-cream",
        className
      )}
    >
      <input type="checkbox" className="sr-only" {...input} />
      <Check aria-hidden className="hidden size-3.5 group-has-checked:block" />
      {children}
    </label>
  )
}

// Toggles a value in a list, for checkbox groups.
export function toggleValue<T>(list: T[], value: T, checked: boolean) {
  return checked ? [...list, value] : list.filter((item) => item !== value)
}
