"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadDropzone } from "~/components/utiles/uploadthing";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import { cn } from "~/lib/utils";

export default function UploadZone({
  className,
  isProfilePicture = false,
}: {
  className?: string;
  isProfilePicture?: boolean
} & React.ComponentProps<"button">) {
  const { currentCrumbId } = useNavigateBreadcrumbs()
  const route = useRouter();
  return (
    <UploadDropzone
      className={cn(
        className,
        "ut-button:bg-primary jjjjjj ut-button:text-primary-foreground ut-button:p-1 ut-button:hover:bg-primary/90 ut-button:rounded-lg ut-button:px-6",
      )}
      endpoint="imageUploader"
      input={{
        currentCrumbId,
        isProfilePicture
      }}
      onClientUploadComplete={(res) => {        // Do something with the response
        toast.success("File uploaded!")
        route.refresh();
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(`ERROR! ${error.message}`)
      }}
    />
  );
}
