"use client";
import { usePathname, useRouter } from "next/navigation";
import { UploadButton } from "~/components/utiles/uploadthing";
import { cn } from "~/lib/utils";

export default function UploadBtn({
  className,
}: {
  className?: string;
} & React.ComponentProps<"button">) {
  const router = useRouter();
  const currentPath = usePathname();
  const pathArray = currentPath.split("/");
  const crumbId = Number(pathArray[2]);

  return (
    <UploadButton
      className={cn(
        className,
        "ut-button:bg-primary jjjjjj ut-button:text-primary-foreground ut-button:p-1 ut-button:hover:bg-primary/90 ut-button:rounded-lg ut-button:px-6",
      )}
      endpoint="imageUploader"
      input={{
        currentCrumbId: isNaN(crumbId) ? null : crumbId,
        isProfilePicture: null,
      }}
      onClientUploadComplete={(res) => {
        // Do something with the response
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
