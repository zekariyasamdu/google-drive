import { ContentItemsCard } from "~/components/cards/content-items";
import { EmptyFolder } from "~/components/empty/empty-folder";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries";

const Dashboard = async () => {
  const session = await verifyUser();

  const userId = session.user.id;
  const [folders, files] = await Promise.all([
    QUERIES.getFolders(userId),
    QUERIES.getFiles(userId),
  ]);

  const foldersWithNullParents = folders.filter(
    (item) => item.parent === null && item.trash === false,
  );
  const filesWithNullParents = files.filter(
    (item) => item.parent === null && item.trash === false,
  );
  console.log(foldersWithNullParents.length, filesWithNullParents.length);

  if (
    filesWithNullParents.length === 0 &&
    foldersWithNullParents.length === 0
  ) {
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
