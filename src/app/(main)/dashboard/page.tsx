import DriveContent from "~/components/drive-content";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

const Dashboard = async () => {
  const session = await verifyUser();
  const userId = session.user.id;

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolderExcludingTrahsed(userId, null),
    QUERIES.getFilesExcludingTrashed(userId, null),
    QUERIES.getAllParents(null),
  ]);

  return <DriveContent folders={folders} files={files} parents={parents} />;
};
export default Dashboard;
