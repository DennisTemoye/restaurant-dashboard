import { BurstLines } from "@/components/client/love-letters/burst-lines"
import { cn } from "@/lib/utils"

type PreviewPanelProps = {
  title: React.ReactNode
  children: React.ReactNode
}

// The dark side panel, echoing the "Love letters" section: serif headline,
// burst strokes, and a cream card that previews the user's answers.
export function PreviewPanel({ title, children }: PreviewPanelProps) {
  return (
    <div className="relative isolate flex h-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-ink px-10 py-12 text-cream">
      <BurstLines className="absolute top-[42%] left-1/2 -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80" />
      <p className="max-w-sm -rotate-2 text-center font-display text-5xl leading-[0.9] font-medium tracking-tight text-balance xl:text-6xl">
        {title}
      </p>
      <div className="mt-12 w-full max-w-sm">{children}</div>
    </div>
  )
}

export function PreviewCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-[2rem] bg-cream p-7 text-ink shadow-2xl shadow-black/40 transition-all", className)}
      {...props}
    />
  )
}

export function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-ink/60 uppercase">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

export function PreviewTag({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        muted ? "bg-ink/5 text-ink/60" : "bg-ink text-cream"
      )}
    >
      {children}
    </span>
  )
}
