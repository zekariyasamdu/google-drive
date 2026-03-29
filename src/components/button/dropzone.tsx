"use client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadDropzone } from "~/components/utiles/uploadthing";
import { cn, processPath } from "~/lib/utils";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadZone({
  className,
  isProfilePicture = false,
}: {
  className?: string;
  isProfilePicture?: boolean;
} & React.ComponentProps<"button">) {
  const route = useRouter();
  const currentPath = usePathname();
  const queryClient = useQueryClient();
  const { routeName, folderId } = processPath(currentPath);
  const queryKey = ["folderAndFile", routeName, folderId];

  return (
    <UploadDropzone
      className={cn(
        className,
        "ut-button:bg-primary ut-button:m-3 ut-label:hidden ut-button:text-primary-foreground ut-button:p-1 ut-button:hover:bg-primary/90 ut-button:rounded-lg ut-button:px-6",
      )}
      content={{
        allowedContent({ ready, isUploading }) {
          if (!ready) return "done!";
          if (isUploading) return <Spinner />;
          return `Image`;
        },
        label() {
          return `Drag and Drop`;
        },
      }}
      endpoint="imageUploader"
      input={{
        currentCrumbId: folderId,
        isProfilePicture,
      }}
      onClientUploadComplete={async (res) => {
        await queryClient.invalidateQueries({ queryKey });
        toast.success("File uploaded!");
        route.refresh();
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
}
