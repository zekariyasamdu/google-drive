"use client"
import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

export default function UploadButton({ className, ...props }: {
  className?: string 
} & React.ComponentProps<"button">) {
  return (
    <Button {...props} className={cn("w-25", className)}> <CloudUpload /> Upload </Button>
  )
}

