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
  deleteFolder: (folder_id: number) => {
    return db.delete(foldersSchema).where(eq(foldersSchema.id, folder_id));
  },
  updateFolder: (file_id: number, updateData: Partial<TFolderInsert>={}) => {
    return db.update(foldersSchema).set({...updateData}).where(eq(foldersSchema.id, file_id));
  },
  createFile: (files: TFileInsert) => {
    return db.insert(filesSchema).values(files);
  },
  deleteFiles: (file_id: number) => {
    return db.delete(filesSchema).where(eq(filesSchema.id, file_id));
  },
  updateFile: (file_id: number, updateData: Partial<TFileInsert>={}) => {
    return db.update(filesSchema).set({...updateData}).where(eq(filesSchema.id, file_id));
  },
}
