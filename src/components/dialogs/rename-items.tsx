"use client"
import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import RenameItemsForm from "../forms/rename-item";

export default function RenameDialog(
  { variant, opened, setIsOpen, itemId, fileKey }:
    { variant: "File" | "Folder", opened: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, itemId: number, fileKey?: string }) {
  return (
    <Dialog open={opened}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}>
      <DialogContent aria-describedby="Input new folder or file name dialog form" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename {variant}</DialogTitle>
        </DialogHeader>
        <RenameItemsForm variant={variant} itemId={itemId} fileKey={fileKey} />
      </DialogContent >
    </Dialog>
  )
}
