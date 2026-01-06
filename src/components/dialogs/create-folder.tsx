import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createFolderSchema = z.object({
  name: z.string(),
})


export default function CreateFolderDialog() {

  // Validate form

  const form = useForm<z.infer<typeof createFolderSchema>>({
    resolver: zodResolver(createFolderSchema),
  });
  // Create request

  function onSubmit(data: z.infer<typeof createFolderSchema>){
    return;
  }
  // invaild query (router.refresh();)

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button>Create Folder</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="New Folder" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
