"use client"

import { Mail, Trash2, UserPlus } from "lucide-react"

import { IconInput } from "@/components/auth/icon-input"
import { pillVariants } from "@/components/client/pill-link"
import { NativeSelect } from "@/components/onboarding/form-field"
import { inviteRoles, type AdminOnboardingData } from "@/lib/onboarding/admin-schema"
import type { FieldErrors } from "@/lib/onboarding/errors"

type Invites = AdminOnboardingData["invites"]

const roleLabels: Record<(typeof inviteRoles)[number], string> = {
  manager: "Manager",
  chef: "Chef",
  waiter: "Waiter",
}

const MAX_INVITES = 10

type TeamEditorProps = {
  invites: Invites
  errors: FieldErrors
  onChange: (invites: Invites) => void
}

export function TeamEditor({ invites, errors, onChange }: TeamEditorProps) {
  const setInvite = (index: number, patch: Partial<Invites[number]>) =>
    onChange(invites.map((invite, i) => (i === index ? { ...invite, ...patch } : invite)))

  const add = () => {
    onChange([...invites, { email: "", role: "waiter" }])
    requestAnimationFrame(() => document.getElementById(`invite-${invites.length}-email`)?.focus())
  }

  return (
    <div className="grid gap-4">
      {invites.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-ink/20 px-6 py-8 text-center">
          <p className="font-medium">No one invited yet</p>
          <p className="mt-1 text-sm text-ink/70">You can skip this and invite people later from Staff.</p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {invites.map((invite, index) => {
            const error = errors[`invites.${index}.email`]
            return (
              <li
                key={index}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:grid-cols-[minmax(0,1fr)_9rem_auto] sm:items-start"
              >
                <div className="col-span-2 sm:col-span-1">
                  <IconInput
                    id={`invite-${index}-email`}
                    icon={Mail}
                    type="email"
                    autoComplete="off"
                    placeholder="name@restaurant.com"
                    aria-label={`Email for teammate ${index + 1}`}
                    value={invite.email}
                    onChange={(e) => setInvite(index, { email: e.target.value })}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `invite-${index}-error` : undefined}
                  />
                  {error && (
                    <p id={`invite-${index}-error`} className="mt-1.5 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                </div>
                <NativeSelect
                  aria-label={`Role for teammate ${index + 1}`}
                  value={invite.role}
                  onChange={(e) => setInvite(index, { role: e.target.value as Invites[number]["role"] })}
                >
                  {inviteRoles.map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role]}
                    </option>
                  ))}
                </NativeSelect>
                <button
                  type="button"
                  onClick={() => onChange(invites.filter((_, i) => i !== index))}
                  aria-label={`Remove teammate ${index + 1}`}
                  className={pillVariants({ variant: "ghost", size: "icon", className: "size-12" })}
                >
                  <Trash2 />
                </button>
              </li>
            )
          })}
        </ul>
      )}
      {errors.invites && (
        <p role="alert" className="text-sm text-destructive">
          {errors.invites}
        </p>
      )}
      <button
        type="button"
        onClick={add}
        disabled={invites.length >= MAX_INVITES}
        className={pillVariants({ variant: "outline", size: "sm", className: "justify-self-start disabled:opacity-50" })}
      >
        <UserPlus />
        Add a teammate
      </button>
    </div>
  )
}
