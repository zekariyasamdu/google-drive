import "server-only";
import type { TFileInsert, TFolderInsert, TUserInsert } from "~/lib/types/db";
import { db } from ".";
import { filesSchema, foldersSchema, user } from "~/server/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export const QUERIES = {
  getFoldersByUser: (ownerId: string) => {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.owner_id, ownerId));
  },
  getFilesByUse: (ownerId: string) => {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.owner_id, ownerId));
  },
  getFilesByParentExcludingTrashed: (
    ownerId: string,
    parentId: number | null,
  ) => {
    return db
      .select()
      .from(filesSchema)
      .where(
        and(
          parentId === null
            ? isNull(filesSchema.parent)
            : eq(filesSchema.parent, parentId),
          eq(filesSchema.owner_id, ownerId),
          eq(filesSchema.trash, false),
        ),
      );
  },
  getFolderByParentExcludingTrahsed: (
    ownerId: string,
    parentId: number | null,
  ) => {
    return db
      .select()
      .from(foldersSchema)
      .where(
        and(
          parentId === null
            ? isNull(foldersSchema.parent)
            : eq(foldersSchema.parent, parentId),
          eq(foldersSchema.owner_id, ownerId),
          eq(foldersSchema.trash, false),
        ),
      );
  },
};

export const MUTATION = {
  createFolder: (folder: TFolderInsert) => {
    return db.insert(foldersSchema).values(folder);
  },
  deleteFolder: (folderId: number) => {
    return db.delete(foldersSchema).where(eq(foldersSchema.id, folderId));
  },
  updateFolder: (fileId: number, updateData: Partial<TFolderInsert> = {}) => {
    return db
      .update(foldersSchema)
      .set({ ...updateData })
      .where(eq(foldersSchema.id, fileId));
  },
  createFile: (files: TFileInsert) => {
    return db.insert(filesSchema).values(files);
  },
  deleteFiles: (fileId: number) => {
    return db.delete(filesSchema).where(eq(filesSchema.id, fileId));
  },
  updateFile: (fileId: number, updateData: Partial<TFileInsert> = {}) => {
    return db
      .update(filesSchema)
      .set({ ...updateData })
      .where(eq(filesSchema.id, fileId));
  },
  updateUser: (userId: string, updateData: Partial<TUserInsert> = {}) => {
    return db
      .update(user)
      .set({ ...updateData })
      .where(eq(user.id, userId));
  },
};
