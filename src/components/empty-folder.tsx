"use client"
import { IconFolderCode } from "@tabler/icons-react"
import { Button } from "./ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "./ui/empty";
import CreateFolderDialog  from "./dialogs/create-folder";
import CreateFileDialog from "./dialogs/import-file";

export function EmptyFolder() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Folder Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t imported any files yet. Get started by creating
          your first Folder.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <CreateFolderDialog />
          <CreateFileDialog />

        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
      </Button>
    </Empty>
  )
}



