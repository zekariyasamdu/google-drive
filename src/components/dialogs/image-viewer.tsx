import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

export default function ImageViewer({
  src,
  preview = false,
}: {
  src: string;
  preview?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-600">
        {preview ? (
          <div className="h-30 w-30 overflow-hidden rounded-full">
            <Image
              src={src}
              alt="profile picture"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          "open"
        )}
      </DialogTrigger>
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
