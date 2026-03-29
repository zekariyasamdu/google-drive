"use server";
import { MUTATION } from "~/server/db/queries-mutations";
import type { TFileInsert, TFolderInsert, TUserInsert } from "~/lib/types/db";
import { utapi } from "~/server/uploadthings";
import { revalidatePath } from "next/cache";
import { verifyUser } from "../auth/verify-user";

/**
 * Creates a new folder record in the database.
 *
 * @param folder - The folder data to be inserted into the database.
 *
 * @returns A promise that resolves with the created folder.
 */
export async function createFolderAction(folder: TFolderInsert) {
  await verifyUser();
  await MUTATION.createFolder(folder);
  return;
}
/**
 * Deletes a folder and its associated data from the database.
 *
 * @param folder_id - The unique ID of the folder to delete.
 *
 * @returns A promise that resolves when the folder is deleted.
 */
export async function deleteFolderAction(folder_id: number) {
  await verifyUser();
  await MUTATION.deleteFolder(folder_id);
  return;
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
  await verifyUser();
  await Promise.all([
    MUTATION.deleteFiles(file_id),
    utapi.deleteFiles(file_key),
  ]);
  return;
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
  fileKey?: string,
) {
  await verifyUser();
  const renameFile = [];

  if (updateData.name !== undefined && fileKey !== undefined) {
    renameFile.push(utapi.renameFiles({ fileKey, newName: updateData.name }));
  }

  await Promise.all([MUTATION.updateFile(fileId, updateData), ...renameFile]);
  return;
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
  updateData: Partial<TFolderInsert>,
) {
  await verifyUser();
  await MUTATION.updateFolder(folderId, updateData);
  return;
}

/**
 * Updates a user's metadata in the database.
 *
 * @param userId - The unique ID of the user to update.
 * @param updateData - Partial user data to update (e.g. name).
 *
 * @returns A promise that resolves when the user is updated.
 */

export async function updateUserAction(updateData: Partial<TUserInsert>) {
  const session = await verifyUser();
  await MUTATION.updateUser(session.user.id, updateData);
  return;
}

export async function deleteProfilePicture() {
  const session = await verifyUser();
  const userId = session.user.id;
  const imageFileKey = session.user.imageFileKey;
  const promise = [];

  if (imageFileKey) {
    promise.push(utapi.deleteFiles(imageFileKey));
  }
  await Promise.all([
    MUTATION.updateUser(userId, { image: null, imageFileKey: null }),
    ...promise,
  ]);
}

export async function revalidatePathMutation(path: string) {
  revalidatePath(path, "page");
}
