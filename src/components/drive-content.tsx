"use client";
import type { TFileSelect, TFolderSelect } from "~/lib/types/db";
import { ContentContainer } from "./cards/content-grid";
import Nav from "./navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { GridListToggle } from "./grid-list-toggle";

export default function DriveContent({
  folders,
  files,
  parents,
}: {
  folders: TFolderSelect[];
  files: TFileSelect[];
  parents: { id: number; name: string }[];
}) {
  const [isGrid, setIsGrid] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedView = localStorage.getItem("itemView");

    if (savedView === "list") {
      setIsGrid(false);
    }

    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="mr-auto ml-auto flex h-screen w-full justify-center pt-25">
        <Spinner />
      </div>
    );

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
