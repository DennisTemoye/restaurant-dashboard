import Link from "next/link"

import { Logo } from "@/components/shared/logo"
import { clientNav } from "@/lib/config/nav"
import { siteConfig } from "@/lib/config/site"

const linkClass =
  "rounded-sm text-cream/80 outline-none transition-colors hover:text-cream focus-visible:ring-2 focus-visible:ring-cream"

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              Open-fire cooking, seasonal plates and long dinners in the heart of Lekki.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-medium text-cream/60">Explore</h2>
            <ul className="mt-4 grid gap-2.5">
              {[...clientNav, { title: "Sign in", href: "/login" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-cream/60">Find us</h2>
            <address className="mt-4 grid gap-2.5 not-italic text-cream/80">
              {siteConfig.contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                {siteConfig.contact.phone}
              </a>
            </address>
          </div>

          <div>
            <h2 className="text-sm font-medium text-cream/60">Hours</h2>
            <dl className="mt-4 grid gap-2.5 text-sm">
              {siteConfig.hours.map(({ days, time }) => (
                <div key={days} className="flex justify-between gap-4">
                  <dt className="text-cream/80">{days}</dt>
                  <dd className="tabular-nums">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-16 font-display text-[clamp(6rem,26vw,22rem)] leading-[0.78] font-medium tracking-[-0.04em] select-none sm:mt-20"
        >
          {siteConfig.logoText}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-cream/15 pt-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.name}. Made with care in Lagos.</p>
          <Link href="/terms" className={linkClass}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
