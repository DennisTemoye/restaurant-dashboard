"use client"

import { Copy } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { pillVariants } from "@/components/client/pill-link"
import type { AdminOnboardingData } from "@/lib/onboarding/admin-schema"
import type { FieldErrors } from "@/lib/onboarding/errors"
import { cn } from "@/lib/utils"

type Hours = AdminOnboardingData["hours"]

type HoursEditorProps = {
  hours: Hours
  errors: FieldErrors
  onChange: (hours: Hours) => void
}

const timeClass = "h-10 min-w-0 flex-1 rounded-lg px-3 text-base tabular-nums md:text-base"

export function HoursEditor({ hours, errors, onChange }: HoursEditorProps) {
  const setDay = (index: number, patch: Partial<Hours[number]>) =>
    onChange(hours.map((day, i) => (i === index ? { ...day, ...patch } : day)))

  const template = hours.find((day) => day.open)
  const copyToAll = () =>
    template && onChange(hours.map((day) => (day.open ? { ...day, from: template.from, to: template.to } : day)))

  return (
    <div className="grid gap-4">
      <ul className="grid gap-2">
        {hours.map((day, index) => {
          const error = errors[`hours.${index}.from`] ?? errors[`hours.${index}.to`]
          const errorId = `hours-${index}-error`
          return (
            <li
              key={day.day}
              className={cn(
                "rounded-2xl border border-ink/10 bg-white/50 px-4 py-3 transition-colors",
                day.open && "bg-white",
                error && "border-destructive"
              )}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <div className="flex w-36 items-center gap-3">
                  <Switch
                    checked={day.open}
                    onCheckedChange={(open) => setDay(index, { open })}
                    aria-label={`Open on ${day.day}`}
                  />
                  <span className="font-medium">{day.day}</span>
                </div>
                {day.open ? (
                  <div className="flex min-w-56 flex-1 items-center gap-2">
                    <Input
                      type="time"
                      aria-label={`${day.day} opening time`}
                      value={day.from}
                      onChange={(e) => setDay(index, { from: e.target.value })}
                      aria-invalid={errors[`hours.${index}.from`] ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      className={timeClass}
                    />
                    <span aria-hidden className="text-ink/50">
                      –
                    </span>
                    <Input
                      type="time"
                      aria-label={`${day.day} closing time`}
                      value={day.to}
                      onChange={(e) => setDay(index, { to: e.target.value })}
                      aria-invalid={errors[`hours.${index}.to`] ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      className={timeClass}
                    />
                  </div>
                ) : (
                  <span className="text-sm text-ink/60">Closed</span>
                )}
              </div>
              {day.open && day.to && day.from && day.to < day.from && !error && (
                <p className="mt-2 text-xs text-ink/60">Closes after midnight</p>
              )}
              {error && (
                <p id={errorId} className="mt-2 text-sm text-destructive">
                  {error}
                </p>
              )}
            </li>
          )
        })}
      </ul>
      {errors.hours && (
        <p role="alert" className="text-sm text-destructive">
          {errors.hours}
        </p>
      )}
      {template && (
        <button
          type="button"
          onClick={copyToAll}
          className={pillVariants({ variant: "outline", size: "sm", className: "justify-self-start" })}
        >
          <Copy />
          Use {template.day}&apos;s hours for every open day
        </button>
      )}
    </div>
  )
}
