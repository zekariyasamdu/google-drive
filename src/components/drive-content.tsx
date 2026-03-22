"use client";
import type { TFileSelect, TFolderSelect } from "~/lib/types/db";
import { ContentContainer } from "./cards/content-grid";
import { EmptyFolder } from "./empty/empty-folder";
import Nav from "./navigation";
import { usePathname } from "next/navigation";
import { EmptyStar } from "./empty/empty-star";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { List, LayoutGrid } from "lucide-react";
import { Spinner } from "./ui/spinner";

export default function DriveContent({
  folders,
  files,
  parents,
}: {
  folders: TFolderSelect[];
  files: TFileSelect[];
  parents: { id: number; name: string }[];
}) {
  const currentPath = usePathname();
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

  const pathArray = currentPath.split("/");
  const path = pathArray[1] ?? "star";
  const folderAndFiles = [...folders, ...files];

  if (folders.length === 0 && files.length === 0) {
    return (
      <div>
        <div className="mt-5 ml-5 flex w-full items-center justify-between px-10">
          <Nav breadcrumbs={parents} />
          <GridListToggle isGrid={isGrid} setIsGrid={setIsGrid} />
        </div>
        {path === "dashboard" ? <EmptyFolder /> : <EmptyStar />}
      </div>
    );
  }

  return (
    <div className="mt-5 ml-5">
      <div className="flex w-full items-center justify-between px-5">
        <Nav breadcrumbs={parents} />
        <GridListToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 px-10">
        <ContentContainer folderOrFileItems={folderAndFiles} isGrid={isGrid} />
      </div>
    </div>
  );
}

function GridListToggle({
  isGrid,
  setIsGrid,
}: {
  isGrid: boolean;
  setIsGrid: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="bg-secondary/50 flex cursor-pointer items-center rounded-lg border p-1"
      onClick={() => {
        setIsGrid((prev) => {
          const next = !prev;
          localStorage.setItem("itemView", next ? "grid" : "list");
          return next;
        });
      }}
    >
      <div
        className={`rounded-md p-1.5 transition-all ${!isGrid ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
      >
        <List className="h-4 w-4" />
      </div>

      <div
        className={`rounded-md p-1.5 transition-all ${isGrid ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
      >
        <LayoutGrid className="h-4 w-4" />
      </div>
    </div>
  );
}
