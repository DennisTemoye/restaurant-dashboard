"use client"

import type { ImageLoaderProps } from "next/image"

// Unsplash serves images through imgix, which resizes and re-encodes at the edge.
// Requesting each srcset width straight from it keeps 4K/retina screens sharp
// (up to 3840px) while phones still download a small AVIF/WebP.
export default function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src)
  if (url.hostname !== "images.unsplash.com") return src

  url.searchParams.set("auto", "format")
  url.searchParams.set("fit", "max")
  url.searchParams.set("w", String(width))
  url.searchParams.set("q", String(quality ?? 80))
  return url.href
}
