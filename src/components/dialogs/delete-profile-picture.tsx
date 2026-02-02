"use client";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteProfilePicture } from "~/action/mutation-actions";
import { useRouter } from "next/navigation";

export default function DeleteImageDialog() {
  const route = useRouter()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteProfilePicture()
    },
    onSuccess: () => {
      toast.success("Profile picture deleted!");
      route.refresh();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Profile Picture?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteMutation.mutate()}
            variant="destructive"
            disabled={deleteMutation.isPending}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
