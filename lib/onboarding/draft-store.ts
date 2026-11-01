// A tiny external store for wizard drafts, read with useSyncExternalStore.
// Drafts persist to sessionStorage so a refresh doesn't lose progress; if
// storage is unavailable (private mode, blocked) it falls back to memory.

export type DraftStore<T> = {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => T
  getServerSnapshot: () => T
  set: (update: (prev: T) => T) => void
  clear: () => void
}

export function createDraftStore<T extends object>(key: string, initial: T): DraftStore<T> {
  let current: T | undefined
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((listener) => listener())

  function load(): T {
    if (current) return current
    try {
      const raw = window.sessionStorage.getItem(key)
      current = raw ? { ...initial, ...JSON.parse(raw) } : initial
    } catch {
      current = initial
    }
    return current as T
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    getSnapshot: load,
    getServerSnapshot: () => initial,
    set(update) {
      current = update(load())
      try {
        window.sessionStorage.setItem(key, JSON.stringify(current))
      } catch {
        // Storage unavailable: keep the in-memory draft.
      }
      notify()
    },
    clear() {
      current = initial
      try {
        window.sessionStorage.removeItem(key)
      } catch {
        // Nothing persisted.
      }
      notify()
    },
  }
}
