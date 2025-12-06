// import "server-only"
import {
  pgTable,
  bigint,
  text,
  index,
} from "drizzle-orm/pg-core";

export const filesSchema = pgTable( "file_table", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    parent: bigint("parent_id", { mode: "number" }), 
    url: text("url").notNull(),
    size: text("size").notNull(),
  },
  (t) => [index("files_parent_id_idx").on(t.parent)]
);

export const foldersSchema = pgTable( "folder_table", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    parent: bigint("parent_id", { mode: "number" }), 
  },
  (t) => [index("folder_parent_id_idx").on(t.parent)]
);

//better-auth auth-schema
export * from "./auth-schema"
