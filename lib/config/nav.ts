import type { LucideIcon } from "lucide-react"
import {
  Armchair,
  CalendarDays,
  ChartLine,
  ClipboardList,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
  UtensilsCrossed,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const clientNav: NavItem[] = [
  { title: "Menu", href: "/menu" },
  { title: "Reservations", href: "/reservations" },
  { title: "My orders", href: "/orders" },
  { title: "Visit", href: "/#visit" },
]

export const adminNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Analytics", href: "/admin/analytics", icon: ChartLine },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Orders", href: "/admin/orders", icon: ClipboardList },
      { title: "Reservations", href: "/admin/reservations", icon: CalendarDays },
      { title: "Tables", href: "/admin/tables", icon: Armchair },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
      { title: "Customers", href: "/admin/customers", icon: Users },
      { title: "Staff", href: "/admin/staff", icon: UserCog },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
]

// Section roots ("/", "/admin") only match exactly; everything else also
// matches its nested routes, e.g. "/admin/orders" for "/admin/orders/123".
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false
  if (href === "/" || href === "/admin") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
