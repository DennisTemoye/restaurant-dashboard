import { Bike, CalendarDays, ShoppingBag, type LucideIcon } from "lucide-react"

import type { OrderType } from "@/lib/types"

export type DiningMode = {
  id: OrderType
  title: string
  icon: LucideIcon
  // Card background used wherever the three modes appear side by side
  tint: string
}

export const diningModes: DiningMode[] = [
  { id: "dine-in", title: "Dine in", icon: CalendarDays, tint: "bg-[#f4c7a1]" },
  { id: "pickup", title: "Pick up", icon: ShoppingBag, tint: "bg-[#cfe3d4]" },
  { id: "delivery", title: "Delivery", icon: Bike, tint: "bg-[#d9d4f0]" },
]
