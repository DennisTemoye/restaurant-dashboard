import { cn } from "@/lib/utils"

type StepProgressProps = {
  labels: string[]
  current: number
}

// Segmented bar, matching the sign-up password meter.
export function StepProgress({ labels, current }: StepProgressProps) {
  return (
    <div className="mt-10">
      <p className="text-sm text-ink/70" aria-live="polite">
        <span className="font-medium text-ink">
          Step {current + 1} of {labels.length}
        </span>{" "}
        · {labels[current]}
      </p>
      <ol
        aria-label="Progress"
        className="mt-3 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
      >
        {labels.map((label, index) => (
          <li
            key={label}
            className={cn(
              "h-1 rounded-full transition-colors duration-500",
              index < current ? "bg-pine" : index === current ? "bg-ink" : "bg-ink/10"
            )}
          >
            <span className="sr-only">
              {label}
              {index < current ? " (done)" : index === current ? " (current step)" : ""}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
