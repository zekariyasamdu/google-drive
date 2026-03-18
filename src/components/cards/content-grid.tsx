"use client";
import { type TFolderSelect, type TFileSelect } from "~/lib/types/db";
import { GridLayoutItem } from "./grid-layout-card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ListLayoutItem } from "./list-layout-card";

export const ContentContainer = ({
  folderOrFileItems,
  isGrid,
}: {
  folderOrFileItems: (TFolderSelect | TFileSelect)[];
  isGrid: boolean;
}) => {
  return (
    <>
      {isGrid ? (
        folderOrFileItems.map((item) => (
          <GridLayoutItem key={item.id} item={item} />
        ))
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="mt-6">
              <TableHead>Title</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folderOrFileItems.map((item) => (
              <ListLayoutItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
