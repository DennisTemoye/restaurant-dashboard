"use client"

import type { LucideIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type SwitchRowProps = {
  id: string
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  icon?: LucideIcon
  tint?: string
  // Extra fields revealed while the switch is on
  children?: React.ReactNode
}

export function SwitchRow({ id, title, description, checked, onCheckedChange, icon: Icon, tint, children }: SwitchRowProps) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-ink/10 bg-white/50 p-4 transition-colors sm:p-5",
        checked && "border-ink/25 bg-white"
      )}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-full", tint ?? "bg-ink/5")}>
            <Icon className="size-5" aria-hidden />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p id={`${id}-label`} className="font-medium">
            {title}
          </p>
          <p id={`${id}-description`} className="mt-0.5 text-sm text-ink/70">
            {description}
          </p>
        </div>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value)}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-description`}
          className="mt-1"
        />
      </div>
      {checked && children && <div className="mt-5 border-t border-ink/10 pt-5">{children}</div>}
    </div>
  )
}
