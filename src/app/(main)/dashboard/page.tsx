import React from "react"
import { FileItems } from "~/components/cards/file-item";
import { FolderItems } from "~/components/cards/folder-items";
import { db } from "~/server/db";
import { files as filesSchema, folder as folderSchema } from "~/server/db/schema";

const Dashboard = async () => {
  const folders = await db.select().from(folderSchema);
  const files = await db.select().from(filesSchema);
  return (
    <div className=" w-full flex flex-row flex-wrap gap-10 pl-10 ml-auto mt-5">
      <FolderItems data={folders} />
      <FileItems data={files} />
    </div>
  )
}
export default Dashboard;

