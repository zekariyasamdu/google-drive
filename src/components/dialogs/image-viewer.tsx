import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function ImageViewer({
  src,
  preview = false,
  opened,
  setIsOpen,
}: {
  src: string;
  preview?: boolean;
  opened?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const controlledProps = setIsOpen
    ? {
        open: opened,
        onOpenChange: (open: boolean) => {
          setIsOpen(open);
        },
      }
    : {};
  return (
    <Dialog {...controlledProps}>
      {preview ? (
        <DialogTrigger className="text-blue-600">
          <div className="h-30 w-30 overflow-hidden rounded-full">
            <Image
              src={src}
              alt="profile picture"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
        </DialogTrigger>
      ) : (
        ""
      )}
      <DialogTitle></DialogTitle>
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
