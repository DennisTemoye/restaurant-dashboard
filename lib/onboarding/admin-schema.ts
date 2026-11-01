import { z } from "zod"

import type { StaffRole } from "@/lib/types"

export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const

export const inviteRoles = ["manager", "chef", "waiter"] as const satisfies readonly StaffRole[]

export const cuisineSuggestions = [
  "West African",
  "Nigerian",
  "Mediterranean",
  "Italian",
  "Asian fusion",
  "Grill & barbecue",
  "Seafood",
  "Café & bakery",
]

const time = z.string().regex(/^\d{2}:\d{2}$/, "Pick a time")
const positiveWhole = (label: string) => z.string().trim().regex(/^[1-9]\d*$/, `Enter the ${label}`)

export const adminRestaurantSchema = z.object({
  restaurantName: z.string().trim().min(2, "Enter your restaurant's name").max(80, "Keep it under 80 characters"),
  cuisine: z.string().trim().min(2, "Describe your cuisine").max(60, "Keep it under 60 characters"),
  description: z.string().trim().max(240, "Keep it under 240 characters"),
})

export const adminLocationSchema = z.object({
  address: z.string().trim().min(5, "Enter your street address").max(120),
  city: z.string().trim().min(2, "Enter your city").max(60),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
})

export const adminHoursSchema = z.object({
  hours: z
    .array(
      z
        .object({ day: z.enum(weekdays), open: z.boolean(), from: z.string(), to: z.string() })
        .superRefine((d, ctx) => {
          if (!d.open) return
          for (const key of ["from", "to"] as const) {
            if (!time.safeParse(d[key]).success) ctx.addIssue({ code: "custom", path: [key], message: "Pick a time" })
          }
          // A closing time earlier than opening means "past midnight", so only equal times are invalid.
          if (d.from && d.from === d.to) {
            ctx.addIssue({ code: "custom", path: ["to"], message: "Closing must differ from opening" })
          }
        })
    )
    .length(7)
    .refine((days) => days.some((d) => d.open), "Open at least one day a week"),
})

export const adminServicesSchema = z.object({
  services: z
    .object({
      dineIn: z.object({ enabled: z.boolean(), tables: z.string(), seats: z.string() }),
      pickup: z.object({ enabled: z.boolean(), prepMinutes: z.string() }),
      delivery: z.object({ enabled: z.boolean(), radiusKm: z.string(), fee: z.string() }),
    })
    .superRefine((s, ctx) => {
      const check = (path: string[], value: string, label: string) => {
        const result = positiveWhole(label).safeParse(value)
        if (!result.success) ctx.addIssue({ code: "custom", path, message: result.error.issues[0].message })
      }
      if (!s.dineIn.enabled && !s.pickup.enabled && !s.delivery.enabled) {
        ctx.addIssue({ code: "custom", path: [], message: "Switch on at least one service" })
      }
      if (s.dineIn.enabled) {
        check(["dineIn", "tables"], s.dineIn.tables, "number of tables")
        check(["dineIn", "seats"], s.dineIn.seats, "number of seats")
      }
      if (s.pickup.enabled) check(["pickup", "prepMinutes"], s.pickup.prepMinutes, "usual prep time")
      if (s.delivery.enabled) {
        check(["delivery", "radiusKm"], s.delivery.radiusKm, "delivery radius")
        if (!/^\d+$/.test(s.delivery.fee.trim())) {
          ctx.addIssue({ code: "custom", path: ["delivery", "fee"], message: "Enter a fee, or 0 for free delivery" })
        }
      }
    }),
})

export const adminTeamSchema = z.object({
  invites: z
    .array(z.object({ email: z.email("Enter a valid email address"), role: z.enum(inviteRoles) }))
    .max(10, "Invite up to 10 people for now")
    .refine((list) => new Set(list.map((i) => i.email.toLowerCase())).size === list.length, "Each email can only be invited once"),
})

export const adminOnboardingSchema = adminRestaurantSchema
  .and(adminLocationSchema)
  .and(adminHoursSchema)
  .and(adminServicesSchema)
  .and(adminTeamSchema)

export type AdminOnboardingData = z.input<typeof adminOnboardingSchema>

export const initialAdminOnboarding: AdminOnboardingData = {
  restaurantName: "",
  cuisine: "",
  description: "",
  address: "",
  city: "",
  phone: "",
  email: "",
  hours: weekdays.map((day) => ({
    day,
    open: day !== "Monday",
    from: "12:00",
    to: day === "Friday" || day === "Saturday" ? "23:00" : "22:00",
  })),
  services: {
    dineIn: { enabled: true, tables: "", seats: "" },
    pickup: { enabled: true, prepMinutes: "20" },
    delivery: { enabled: false, radiusKm: "", fee: "" },
  },
  invites: [],
}
