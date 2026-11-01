import Image from "next/image"

import type { GalleryImage } from "@/lib/data/gallery"
import { cn } from "@/lib/utils"

type DishGalleryProps = {
  images: GalleryImage[]
  className?: string
}

// A 3-column photo mosaic that bleeds past its frame at the top and bottom.
export function DishGallery({ images, className }: DishGalleryProps) {
  return (
    <div className={cn("relative h-full overflow-hidden bg-neutral-950", className)}>
      <ul className="grid -translate-y-[8%] grid-cols-3 gap-1">
        {images.map((image) => (
          <li key={image.src} className="relative aspect-square overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1536px) 15vw, 16vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
