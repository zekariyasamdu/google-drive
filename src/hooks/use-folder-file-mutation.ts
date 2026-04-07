import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import type { createFolderSchema } from "~/components/forms/rename-item";
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
            return {
              folders: newFolders,
              files: current.files,
            };
          }
          const newFiles = current.files.filter((item) => item.id !== itemId);
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
            return {
              folders: current.folders,
              files: newFiles,
            };
          }
          const newFolders = current.folders.filter(
            (item) => item.id !== itemId,
          );

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
            const remainingFiles = current.files.filter(
              (item) => item.id !== itemId,
            );
            const targetFile = current.files.find((item) => item.id === itemId);
            if (!targetFile) return;

            return {
              folders: current.folders,
              files: [...remainingFiles, { ...targetFile, star: state }],
            };
          }

          const targetFolder = current.folders.find(
            (item) => item.id === itemId,
          );
          const remainingFolders = current.folders.filter(
            (item) => item.id !== itemId,
          );
          if (!targetFolder) return;

          return {
            folders: [...remainingFolders, { ...targetFolder, star: state }],
            files: current.files,
          };
        },
      );
      if (isFile) {
        await updateFileAction(itemId, { star: state });
        return;
      }

      await updateFolderAction(itemId, { star: state });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const renameMutation = useMutation({
    mutationKey: ["renameItem"],
    mutationFn: async (
      {
        itemId,
        fileKey,
        formData,
      }: {
        itemId: number;
        fileKey: string | undefined;
        formData: z.infer<typeof createFolderSchema>;
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

          if (fileKey) {
            const remainingFiles = current.files.filter(
              (item) => item.id !== itemId,
            );
            const targetFile = current.files.find((item) => item.id === itemId);
            if (!targetFile) return;

            return {
              folders: current.folders,
              files: [
                ...remainingFiles,
                { ...targetFile, name: formData.name },
              ],
            };
          }

          const targetFolder = current.folders.find(
            (item) => item.id === itemId,
          );
          const remainingFolders = current.folders.filter(
            (item) => item.id !== itemId,
          );
          if (!targetFolder) return;

          return {
            folders: [
              ...remainingFolders,
              { ...targetFolder, name: formData.name },
            ],
            files: current.files,
          };
        },
      );

      if (fileKey) {
        return await updateFileAction(itemId, { name: formData.name }, fileKey);
      }
      return await updateFolderAction(itemId, { name: formData.name });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    deleteMutation,
    trashMutation,
    starMutation,
    renameMutation,
  };
}
