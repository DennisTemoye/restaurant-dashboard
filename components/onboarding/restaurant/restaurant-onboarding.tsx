"use client"

import Link from "next/link"
import { Building2, Mail, MapPin, Phone, Store, UtensilsCrossed } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { completeRestaurantOnboarding } from "@/app/admin/onboarding/actions"
import { IconInput } from "@/components/auth/icon-input"
import { pillVariants } from "@/components/client/pill-link"
import { DoneScreen } from "@/components/onboarding/done-screen"
import { controlProps, FormField, inputClass, textareaClass } from "@/components/onboarding/form-field"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { PreviewPanel } from "@/components/onboarding/preview-panel"
import { HoursEditor } from "@/components/onboarding/restaurant/hours-editor"
import { RestaurantPreview } from "@/components/onboarding/restaurant/restaurant-preview"
import { TeamEditor } from "@/components/onboarding/restaurant/team-editor"
import { StepForm } from "@/components/onboarding/step-form"
import { StepProgress } from "@/components/onboarding/step-progress"
import { SwitchRow } from "@/components/onboarding/switch-row"
import { useOnboardingWizard, type WizardDraft, type WizardStep } from "@/components/onboarding/use-onboarding-wizard"
import { diningModes } from "@/lib/config/dining"
import {
  adminHoursSchema,
  adminLocationSchema,
  adminRestaurantSchema,
  adminServicesSchema,
  adminTeamSchema,
  cuisineSuggestions,
  initialAdminOnboarding,
  type AdminOnboardingData,
} from "@/lib/onboarding/admin-schema"
import { createDraftStore } from "@/lib/onboarding/draft-store"

const store = createDraftStore<WizardDraft<AdminOnboardingData>>("dcc:onboarding:restaurant:v1", {
  step: 0,
  data: initialAdminOnboarding,
})

const steps: WizardStep[] = [
  { id: "restaurant", label: "Restaurant", schema: adminRestaurantSchema },
  { id: "location", label: "Location", schema: adminLocationSchema },
  { id: "hours", label: "Hours", schema: adminHoursSchema },
  { id: "services", label: "Services", schema: adminServicesSchema },
  { id: "team", label: "Team", schema: adminTeamSchema },
]

const stepCopy: Record<string, { title: string; description: string }> = {
  restaurant: {
    title: "Tell us about your restaurant",
    description: "This is what guests see on your menu, receipts and booking confirmations.",
  },
  location: {
    title: "Where can guests find you?",
    description: "Used for directions, delivery distances and the contact details on your page.",
  },
  hours: {
    title: "When are you open?",
    description: "Guests can only book and order during these hours. Closing after midnight is fine.",
  },
  services: {
    title: "How do guests eat with you?",
    description: "Switch on everything you offer. You can fine-tune each one later in Settings.",
  },
  team: {
    title: "Who's working with you?",
    description: "Invite managers, chefs and waiters. Each person gets their own sign-in.",
  },
}

const modeById = Object.fromEntries(diningModes.map((mode) => [mode.id, mode]))

