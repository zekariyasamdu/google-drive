"use client";
import { Button } from "./ui/button";
import { File, Folder, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CreateFolderDialog from "./dialogs/create-folder";
import CreateFileDialog from "./dialogs/import-file";
import { useReducer } from "react";

type State = {
  isFolderOpened: boolean;
  isFileOpened: boolean;
};

export type Action =
  | { type: "toggleFolder"; state: boolean }
  | { type: "toggleFile"; state: boolean }
  | { type: "closeAll" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggleFolder":
      return { isFolderOpened: !state.isFolderOpened, isFileOpened: false };
    case "toggleFile":
      return { isFileOpened: !state.isFileOpened, isFolderOpened: false };
    case "closeAll":
      return { isFileOpened: false, isFolderOpened: false };
    default:
      return state;
  }
}

export function DropdownImport() {
  const [state, dispatch] = useReducer(reducer, {
    isFolderOpened: false,
    isFileOpened: false,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-blue-400">
            <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => dispatch({ type: "toggleFolder", state: true })}
            >
              <div className="flex cursor-pointer flex-row gap-2 p-2">
                <Folder className="h-4 w-4" />
                <span> Create Folder</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch({ type: "toggleFile", state: true })}
            >
              <div className="flex cursor-pointer flex-row gap-2 p-2">
                <File className="h-4 w-4" />
                <span> Import Image</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateFolderDialog
        variant="header"
        opened={state.isFolderOpened}
        setIsOpen={dispatch}
      />
      <CreateFileDialog
        variant="header"
        opened={state.isFileOpened}
        setIsOpen={dispatch}
      />
    </>
  );
}
