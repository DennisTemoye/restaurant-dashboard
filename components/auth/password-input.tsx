"use client"

import { useState } from "react"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"

import { InputGroupButton } from "@/components/ui/input-group"
import { IconInput } from "@/components/auth/icon-input"

type PasswordInputProps = Omit<React.ComponentProps<typeof IconInput>, "icon" | "type" | "endAdornment">

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <IconInput
      icon={LockKeyhole}
      type={visible ? "text" : "password"}
      endAdornment={
        <InputGroupButton
          size="icon-sm"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="rounded-lg [&_svg]:size-5"
        >
          {visible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      }
      {...props}
    />
  )
}
