export type Testimonial = {
  id: string
  quote: string
  name: string
  // Who they are to the restaurant, e.g. "Sunday regular"
  role: string
  avatarUrl?: string
}

// Sample reviews for development. Replace with real, consented guest reviews
// (with avatarUrl if you have permission) before launch.
export const testimonials: Testimonial[] = [
  {
    id: "tobi-adeyemi",
    quote: "I came for the jollof and stayed for dessert. The crème brûlée alone is worth the trip across town.",
    name: "Tobi Adeyemi",
    role: "Sunday regular",
  },
  {
    id: "chidi-nwosu",
    quote:
      "We booked the long table for my mum's sixtieth. The team remembered every allergy without us repeating a thing, and a candle arrived before we even asked. She still talks about it.",
    name: "Chidi Nwosu",
    role: "Private dining guest",
  },
  {
    id: "hannah-cole",
    quote: "Ordered pickup on a packed Friday night and it was ready the minute I walked in. Still hot, perfectly packed.",
    name: "Hannah Cole",
    role: "Pickup customer",
  },
  {
    id: "lucia-romero",
    quote: "Best paella I've had outside Valencia.",
    name: "Lucía Romero",
    role: "Food writer",
  },
  {
    id: "daniel-mensah",
    quote:
      "Every plate looks like it was styled for a photo, then tastes even better. The grilled fish with charred lemon is my order every single time.",
    name: "Daniel Mensah",
    role: "Regular since 2023",
  },
  {
    id: "priya-raman",
    quote: "Booking a table takes ten seconds, and the reminder text means we haven't missed a reservation since.",
    name: "Priya Raman",
    role: "Weeknight regular",
  },
  {
    id: "marcus-bell",
    quote: "The online menu matches what's actually in the kitchen, so nothing I order is ever 'just sold out'.",
    name: "Marcus Bell",
    role: "Delivery customer",
  },
  {
    id: "sofia-marin",
    quote: "Quick lunch, generous portions, kind people. My whole office is hooked.",
    name: "Sofia Marin",
    role: "Works next door",
  },
]
