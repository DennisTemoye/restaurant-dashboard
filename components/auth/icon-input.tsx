import type { LucideIcon } from "lucide-react"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

type IconInputProps = React.ComponentProps<typeof InputGroupInput> & {
  icon: LucideIcon
  // Rendered at the end of the field, e.g. a show/hide password toggle
  endAdornment?: React.ReactNode
}

export function IconInput({ icon: Icon, endAdornment, className, ...props }: IconInputProps) {
  return (
    <InputGroup className="h-12 rounded-xl">
      <InputGroupAddon className="pl-4">
        <Icon className="size-5" />
      </InputGroupAddon>
      <InputGroupInput className={cn("pl-2 text-base md:text-base", className)} {...props} />
      {endAdornment && (
        <InputGroupAddon align="inline-end" className="pr-2">
          {endAdornment}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
