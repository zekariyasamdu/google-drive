"use client";
import { type TFolderSelect, type TFileSelect } from "~/lib/types/db";
import { ItemCard } from "./item-card";
export const ContentGrid = ({
  folderOrFileItems,
}: {
  folderOrFileItems: (TFolderSelect | TFileSelect)[];
}) => {
  return (
    <>
      {folderOrFileItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  );
};
