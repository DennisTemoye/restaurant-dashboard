import { BrandScope } from "@/components/shared/brand-scope"

// Full-screen setup, outside the dashboard sidebar.
export default function RestaurantOnboardingLayout({ children }: { children: React.ReactNode }) {
  return <BrandScope className="min-h-svh">{children}</BrandScope>
}
