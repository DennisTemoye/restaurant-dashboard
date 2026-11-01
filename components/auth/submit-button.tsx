import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SubmitButtonProps = Omit<React.ComponentProps<typeof Button>, "type"> & {
  pending?: boolean
  pendingLabel?: string
}

export function SubmitButton({ pending, pendingLabel, disabled, className, children, ...props }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending}
      className={cn(
        "h-12 w-full rounded-full bg-ink text-base font-medium text-cream hover:bg-ink/85 focus-visible:ring-pine",
        // A soft grey button until the form is complete.
        "disabled:bg-ink/15 disabled:text-ink/45 disabled:opacity-100",
        className
      )}
      {...props}
    >
      {pending && <Loader2 className="animate-spin" />}
      {pending ? (pendingLabel ?? children) : children}
    </Button>
  )
}
