import { cn } from "@/lib/utils"

export function AuthDivider({ children = "Or", className }: { children?: React.ReactNode; className?: string }) {
  return <p className={cn("text-center text-sm text-muted-foreground", className)}>{children}</p>
}
