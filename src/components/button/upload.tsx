"use client";
import { UploadButton } from "~/components/utiles/uploadthing";
import { cn } from "~/lib/utils";
// import "@uploadthing/react/styles.css";

export default function UploadBtn({
  className,
}: {
  className?: string;
} & React.ComponentProps<"button">) {
  return (
    <UploadButton
      className={cn(
        className,
        "ut-button:bg-primary ut-button:text-primary-foreground ut-button:p-1 ut-button:hover:bg-primary/90 ut-button:rounded-lg ut-button:px-6",
      )}
      endpoint="imageUploader"
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
