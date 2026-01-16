"use client"
import { useMutation } from "@tanstack/react-query";
import { Folder, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteFolderAction, updateFolderAction } from "~/action/mutation-actions";
import { Card, CardAction, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import type { TFolderSelect } from "~/lib/types/db";
import RenameDialog from "../dialogs/rename-items";
import { useState } from "react";

export const FolderItems = ({ data }: { data: TFolderSelect[] }) => {
  const { setCurrentcrumbId, setBreadcrumbs, currentCrumbId } = useNavigateBreadcrumbs()
  const route = useRouter()
  const [isOpened, _toggleDialog] = useState(false)

  const deleteMutation = useMutation({
    mutationKey: ["deleteFolder"],
    mutationFn: async (folder_id: number) => {
      await deleteFolderAction(folder_id)
    },
    onMutate: () => {
      route.refresh()
    }
  })

  const trashMutation = useMutation({
    mutationKey: ["deleteFolder"],
    mutationFn: async (folder_id: number) => {
      await updateFolderAction(folder_id, {trash:true})
    },
    onMutate: () => {
      route.refresh()
    }
  })

  function breadcrumbModifier(id: number, name: string) {
    setCurrentcrumbId(id);
    setBreadcrumbs({ id, name });
  }

  const filteredData = () => {
    const filteredFolder = data.filter((item) => item.parent === currentCrumbId);
    return filteredFolder;
  }

  return (
    <>
      {filteredData().map(item => (
        <Card key={item.id} className="w-1/6 h-45 gap-2 relative">
          <CardAction className="absolute right-2 top-2">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Ellipsis className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Star
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => _toggleDialog(true)}>
                    Rename
                  </DropdownMenuItem>
                  {item.trash ?
                    <DropdownMenuItem onClick={() => deleteMutation.mutate(item.id)}>
                      Remove
                    </DropdownMenuItem> :
                    <DropdownMenuItem onClick={() => trashMutation.mutate(item.id)}>
                      Trash
                    </DropdownMenuItem>
                  }
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <RenameDialog variant="Folder" opened={isOpened} setIsOpen={_toggleDialog} itemId={item.id} />
          </CardAction>
          <CardHeader ><Folder className="w-11 h-11" /></CardHeader>
          <CardTitle className="pl-6">{item.name}</CardTitle>
          <CardAction className="pl-6 text-blue-600 flex gap-3 cursor-pointer" onClick={() => breadcrumbModifier(item.id, item.name)}>open</CardAction>
        </Card>

      ))}
    </>
  )
}
