export function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return "Good Morning!"
  if (hour >= 12 && hour < 17) return "Good Afternoon!"
  return "Good Evening!"
}
