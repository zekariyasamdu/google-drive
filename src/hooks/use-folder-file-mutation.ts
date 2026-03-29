import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { processPath } from "~/lib/utils";
import {
  deleteFileAction,
  deleteFolderAction,
  updateFileAction,
  updateFolderAction,
} from "~/server/actions/mutation-actions";

export function useFolderFileMutation() {
  const path = usePathname();
  const { routeName, folderId } = processPath(path);
  const queryKey = ["folderAndFile", routeName, folderId];
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: async ({
      itemId,
      fileKey,
    }: {
      itemId: number;
      fileKey?: string;
    }) => {
      if (!fileKey) {
        await deleteFolderAction(itemId);
        return;
      }
      await deleteFileAction(itemId, fileKey);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
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
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
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
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    deleteMutation,
    trashMutation,
    starMutation,
  };
}
