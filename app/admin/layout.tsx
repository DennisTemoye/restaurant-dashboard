import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
}

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return children
}
