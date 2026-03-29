import DriveContent from "~/components/drive-content";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

const Trash = async () => {
  const session = await verifyUser();
  const userId = session.user.id;

  const [folders, files, parents] = await Promise.all([
    QUERIES.getTrashedFolders(userId),
    QUERIES.getTrashedFiles(userId),
    QUERIES.getAllParents(null),
  ]);

  return <DriveContent folders={folders} files={files} parents={parents} />;
};
export default Trash;
