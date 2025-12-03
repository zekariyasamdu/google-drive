"use client"
import { Folder, Ellipsis } from "lucide-react";
import { Card, CardAction, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import type { TFolder } from "~/lib/types/api";

export const FolderItems = ({ data }: { data: TFolder[] }) => {
  const { setCurrentcrumbId, setBreadcrumbs, currentCrumbId } = useNavigateBreadcrumbs()
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
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
          <CardHeader ><Folder className="w-11 h-11" /></CardHeader>
          <CardTitle className="pl-6">{item.name}</CardTitle>
          <CardAction className="pl-6 text-blue-600 flex gap-3 cursor-pointer" onClick={() => breadcrumbModifier(item.id, item.name)}>open</CardAction>
        </Card>

      ))}
    </>
  )
}
