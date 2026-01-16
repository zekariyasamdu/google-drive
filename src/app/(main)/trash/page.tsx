import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FileItems } from "~/components/cards/file-item";
import { FolderItems } from "~/components/cards/folder-items";
import { EmptyTrash } from "~/components/empty-trash";
import { auth } from "~/server/auth/auth-server";
import { QUERIES } from "~/server/db/queries";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/auth/login")
  }
  const userId = session.user.id;
  const [folders, files] = await Promise.all([QUERIES.getFolders(userId), QUERIES.getFiles(userId)]);
  console.log(files.length, folders.length)


  const filterTrashFolders = folders.filter(t => t.trash === true);
  const filterTrashFiles = files.filter(t => t.trash === true);

  if (filterTrashFolders.length === 0 && filterTrashFiles.length === 0) {
    return (
      <EmptyTrash/>
    )
  }
  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <FolderItems data={filterTrashFolders} />
      <FileItems data={filterTrashFiles} />
    </div>
  );
};
export default Dashboard;
