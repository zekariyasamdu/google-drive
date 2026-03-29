"use client";
import { DragDropProvider } from "@dnd-kit/react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
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

        toast.promise(
          () => {
            if (isAFile) {
              return updateFileAction(draggedId, {
                parent: droppedOnId,
              });
            }
            return updateFolderAction(draggedId, {
              parent: droppedOnId,
            });
          },
          {
            loading: "Loading...",
            success: async () => {
              await queryClient.invalidateQueries({ queryKey });
              return "Has been moved!";
            },
            error: (e) => {
              console.log(e);
              return "Error";
            },
          },
        );
      }}
    >
      {children}
    </DragDropProvider>
  );
}
