"use client";
import type { TFileSelect, TFolderSelect } from "~/lib/types/db";
import { ContentContainer } from "./cards/content-grid";
import { EmptyFolder } from "./empty/empty-folder";
import Nav from "./navigation";
import { usePathname } from "next/navigation";
import { EmptyStar } from "./empty/empty-star";

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
  const pathArray = currentPath.split("/");
  const path = pathArray[1] ?? "star";
  const folderAndFiles = [...folders, ...files];

  if (folders.length === 0 && files.length === 0) {
    return (
      <div>
        <div className="mt-5 ml-5">
          <Nav breadcrumbs={parents} />
        </div>
        {path === "dashboard" ? <EmptyFolder /> : <EmptyStar />}
      </div>
    );
  }

  return (
    <div className="mt-5 ml-5">
      <Nav breadcrumbs={parents} />
      <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
        <ContentContainer folderOrFileItems={folderAndFiles} />
      </div>
    </div>
  );
}
