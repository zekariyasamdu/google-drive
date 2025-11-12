import { Folder, File, Ellipsis } from "lucide-react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"


const Dashboard = () => {
  return (
    <div className=" w-full flex flex-row flex-wrap gap-10 pl-10 ml-auto mt-5">
      {Array.from({ length: 5 }).map((_, i) => <FolderItems icon="Folder" key={i} />)}
      {Array.from({ length: 3 }).map((_, i) => <FolderItems icon="File" key={i} />)}
    </div>
  )
}

const FolderItems = ({icon}:{icon: "Folder" | "File"}) => {
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
      <CardHeader >{icon === "Folder"? <Folder className="w-11 h-11" />: <File className="w-11 h-11" />}</CardHeader>
      <CardTitle className="pl-6">Projects</CardTitle>
      <CardDescription className="pl-6">Modified 2 days ago</CardDescription>
      <CardAction className="pl-6 text-blue-600 flex gap-3 cursor-pointer">{icon === "Folder"? "open" : "open file"} </CardAction>
    </Card>
  )
}
export default Dashboard;

