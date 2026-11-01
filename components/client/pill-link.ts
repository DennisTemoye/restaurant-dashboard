import { cva, type VariantProps } from "class-variance-authority"

// Rounded "pill" buttons used across the customer site. Apply to <Link> or
// <button> via className={pillVariants({ ... })}.
export const pillVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-cream [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ink: "bg-ink text-cream hover:bg-ink/85",
        outline: "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5",
        ghost: "text-ink/75 hover:bg-ink/5 hover:text-ink",
        cream: "bg-cream text-ink hover:bg-cream/90 focus-visible:ring-cream focus-visible:ring-offset-ink",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-10 px-5 text-[0.9375rem]",
        lg: "h-12 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "default",
    },
  }
)

export type PillVariants = VariantProps<typeof pillVariants>
