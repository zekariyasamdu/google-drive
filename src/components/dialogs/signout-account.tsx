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
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { signOut } from "better-auth/api";
import { useRouter } from "next/navigation";

export default function SignoutDialog() {
  const route = useRouter();
  const signoutMutation = useMutation({
    mutationFn: () => handelSignout(),

    onSuccess: () => {
      toast.success("Delete Successfully!");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handelSignout = async () => {
    await signOut();
    route.push("/auth/login");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={signoutMutation.isPending}>
          {signoutMutation.isPending ? <Spinner /> : "Signout"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Signout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signing out.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signoutMutation.mutate()}
            variant="destructive"
            disabled={signoutMutation.isPending}
          >
            Signout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
