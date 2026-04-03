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
import { useQuery } from "@tanstack/react-query";
import { authClient } from "~/lib/auth/auth-client";
import { usePathname } from "next/navigation";
import axios from "axios";
import { FolderAndFileSelectSchema } from "~/schema";
import z from "zod";
import { EmptyFolder } from "../empty/empty-folder";
import { EmptyStar } from "../empty/empty-star";
import { processPath } from "~/lib/utils";
import { EmptyTrash } from "../empty/empty-trash";
type UserView = "dashboard" | "star" | "trash";

const userView: Record<UserView, React.ReactNode> = {
  dashboard: <EmptyFolder />,
  star: <EmptyStar />,
  trash: <EmptyTrash />,
};
export const ContentContainer = ({
  folderAndFileItems,
  isGrid,
}: {
  folderAndFileItems: {
    folders: TFolderSelect[];
    files: TFileSelect[];
  };
  isGrid: boolean;
}) => {
  const path = usePathname();
  const { routeName, folderId } = processPath(path);
  const { data: session } = authClient.useSession();
  const queryKey = ["folderAndFile", routeName, folderId];
  const folderAndFileQuery = useQuery<{
    folders: TFolderSelect[];
    files: TFileSelect[];
  }>({
    queryKey: queryKey,
    queryFn: async () => {
      if (!session?.user) throw new Error("Unauthorized");
      let routeApi: string;
      if (folderId) {
        routeApi = `/api/dashboard/${folderId}`;
      } else if (routeName === "dashboard") {
        routeApi = `/api/dashboard`;
      } else if (routeName === "star") {
        routeApi = `/api/stared`;
      } else if (routeName === "trash") {
        routeApi = `/api/trashed`;
      } else {
        throw new Error("Invalid path");
      }
      try {
        const res = await axios.get(routeApi);
        const resFolderAndFile = FolderAndFileSelectSchema.parse(res.data);
        return resFolderAndFile;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error("Type Error!");
        }
        throw new Error("Someting happened!");
      }
    },
    placeholderData: folderAndFileItems,
  });

  const result = folderAndFileQuery.data;
  if (result?.folders.length === 0 && result?.files.length === 0) {
    return <div className="mx-auto mt-5">{userView[routeName]}</div>;
  }

  return (
    <>
      {isGrid ? (
        <>
          {result?.folders?.map((item) => (
            <GridLayoutItem key={item.id} item={item} />
          ))}
          {result?.files?.map((item) => (
            <GridLayoutItem key={item.id} item={item} />
          ))}
        </>
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
            {result?.folders?.map((item) => (
              <ListLayoutItem key={item.id} item={item} />
            ))}
            {result?.files?.map((item) => (
              <ListLayoutItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
