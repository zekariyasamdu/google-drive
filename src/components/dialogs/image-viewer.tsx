import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

export default function ImageViewer({ src }: { src: string }) {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-600">open </DialogTrigger>
      <DialogContent
        className="h-fit w-fit border-none bg-transparent shadow-none"
        showCloseButton={false}
      >
        <Image
          src={src}
          alt="preview"
          fill
          className="relative! h-auto! w-full! object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
