import CreateFolderForm from "../forms/create-folder";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export default function CreateFolderDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Folder</Button>
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
