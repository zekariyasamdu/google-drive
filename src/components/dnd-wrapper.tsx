"use client";
import { DragDropProvider } from "@dnd-kit/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateFileAction,
  updateFolderAction,
} from "~/server/actions/mutation-actions";

export default function DNDWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const { source, target } = event.operation;
        const { isAFile, parent } = source?.data as {
          isAFile: boolean;
          parent: string | null;
        };

        const getIdNumber = (id?: string | number) => {
          if (!id) return null;
          const part = id.toString().split("-")[1];
          const num = Number(part);
          return Number.isNaN(num) ? null : num;
        };

        const draggedId = getIdNumber(source?.id);
        const droppedOnId = getIdNumber(target?.id);

        console.log("dropped", draggedId);
        console.log("parent", parent);
        console.log("droppedOn", droppedOnId);

        if (!draggedId || draggedId === droppedOnId || droppedOnId === parent)
          return;

        if (isAFile) {
          toast.promise(
            () =>
              updateFileAction(draggedId, {
                parent: droppedOnId,
              }),
            {
              loading: "Loading...",
              success: () => {
                route.refresh();
                return "Has been Moved!";
              },
              error: (e) => {
                console.log(e);
                return "Error";
              },
            },
          );
          return;
        }

        toast.promise(
          () =>
            updateFolderAction(draggedId, {
              parent: droppedOnId,
            }),
          {
            loading: "Loading...",
            success: () => {
              route.refresh();
              return "has been created";
            },
            error: "Error",
          },
        );
      }}
    >
      {children}
    </DragDropProvider>
  );
}
