"use client";
import { type TFolderSelect, type TFileSelect } from "~/lib/types/db";
import { GridLayoutItem } from "./item-card";
export const ContentContainer = ({
  folderOrFileItems,
}: {
  folderOrFileItems: (TFolderSelect | TFileSelect)[];
}) => {
  return (
    <>
      {folderOrFileItems.map((item) => (
        <GridLayoutItem key={item.id} item={item} />
      ))}
    </>
  );
};
