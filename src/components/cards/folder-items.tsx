import { Folder, File, Ellipsis } from "lucide-react";
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

export const FolderItems = ({ data }: { data: TFolder }) => {
  const { setCurrentcrumbId, setBreadcrumbs } = useNavigateBreadcrumbs()
  function breadcrumbModifier() {
    setCurrentcrumbId(data.id);
    setBreadcrumbs({ id: data.id, name: data.name });
  }

  return (
    <Card className="w-1/6 h-45 gap-2 relative">
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
      <CardHeader >{data.type === "Folder" ? <Folder className="w-11 h-11" /> : <File className="w-11 h-11" />}</CardHeader>
      <CardTitle className="pl-6">{data.name}</CardTitle>
      <CardAction className="pl-6 text-blue-600 flex gap-3 cursor-pointer" onClick={breadcrumbModifier}>open</CardAction>
    </Card>
  )
}
