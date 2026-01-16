"use client"
import { File, Ellipsis } from "lucide-react";
import Link from "next/link";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import type { TFileSelect } from "~/lib/types/db";
import { filesize } from "filesize";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteFileAction, updateFileAction } from "~/action/mutation-actions";
import RenameDialog from "../dialogs/rename-items";
import { useState } from "react";

export const FileItems = ({ data }: { data: TFileSelect[] }) => {
  const { currentCrumbId, setCurrentcrumbId } = useNavigateBreadcrumbs()
  const [isOpened, _toggleDialog] = useState(false)
  const route = useRouter()
  const deleteMutation = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: async ({
      file_id,
      file_key,
    }: {
      file_id: number
      file_key: string
    }) => {
      await deleteFileAction(file_id, file_key)
    },
    onMutate: () => {
      route.refresh()
    },
    onSuccess() {
      setCurrentcrumbId(null)
    },
  })

  const trashMutation = useMutation({
    mutationKey: ["trashFile"],
    mutationFn: async (fileid: number) => {
      await updateFileAction(fileid, { trash: true })
    },
    onMutate: () => {
      route.refresh()
    }
  })


  const filteredData = () => {
    const filteredFile = data.filter((item) => item.parent === currentCrumbId);
    return filteredFile;
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
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => _toggleDialog(true)}>
                    Rename
                  </DropdownMenuItem>
                  {item.trash ?

                    <DropdownMenuItem onClick={() => deleteMutation.mutate({ file_id: item.id, file_key: item.fileKey })}>
                      Remove
                    </DropdownMenuItem> :
                    <DropdownMenuItem onClick={() => trashMutation.mutate(item.id)}>
                      Trash
                    </DropdownMenuItem>
                  }
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <RenameDialog variant="File" opened={isOpened} setIsOpen={_toggleDialog} itemId={item.id} fileKey={item.fileKey} />
          </CardAction>
          <CardHeader > <File className="w-11 h-11" /> </CardHeader>
          <CardTitle className="pl-6">{item.name}</CardTitle>
          <CardDescription className="pl-6">{filesize(item.size)}</CardDescription>
          <CardAction className="pl-6 text-blue-600 flex gap-3 cursor-pointer"><Link href={item.url} target="_blank"> open file</Link> </CardAction>
        </Card>
      ))}
    </>
  )
}
