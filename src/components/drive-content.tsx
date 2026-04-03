"use client";
import type { TFileSelect, TFolderSelect } from "~/lib/types/db";
import { ContentContainer } from "./cards/content-grid";
import Nav from "./navigation";
import { useState } from "react";
import { GridListToggle } from "./grid-list-toggle";

export default function DriveContent({
  folders,
  files,
  parents,
  initialIsGrid,
}: {
  folders: TFolderSelect[];
  files: TFileSelect[];
  parents: { id: number; name: string }[];
  initialIsGrid: boolean;
}) {
  const [isGrid, setIsGrid] = useState(initialIsGrid);
  return (
    <div className="mt-5 ml-5">
      <div className="flex w-full items-center justify-between px-5">
        <Nav breadcrumbs={parents} />
        <GridListToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 px-10">
        <ContentContainer
          folderAndFileItems={{ folders, files }}
          isGrid={isGrid}
        />
      </div>
    </div>
  );
}
