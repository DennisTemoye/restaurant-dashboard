"use client"

import { useSyncExternalStore } from "react"

import { getGreeting } from "@/lib/greeting"
import { cn } from "@/lib/utils"

// Re-check once a minute so the greeting rolls over on a long-open tab.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000)
  return () => clearInterval(id)
}

// The greeting depends on the visitor's local time, so it is only computed in
// the browser. The server renders an invisible placeholder of the same size.
export function TimeGreeting({ className }: { className?: string }) {
  const greeting = useSyncExternalStore(
    subscribe,
    () => getGreeting(new Date().getHours()),
    () => null
  )

  return (
    <h1 className={cn(className, !greeting && "invisible")}>{greeting ?? "Good Morning!"}</h1>
  )
}
