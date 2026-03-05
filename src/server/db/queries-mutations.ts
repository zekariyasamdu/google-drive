import "server-only";
import type { TFileInsert, TFolderInsert, TUserInsert } from "~/lib/types/db";
import { db } from ".";
import { filesSchema, foldersSchema, user } from "~/server/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export const QUERIES = {
  // excluding trash
  getFilesExcludingTrashed: (userId: string, itemsParentId: number | null) => {
    return db
      .select()
      .from(filesSchema)
      .where(
        and(
          itemsParentId === null
            ? isNull(filesSchema.parent)
            : eq(filesSchema.parent, itemsParentId),
          eq(filesSchema.owner_id, userId),
          eq(filesSchema.trash, false),
        ),
      );
  },
  getFolderExcludingTrahsed: (userId: string, itemsParentId: number | null) => {
    return db
      .select()
      .from(foldersSchema)
      .where(
        and(
          itemsParentId === null
            ? isNull(foldersSchema.parent)
            : eq(foldersSchema.parent, itemsParentId),
          eq(foldersSchema.owner_id, userId),
          eq(foldersSchema.trash, false),
        ),
      );
  },
  // star
  getStarredFilesExcludingTrashed: (userId: string) => {
    return db
      .select()
      .from(filesSchema)
      .where(
        and(
          eq(filesSchema.owner_id, userId),
          eq(filesSchema.trash, false),
          eq(filesSchema.star, true),
        ),
      );
  },
  getStarredFoldersExcludingTrashed: (userId: string) => {
    return db
      .select()
      .from(foldersSchema)
      .where(
        and(
          eq(foldersSchema.owner_id, userId),
          eq(foldersSchema.trash, false),
          eq(foldersSchema.star, true),
        ),
      );
  },
  // Trashed
  getTrashedFiles: (userId: string) => {
    return db
      .select()
      .from(filesSchema)
      .where(
        and(eq(filesSchema.owner_id, userId), eq(filesSchema.trash, true)),
      );
  },
  getTrashedFolders: (userId: string) => {
    return db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.owner_id, userId), eq(foldersSchema.trash, true)),
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
