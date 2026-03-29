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
  variant = "item",
  opened,
  setIsOpen,
}: {
  variant: "item" | "header";
  opened: boolean;
  setIsOpen: (action: Action) => void;
}) {
  return (
    <Dialog
      open={opened}
      onOpenChange={(open: boolean) => {
        setIsOpen?.({ type: "toggleFolder", state: open });
      }}
    >
      {variant !== "header" && (
        <DialogTrigger asChild>
          <Button className="w-20">Folder</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add folder</DialogTitle>
        </DialogHeader>
        <CreateFolderForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
