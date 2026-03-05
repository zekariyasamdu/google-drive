import { ContentItemsCard } from "~/components/cards/content-items";
import { EmptyStar } from "~/components/empty/empty-star";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

const Star = async () => {
  const session = await verifyUser();
  const userId = session.user.id;

  const [folders, files] = await Promise.all([
    QUERIES.getStarredFoldersExcludingTrashed(userId),
    QUERIES.getStarredFilesExcludingTrashed(userId),
  ]);

  if (folders.length === 0 && files.length === 0) {
    return <EmptyStar />;
  }

  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <ContentItemsCard folderOrFileItems={folders} />
      <ContentItemsCard folderOrFileItems={files} />
    </div>
  );
};
export default Star;
