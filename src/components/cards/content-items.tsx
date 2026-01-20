"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { Ellipsis, Folder, File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  deleteFileAction,
  deleteFolderAction,
  updateFileAction,
  updateFolderAction,
} from "~/action/mutation-actions";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import { type TFolderSelect, type TFileSelect, isFile } from "~/lib/types/db";
import RenameDialog from "../dialogs/rename-items";
import Link from "next/link";
import { filesize } from "filesize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ContentItemsCard = ({
  data,
}: {
  data: (TFolderSelect | TFileSelect)[];
}) => {
  const { setCurrentcrumbId, setBreadcrumbs, currentCrumbId } =
    useNavigateBreadcrumbs();
  const route = useRouter();
  const [isOpened, _toggleDialog] = useState(false);

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

  function breadcrumbModifier(id: number, name: string) {
    setCurrentcrumbId(id);
    setBreadcrumbs({ id, name });
  }

  const filteredData = () => {
    const filteredItems = data.filter((item) => item.parent === currentCrumbId);
    return filteredItems;
  };

  return (
    <>
      {filteredData().map((item) => (
        <Card key={item.id} className="relative h-45 w-1/6 gap-2">
          <CardAction className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuGroup>
                    {item.star ? (
                      <DropdownMenuItem
                        onClick={() => {
                          if (isFile(item)) {
                            starMutation.mutate({
                              itemId: item.id,
                              isFile: true,
                              state: false,
                            });
                            return;
                          }
                          starMutation.mutate({
                            itemId: item.id,
                            isFile: false,
                            state: false,
                          });
                        }}
                      >
                        Unstar
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => {
                          if (isFile(item)) {
                            starMutation.mutate({
                              itemId: item.id,
                              isFile: true,
                              state: true,
                            });
                            return;
                          }
                          starMutation.mutate({
                            itemId: item.id,
                            isFile: false,
                            state: true,
                          });
                        }}
                      >
                        Star
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => _toggleDialog(true)}>
                      Rename
                    </DropdownMenuItem>
                    {item.trash ? (
                      <>
                        <DropdownMenuItem
                          onClick={() => {
                            if (isFile(item)) {
                              deleteMutation.mutate({
                                itemId: item.id,
                                fileKey: item.fileKey,
                              });
                              return;
                            }

                            deleteMutation.mutate({
                              itemId: item.id,
                            });
                          }}
                        >
                          Remove
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (isFile(item)) {
                              trashMutation.mutate({
                                itemId: item.id,
                                isFile: true,
                                state: false,
                              });
                              return;
                            }

                            trashMutation.mutate({
                              itemId: item.id,
                              isFile: false,
                              state: false,
                            });
                          }}
                        >
                          Untrash
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => {
                          if (isFile(item)) {
                            trashMutation.mutate({
                              itemId: item.id,
                              isFile: true,
                              state: true,
                            });
                            return;
                          }

                          trashMutation.mutate({
                            itemId: item.id,
                            isFile: false,
                            state: true,
                          });
                        }}
                      >
                        Trash
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
            <RenameDialog
              opened={isOpened}
              setIsOpen={_toggleDialog}
              itemId={item.id}
              {...(isFile(item)
                ? { fileKey: item.fileKey, variant: "File" }
                : { variant: "Folder" })}
            />
          </CardAction>
          {isFile(item) ? (
            <>
              <CardHeader>
                {" "}
                <File className="h-11 w-11" />{" "}
              </CardHeader>
              <CardDescription className="pl-6">
                {filesize(item.size)}
              </CardDescription>
              <CardTitle className="pl-6">{item.name}</CardTitle>
              <CardAction className="flex cursor-pointer gap-3 pl-6 text-blue-600">
                <Link href={item.url} target="_blank">
                  {" "}
                  open file
                </Link>{" "}
              </CardAction>
            </>
          ) : (
            <>
              <CardHeader>
                <Folder className="h-11 w-11" />
              </CardHeader>
              <CardTitle className="pl-6">{item.name}</CardTitle>
              <CardAction
                className="flex cursor-pointer gap-3 pl-6 text-blue-600"
                onClick={() => breadcrumbModifier(item.id, item.name)}
              >
                open
              </CardAction>
            </>
          )}
        </Card>
      ))}
    </>
  );
};
