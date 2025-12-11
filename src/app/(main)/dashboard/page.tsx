import React from "react";
import { FileItems } from "~/components/cards/file-item";
import { FolderItems } from "~/components/cards/folder-items";

import { QUERIES } from "~/server/db/queries";
const Dashboard = async () => {
  const [folders, files] = await Promise.all([QUERIES.getFolders(), QUERIES.getFiles()]);
  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <FolderItems data={folders} />
      <FileItems data={files} />
    </div>
  );
};
export default Dashboard;
