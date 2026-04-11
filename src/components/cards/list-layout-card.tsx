import { Ellipsis, Folder, File } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type TFolderSelect, type TFileSelect, isFile } from "~/lib/types/db";
import { useState } from "react";
import RenameDialog from "../dialogs/rename-items";
import { filesize } from "filesize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useFolderFileMutation } from "~/hooks/use-folder-file-mutation";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { cn, processPath } from "~/lib/utils";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import ImageViewer from "../dialogs/image-viewer";

export function ListLayoutItem({
  item,
  isFocused,
  setIsFocused,
}: {
  item: TFolderSelect | TFileSelect;
  isFocused: number | null;
  setIsFocused: (id: number | null) => void;
}) {
  const [isOpenedRename, _toggleDialogRename] = useState(false);
  const [isOpenedImage, _toggleImageDialog] = useState(false);
  const { deleteMutation, trashMutation, starMutation } =
    useFolderFileMutation();
  const route = useRouter();
  const currentPath = usePathname();
  const { routeName } = processPath(currentPath);
  const isAFile = isFile(item);
  const isSelected = isFocused === item.id ? true : false;
  const isInTrash = routeName === "trash";
  const { ref: dragRef, isDragSource } = useDraggable({
    id: `draggable-${item.id}`,
    data: { isAFile, parent: item.parent },
    disabled: routeName !== "dashboard" || !isFocused || !isSelected,
  });
  const { ref: dropRef } = useDroppable({
    id: `droppable-${item.id}`,
    disabled: isAFile || routeName !== "dashboard",
  });
  const handleStar = () =>
    starMutation.mutate({
      itemId: item.id,
      isFile: isAFile,
      state: !item.star,
    });

  const handleTrash = () =>
    trashMutation.mutate({
      itemId: item.id,
      isFile: isAFile,
      state: !item.trash,
    });

  const handleDelete = () => {
    if (isAFile) {
      deleteMutation.mutate({
        itemId: item.id,
        fileKey: item.fileKey,
      });
      return;
    }

    deleteMutation.mutate({
      itemId: item.id,
    });
  };

  function navigateToFolder(parentId: number) {
    route.push(`/dashboard/${parentId}`);
  }

  return (
    <TableRow
      ref={(el) => {
        dragRef(el);
        dropRef(el);
      }}
      onClick={() => {
        if (isSelected && !isAFile && !isInTrash) {
          setIsFocused(null);
          navigateToFolder(item.id);
          return;
        }

        if (isSelected && isAFile) {
          _toggleImageDialog(true);
          setIsFocused(null);
          return;
        }

        setIsFocused(item.id);
      }}
      className={cn(
        "group cursor-pointer",
        isSelected && "border border-blue-300 bg-transparent",
      )}
    >
      <TableCell className="cursor-pointer overflow-hidden font-medium">
        <div className="flex items-center gap-3">
          {isAFile ? (
            <File className="h-5 w-5" />
          ) : (
            <Folder className="h-5 w-5" />
          )}
          <span className="max-w-[200px]" title={item.name}>
            {item.name}
          </span>
        </div>
      </TableCell>

      <TableCell>{isAFile ? filesize(item.size) : "--"}</TableCell>

      <TableCell className="text-muted-foreground text-xs uppercase">
        {isAFile ? "Image" : "Folder"}
      </TableCell>

      <TableCell
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleStar}>
                  {item.star ? "Unstar" : "Star"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => _toggleDialogRename(true)}>
                  Rename
                </DropdownMenuItem>
                {item.trash ? (
                  <>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-600"
                    >
                      Delete forever
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleTrash}>
                      Recover
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleTrash}>
                    Trash
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        {isAFile ? (
          <ImageViewer
            opened={isOpenedImage}
            setIsOpen={_toggleImageDialog}
            src={item.url}
          />
        ) : (
          ""
        )}

        <RenameDialog
          opened={isOpenedRename}
          setIsOpen={_toggleDialogRename}
          itemId={item.id}
          {...(isAFile
            ? { fileKey: item.fileKey, variant: "File" }
            : { variant: "Folder" })}
        />
      </TableCell>
    </TableRow>
  );
}
