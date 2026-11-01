"use client"

import { useState, useSyncExternalStore, useTransition } from "react"
import type { z } from "zod"

import type { DraftStore } from "@/lib/onboarding/draft-store"
import { issuesToErrors, type FieldErrors, type OnboardingResult } from "@/lib/onboarding/errors"

export type WizardStep = {
  id: string
  label: string
  schema: z.ZodType
}

export type WizardDraft<T> = { step: number; data: T }

export const STEP_FORM_ID = "onboarding-step"
export const STEP_HEADING_ID = "onboarding-step-heading"

// Runs after React commits, so the elements reflect the new state.
function focusAfterRender(selector: string) {
  requestAnimationFrame(() => document.querySelector<HTMLElement>(selector)?.focus())
}

type UseOnboardingWizardOptions<T> = {
  store: DraftStore<WizardDraft<T>>
  steps: WizardStep[]
  onSubmit: (data: T) => Promise<OnboardingResult>
}

export function useOnboardingWizard<T extends object>({ store, steps, onSubmit }: UseOnboardingWizardOptions<T>) {
  const draft = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
  const stepIndex = Math.min(Math.max(draft.step, 0), steps.length - 1)

  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [completed, setCompleted] = useState<T | null>(null)
  const [pending, startTransition] = useTransition()

  function update(patch: Partial<T>) {
    store.set((d) => ({ ...d, data: { ...d.data, ...patch } }))
    // Editing a field clears its errors, including nested ones like "hours.2.to".
    const keys = Object.keys(patch)
    setErrors((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([path]) => !keys.some((k) => path === k || path.startsWith(`${k}.`)))
      )
    )
  }

  function goTo(index: number) {
    store.set((d) => ({ ...d, step: index }))
    setErrors({})
    setSubmitError(null)
    focusAfterRender(`#${STEP_HEADING_ID}`)
  }

  function next() {
    const result = steps[stepIndex].schema.safeParse(draft.data)
    if (!result.success) {
      setErrors(issuesToErrors(result.error.issues))
      focusAfterRender(`#${STEP_FORM_ID} [aria-invalid="true"]`)
      return
    }

    if (stepIndex < steps.length - 1) {
      goTo(stepIndex + 1)
      return
    }

    const data = draft.data
    setSubmitError(null)
    startTransition(async () => {
      const response = await onSubmit(data)
      if (response.ok) {
        store.clear()
        setCompleted(data)
        focusAfterRender(`#${STEP_HEADING_ID}`)
        return
      }
      setSubmitError(response.message)
      if (response.errors) {
        setErrors(response.errors)
        // Jump back to the first step the server rejected.
        const invalid = steps.findIndex((s) => !s.schema.safeParse(data).success)
        if (invalid >= 0 && invalid !== stepIndex) store.set((d) => ({ ...d, step: invalid }))
      }
    })
  }

  return {
    data: draft.data,
    step: steps[stepIndex],
    stepIndex,
    isFirst: stepIndex === 0,
    isLast: stepIndex === steps.length - 1,
    errors,
    submitError,
    pending,
    completed,
    update,
    next,
    back: () => goTo(Math.max(0, stepIndex - 1)),
  }
}
