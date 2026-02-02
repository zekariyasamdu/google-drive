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

export default function ChangeProfilePictureDialog() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="w-20" variant="outline">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
          </DialogHeader>
            <UploadZone isProfilePicture={true} />
        </DialogContent>
    </Dialog>
  )
}
