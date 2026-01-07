import type { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import type { filesSchema, foldersSchema } from "~/server/db/schema";

export type TFileSelect = InferSelectModel<typeof filesSchema>;
export type TFolderSelect = InferSelectModel<typeof foldersSchema>;

export type TFileInsert = InferInsertModel<typeof filesSchema>;
export type TFolderInsert = InferInsertModel<typeof foldersSchema>;





