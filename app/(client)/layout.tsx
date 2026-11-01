import { SiteFooter } from "@/components/client/site-footer"
import { SiteHeader } from "@/components/client/site-header"
import { BrandScope } from "@/components/shared/brand-scope"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <BrandScope className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </BrandScope>
  )
}
