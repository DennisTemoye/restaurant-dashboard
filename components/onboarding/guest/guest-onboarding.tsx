"use client"

import Link from "next/link"
import { Bell, CalendarDays, MapPin, Phone, Sparkles, UserRound } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { completeGuestOnboarding } from "@/app/onboarding/actions"
import { IconInput } from "@/components/auth/icon-input"
import { pillVariants } from "@/components/client/pill-link"
import { ChoiceCard, ChoiceChip, toggleValue } from "@/components/onboarding/choice"
import { DoneScreen } from "@/components/onboarding/done-screen"
import { controlProps, FormField, textareaClass } from "@/components/onboarding/form-field"
import { GuestPreview } from "@/components/onboarding/guest/guest-preview"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { PreviewPanel } from "@/components/onboarding/preview-panel"
import { StepForm } from "@/components/onboarding/step-form"
import { StepProgress } from "@/components/onboarding/step-progress"
import { SwitchRow } from "@/components/onboarding/switch-row"
import { useOnboardingWizard, type WizardDraft, type WizardStep } from "@/components/onboarding/use-onboarding-wizard"
import { diningModes } from "@/lib/config/dining"
import {
  clientDietarySchema,
  clientDiningSchema,
  clientProfileSchema,
  clientUpdatesSchema,
  dietaryOptions,
  initialClientOnboarding,
  type ClientOnboardingData,
} from "@/lib/onboarding/client-schema"
import { createDraftStore } from "@/lib/onboarding/draft-store"

const store = createDraftStore<WizardDraft<ClientOnboardingData>>("dcc:onboarding:guest:v1", {
  step: 0,
  data: initialClientOnboarding,
})

const steps: WizardStep[] = [
  { id: "profile", label: "About you", schema: clientProfileSchema },
  { id: "dining", label: "How you eat", schema: clientDiningSchema },
  { id: "dietary", label: "Dietary needs", schema: clientDietarySchema },
  { id: "updates", label: "Updates", schema: clientUpdatesSchema },
]

const stepCopy: Record<string, { title: string; description: string }> = {
  profile: {
    title: "First, what should we call you?",
    description: "We'll use your name on bookings, and your number only for order and table updates.",
  },
  dining: {
    title: "How do you like to eat?",
    description: "Pick as many as you like. We'll put these first whenever you open the app.",
  },
  dietary: {
    title: "Anything we should know?",
    description: "We'll flag dishes that don't suit you and pass your notes to the kitchen with every order.",
  },
  updates: {
    title: "How should we keep in touch?",
    description: "You can change these any time from your account.",
  },
}

const modeBlurbs: Record<string, string> = {
  "dine-in": "Book tables and get a reminder before you arrive.",
  pickup: "Order ahead and collect it hot on your way.",
  delivery: "Dinner brought to your door across Lekki, VI and Ikoyi.",
}

