import { ChevronDown } from "lucide-react"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

export const inputClass = "h-12 rounded-xl px-4 text-base md:text-base"
export const textareaClass = "min-h-28 rounded-xl px-4 py-3 text-base md:text-base"

// Wires a control to its label, hint and error for assistive tech.
export function controlProps(id: string, error?: string, hasHint = false) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hasHint ? `${id}-hint` : undefined,
  }
}

type FormFieldProps = {
  id: string
  label: string
  hint?: React.ReactNode
  error?: string
  optional?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({ id, label, hint, error, optional, className, children }: FormFieldProps) {
  return (
    <Field data-invalid={Boolean(error)} className={className}>
      <div className="flex items-baseline justify-between gap-2">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {optional && <span className="text-xs text-ink/60">Optional</span>}
      </div>
      {children}
      {hint && !error && <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription>}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  )
}

export function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-input bg-transparent pr-10 pl-4 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink/60"
      />
    </div>
  )
}