export function RestaurantOnboarding() {
  const wizard = useOnboardingWizard({ store, steps, onSubmit: completeRestaurantOnboarding })
  const { data, errors, update } = wizard
  const shown = wizard.completed ?? data

  type Services = AdminOnboardingData["services"]
  const setService = <K extends keyof Services>(key: K, patch: Partial<Services[K]>) =>
    update({ services: { ...data.services, [key]: { ...data.services[key], ...patch } } })

  // Numeric fields stay strings while typing; the schema checks them.
  const numberField = (id: string, label: string, value: string, onChange: (v: string) => void, hint?: string) => (
    <FormField id={id} label={label} hint={hint} error={errors[id]}>
      <Input
        inputMode="numeric"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
        {...controlProps(id, errors[id], Boolean(hint))}
      />
    </FormField>
  )

  return (
    <OnboardingShell
      exit={
        wizard.completed ? { href: "/admin", label: "Go to dashboard" } : { href: "/admin", label: "Save and exit" }
      }
      progress={!wizard.completed && <StepProgress labels={steps.map((s) => s.label)} current={wizard.stepIndex} />}
      aside={
        <PreviewPanel title="This is how guests will find you.">
          <RestaurantPreview data={shown} />
        </PreviewPanel>
      }
    >
      {wizard.completed ? (
        <DoneScreen
          title={`${shown.restaurantName.trim()} is ready for guests.`}
          description="Next, add your menu so guests can start booking and ordering."
          actions={
            <>
              <Link href="/admin/menu/new" className={pillVariants({ size: "lg" })}>
                Add your first dish
              </Link>
              <Link href="/admin" className={pillVariants({ variant: "outline", size: "lg" })}>
                Go to dashboard
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
          submitLabel={wizard.isLast ? "Finish setup" : "Continue"}
          pending={wizard.pending}
          error={wizard.submitError}
          onSubmit={wizard.next}
          onBack={wizard.isFirst ? undefined : wizard.back}
        >
          {wizard.step.id === "restaurant" && (
            <>
              <FormField id="restaurantName" label="Restaurant name" error={errors.restaurantName}>
                <IconInput
                  icon={Store}
                  autoComplete="organization"
                  placeholder="e.g. The Garden Table"
                  value={data.restaurantName}
                  onChange={(e) => update({ restaurantName: e.target.value })}
                  {...controlProps("restaurantName", errors.restaurantName)}
                />
              </FormField>
              <FormField id="cuisine" label="Cuisine" hint="Pick a suggestion or type your own." error={errors.cuisine}>
                <IconInput
                  icon={UtensilsCrossed}
                  list="cuisine-suggestions"
                  placeholder="e.g. West African"
                  value={data.cuisine}
                  onChange={(e) => update({ cuisine: e.target.value })}
                  {...controlProps("cuisine", errors.cuisine, true)}
                />
                <datalist id="cuisine-suggestions">
                  {cuisineSuggestions.map((cuisine) => (
                    <option key={cuisine} value={cuisine} />
                  ))}
                </datalist>
              </FormField>
              <FormField
                id="description"
                label="Short description"
                optional
                hint={`${data.description.length}/240 characters`}
                error={errors.description}
              >
                <Textarea
                  className={textareaClass}
                  maxLength={240}
                  placeholder="e.g. Open-fire cooking and seasonal plates in the heart of Lekki."
                  value={data.description}
                  onChange={(e) => update({ description: e.target.value })}
                  {...controlProps("description", errors.description, true)}
                />
              </FormField>
            </>
          )}

          {wizard.step.id === "location" && (
            <>
              <FormField id="address" label="Street address" error={errors.address}>
                <IconInput
                  icon={MapPin}
                  autoComplete="address-line1"
                  placeholder="e.g. 12 Admiralty Way"
                  value={data.address}
                  onChange={(e) => update({ address: e.target.value })}
                  {...controlProps("address", errors.address)}
                />
              </FormField>
              <FormField id="city" label="City" error={errors.city}>
                <IconInput
                  icon={Building2}
                  autoComplete="address-level2"
                  placeholder="e.g. Lagos"
                  value={data.city}
                  onChange={(e) => update({ city: e.target.value })}
                  {...controlProps("city", errors.city)}
                />
              </FormField>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField id="phone" label="Phone" error={errors.phone}>
                  <IconInput
                    icon={Phone}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+234 701 555 0142"
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    {...controlProps("phone", errors.phone)}
                  />
                </FormField>
                <FormField id="email" label="Email" error={errors.email}>
                  <IconInput
                    icon={Mail}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="hello@restaurant.com"
                    value={data.email}
                    onChange={(e) => update({ email: e.target.value })}
                    {...controlProps("email", errors.email)}
                  />
                </FormField>
              </div>
            </>
          )}

          {wizard.step.id === "hours" && (
            <HoursEditor hours={data.hours} errors={errors} onChange={(hours) => update({ hours })} />
          )}

          {wizard.step.id === "services" && (
            <div className="grid gap-3">
              <SwitchRow
                id="service-dine-in"
                icon={modeById["dine-in"].icon}
                tint={modeById["dine-in"].tint}
                title="Dine in"
                description="Take table reservations and seat walk-ins."
                checked={data.services.dineIn.enabled}
                onCheckedChange={(enabled) => setService("dineIn", { enabled })}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {numberField("services.dineIn.tables", "Number of tables", data.services.dineIn.tables, (tables) =>
                    setService("dineIn", { tables })
                  )}
                  {numberField("services.dineIn.seats", "Total seats", data.services.dineIn.seats, (seats) =>
                    setService("dineIn", { seats })
                  )}
                </div>
              </SwitchRow>
              <SwitchRow
                id="service-pickup"
                icon={modeById.pickup.icon}
                tint={modeById.pickup.tint}
                title="Pick up"
                description="Guests order ahead and collect from the counter."
                checked={data.services.pickup.enabled}
                onCheckedChange={(enabled) => setService("pickup", { enabled })}
              >
                {numberField(
                  "services.pickup.prepMinutes",
                  "Usual prep time (minutes)",
                  data.services.pickup.prepMinutes,
                  (prepMinutes) => setService("pickup", { prepMinutes })
                )}
              </SwitchRow>
              <SwitchRow
                id="service-delivery"
                icon={modeById.delivery.icon}
                tint={modeById.delivery.tint}
                title="Delivery"
                description="Deliver to guests within a set distance."
                checked={data.services.delivery.enabled}
                onCheckedChange={(enabled) => setService("delivery", { enabled })}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {numberField("services.delivery.radiusKm", "Delivery radius (km)", data.services.delivery.radiusKm, (radiusKm) =>
                    setService("delivery", { radiusKm })
                  )}
                  {numberField(
                    "services.delivery.fee",
                    "Delivery fee (₦)",
                    data.services.delivery.fee,
                    (fee) => setService("delivery", { fee }),
                    "Use 0 for free delivery."
                  )}
                </div>
              </SwitchRow>
              {errors.services && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.services}
                </p>
              )}
            </div>
          )}

          {wizard.step.id === "team" && (
            <TeamEditor invites={data.invites} errors={errors} onChange={(invites) => update({ invites })} />
          )}
        </StepForm>
      )}
    </OnboardingShell>
  )
}
