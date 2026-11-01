import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "start"
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <p className="text-sm font-medium text-pine">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.02em] text-balance"
      >
        {title}
      </h2>
      {description && <p className="mt-5 text-lg text-pretty text-ink/70">{description}</p>}
    </div>
  )
}
