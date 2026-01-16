"use client"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "./../ui/empty";
import { Star } from "lucide-react";

export function EmptyStar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Star/>
        </EmptyMedia>
        <EmptyTitle>No Items Yet</EmptyTitle>
        <EmptyDescription>
          When you have a favorite they will show up here
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
