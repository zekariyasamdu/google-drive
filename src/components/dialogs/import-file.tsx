"use client";
import UploadZone from "../button/dropzone";
import type { Action } from "../dropdown-menu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function CreateFileDialog({
  variant = "item",
  opened,
  setIsOpen,
}: {
  variant?: "item" | "header";
  opened?: boolean;
  setIsOpen?: (action: Action) => void;
}) {
  if (
    variant === "header" &&
    (setIsOpen === undefined || opened === undefined)
  ) {
    throw new Error(
      "Variant 'header' requires 'opened' and 'setIsOpen' props.",
    );
  }

  const dialogAttributes =
    variant === "header"
      ? {
          open: opened,
          onOpenChange: (open: boolean) => {
            setIsOpen?.({ type: "toggleFile", state: open });
          },
        }
      : {};

  return (
    <Dialog {...dialogAttributes}>
      {variant !== "header" && (
        <DialogTrigger asChild>
          <Button className="w-20" variant="outline">
            File
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Files</DialogTitle>
        </DialogHeader>
        <UploadZone />
      </DialogContent>
    </Dialog>
  );
}
