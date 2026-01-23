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
  deleteFolder: (folderId: number) => {
    return db.delete(foldersSchema).where(eq(foldersSchema.id, folderId));
  },
  updateFolder: (fileId: number, updateData: Partial<TFolderInsert> = {}) => {
    return db.update(foldersSchema).set({ ...updateData }).where(eq(foldersSchema.id, fileId));
  },
  createFile: (files: TFileInsert) => {
    return db.insert(filesSchema).values(files);
  },
  deleteFiles: (fileId: number) => {
    return db.delete(filesSchema).where(eq(filesSchema.id, fileId));
  },
  updateFile: (fileId: number, updateData: Partial<TFileInsert> = {}) => {
    return db.update(filesSchema).set({ ...updateData }).where(eq(filesSchema.id, fileId));
  },
}
