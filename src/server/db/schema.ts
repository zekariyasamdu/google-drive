import "server-only"
import { index, text, bigint, singlestoreTableCreator } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `google_drive_${name}`,
)

export const files = createTable("file_table", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent_id", { mode: "number" }),
  url: text("url").notNull(),
  size: text("size").notNull()
}, (t) => {
  return [index("parent_id").on(t.parent)]
});

export const folder = createTable("folder_table", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent_id", { mode: "number" }),
}, (t) => {
  return [index("parent_id").on(t.parent)]
});



