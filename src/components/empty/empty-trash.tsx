"use client"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "./../ui/empty";
import { Trash } from "lucide-react";

export function EmptyTrash() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Trash/>
        </EmptyMedia>
        <EmptyTitle>No Items Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t imported any files yet. Get started by creating
          your first Folder.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
