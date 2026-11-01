import { cn } from "@/lib/utils"

// Hand-drawn strokes radiating from the heading. Coordinates share a viewBox
// centered on the heading, so the burst scales with it.
const strokes = [
  "M580 155 Q640 185 688 218",
  "M770 35 Q774 55 788 68",
  "M937 -4 L940 30",
  "M1099 -8 L1097 18",
  "M1226 8 L1188 47",
  "M1338 118 Q1300 140 1265 155",
  "M1290 278 Q1325 285 1352 301",
  "M1156 308 L1160 363",
  "M990 337 L995 430",
  "M755 458 Q800 420 833 368",
  "M590 356 L661 330",
]

export function BurstLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="540 -20 860 500"
      fill="none"
      aria-hidden
      className={cn("pointer-events-none text-pine", className)}
    >
      {strokes.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          strokeDasharray={1}
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          className="burst-line motion-safe:animate-draw-line"
          style={{ "--i": i, animationDelay: `${i * 70}ms` } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}
