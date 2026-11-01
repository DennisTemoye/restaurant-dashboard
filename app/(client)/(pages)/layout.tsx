// Standard content pages share a centered container; the home page lives
// outside this group so its sections can run full-bleed.
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-8">{children}</div>
}
