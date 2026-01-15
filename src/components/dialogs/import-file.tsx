"use client"
import { File } from "lucide-react";
import UploadZone from "../button/dropzone";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export default function CreateFileDialog({ variant }: { variant?: "sidebar" }) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          {variant == "sidebar" ?
            <div className="flex gap-2 p-2 flex-row cursor-pointer">
              <File />
              <span >  Import File</span>
            </div>
            :
            <Button className="w-20" variant="outline">File</Button>
          }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Files</DialogTitle>
          </DialogHeader>
          <UploadZone />
        </DialogContent>
    </Dialog>
  )
}
