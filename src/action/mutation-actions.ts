"use server";
import { MUTATION } from "~/server/db/queries";
import type { TFileInsert, TFolderInsert } from "~/lib/types/db";
import { utapi } from "~/server/uploadthings";

/**
 * Creates a new folder record in the database.
 *
 * @param folder - The folder data to be inserted into the database.
 *
 * @returns A promise that resolves with the created folder.
 */
export async function createFolderAction(folder: TFolderInsert) {
  return await MUTATION.createFolder(folder);
}

/**
 * Deletes a folder and its associated data from the database.
 *
 * @param folder_id - The unique ID of the folder to delete.
 *
 * @returns A promise that resolves when the folder is deleted.
 */
export async function deleteFolderAction(folder_id: number) {
  return await MUTATION.deleteFolder(folder_id);
}

/**
 * Deletes a file from both the database and the upload storage.
 *
 * @param file_id - The unique ID of the file record in the database.
 * @param file_key - The storage key used to locate and delete the file from UploadThing.
 *
 * @returns A promise that resolves when both delete operations complete.
 */
export async function deleteFileAction(file_id: number, file_key: string) {
  return Promise.all([
    MUTATION.deleteFiles(file_id),
    utapi.deleteFiles(file_key),
  ])
}

/**
 * Updates a file's metadata in the database and optionally renames
 * the file in upload storage if a new name is provided.
 *
 * @param fileId - The unique ID of the file to update.
 * @param updateData - Partial file data to update (e.g. name, size, type).
 * @param fileKey - The storage key of the file, required if renaming the file.
 *
 * @returns A promise that resolves when all update operations complete.
 */
export async function updateFileAction(
  fileId: number,
  updateData: Partial<TFileInsert> = {},
  fileKey?: string
) {
  const renameFile = [];

  if (updateData.name !== undefined && fileKey !== undefined) {
    renameFile.push(
      utapi.renameFiles({ fileKey, newName: updateData.name })
    );
  }

  return Promise.all([
    MUTATION.updateFile(fileId, updateData),
    ...renameFile,
  ])
}

/**
 * Updates a folder's metadata in the database.
 *
 * @param folderId - The unique ID of the folder to update.
 * @param updateData - Partial folder data to update (e.g. name, parent).
 *
 * @returns A promise that resolves when the folder is updated.
 */
export async function updateFolderAction(
  folderId: number,
  updateData: Partial<TFolderInsert> = {}
) {
  return MUTATION.updateFolder(folderId, updateData);
}
