import { Folder } from "lucide-react";
import CreateFolderForm from "../forms/create-folder";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export default function CreateFolderDialog({ variant }: { variant?: "sidebar" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant == "sidebar" ?
          <div className="flex gap-2 p-2 flex-row cursor-pointer">
            <Folder />
            <span> Create Folder</span>
          </div>
          :
          <Button className="w-20">Folder</Button>
        }

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add folder</DialogTitle>
        </DialogHeader>
        <CreateFolderForm />
      </DialogContent>
    </Dialog>
  )
}
