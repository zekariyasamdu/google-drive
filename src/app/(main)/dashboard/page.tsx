import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FileItems } from "~/components/cards/file-item";
import { FolderItems } from "~/components/cards/folder-items";
import { EmptyFolder } from "~/components/empty-folder";
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
  console.log(files.length, folders.length )
  if (files.length === 0 && folders.length === 0) {
    return (
      <EmptyFolder />

    )
  }

  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <FolderItems data={folders} />
      <FileItems data={files} />
    </div>
  );
};
export default Dashboard;
