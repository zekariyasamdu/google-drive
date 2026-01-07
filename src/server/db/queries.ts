import "server-only"
import type { TFileInsert, TFolderInsert } from "~/lib/types/db";
import { db } from ".";
import {
  filesSchema,
  foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getFolders: (owner_id: string) => {
    return db.select().from(foldersSchema).where(eq(foldersSchema.owner_id, owner_id));
  },
  getFiles: (owner_id: string) => {
    return db.select().from(filesSchema).where(eq(filesSchema.owner_id, owner_id));
  },
}

export const MUTATION = {
  createFolder: (folder: TFolderInsert) => {
    return db.insert(foldersSchema).values(folder);
  },
  createFile: (files: TFileInsert) => {
    return db.insert(filesSchema).values(files);
  },
}
