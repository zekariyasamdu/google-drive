import {
  pgTable,
  bigint,
  text,
  index,
  foreignKey
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const filesSchema = pgTable("file_table", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  owner_id: text("owner_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  parent: bigint("parent_id", { mode: "number" }).references(() => foldersSchema.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  size: text("size").notNull(),
  fileKey: text("key").notNull()
},
  (t) => [index("files_parent_id_idx").on(t.parent)]
);

export const foldersSchema = pgTable("folder_table", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  owner_id: text("owner_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  parent: bigint("parent_id", { mode: "number" }),
},
  (t) => [
    index("folder_parent_id_idx").on(t.parent),
    foreignKey({
      columns: [t.parent],
      foreignColumns: [t.id],
      name: "folder_self_parent_fk"
    }).onDelete("cascade")
  ]
);


//better-auth auth-schema
export * from "./auth-schema"
