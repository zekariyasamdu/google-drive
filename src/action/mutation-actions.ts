"use server";
import { MUTATION } from "~/server/db/queries";
import type { TFileInsert, TFolderInsert } from "~/lib/types/db";
import { utapi } from "~/server/uploadthings";

export async function createFolderAction(folder: TFolderInsert) {
  return await MUTATION.createFolder(folder);
}

export async function deleteFolderAction(folder_id: number) {
  return await MUTATION.deleteFolder(folder_id);
}

export async function deleteFileAction(file_id: number, file_key: string) {
  return Promise.all([MUTATION.deleteFiles(file_id), utapi.deleteFiles(file_key)])
}

export async function updateFileAction(fileId: number, fileKey: string, updateData: Partial<TFileInsert> = {}) {
  const renameFile = []
  if(updateData.name !== undefined){
    renameFile.push(utapi.renameFiles({ fileKey, newName: updateData.name }))
  }
  return Promise.all([MUTATION.updateFile(fileId, updateData), ...renameFile])
}

export async function updateFolderAction(folderId: number, updateData: Partial<TFolderInsert>={}) {
  return MUTATION.updateFolder(folderId, updateData) 
}
