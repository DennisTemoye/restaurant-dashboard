import { getPasswordStrength } from "@/lib/password-strength"
import { cn } from "@/lib/utils"

const barColors = ["", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"]

type PasswordStrengthMeterProps = {
  password: string
  id?: string
  className?: string
}

export function PasswordStrengthMeter({ password, id, className }: PasswordStrengthMeterProps) {
  const { score, label } = getPasswordStrength(password)

  return (
    <div id={id} className={cn("space-y-1.5", className)}>
      <div className="grid grid-cols-4 gap-2" aria-hidden>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={cn(
              "h-1 rounded-full bg-muted transition-colors duration-300",
              step <= score && barColors[score]
            )}
          />
        ))}
      </div>
      <p aria-live="polite" className="min-h-4 text-right text-xs text-muted-foreground">
        {label && (
          <>
            <span className="sr-only">Password strength: </span>
            {label}
          </>
        )}
      </p>
    </div>
  )
}
