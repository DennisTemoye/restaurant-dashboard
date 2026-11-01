// Core domain types shared by the client and admin sides.

export type MenuCategory = {
  id: string
  name: string
  slug: string
}

export type MenuItem = {
  id: string
  slug: string
  name: string
  description: string
  price: number // in minor units (cents)
  imageUrl?: string
  categoryId: string
  isAvailable: boolean
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled"

export type OrderType = "dine-in" | "pickup" | "delivery"

export type OrderItem = {
  menuItemId: string
  name: string
  quantity: number
  unitPrice: number
}

export type Order = {
  id: string
  customerId: string
  items: OrderItem[]
  type: OrderType
  status: OrderStatus
  total: number
  createdAt: string
}

export type ReservationStatus = "pending" | "confirmed" | "seated" | "cancelled" | "no-show"

export type Reservation = {
  id: string
  customerId: string
  tableId?: string
  partySize: number
  date: string // ISO date-time
  status: ReservationStatus
  notes?: string
}

export type Table = {
  id: string
  label: string
  capacity: number
  status: "available" | "occupied" | "reserved"
}

export type Customer = {
  id: string
  name: string
  email: string
  phone?: string
}

export type StaffRole = "owner" | "manager" | "chef" | "waiter"

export type StaffMember = {
  id: string
  name: string
  email: string
  role: StaffRole
}
