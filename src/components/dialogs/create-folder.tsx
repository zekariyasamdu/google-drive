import type { Action } from "../dropdown-menu";
import CreateFolderForm from "../forms/create-folder";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function CreateFolderDialog({
  variant,
  opened,
  setIsOpen,
}: {
  variant?: "header";
  opened: boolean;
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
            setIsOpen?.({ type: "toggleFolder", state: open });
          },
        }
      : {};

  return (
    <Dialog {...dialogAttributes}>
      {variant == "header" ? (
        ""
      ) : (
        <DialogTrigger asChild>
          <Button className="w-20">Folder</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add folder</DialogTitle>
        </DialogHeader>
        <CreateFolderForm />
      </DialogContent>
    </Dialog>
  );
}
