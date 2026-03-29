"use client";
import { IconFolderCode } from "@tabler/icons-react";
import CreateFolderDialog from "../dialogs/create-folder";
import CreateFileDialog from "../dialogs/import-file";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty";
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

export function EmptyFolder() {
  const [state, dispatch] = useReducer(reducer, {
    isFolderOpened: false,
    isFileOpened: false,
  });

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Folder Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t imported any files yet. Get started by creating your
          first Folder.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <CreateFolderDialog
            variant="item"
            opened={state.isFolderOpened}
            setIsOpen={dispatch}
          />
          <CreateFileDialog
            variant="item"
            opened={state.isFileOpened}
            setIsOpen={dispatch}
          />
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      ></Button>
    </Empty>
  );
}
