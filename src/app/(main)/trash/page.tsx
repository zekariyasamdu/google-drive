import DriveContent from "~/components/drive-content";
import { EmptyTrash } from "~/components/empty/empty-trash";
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

  if (folders.length === 0 && files.length === 0) {
    return <EmptyTrash />;
  }

  return <DriveContent folders={folders} files={files} parents={parents} />;
};
export default Trash;
