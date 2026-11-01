import { DishGallery } from "@/components/auth/dish-gallery"
import { BrandScope } from "@/components/shared/brand-scope"
import { Logo } from "@/components/shared/logo"
import { dishGallery } from "@/lib/data/gallery"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <BrandScope className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <div className="flex flex-col px-6 py-10 sm:px-10 lg:h-svh lg:overflow-y-auto lg:py-14">
        {/* <Logo size="lg" className="self-center" /> */}
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">{children}</div>
      </div>
      <aside className="">
        <DishGallery images={dishGallery} />
      </aside>
    </BrandScope>
  )
}
