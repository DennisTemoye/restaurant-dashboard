export type GalleryImage = {
  src: string
  alt: string
}

// Must match images.remotePatterns in next.config.ts.
export const UNSPLASH_QUERY = "?auto=format&fit=crop&w=800&q=80"

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}${UNSPLASH_QUERY}`

export const dishGallery: GalleryImage[] = [
  { src: unsplash("1482049016688-2d3e1b311543"), alt: "Soft-boiled eggs and avocado on a dark plate" },
  { src: unsplash("1563379926898-05f4575a45d8"), alt: "Shrimp spaghetti in a skillet" },
  { src: unsplash("1455619452474-d2be8b1e70cd"), alt: "Red curry with fresh basil" },
  { src: unsplash("1567620905732-2d1ec7ab7445"), alt: "Stacked pancakes with syrup being poured" },
  { src: unsplash("1555939594-58d7cb561ad1"), alt: "Mixed grill skewers with dipping sauces" },
  { src: unsplash("1559847844-5315695dadae"), alt: "Seafood stew served with rice" },
  { src: unsplash("1476224203421-9ac39bcb3327"), alt: "Grilled chicken with a dipping sauce" },
  { src: unsplash("1565958011703-44f9829ba187"), alt: "Raspberry layer cake" },
  { src: unsplash("1529042410759-befb1204b468"), alt: "Meatballs over fresh greens" },
  { src: unsplash("1544025162-d76694265947"), alt: "Barbecue ribs on a wooden board" },
  { src: unsplash("1534422298391-e4f8c172dddb"), alt: "Dumplings in ceramic bowls" },
  { src: unsplash("1432139555190-58524dae6a55"), alt: "Roasted pork chop topped with pineapple" },
  { src: unsplash("1504674900247-0877df9cc836"), alt: "Sliced steak with vegetables and dipping sauce" },
  { src: unsplash("1414235077428-338989a2e8c0"), alt: "Plated dish at a candlelit table" },
  { src: unsplash("1600891964092-4316c288032e"), alt: "Steak frites" },
]
