"use client"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"

export default function SignUp({ className, ...props }: {
  className?: string
} & React.ComponentProps<"button">) {
  return (
    <Button {...props} className={cn("w-25", className)}>  Signup </Button>
  )
}

