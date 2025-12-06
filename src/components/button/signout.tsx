"use client"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"

export default function SignOut({ className, ...props }: {
  className?: string 
} & React.ComponentProps<"button">) {
  return (
    <Button {...props} variant={"ghost"} className={cn("w-25", className)}>  Signout </Button>
  )
}

