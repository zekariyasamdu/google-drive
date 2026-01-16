import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FileItems } from "~/components/cards/file-item";
import { FolderItems } from "~/components/cards/folder-items";
import { EmptyStar } from "~/components/empty/empty-star";
import { auth } from "~/server/auth/auth-server";
import { QUERIES } from "~/server/db/queries";

const Star = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/auth/login")
  }
  const userId = session.user.id;
  const [folders, files] = await Promise.all([QUERIES.getFolders(userId), QUERIES.getFiles(userId)]);
  console.log(files.length, folders.length)

  const filterStarFolders = folders.filter(t => t.star === true);
  const filterStarFiles = files.filter(t => t.star === true);

  if (filterStarFolders.length === 0 && filterStarFiles.length === 0) {
    return (
    <EmptyStar/>
    )
  }
  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <FolderItems data={filterStarFolders} />
      <FileItems data={filterStarFiles} />
    </div>
  );
};
export default Star;