export function GuestOnboarding() {
  const wizard = useOnboardingWizard({ store, steps, onSubmit: completeGuestOnboarding })
  const { data, errors, update } = wizard
  const shown = wizard.completed ?? data
  const firstName = shown.name.trim().split(/\s+/)[0]

  return (
    <OnboardingShell
      exit={wizard.completed ? { href: "/", label: "Go to home" } : { href: "/", label: "Skip for now" }}
      progress={!wizard.completed && <StepProgress labels={steps.map((s) => s.label)} current={wizard.stepIndex} />}
      aside={
        <PreviewPanel title="Your table, your way.">
          <GuestPreview data={shown} />
        </PreviewPanel>
      }
    >
      {wizard.completed ? (
        <DoneScreen
          title={firstName ? `You're all set, ${firstName}.` : "You're all set."}
          description="Your preferences are saved. Here's where most guests head next."
          actions={
            <>
              <Link href="/menu" className={pillVariants({ size: "lg" })}>
                Browse the menu
              </Link>
              <Link href="/reservations" className={pillVariants({ variant: "outline", size: "lg" })}>
                Book a table
              </Link>
            </>
          }
        />
      ) : (
        <StepForm
          key={wizard.step.id}
          eyebrow={wizard.step.label}
          title={stepCopy[wizard.step.id].title}
          description={stepCopy[wizard.step.id].description}
          submitLabel={wizard.isLast ? "Finish" : "Continue"}
          pending={wizard.pending}
          error={wizard.submitError}
          onSubmit={wizard.next}
          onBack={wizard.isFirst ? undefined : wizard.back}
        >
          {wizard.step.id === "profile" && (
            <>
              <FormField id="name" label="Your name" error={errors.name}>
                <IconInput
                  icon={UserRound}
                  autoComplete="name"
                  placeholder="e.g. Ada Obi"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                  {...controlProps("name", errors.name)}
                />
              </FormField>
              <FormField
                id="phone"
                label="Phone number"
                optional
                hint="Only used for order and booking updates."
                error={errors.phone}
              >
                <IconInput
                  icon={Phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+234 801 234 5678"
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  {...controlProps("phone", errors.phone, true)}
                />
              </FormField>
            </>
          )}

          {wizard.step.id === "dining" && (
            <>
              <fieldset aria-describedby={errors.diningModes ? "diningModes-error" : undefined}>
                <legend className="sr-only">Ways you like to eat</legend>
                <div className="grid gap-3">
                  {diningModes.map((mode) => (
                    <ChoiceCard
                      key={mode.id}
                      name="diningModes"
                      value={mode.id}
                      title={mode.title}
                      description={modeBlurbs[mode.id]}
                      icon={mode.icon}
                      tint={mode.tint}
                      checked={data.diningModes.includes(mode.id)}
                      onChange={(e) =>
                        update({ diningModes: toggleValue(data.diningModes, mode.id, e.target.checked) })
                      }
                      aria-invalid={errors.diningModes ? true : undefined}
                    />
                  ))}
                </div>
                {errors.diningModes && (
                  <p id="diningModes-error" className="mt-3 text-sm text-destructive">
                    {errors.diningModes}
                  </p>
                )}
              </fieldset>
              {data.diningModes.includes("delivery") && (
                <FormField id="deliveryAddress" label="Delivery address" error={errors.deliveryAddress}>
                  <IconInput
                    icon={MapPin}
                    autoComplete="street-address"
                    placeholder="House number, street and area"
                    value={data.deliveryAddress}
                    onChange={(e) => update({ deliveryAddress: e.target.value })}
                    {...controlProps("deliveryAddress", errors.deliveryAddress)}
                  />
                </FormField>
              )}
            </>
          )}

          {wizard.step.id === "dietary" && (
            <>
              <fieldset>
                <legend className="text-sm font-medium">Dietary preferences and allergies</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <ChoiceChip
                      key={option}
                      name="dietary"
                      value={option}
                      checked={data.dietary.includes(option)}
                      onChange={(e) => update({ dietary: toggleValue(data.dietary, option, e.target.checked) })}
                    >
                      {option}
                    </ChoiceChip>
                  ))}
                </div>
              </fieldset>
              <FormField
                id="dietaryNotes"
                label="Notes for the kitchen"
                optional
                hint={`${data.dietaryNotes.length}/300 characters`}
                error={errors.dietaryNotes}
              >
                <Textarea
                  className={textareaClass}
                  maxLength={300}
                  placeholder="e.g. Severe peanut allergy, so please use a separate pan."
                  value={data.dietaryNotes}
                  onChange={(e) => update({ dietaryNotes: e.target.value })}
                  {...controlProps("dietaryNotes", errors.dietaryNotes, true)}
                />
              </FormField>
            </>
          )}

          {wizard.step.id === "updates" && (
            <div className="grid gap-3">
              <SwitchRow
                id="notify-orders"
                icon={Bell}
                tint="bg-[#cfe3d4]"
                title="Order updates"
                description="Know when your food is being prepared, packed and on its way."
                checked={data.notifications.orders}
                onCheckedChange={(orders) => update({ notifications: { ...data.notifications, orders } })}
              />
              <SwitchRow
                id="notify-reservations"
                icon={CalendarDays}
                tint="bg-[#f4c7a1]"
                title="Booking reminders"
                description="A reminder the day before and an hour before your table."
                checked={data.notifications.reservations}
                onCheckedChange={(reservations) => update({ notifications: { ...data.notifications, reservations } })}
              />
              <SwitchRow
                id="notify-news"
                icon={Sparkles}
                tint="bg-[#d9d4f0]"
                title="News and tasting menus"
                description="Seasonal menus and events, at most twice a month."
                checked={data.notifications.news}
                onCheckedChange={(news) => update({ notifications: { ...data.notifications, news } })}
              />
            </div>
          )}
        </StepForm>
      )}
    </OnboardingShell>
  )
}
