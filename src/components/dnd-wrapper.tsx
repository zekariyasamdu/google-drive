"use client";
import { DragDropProvider } from "@dnd-kit/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import type { TFolderSelect, TFileSelect } from "~/lib/types/db";
import { processPath } from "~/lib/utils";
import {
  updateFileAction,
  updateFolderAction,
} from "~/server/actions/mutation-actions";

export default function DNDWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const { routeName, folderId } = processPath(path);
  const queryClient = useQueryClient();
  const queryKey = ["folderAndFile", routeName, folderId];

  const mutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: async (
      {
        draggedId,
        droppedOnId,
        isFile,
      }: {
        draggedId: number;
        droppedOnId: number | null;
        isFile: boolean;
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
            const newFiles = current.files.filter(
              (item) => item.id !== draggedId,
            );
            return {
              folders: current.folders,
              files: newFiles,
            };
          }
          const newFolders = current.folders.filter(
            (item) => item.id !== draggedId,
          );
          return {
            folders: newFolders,
            files: current.files,
          };
        },
      );
      if (isFile) {
        await updateFileAction(draggedId, {
          parent: droppedOnId,
        });
        return { previousTodos };
      }
      await updateFolderAction(draggedId, {
        parent: droppedOnId,
      });
      toast.success("Moved!");
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

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const { source, target } = event.operation;
        const { isAFile, parent } = source?.data as {
          isAFile: boolean;
          parent: string | null;
        };

        const getIdNumber = (id: string | number | undefined | null) => {
          if (id === null) return null;
          if (id === undefined) return undefined;
          const part = id.toString().split("-")[1];
          const num = Number(part);
          return Number.isNaN(num) ? null : num;
        };

        const draggedId = getIdNumber(source?.id);
        const droppedOnId = getIdNumber(target?.id);
        if (droppedOnId === undefined) return;

        console.log("dropped", draggedId);
        console.log("parent", parent);
        console.log("droppedOn", droppedOnId);

        if (!draggedId || draggedId === droppedOnId || droppedOnId === parent)
          return;

        mutation.mutate({
          draggedId,
          droppedOnId,
          isFile: isAFile,
        });
      }}
    >
      {children}
    </DragDropProvider>
  );
}
