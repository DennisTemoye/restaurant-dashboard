import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

import { pillVariants } from "@/components/client/pill-link"
import { STEP_FORM_ID, STEP_HEADING_ID } from "@/components/onboarding/use-onboarding-wizard"

type StepFormProps = {
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  submitLabel: string
  pending?: boolean
  error?: string | null
  onSubmit: () => void
  onBack?: () => void
  children: React.ReactNode
}

export function StepForm({
  eyebrow,
  title,
  description,
  submitLabel,
  pending,
  error,
  onSubmit,
  onBack,
  children,
}: StepFormProps) {
  return (
    <form
      id={STEP_FORM_ID}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="flex flex-1 flex-col"
    >
      <p className="text-sm font-medium text-pine">{eyebrow}</p>
      <h1
        id={STEP_HEADING_ID}
        tabIndex={-1}
        className="mt-3 font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[0.95] font-medium tracking-[-0.02em] text-balance outline-none"
      >
        {title}
      </h1>
      <p className="mt-4 text-lg text-pretty text-ink/70">{description}</p>

      <div className="mt-10 grid gap-6">{children}</div>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 pt-12">
        {onBack && (
          <button type="button" onClick={onBack} className={pillVariants({ variant: "ghost" })}>
            <ArrowLeft />
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className={pillVariants({ size: "lg", className: "ml-auto disabled:opacity-70" })}
        >
          {pending && <Loader2 className="animate-spin" />}
          {submitLabel}
          {!pending && <ArrowRight />}
        </button>
      </div>
    </form>
  )
}
