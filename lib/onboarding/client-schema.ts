import { z } from "zod"

export const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Halal",
  "Gluten-free",
  "Dairy-free",
  "Nut allergy",
  "Shellfish allergy",
] as const

const phone = z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Enter a valid phone number")

export const clientProfileSchema = z.object({
  name: z.string().trim().min(2, "Tell us what to call you").max(60, "Keep it under 60 characters"),
  phone: z.union([z.literal(""), phone]),
})

export const clientDiningSchema = z
  .object({
    diningModes: z.array(z.enum(["dine-in", "pickup", "delivery"])).min(1, "Choose at least one"),
    deliveryAddress: z.string().trim().max(200, "Keep it under 200 characters"),
  })
  .refine((d) => !d.diningModes.includes("delivery") || d.deliveryAddress.length >= 8, {
    path: ["deliveryAddress"],
    message: "Add the address we should deliver to",
  })

export const clientDietarySchema = z.object({
  dietary: z.array(z.enum(dietaryOptions)),
  dietaryNotes: z.string().trim().max(300, "Keep notes under 300 characters"),
})

export const clientUpdatesSchema = z.object({
  notifications: z.object({
    orders: z.boolean(),
    reservations: z.boolean(),
    news: z.boolean(),
  }),
})

export const clientOnboardingSchema = clientProfileSchema
  .and(clientDiningSchema)
  .and(clientDietarySchema)
  .and(clientUpdatesSchema)

export type ClientOnboardingData = z.input<typeof clientOnboardingSchema>

export const initialClientOnboarding: ClientOnboardingData = {
  name: "",
  phone: "",
  diningModes: [],
  deliveryAddress: "",
  dietary: [],
  dietaryNotes: "",
  notifications: { orders: true, reservations: true, news: false },
}
