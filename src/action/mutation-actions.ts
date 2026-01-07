"use server";
import { MUTATION } from "~/server/db/queries";
import type { TFolderInsert } from "~/lib/types/db";

export async function createFolderAction(folder: TFolderInsert) {
  return await MUTATION.createFolder(folder);
}
