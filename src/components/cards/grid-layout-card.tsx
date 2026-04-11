import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Ellipsis, Folder, File, Star } from "lucide-react";
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
import ImageViewer from "../dialogs/image-viewer";
import { useFolderFileMutation } from "~/hooks/use-folder-file-mutation";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { cn, processPath } from "~/lib/utils";

export function GridLayoutItem({
  item,
  isFocused,
  setIsFocused,
}: {
  item: TFolderSelect | TFileSelect;
  isFocused: number | null;
  setIsFocused: (id: number | null) => void;
}) {
  const [isOpenedRename, _toggleRenameDialog] = useState(false);
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
    <Card
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
        "relative h-39 w-55 gap-2 sm:w-40 md:w-45 lg:w-40 xl:w-40",
        isSelected && "border border-blue-300 bg-transparent",
      )}
    >
      <div
        className={cn("absolute bottom-2 left-5", !item.star && "invisible")}
      >
        <Star />
      </div>
      <CardAction className={"absolute top-2 right-2"}>
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => {
              e.stopPropagation();
            }}
            asChild
          >
            <Ellipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-56"
              align="start"
            >
              <DropdownMenuGroup>
                {item.star ? (
                  <DropdownMenuItem onClick={handleStar}>
                    Unstar
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleStar}>Star</DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => _toggleRenameDialog(true)}>
                  Rename
                </DropdownMenuItem>
                {item.trash ? (
                  <>
                    <DropdownMenuItem onClick={handleDelete}>
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
        <RenameDialog
          opened={isOpenedRename}
          setIsOpen={_toggleRenameDialog}
          itemId={item.id}
          {...(isAFile
            ? { fileKey: item.fileKey, variant: "File" }
            : { variant: "Folder" })}
        />
      </CardAction>
      {isAFile ? (
        <>
          <CardHeader>
            <File className="h-11 w-11" />
          </CardHeader>
          <CardDescription className="absolute right-2 bottom-2 pl-6">
            <div>{filesize(item.size)}</div>
          </CardDescription>
          <CardTitle className="w-full truncate px-6">{item.name}</CardTitle>
          <CardAction className="flex cursor-pointer gap-3 pl-6">
            <ImageViewer
              opened={isOpenedImage}
              setIsOpen={_toggleImageDialog}
              src={item.url}
            />
          </CardAction>
        </>
      ) : (
        <>
          <CardHeader>
            <Folder className="h-11 w-11" />
          </CardHeader>
          <CardTitle className="w-full truncate px-6">{item.name}</CardTitle>
        </>
      )}
    </Card>
  );
}
