import { db } from ".";
import {
  filesSchema,
  foldersSchema,
} from "~/server/db/schema";

export const QUERIES = {
  getFolders: () => {
    return db.select().from(foldersSchema);
  },
  getFiles: () => {
    return db.select().from(filesSchema)
  }
}

export const MUTATION = {

}
