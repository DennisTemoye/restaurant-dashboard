import { ebGaramond, figtree } from "@/lib/fonts"
import { cn } from "@/lib/utils"

// Wraps customer-facing surfaces (site, auth, onboarding) in the cream/ink
// brand palette and fonts. `light` keeps shadcn tokens in light mode here
// even when the system theme is dark.
export function BrandScope({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(ebGaramond.variable, figtree.variable, "light bg-cream font-body text-ink antialiased", className)}
      {...props}
    />
  )
}
