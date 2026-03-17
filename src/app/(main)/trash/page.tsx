import { ContentContainer } from "~/components/cards/content-grid";
import { EmptyTrash } from "~/components/empty/empty-trash";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

const Trash = async () => {
  const session = await verifyUser();
  const userId = session.user.id;

  const [folders, files] = await Promise.all([
    QUERIES.getTrashedFolders(userId),
    QUERIES.getTrashedFiles(userId),
  ]);
  const folderAndFiles = [...folders, ...files];

  if (folders.length === 0 && files.length === 0) {
    return <EmptyTrash />;
  }

  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <ContentContainer folderOrFileItems={folderAndFiles} />
    </div>
  );
};
export default Trash;
