import "server-only";
import type { TFileInsert, TFolderInsert, TUserInsert } from "~/lib/types/db";
import { db } from ".";
import { filesSchema, foldersSchema, user } from "~/server/db/schema";
import { and, eq, ilike, isNull, sum } from "drizzle-orm";

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
      )
      .orderBy(filesSchema.id);
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
      )
      .orderBy(foldersSchema.id);
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
  // get all parents
  getAllParents: async (childfolderId: number | null) => {
    const parents: { id: number; name: string }[] = [];
    let currentId = childfolderId;
    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("parent not found!");
      }
      const { id, name, parent } = folder[0];
      parents.push({ id, name });
      currentId = parent;
    }

    return parents.reverse();
  },
  //search
  getSearchFolders(userId: string, query: string) {
    return db
      .select()
      .from(foldersSchema)
      .where(
        and(
          eq(foldersSchema.owner_id, userId),
          ilike(foldersSchema.name, `%${query}%`),
          eq(foldersSchema.trash, false),
        ),
      );
  },
  getSearchFile(userId: string, query: string) {
    return db
      .select()
      .from(filesSchema)
      .where(
        and(
          eq(filesSchema.owner_id, userId),
          ilike(filesSchema.name, `%${query}%`),
          eq(filesSchema.trash, false),
        ),
      );
  },
  // size
  getTotlaFileSize(userId: string) {
    return db
      .select({ size: sum(filesSchema.size) })
      .from(filesSchema)
      .where(and(eq(filesSchema.owner_id, userId)));
  },
  // grid
  async isGrid(userId: string) {
    const result = await db
      .select({ is_grid: user.is_grid })
      .from(user)
      .where(eq(user.id, userId));

    return result[0]?.is_grid ?? false;
  },
};

// mutations
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
  setGrid(userId: string, is_grid: boolean) {
    console.log("is_grid_request: ", is_grid);
    return db.update(user).set({ is_grid }).where(eq(user.id, userId));
  },
};
