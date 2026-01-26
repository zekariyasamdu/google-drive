import type { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import type { filesSchema, foldersSchema, user } from "~/server/db/schema";

export type TFileSelect = InferSelectModel<typeof filesSchema>;
export type TFolderSelect = InferSelectModel<typeof foldersSchema>;

export type TFileInsert = InferInsertModel<typeof filesSchema>;
export type TFolderInsert = InferInsertModel<typeof foldersSchema>;

export type TUserInsert = InferInsertModel<typeof user>;

// File Guard
export function isFile(item: TFolderSelect | TFileSelect): item is TFileSelect {
  return "url" in item;
}

