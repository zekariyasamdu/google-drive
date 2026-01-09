"use client";
import { UploadButton } from "~/components/utiles/uploadthing";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import { cn } from "~/lib/utils";

export default function UploadBtn({
  className,
}: {
  className?: string;
} & React.ComponentProps<"button">) {
  const { currentCrumbId } = useNavigateBreadcrumbs()
  return (
    <UploadButton
      className={cn(
        className,
        "ut-button:bg-primary jjjjjj ut-button:text-primary-foreground ut-button:p-1 ut-button:hover:bg-primary/90 ut-button:rounded-lg ut-button:px-6",
      )}
      endpoint="imageUploader"
      input={{
        currentCrumbId,
      }}
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
