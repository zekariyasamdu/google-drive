import DriveContent from "~/components/drive-content";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

const Star = async () => {
  const session = await verifyUser();
  const userId = session.user.id;

  const [folders, files, parents, isGrid] = await Promise.all([
    QUERIES.getStarredFoldersExcludingTrashed(userId),
    QUERIES.getStarredFilesExcludingTrashed(userId),
    QUERIES.getAllParents(null),
    QUERIES.isGrid(userId),
  ]);

  return (
    <DriveContent
      folders={folders}
      files={files}
      parents={parents}
      initialIsGrid={isGrid}
    />
  );
};
export default Star;
