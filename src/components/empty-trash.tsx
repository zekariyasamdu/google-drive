"use client"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "./ui/empty";
import { Trash } from "lucide-react";

export function EmptyTrash() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Trash />
        </EmptyMedia>
        <EmptyTitle>No Items Yet</EmptyTitle>
        <EmptyDescription>
          When you trash items they will show up here
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}



