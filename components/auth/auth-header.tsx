import Link from "next/link"

type AuthHeaderProps = {
  prompt: string
  linkLabel: string
  href: string
}

export function AuthHeader({ prompt, linkLabel, href }: AuthHeaderProps) {
  return (
    <div className="space-y-3 text-center">
      
      <p className="text-muted-foreground">
        {prompt}{" "}
        <Link href={href} className="font-medium text-pine hover:underline underline-offset-4">
          {linkLabel}
        </Link>
      </p>
    </div>
  )
}
