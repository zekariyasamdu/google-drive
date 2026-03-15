import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  deleteFileAction,
  deleteFolderAction,
  updateFileAction,
  updateFolderAction,
} from "~/server/actions/mutation-actions";

export function useFolderFileMutation() {
  const route = useRouter();
  const deleteMutation = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: async ({
      itemId,
      fileKey,
    }: {
      itemId: number;
      fileKey?: string;
    }) => {
      if (fileKey !== undefined) {
        await deleteFileAction(itemId, fileKey);
        return;
      }
      await deleteFolderAction(itemId);
    },
    onMutate: () => {
      route.refresh();
    },
  });

  const trashMutation = useMutation({
    mutationKey: ["trashItem"],
    mutationFn: async ({
      itemId,
      isFile,
      state,
    }: {
      itemId: number;
      isFile: boolean;
      state: boolean;
    }) => {
      if (isFile) {
        await updateFileAction(itemId, { trash: state });
        return;
      }
      await updateFolderAction(itemId, { trash: state });
    },
    onMutate: () => {
      route.refresh();
    },
  });

  const starMutation = useMutation({
    mutationKey: ["starItem"],
    mutationFn: async ({
      itemId,
      isFile,
      state,
    }: {
      itemId: number;
      isFile: boolean;
      state: boolean;
    }) => {
      if (isFile) {
        await updateFileAction(itemId, { star: state });
        return;
      }

      await updateFolderAction(itemId, { star: state });
    },
    onMutate: () => {
      route.refresh();
    },
  });

  return {
    deleteMutation,
    trashMutation,
    starMutation,
  };
}
