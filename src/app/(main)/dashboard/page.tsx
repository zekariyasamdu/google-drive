import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ContentItemsCard } from "~/components/cards/content-items";
import { EmptyFolder } from "~/components/empty/empty-folder";
import { auth } from "~/server/auth/auth-server";
import { QUERIES } from "~/server/db/queries";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;
  const [folders, files] = await Promise.all([
    QUERIES.getFolders(userId),
    QUERIES.getFiles(userId),
  ]);
  console.log(files.length, folders.length);
  if (files.length === 0 && folders.length === 0) {
    return <EmptyFolder />;
  }

  const filterFolders = folders.filter((t) => t.trash === false);
  const filterFiles = files.filter((t) => t.trash === false);

  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <ContentItemsCard data={filterFolders} />
      <ContentItemsCard data={filterFiles} />
    </div>
  );
};
export default Dashboard;
