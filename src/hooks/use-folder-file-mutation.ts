import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import type { TFolderSelect, TFileSelect } from "~/lib/types/db";
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
  const queryClient = useQueryClient();
  const queryKey = ["folderAndFile", routeName, folderId];

  const deleteMutation = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: async (
      {
        itemId,
        fileKey,
      }: {
        itemId: number;
        fileKey?: string;
      },
      context,
    ) => {
      await context.client.cancelQueries({ queryKey });
      let previousTodos = context.client.getQueryData(queryKey);
      previousTodos = previousTodos ?? { folders: [], files: [] };

      context.client.setQueryData(
        queryKey,
        (old: { folders: TFolderSelect[]; files: TFileSelect[] }) => {
          const current = old ?? { folders: [], files: [] };
          if (!fileKey) {
            const newFolders = current.folders.filter(
              (item) => item.id !== itemId,
            );
            console.log({
              folders: newFolders,
              files: current.files,
            });
            return {
              folders: newFolders,
              files: current.files,
            };
          }
          const newFiles = current.files.filter((item) => item.id !== itemId);
          console.log({
            folders: current.folders,
            files: newFiles,
          });
          return {
            folders: current.folders,
            files: newFiles,
          };
        },
      );

      if (!fileKey) {
        await deleteFolderAction(itemId);
        return { previousTodos };
      }
      await deleteFileAction(itemId, fileKey);
      return { previousTodos };
    },
    onError: (
      err,
      newTodo,
      onMutateResult:
        | { previousTodos: { folders: TFolderSelect[]; files: TFileSelect[] } }
        | undefined,
      context,
    ) => {
      context.client.setQueryData(queryKey, onMutateResult?.previousTodos);
      toast.error("Error deleting items!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const trashMutation = useMutation({
    mutationKey: ["trashItem"],
    mutationFn: async (
      {
        itemId,
        isFile,
        state,
      }: {
        itemId: number;
        isFile: boolean;
        state: boolean;
      },
      context,
    ) => {
      await context.client.cancelQueries({ queryKey });
      let previousTodos = context.client.getQueryData(queryKey);
      previousTodos = previousTodos ?? { folders: [], files: [] };

      context.client.setQueryData(
        queryKey,
        (old: { folders: TFolderSelect[]; files: TFileSelect[] }) => {
          const current = old ?? { folders: [], files: [] };
          if (isFile) {
            const newFiles = current.files.filter((item) => item.id !== itemId);
            console.log({
              folders: current.folders,
              files: newFiles,
            });
            return {
              folders: current.folders,
              files: newFiles,
            };
          }
          const newFolders = current.folders.filter(
            (item) => item.id !== itemId,
          );
          console.log({
            folders: newFolders,
            files: current.files,
          });
          return {
            folders: newFolders,
            files: current.files,
          };
        },
      );
      if (isFile) {
        await updateFileAction(itemId, { trash: state });
        return { previousTodos };
      }
      await updateFolderAction(itemId, { trash: state });
      return { previousTodos };
    },
    onError: (
      err,
      newTodo,
      onMutateResult:
        | { previousTodos: { folders: TFolderSelect[]; files: TFileSelect[] } }
        | undefined,
      context,
    ) => {
      context.client.setQueryData(queryKey, onMutateResult?.previousTodos);
      toast.error("Error creating folder!");
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
