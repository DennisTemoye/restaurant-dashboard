import { unsplash } from "@/lib/data/gallery"
import type { MenuItem } from "@/lib/types"

// Sample dishes for the landing page until the menu comes from the database.
export const featuredDishes: (MenuItem & { imageUrl: string })[] = [
  {
    id: "prawn-pasta",
    slug: "charred-lemon-prawn-pasta",
    name: "Charred lemon prawn pasta",
    description: "Hand-cut spaghetti, tiger prawns, blistered tomatoes and a squeeze of grilled lemon.",
    price: 1_850_000,
    imageUrl: unsplash("1563379926898-05f4575a45d8"),
    categoryId: "mains",
    isAvailable: true,
  },
  {
    id: "mixed-grill",
    slug: "suya-spiced-mixed-grill",
    name: "Suya-spiced mixed grill",
    description: "Beef, chicken and lamb skewers over open flame with yaji butter and pickled onions.",
    price: 2_400_000,
    imageUrl: unsplash("1555939594-58d7cb561ad1"),
    categoryId: "grill",
    isAvailable: true,
  },
  {
    id: "seafood-stew",
    slug: "coconut-seafood-stew",
    name: "Coconut seafood stew",
    description: "Prawns, calamari and catch of the day in a slow-cooked coconut and pepper broth.",
    price: 2_150_000,
    imageUrl: unsplash("1559847844-5315695dadae"),
    categoryId: "mains",
    isAvailable: true,
  },
  {
    id: "raspberry-cake",
    slug: "raspberry-cream-layer-cake",
    name: "Raspberry cream layer cake",
    description: "Vanilla sponge, whipped mascarpone and fresh raspberries. Baked every morning.",
    price: 750_000,
    imageUrl: unsplash("1565958011703-44f9829ba187"),
    categoryId: "desserts",
    isAvailable: true,
  },
]

export const heroImages = {
  main: { src: unsplash("1414235077428-338989a2e8c0"), alt: "A plated dish on a candlelit table at D.CC" },
  left: { src: unsplash("1455619452474-d2be8b1e70cd"), alt: "Red curry with fresh basil" },
  right: { src: unsplash("1482049016688-2d3e1b311543"), alt: "Soft-boiled eggs and avocado on a dark plate" },
}
