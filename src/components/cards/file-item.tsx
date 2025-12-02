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
import type { TFile } from "~/lib/types/api";

export const FileItems = ({ data }: { data: TFile[] }) => {
  const { currentCrumbId } = useNavigateBreadcrumbs()

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
          <CardHeader > <File className="w-11 h-11" /> </CardHeader>
          <CardTitle className="pl-6">{item.name}</CardTitle>
          <CardDescription className="pl-6">{item.size}</CardDescription>
          <CardAction className="pl-6 text-blue-600 flex gap-3 cursor-pointer"><Link href={item.url} target="_blank"> open file</Link> </CardAction>
        </Card>
      ))}
    </>
  )
}
