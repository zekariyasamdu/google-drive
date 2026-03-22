import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

export default function ImageViewerListLayout({
  src,
  opened,
  setIsOpen,
}: {
  src: string;
  opened: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      open={opened}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
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
